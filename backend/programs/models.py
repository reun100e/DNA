from django.db import models

class Program(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

class Event(models.Model):
    name = models.CharField(max_length=100)
    program = models.ForeignKey(Program, on_delete=models.CASCADE, related_name='events')
    description = models.TextField()
    date = models.DateField()

    def __str__(self):
        return f"{self.name} on {self.date} under {self.program.name}"

