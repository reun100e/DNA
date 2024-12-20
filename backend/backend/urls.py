from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/accounts/", include("accounts.urls")),
    path("api/v1/programs/", include("programs.urls")),
    path("api/v1/registrations/", include("registrations.urls")),
    path("api/v1/verification/", include("verification.urls")),
    path("api/v1/payments/", include("payments.urls")),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
