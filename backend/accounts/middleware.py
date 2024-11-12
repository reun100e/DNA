from django.utils.deprecation import MiddlewareMixin
from rest_framework.response import Response

# from backend.settings import redis_client  # Import the Redis client


class CookieToHeaderMiddleware(MiddlewareMixin):
    """
    For every incoming requests, access token in cookies is attached
    as a Bearer token in Authorization Header and passed inside for
    the default normal DRF and jwt behaviors.
    """

    def process_request(self, request):
        # List of paths that should not include the Authorization header
        unauthenticated_paths = [
            "/api/v1/accounts/users/register/",
            "/api/v1/accounts/users/login/",
        ]

        # Only add Authorization header if not on an unauthenticated path
        if request.path not in unauthenticated_paths:
            access_token = request.COOKIES.get("access")
            if access_token:
                # # Check if access token is blacklisted
                # token_id = access_token.split('.')[2]
                # if redis_client.get(f"blacklisted_{token_id}"):
                #     return Response({"detail": "Access token is blacklisted"}, status=401)

                # # Set Authorization header for further processing
                request.META["HTTP_AUTHORIZATION"] = f"Bearer {access_token}"
            else:
                request.META["HTTP_AUTHORIZATION"] = ""


# from django.shortcuts import get_object_or_404, redirect
# from programs.models import Event
# from registrations.models import Registration


# class AutoRegisterEventMiddleware(MiddlewareMixin):
#     def process_request(self, request):
#         # Check if user is authenticated and event_id is in session
#         if request.user.is_authenticated and "event_id" in request.session:
#             event_id = request.session.pop("event_id", None)  # Remove it after fetching
#             if event_id:
#                 event = get_object_or_404(Event, id=event_id)
#                 # Create the registration if it doesn't already exist
#                 Registration.objects.get_or_create(user=request.user, event=event)

#                 # Redirect to event detail or confirmation page
#                 return redirect(
#                     "event-detail", event_id=event.id
#                 )  # Adjust 'event-detail' to your URL pattern name
