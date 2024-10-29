from django.urls import path
from .views import RegisterView, LoginView, RefreshTokenView, UserProfileView, LogoutView, VerifyEmailView, VerifyPhoneView

urlpatterns = [
    # User registration
    path("users/register/", RegisterView.as_view(), name="user-register"),

    # User login with access abd refresh token in Http-only cookies
    path("users/login/", LoginView.as_view(), name="user-login"),

    # Get new access token in Http-only cookies
    path("users/refresh/", RefreshTokenView.as_view(), name="user-token-refresh"),

    # User Profile
    path("me/", UserProfileView.as_view(), name="user-profile"),

    # Logout
    path("users/logout/", LogoutView.as_view(), name="user-logout"),

    # Verify Email
    path("users/verify-email/", VerifyEmailView.as_view(), name="user-verify-email"),

    # Verify Phone
    path("users/verify-phone/", VerifyPhoneView.as_view(), name="user-verify-phone"),

    # # Resend verify Email
    # path("users/verify-email/", VerifyEmailView.as_view(), name="user-resend-verify-email"),

    # # Resend verify Phone
    # path("users/verify-phone/", VerifyPhoneView.as_view(), name="user-resend-verify-phone"),
]

