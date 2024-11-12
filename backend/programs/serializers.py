from rest_framework import serializers
from .models import Registration
from programs.models import Event

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = ['id', 'user', 'event', 'registration_date']
        read_only_fields = ['id', 'registration_date']
