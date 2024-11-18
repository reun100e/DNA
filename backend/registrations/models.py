from django.db import models
from django.conf import settings
from programs.models import Event


class Registration(models.Model):
    STATUS_CHOICES = [
        ("PENDING", "Pending Payment"),
        ("PAID", "Paid"),
        ("CANCELLED", "Cancelled"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="registrations"
    )
    event = models.ForeignKey(
        Event, on_delete=models.CASCADE, related_name="registrations"
    )
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="PENDING")
    registered_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.user.username} registered for {self.event.name} ({self.status})"

    @property
    def program(self):
        return self.event.program
