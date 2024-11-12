from django.urls import path
from .views import RegisterView, LoginView, RefreshTokenView, UserDetailView, LogoutView, WhoAmIView, private_media

urlpatterns = [
    # User registration
    path("users/register/", RegisterView.as_view(), name="user-register"),

    # User login with access and refresh token in Http-only cookies
    path("users/login/", LoginView.as_view(), name="user-login"),

    # Get new access token in Http-only cookies
    path("users/refresh/", RefreshTokenView.as_view(), name="user-token-refresh"),

    # Get active User info
    path("users/me/", WhoAmIView.as_view(), name="user-profile"),

    # Get and Patch User Profile
    path("users/profile/", UserDetailView.as_view(), name="user-profile"),

    # Logout
    path("users/logout/", LogoutView.as_view(), name="user-logout"),
]

