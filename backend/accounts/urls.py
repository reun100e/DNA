from django.urls import path
from .views import RegisterView, LoginView, RefreshTokenView, UserProfileView, LogoutView

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
]

