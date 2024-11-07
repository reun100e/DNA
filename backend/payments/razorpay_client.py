import razorpay
from django.conf import settings

client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
client.set_app_details({"title" : "<YOUR_APP_TITLE>", "version" : "<YOUR_APP_VERSION>"})