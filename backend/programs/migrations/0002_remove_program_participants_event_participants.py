# Generated by Django 5.1.2 on 2024-10-24 06:15

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("programs", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name="program",
            name="participants",
        ),
        migrations.AddField(
            model_name="event",
            name="participants",
            field=models.ManyToManyField(
                related_name="events", to=settings.AUTH_USER_MODEL
            ),
        ),
    ]