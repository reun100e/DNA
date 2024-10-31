from django.db import models
from django.conf import settings
from registrations.models import Registration

class Payment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    registration = models.ForeignKey(Registration, on_delete=models.CASCADE, related_name="payments")
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[('PENDING', 'Pending'), ('COMPLETED', 'Completed'), ('FAILED', 'Failed')])
    transaction_id = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return f"Payment by {self.user.username} for registration {self.registration.id}"
