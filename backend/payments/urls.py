from django.urls import path
from .views import PaymentCreateView, PaymentListView

urlpatterns = [
    path('make-payment/', PaymentCreateView.as_view(), name='payment-create'),
    path('my-payments/', PaymentListView.as_view(), name='payment-list'),
]
