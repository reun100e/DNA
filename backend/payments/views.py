from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.conf import settings
from django.shortcuts import get_object_or_404
from .models import Payment
from .serializers import PaymentSerializer
from .razorpay_client import client

class PaymentCreateView(generics.CreateAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        registration = serializer.validated_data['registration']
        amount = int(registration.event.price * 100)  # Convert to paise

        try:
            # Create an order with Razorpay
            razorpay_order = client.order.create({
                "amount": amount,
                "currency": "INR",
                "payment_capture": 1  # Auto-capture
            })
            # Save the payment with pending status and link to the order
            payment = serializer.save(
                user=user,
                amount=registration.event.price,
                status='PENDING',
                razorpay_order_id=razorpay_order.get("id"),
                payment_status_url=razorpay_order.get("short_url")
            )

            return Response({
                "order_id": razorpay_order.get("id"),
                "upi_link": razorpay_order.get("short_url")
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": "Error creating Razorpay order"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PaymentListView(generics.ListAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Payment.objects.filter(user=self.request.user)


@csrf_exempt
@api_view(['POST'])
def razorpay_webhook(request):
    payload = request.body
    signature = request.headers.get('X-Razorpay-Signature')

    try:
        client.utility.verify_webhook_signature(payload, signature, settings.RAZORPAY_KEY_SECRET)
    except razorpay.errors.SignatureVerificationError:
        return JsonResponse({"error": "Invalid signature"}, status=400)

    data = request.data
    payment_entity = data.get('payload', {}).get('payment', {}).get('entity', {})
    razorpay_order_id = payment_entity.get('order_id')

    if not razorpay_order_id:
        return JsonResponse({"error": "Order ID not found in payload"}, status=400)

    try:
        # Retrieve payment entry from database
        payment = get_object_or_404(Payment, razorpay_order_id=razorpay_order_id)

        # Update status based on event type
        if data.get('event') == "payment.captured":
            payment.status = 'COMPLETED'
            payment.razorpay_payment_id = payment_entity.get('id')
        elif data.get('event') == "payment.failed":
            payment.status = 'FAILED'

        payment.save()
        return JsonResponse({"status": "success"}, status=200)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
