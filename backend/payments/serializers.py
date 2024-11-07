from rest_framework import serializers
from .models import Payment

class PaymentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Payment
        fields = [
            'id', 'user', 'registration', 'amount', 'payment_date', 'status',
            'razorpay_order_id', 'razorpay_payment_id'
        ]
        read_only_fields = ['payment_date', 'status', 'razorpay_order_id', 'razorpay_payment_id']
