from django.db import models
from accounts.models import User

class Program(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    participants = models.ManyToManyField(User, related_name='programs')

    def __str__(self):
        return self.name

class Event(models.Model):
    name = models.CharField(max_length=100)
    program = models.ForeignKey(Program, on_delete=models.CASCADE, related_name='events')
    description = models.TextField()
    event_date = models.DateField()

    def __str__(self):
        return f"{self.name} - {self.program.name}"
