from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/accounts/", include("accounts.urls")),
    path("api/v1/badges/", include("badges.urls")),
    path("api/v1/history/", include("history.urls")),
    path("api/v1/payments/", include("payments.urls")),
    path("api/v1/programs/", include("programs.urls")),
    path("api/v1/registrations/", include("registrations.urls")),
    path("api/v1/verification/", include("verification.urls")),
]
