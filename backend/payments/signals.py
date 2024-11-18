from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Payment
from registrations.models import Registration
from accounts.models import UserProfile

@receiver(post_save, sender=Payment)
def update_registration_and_payment_status(sender, instance, **kwargs):
    """Update Registration status and UserProfile payment status when Payment is completed."""
    if instance.status == "COMPLETED":
        # Update the linked registration status
        registration = instance.registration
        registration.status = "PAID"
        registration.save()

        # Update the UserProfile fields
        profile = registration.user.profile
        profile.is_payment_complete = True
        profile.save()
