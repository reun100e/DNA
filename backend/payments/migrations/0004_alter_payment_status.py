# Generated by Django 5.1.2 on 2024-11-05 05:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("payments", "0003_remove_payment_transaction_id_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="payment",
            name="status",
            field=models.CharField(
                choices=[
                    ("pending", "Pending"),
                    ("completed", "Completed"),
                    ("failed", "Failed"),
                ],
                default="pending",
                max_length=20,
            ),
        ),
    ]
