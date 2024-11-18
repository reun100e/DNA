from django.urls import path
from .views import InitiatePaymentView, SubmitUpiTransactionView

urlpatterns = [
    path('pay/', InitiatePaymentView.as_view(), name='register-for-event'),
]
