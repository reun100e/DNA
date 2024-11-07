from django.urls import path
from .views import RegistrationCreateView, RegistrationListView, AdminRegistrationListView

urlpatterns = [
    path('register/', RegistrationCreateView.as_view(), name='registration-create'),
    path('my-registrations/', RegistrationListView.as_view(), name='registration-list'),
    path('all/', AdminRegistrationListView.as_view(), name='admin-registration-list'),

]
