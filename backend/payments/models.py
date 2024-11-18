from django.db import models
from django.conf import settings
from registrations.models import Registration


class Payment(models.Model):
    registration = models.ForeignKey(
        Registration, on_delete=models.CASCADE, related_name="payments"
    )
    dna_transaction_id = models.CharField(max_length=100, unique=True)
    upi_transaction_id = models.CharField(max_length=100, blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(
        max_length=50,
        choices=[
            ("PAYMENT_STARTED", "Payment Started"),
            ("VERIFICATION_PENDING", "Verification Pending"),
            ("COMPLETED", "Completed"),
            ("FAILED", "Failed"),
        ],
        default="PAYMENT_STARTED",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    verified_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="verified_payments",
    )

    def __str__(self):
        return f"Payment {self.dna_transaction_id} for {self.registration}"

    def mark_as_verified(self, admin_user):
        """Manually verifies the payment and updates related registration status."""
        self.status = "COMPLETED"
        self.verified_by = admin_user
        self.save()
        self.registration.status = "PAID"
        self.registration.save()
