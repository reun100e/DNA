from rest_framework import serializers
from .models import Payment

class PaymentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Payment
        fields = ['id', 'user', 'registration', 'amount', 'payment_date', 'status', 'transaction_id']
        read_only_fields = ['payment_date', 'transaction_id']

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return super().create(validated_data)
