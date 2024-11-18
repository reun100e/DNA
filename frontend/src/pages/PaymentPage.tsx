import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getDnaTransactionId } from "@/services/payService";

const PaymentPage = () => {
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const amount = 650;
  const vpa = "aghoshbprasad100@oksbi";

  const handleClick = async () => {
    try {
      const response = await getDnaTransactionId();
      const transactionId = response.dna_transaction_id;

      // Generate the UPI payment URL
      const upiUrl = `upi://pay?pa=${vpa}&pn=DoctorsNexusAmity&tr=${transactionId}&am=${amount}&cu=INR`;

      // Save the URL to the state
      setPaymentUrl(upiUrl);

      // Optionally, redirect user to the UPI app
      window.location.href = upiUrl; // This will open the UPI app directly
    } catch (error) {
      console.error("Error generating payment URL:", error);
      alert("Failed to generate payment link. Please try again.");
    }
  };

  return (
    <section className="relative text-foreground py-20 px-6 sm:px-10 lg:px-20">
      <div className="max-w-screen-lg mx-auto space-y-6">
        <h2 className="text-2xl font-semibold">Pay to confirm Registration</h2>
        <h3 className="text-lg font-medium">Steps for Payment</h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>Click 'Pay Now' button</li>
          <li>Complete the payment using your UPI app.</li>
          <li>
            DNA staff manually verifies the transaction
            <i> (takes uto 2 business days)</i> and you will get a confirmation
            email.
          </li>
        </ol>
        <Button className="p-5 text-md" onClick={handleClick}>
          Pay ₹{amount}
        </Button>

        {paymentUrl && (
          <div className="mt-4 space-y-2">
            <p>Or use the link below to pay:</p>
          <a
            href={paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {paymentUrl}
          </a>
            <p>Alternatively, scan this QR code:</p>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
                paymentUrl
              )}&size=150x150`}
              alt="UPI QR Code"
              className="w-32 h-32 mx-auto"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default PaymentPage;
