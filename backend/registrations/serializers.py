from rest_framework import serializers
from .models import Registration
from programs.models import Event, RegistrationType

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name', 'description', 'event_date']

class RegistrationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistrationType
        fields = ['id', 'name', 'price']

class RegistrationSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    user_email = serializers.EmailField(source='user.email', read_only=True)  # Admin-specific field
    event = EventSerializer(read_only=True)
    event_id = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all(), source='event', write_only=True)

    class Meta:
        model = Registration
        fields = ['id', 'user', 'user_email', 'event', 'event_id', 'registration_date', 'is_paid', 'payment_date']

class EventParticipationSerializer(serializers.ModelSerializer):
    event_name = serializers.CharField(source='event.name')
    event_date = serializers.DateTimeField(source='event_date')

    class Meta:
        model = Registration
        fields = ['event_name', 'event_date', 'participated']