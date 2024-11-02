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

class Event(models.Model):
    name = models.CharField(max_length=100)
    program = models.ForeignKey(Program, on_delete=models.CASCADE, related_name='events')
    description = models.TextField()
    event_date = models.DateField()

    def __str__(self):
        return f"{self.name} - {self.program.name}"

