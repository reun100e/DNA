from rest_framework import generics, permissions, serializers
from .models import Registration
from .serializers import RegistrationSerializer, EventParticipationSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

class RegistrationCreateView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        event = serializer.validated_data['event']

        if Registration.objects.filter(user=user, event=event).exists():
            raise serializers.ValidationError("You have already registered for this event.")
        serializer.save(user=user)

class RegistrationListView(generics.ListAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Registration.objects.filter(user=self.request.user)


class RegisteredEventListView(generics.ListAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Registration.objects.filter(user=self.request.user)


@api_view(['POST'])
def mark_participation(request, registration_id):
    try:
        registration = Registration.objects.get(id=registration_id)
    except Registration.DoesNotExist:
        return Response({"error": "Registration not found"}, status=status.HTTP_404_NOT_FOUND)

    registration.participated = True
    registration.save()
    return Response({"message": "Participation marked successfully"}, status=status.HTTP_200_OK)

@api_view(['GET'])
def user_event_participation(request, user_id):
    registrations = Registration.objects.filter(user_id=user_id)
    serializer = EventParticipationSerializer(registrations, many=True)
    return Response(serializer.data)