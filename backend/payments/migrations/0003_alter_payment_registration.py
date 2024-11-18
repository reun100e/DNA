# Generated by Django 5.1.2 on 2024-11-18 12:25

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("payments", "0002_rename_date_payment_created_at_and_more"),
        ("registrations", "0004_alter_registration_unique_together"),
    ]

    operations = [
        migrations.AlterField(
            model_name="payment",
            name="registration",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="payments",
                to="registrations.registration",
            ),
        ),
    ]