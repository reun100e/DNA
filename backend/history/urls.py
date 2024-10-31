from django.urls import path
from .views import UserHistoryView

urlpatterns = [
    path('my-history/', UserHistoryView.as_view(), name='user-history'),
]
