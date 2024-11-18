from django.urls import path
from .views import RegisterForEventView, UserRegistrationsView

urlpatterns = [
    path("register/", RegisterForEventView.as_view(), name="register-for-event"),
    path("my-registrations/", UserRegistrationsView.as_view(), name="user-registrations"),

]
