from django.conf import settings
from django.db import models
from datetime import timedelta
from django.utils import timezone


class OTP(models.Model):
    EMAIL = "email"
    PHONE = "phone"
    OTP_TYPE_CHOICES = [
        (EMAIL, "Email"),
        (PHONE, "Phone"),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    code = models.CharField(max_length=6)
    otp_type = models.CharField(max_length=10, choices=OTP_TYPE_CHOICES)
    is_used = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        """Check if OTP has expired based on OTP_EXPIRATION_MINUTES setting."""
        expiry_time = self.created_at + timedelta(minutes=settings.OTP_EXPIRATION_MINUTES)
        return timezone.now() > expiry_time

    class Meta:
        unique_together = ("user", "otp_type")
        indexes = [
            models.Index(fields=["user", "otp_type", "is_used"]),
        ]
