from django.urls import path
from .views import InitiatePaymentView, SubmitUpiTransactionView, VerifyPaymentView

urlpatterns = [
    path('pay/', InitiatePaymentView.as_view(), name='pay-for-event'),
    # path('confirm/', SubmitUpiTransactionView.as_view(), name='confirm-pay'),
    # path('admin/', VerifyPaymentView.as_view(), name='confirm-pay'),
]
