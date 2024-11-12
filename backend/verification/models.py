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
    target = models.CharField(max_length=255)  # store email or phone number


    def is_expired(self):
        """Check if OTP has expired based on OTP_EXPIRATION_MINUTES setting."""
        expiration_minutes = getattr(settings, 'OTP_EXPIRATION_MINUTES', 15)
        expiry_time = self.created_at + timedelta(minutes=expiration_minutes)
        return timezone.now() > expiry_time

    def mark_as_used(self):
        """Mark this OTP as used."""
        self.is_used = True
        self.save(update_fields=['is_used'])

    class Meta:
        unique_together = ("user", "otp_type")
        indexes = [
            models.Index(fields=["user", "otp_type", "is_used"]),
        ]
