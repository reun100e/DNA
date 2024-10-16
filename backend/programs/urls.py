from django.urls import path
from .views import ProgramListView, ProgramDetailView, EventListView, EventDetailView

urlpatterns = [
    path('', ProgramListView.as_view(), name='program-list'),  # List all programs
    path('<int:pk>/', ProgramDetailView.as_view(), name='program-detail'),  # Program detail

    # Events under each program
    path('<int:program_id>/events/', EventListView.as_view(), name='event-list'),  # List events for a program
    path('<int:program_id>/events/<int:pk>/', EventDetailView.as_view(), name='event-detail'),  # Event detail
]

