from django.urls import path
from .views import ProgramListView, ProgramDetailView, EventListView, EventDetailView, UserProgramsView, AdminProgramsView

urlpatterns = [
    # Get programs and events
    path('', ProgramListView.as_view(), name='program-list'),  # List all programs
    path('<int:pk>/', ProgramDetailView.as_view(), name='program-detail'),  # Program detail
    path('<int:program_id>/events/', EventListView.as_view(), name='event-list'),  # List only events for a particular program
    path('<int:program_id>/events/<int:pk>/', EventDetailView.as_view(), name='event-detail'),  # Event detail

    # User-registered program and events list
    path('my-programs/', UserProgramsView.as_view(), name='my-programs'),
    # Admin vie of all user-registered program and events list
    path('admin-programs/', AdminProgramsView.as_view(), name='admin-programs'),
]
