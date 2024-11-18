from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import uuid
from .models import Payment, Registration


class InitiatePaymentView(APIView):
    """
    - This endpoint generates a dna_transaction_id, initializes a payment record in the database, and marks the status as PAYMENT_STARTED.
    - It sends the dna_transaction_id back to the frontend.
    """

    def post(self, request):
        try:
            user = request.user
            amount = request.data.get("amount")

            if not amount:
                return Response({"detail": "Amount is required."}, status=status.HTTP_400_BAD_REQUEST)

            # Fetch the active registration of the user
            registration = Registration.objects.filter(user=user, status='PENDING').first()

            if not registration:
                return Response(
                    {"detail": "No active registration found for the user."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Generate unique transaction ID
            dna_transaction_id = str(uuid.uuid4())

            # Create a new payment record
            payment = Payment.objects.create(
                registration=registration,
                dna_transaction_id=dna_transaction_id,
                amount=amount,
                status="PAYMENT_STARTED",
            )

            return Response(
                {"dna_transaction_id": dna_transaction_id},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class SubmitUpiTransactionView(APIView):
    """
    - Receives the upi_transaction_id the user submits after completing payment via upi.
    - Store the upi_transaction_id and marks the payment status as VERIFICATION_PENDING.
    """

    def post(self, request):
        try:
            dna_transaction_id = request.data.get("dna_transaction_id")
            upi_transaction_id = request.data.get("upi_transaction_id")

            # Retrieve the payment record
            payment = Payment.objects.get(dna_transaction_id=dna_transaction_id)

            # Update payment record
            payment.upi_transaction_id = upi_transaction_id
            payment.status = "VERIFICATION_PENDING"
            payment.save()

            return Response(
                {"message": "Payment verification pending"}, status=status.HTTP_200_OK
            )
        except Payment.DoesNotExist:
            return Response(
                {"error": "Transaction not found"}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class VerifyPaymentView(APIView):
    """
    - Admin Only access
    - For manually verifying the upi_transaction_id with bank records.
    - Update the payment status to COMPLETED once verified.
    """

    def post(self, request):
        try:
            dna_transaction_id = request.data.get("dna_transaction_id")
            payment = Payment.objects.get(dna_transaction_id=dna_transaction_id)

            # Mark as completed
            payment.status = "COMPLETED"
            payment.save()

            return Response(
                {"message": "Payment verified and completed"}, status=status.HTTP_200_OK
            )
        except Payment.DoesNotExist:
            return Response(
                {"error": "Transaction not found"}, status=status.HTTP_404_NOT_FOUND
            )
