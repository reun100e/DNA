from django.utils.deprecation import MiddlewareMixin


class CookieToHeaderMiddleware(MiddlewareMixin):
    """
    For every incoming requests, access token in cookies is attached
    as a Bearer token in Authorization Header and passed inside for
    the default normal DRF and jwt behaviors.
    """
    def process_request(self, request):
        access_token = request.COOKIES.get("access")
        if access_token:
            request.META["HTTP_AUTHORIZATION"] = f"Bearer {access_token}"
        else:
            request.META["HTTP_AUTHORIZATION"] = ""
