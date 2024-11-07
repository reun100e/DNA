from django.contrib.auth.models import AbstractUser
from django.db import models

import uuid
import base64

from django.db.models.signals import pre_save
from django.dispatch import receiver


class User(AbstractUser):
    phone_number = models.CharField(max_length=15, unique=True)
    is_phone_verified = models.BooleanField(default=False)
    is_email_verified = models.BooleanField(default=False)

    dna_id = models.CharField(max_length=20, unique=True, blank=True, editable=False, help_text="Unique DNA identifier.")

    def __str__(self):
        return self.username

# Function to generate Base32-encoded UUID
def generate_dna_id():
    uuid_bytes = uuid.uuid4().bytes
    return base64.b32encode(uuid_bytes).decode('utf-8').strip('=')


# Signal to assign the unique ID before saving the user
@receiver(pre_save, sender=User)
def set_unique_user_id(sender, instance, **kwargs):
    if not instance.dna_id:
        #The while loop guarantees that the generated ID is unique by checking against the database.
        while True:
            new_id = generate_dna_id()
            if not User.objects.filter(dna_id=new_id).exists():
                instance.dna_id = new_id
                break

# Signal to ensure is_email_verified and is_phone_verified are reset to False only if email or phone_number has changed.
@receiver(pre_save, sender=User)
def reset_verification_on_change(sender, instance, **kwargs):
    """Reset verification status when email or phone changes."""
    if instance.pk:
        old_user = sender.objects.get(pk=instance.pk)
        if instance.email != old_user.email:
            instance.is_email_verified = False
        if instance.phone_number != old_user.phone_number:
            instance.is_phone_verified = False

#Add profile model with sex, bio, college, etc