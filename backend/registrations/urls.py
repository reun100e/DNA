from django.urls import path
from .views import RegisterForEventView

urlpatterns = [
    path('register/', RegisterForEventView.as_view(), name='register-for-event'),
]
