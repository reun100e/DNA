from rest_framework import serializers
from .models import Program, Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name', 'description', 'event_date', 'program']

class ProgramSerializer(serializers.ModelSerializer):
    events = EventSerializer(many=True, read_only=True)

    class Meta:
        model = Program
        fields = ['id', 'name', 'description', 'start_date', 'end_date', 'participants', 'events']
