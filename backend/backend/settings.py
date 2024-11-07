from pathlib import Path
from django.conf import settings

import environ
# Initialize environment variables
env = environ.Env()
environ.Env.read_env()  # Reads .env file


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-d%yqks07=#3-jhokv2eup^4zbthn3*h_p&(6538i)1g*_fs=*7"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "rest_framework.authtoken",
    "rest_framework_simplejwt.token_blacklist",
    "corsheaders",
    "accounts",
    "badges",
    "history",
    "payments",
    "programs",
    "registrations",
    "verification",
    "django_extensions",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "accounts.middleware.CookieToHeaderMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

AUTH_USER_MODEL = "accounts.User"

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": ("rest_framework_simplejwt.authentication.JWTAuthentication",),
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.LimitOffsetPagination",
    "PAGE_SIZE": 10,
    "DEFAULT_THROTTLE_CLASSES": ["rest_framework.throttling.UserRateThrottle",],
    "DEFAULT_THROTTLE_RATES": {"user": "160/minute",},
}

# SESSION_COOKIE_SAMESITE = 'None'  # Required for cross-site requests
# SESSION_COOKIE_SECURE = False      # Ensure cookies are only sent over HTTPS

# CSRF_COOKIE_SAMESITE = 'None'

# SESSION_COOKIE_SECURE = False # change in production
# CSRF_COOKIE_SECURE = False # change in production


CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]

CSRF_TRUSTED_ORIGINS = CORS_ALLOWED_ORIGINS

CORS_ALLOW_CREDENTIALS = True

from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(seconds=555),  # Short lifetime for access token
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),  # Longer lifetime for refresh token
    'ROTATE_REFRESH_TOKENS': True,  # Rotate refresh tokens on use
    'BLACKLIST_AFTER_ROTATION': True,  # Blacklist old refresh tokens
    'AUTH_COOKIE': 'access',  # Ensure this matches your cookie setup
    'AUTH_COOKIE_REFRESH': 'refresh',
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': settings.SECRET_KEY,

    # 'AUTH_COOKIE_SECURE': True,     # Secure flag for HTTPS
    'AUTH_COOKIE_HTTP_ONLY': True,  # HTTP-only flag
    'AUTH_COOKIE_SAMESITE': 'None',  # Important for cross-origin requests
    'AUTH_COOKIE_PATH': '/',        # Ensure it's available to the entire app
}


# SECURE_SSL_REDIRECT = True  # Force HTTPS in production
SECURE_COOKIES = True  # Set to True in production
# CSRF_COOKIE_SECURE = True

# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = "static/"

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# OTP settings
OTP_EXPIRATION_MINUTES = 10  # Expire OTPs after 10 minutes
OTP_RESEND_INTERVAL = 60  # Allow resending OTP after 60 seconds

# Email Configuration
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = env("EMAIL_HOST", default="localhost")
EMAIL_PORT = env.int("EMAIL_PORT", default=25)
EMAIL_USE_TLS = env.bool("EMAIL_USE_TLS", default=False)
EMAIL_HOST_USER = env("EMAIL_HOST_USER", default="")
EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD", default="")
DEFAULT_FROM_EMAIL = env("DEFAULT_FROM_EMAIL", default="webmaster@localhost")

# Twilio SMS configuration (for example)
TWILIO_ACCOUNT_SID = env("TWILIO_ACCOUNT_SID", default="")
TWILIO_AUTH_TOKEN = env("TWILIO_AUTH_TOKEN", default="")
TWILIO_PHONE_NUMBER = env("TWILIO_PHONE_NUMBER", default="")

# # Placeholder for any other SMS service configuration
# SMS_PROVIDER_API_KEY = os.getenv("SMS_PROVIDER_API_KEY")
# SMS_PROVIDER_API_SECRET = os.getenv("SMS_PROVIDER_API_SECRET")
# SMS_FROM_NUMBER = os.getenv("SMS_FROM_NUMBER", "+1234567890")  # Default sender number


RAZORPAY_KEY_ID = "your_key_id"
RAZORPAY_KEY_SECRET = "your_key_secret"


# # settings.py
# import redis

# REDIS_HOST = 'localhost'
# REDIS_PORT = 6379
# REDIS_DB = 0  # Use a dedicated database for blacklisting if desired

# redis_client = redis.StrictRedis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DB, decode_responses=True)
