from django.db import models
from accounts.models import User

class Program(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

class Event(models.Model):
    name = models.CharField(max_length=100)
    program = models.ForeignKey(Program, on_delete=models.CASCADE, related_name='events')
    description = models.TextField()
    event_date = models.DateField()

    def __str__(self):
        return f"{self.name} - {self.program.name}"
