from rest_framework import serializers
from .models import Registration
from programs.models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name', 'description', 'event_date']

class RegistrationSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    event = EventSerializer(read_only=True)
    event_id = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all(), source='event', write_only=True)

    class Meta:
        model = Registration
        fields = ['id', 'user', 'event', 'event_id', 'registration_date', 'is_confirmed', 'confirmation_date']

class EventParticipationSerializer(serializers.ModelSerializer):
    event_name = serializers.CharField(source='event.name')
    event_date = serializers.DateTimeField(source='event_date')

    class Meta:
        model = Registration
        fields = ['event_name', 'event_date', 'participated']