import { useNavigate } from "react-router-dom";

const TermsAndConditions = () => {
  const navigate = useNavigate();
  return (
    <section className="relative text-foreground py-20 px-6 sm:px-10 lg:px-20">
      <div className="max-w-screen-lg mx-auto">
        {" "}
        <h1 className="text-3xl font-extrabold mb-6">Terms and Conditions</h1>
        <p className="mb-6">Last updated: 11 Nov 2024</p>
        <p className="mb-4">
          Welcome to Doctors Nexus Amity (DNA). By using our website, services,
          and participating in our events, you agree to comply with and be bound
          by the following Terms and Conditions. Please read these terms
          carefully before accessing or using our website and services.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">
          1. Acceptance of Terms
        </h2>
        <p className="mb-4">
          By accessing or using this website, you agree to comply with and be
          bound by these Terms and Conditions. If you do not agree to these
          terms, please do not use the website or participate in any of our
          events.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">
          2. Use of Website and Services
        </h2>
        <p className="mb-4">
          You are granted a non-exclusive, non-transferable, revocable license
          to access and use our website and services in accordance with these
          Terms and Conditions. You agree to use our services for lawful
          purposes only and not to engage in any activities that violate any
          applicable laws or regulations.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">
          3. Registration and Account
        </h2>
        <p className="mb-4">
          To register for our events or access certain features of our website,
          you may be required to create an account. You agree to provide
          accurate and complete information when registering and to update your
          information if it changes. You are responsible for maintaining the
          confidentiality of your account and password, and you agree to notify
          us immediately if you suspect any unauthorized use of your account.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">
          4. Event Registration and Fees
        </h2>
        <p className="mb-4">
          By registering for an event through our website, you agree to pay any
          applicable fees associated with your participation. All fees are
          non-refundable unless otherwise specified. Payment for events is
          processed securely through third-party payment processors.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">
          5. Intellectual Property
        </h2>
        <p className="mb-4">
          All content, features, and functionality on this website, including
          but not limited to text, images, logos, and event materials, are owned
          by Doctors Nexus Amity (DNA) or licensed to us. You may not copy,
          modify, distribute, or use any of our intellectual property without
          prior written consent.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">
          6. Privacy and Data Protection
        </h2>
        <p className="mb-4">
          We value your privacy and are committed to protecting your personal
          information. Please refer to our{" "}
          <span
            className="cursor-pointer underline"
            onClick={() => navigate("/privacy")}
          >
            Privacy Policy
          </span>{" "}
          for details on how we collect, use, and protect your data.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">
          7. Limitation of Liability
        </h2>
        <p className="mb-4">
          In no event shall Doctors Nexus Amity (DNA), its directors, employees,
          or affiliates be liable for any indirect, incidental, special, or
          consequential damages arising out of or in connection with the use of
          our website or participation in our events, including but not limited
          to loss of profits, data, or goodwill.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">8. Termination</h2>
        <p className="mb-4">
          We reserve the right to terminate or suspend your access to our
          website or services at our sole discretion if you violate any of these
          Terms and Conditions. Upon termination, you must cease all use of the
          website and its services.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">9. Governing Law</h2>
        <p className="mb-4">
          These Terms and Conditions are governed by and construed in accordance
          with the laws of [Your Country or State], without regard to its
          conflict of law principles. Any disputes arising under or in
          connection with these terms will be subject to the exclusive
          jurisdiction of the courts in [Location].
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">
          10. Changes to Terms
        </h2>
        <p className="mb-4">
          We reserve the right to update or modify these Terms and Conditions at
          any time. Any changes will be posted on this page with an updated
          "Last Updated" date. We encourage you to review these terms
          periodically to stay informed about any changes.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">11. Contact Us</h2>
        <p className="mb-4">
          If you have any questions or concerns about these Terms and
          Conditions, please contact us at:
        </p>
        <p className="mb-4">
          <strong>Email:</strong> admin@dna.org <br />
        </p>
      </div>
    </section>
  );
};

export default TermsAndConditions;
