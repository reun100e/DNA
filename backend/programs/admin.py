from django.contrib import admin
from .models import Program, Event, RegistrationType

admin.site.register(Program)
admin.site.register(Event)
admin.site.register(RegistrationType)
