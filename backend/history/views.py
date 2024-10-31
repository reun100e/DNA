# history/views.py
from rest_framework import generics, permissions
from registrations.models import Registration
from registrations.serializers import RegistrationSerializer

class UserHistoryView(generics.ListAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Registration.objects.filter(user=self.request.user)
