from rest_framework import serializers
from .models import Program
from registrations.models import Registration
from registrations.serializers import EventSerializer

class ProgramSerializer(serializers.ModelSerializer):
    events = serializers.SerializerMethodField()

    class Meta:
        model = Program
        fields = ['id', 'name', 'description', 'events']

    def get_events(self, obj):
        if self.context['request'].user.is_staff:
            # Admin view: include all registrations
            return EventSerializer(obj.events.prefetch_related('registrations'), many=True).data
        else:
            return []  # Leave empty in case accidentally used in user context

class RegisteredProgramSerializer(serializers.ModelSerializer):
    events = serializers.SerializerMethodField()

    class Meta:
        model = Program
        fields = ['id', 'name', 'description', 'events']

    def get_events(self, obj):
        user = self.context['request'].user
        registrations = Registration.objects.filter(user=user, event__program=obj)
        return EventSerializer([reg.event for reg in registrations], many=True).data
