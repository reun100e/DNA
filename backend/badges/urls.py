from django.urls import path
from .views import UserBadgeListView

urlpatterns = [
    path('my-badges/', UserBadgeListView.as_view(), name='user-badge-list'),
]
