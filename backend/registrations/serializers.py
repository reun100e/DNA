from rest_framework import serializers
from .models import Registration, Event
from django.utils import timezone


class RegistrationSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())

    class Meta:
        model = Registration
        fields = ["user", "event"]

    def validate_event(self, event):
        """
        Validate that the event exists and is open for registration.
        """
        if event.date is None or event.date <= timezone.now().date():
            raise serializers.ValidationError(
                "You cannot register for past or undefined events."
            )
        return event

    def validate(self, data):
        """
        Validate that the user has not already registered for the selected event.
        """
        user = data.get("user")
        event = data.get("event")

        if Registration.objects.filter(user=user, event=event).exists():
            raise serializers.ValidationError(
                {"detail": f"You are already registered for the event: {event.name}."}
            )
        return data

    def create(self, validated_data):
        """
        Create a new Registration instance after validation.
        """
        return super().create(validated_data)


from rest_framework import serializers
from .models import Registration


class UserRegistrationSerializer(serializers.ModelSerializer):
    event_name = serializers.CharField(source="event.name", read_only=True)
    program_name = serializers.CharField(source="event.program.name", read_only=True)
    date = serializers.DateField(source="event.date", read_only=True)

    class Meta:
        model = Registration
        fields = ["event_name", "program_name", "date", "status", "registered_at"]
