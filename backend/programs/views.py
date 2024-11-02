from rest_framework import generics
from .models import Program, Event
from .serializers import ProgramSerializer, EventSerializer, RegisteredProgramSerializer
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny


class ProgramListView(generics.ListCreateAPIView):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
    permission_classes = [AllowAny]

class ProgramDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
    permission_classes = [AllowAny]

class EventListView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [AllowAny]

class EventDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [AllowAny]

# User-specific programs view
class UserProgramsView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = RegisteredProgramSerializer

    def get_queryset(self):
        # Programs the authenticated user has registered for
        user = self.request.user
        return Program.objects.filter(events__registrations__user=user).distinct()

# Admin view to see all user registered programs
class AdminProgramsView(generics.ListAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = ProgramSerializer

    def get_queryset(self):
        return Program.objects.with_event_and_user_counts()
