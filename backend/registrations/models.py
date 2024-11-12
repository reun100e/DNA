from django.db import models
from django.conf import settings
from programs.models import Event

class Registration(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="registrations")
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="registrations")
    registration_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'event'], name="unique_registration")
        ]

    def __str__(self):
        return f"{self.user.first_name} registered for {self.event.name}."

    @property
    def program(self):
        return self.event.program
