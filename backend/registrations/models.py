from django.db import models
from django.conf import settings
from programs.models import Event, RegistrationType

class Registration(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="registrations")
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="registrations")
    registration_date = models.DateTimeField(auto_now_add=True)
    is_paid = models.BooleanField(default=False)
    payment_date = models.DateTimeField(null=True, blank=True)
    participated = models.BooleanField(default=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'event'], name="unique_registration")
        ]

    def __str__(self):
        return f"{self.user.username} registered for {self.event.name} as {self.registration_type}"

    @property
    def program(self):
        return self.event.program
