import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
    <div className="flex w-full items-center justify-center px-4 pt-24">
      <Card className="mx-auto max-w-md w-screen">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Pay and Confirm your spot!
          </CardTitle>
          <CardDescription className="text-center">
            Make sure the email and phone you provided are correct since it will
            be used for future communications.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col ">
          <h3 className="text-lg font-medium">Steps for Payment</h3>
          <ol className="pt-4 list-decimal list-inside space-y-6">
            <li>Click 'Pay Now' button</li>
            <li>Complete the payment using your UPI app.</li>
            <li>
              DNA staff manually verifies the transaction
              <i> (takes uto 2 business days)</i> and you will get a
              confirmation email.
            </li>
          </ol>
          <Button
            className="p-5 mt-6 text-md w-2/4 self-center"
            onClick={handleClick}
          >
            Pay ₹{amount}
          </Button>

          {paymentUrl && (
            <div className="mt-4 space-y-2">
              <p>Or use the link below to pay:</p>
              <a
                href={paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline break-all"
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
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentPage;
