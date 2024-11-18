from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from .models import Registration
from .serializers import RegistrationSerializer


class RegisterForEventView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        """
        Custom create method to handle registration logic.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Perform the actual creation
        try:
            self.perform_create(serializer)
        except serializers.ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


from rest_framework import generics, permissions
from .models import Registration
from .serializers import UserRegistrationSerializer


class UserRegistrationsView(generics.ListAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Return registrations for the authenticated user.
        """
        return Registration.objects.filter(user=self.request.user).select_related(
            "event", "event__program"
        )
