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
