from rest_framework import serializers
from .models import Registration
from programs.models import Event


class RegistrationSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())

    class Meta:
        model = Registration
        fields = ["user", "event", "registration_date"]
        read_only_fields = ["registration_date"]

    def create(self, validated_data):
        user = validated_data.get("user")
        event = validated_data.get("event")

        # Check if the user has already registered for the event
        if Registration.objects.filter(user=user, event=event).exists():
            raise serializers.ValidationError(
                {"detail": "You are already registered for this event."}
            )

        return super().create(validated_data)

