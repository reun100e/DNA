from django.db import models
from django.db.models import Prefetch, Count

class ProgramManager(models.Manager):
    def with_registrations_and_users(self):
        from registrations.models import Registration
        return self.prefetch_related(
            Prefetch(
                'events__registrations',
                queryset=Registration.objects.select_related('user', 'event'),
                to_attr='registrations_with_users'
            )
        )

    def with_event_and_user_counts(self):
        return self.annotate(
            event_count=Count('events'),
            user_count=Count('events__registrations__user', distinct=True)
        )


class Program(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    objects = ProgramManager()

    def __str__(self):
        return self.name

class RegistrationType(models.Model):
    event = models.ForeignKey('Event', on_delete=models.CASCADE, related_name='registration_types')
    name = models.CharField(max_length=50)  # e.g., "Student", "Professional"
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Fee for this category

    def __str__(self):
        return f"{self.name} - {self.price} for {self.event.name}"

class Event(models.Model):
    name = models.CharField(max_length=100)
    program = models.ForeignKey(Program, on_delete=models.CASCADE, related_name='events')
    description = models.TextField()
    event_date = models.DateField()
    price = models.DecimalField(decimal_places=2, max_digits=7, null=True, blank=True, help_text="Default price if no registration types")

    def __str__(self):
        return f"{self.name} - {self.program.name}"

