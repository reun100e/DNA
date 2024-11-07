from django.urls import path
from .views import PaymentCreateView, PaymentListView, razorpay_webhook

urlpatterns = [
    path('make-payment/', PaymentCreateView.as_view(), name='payment-create'),
    path('my-payments/', PaymentListView.as_view(), name='payment-list'),
    path('webhook/', razorpay_webhook, name='razorpay-webhook'),
]
