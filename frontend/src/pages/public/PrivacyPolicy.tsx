const PrivacyPolicy = () => {
  return (
    <section className="relative text-foreground py-20 px-6 sm:px-10 lg:px-20">
      <div className="max-w-screen-lg mx-auto">
        <h1 className="text-3xl font-extrabold mb-6">Privacy Policy</h1>
        <p className="mb-6">Last updated: 11 Nov 2024</p>

        <p className="mb-4">
          Doctors Nexus Amity (DNA) values your privacy and is committed to
          protecting your personal information. This Privacy Policy explains how
          we collect, use, disclose, and safeguard your information when you
          visit our website or engage with us. Please read this policy carefully
          to understand our views and practices regarding your data.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          1. Information We Collect
        </h2>
        <p className="mb-4">
          We may collect and process the following information:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Personal Identification Information:</strong> Name, email
            address, phone number, professional details, and other contact
            details when you register for events like DIIMUN or contact us
            through our website.
          </li>
          <li>
            <strong>Payment Information:</strong> If you register for paid
            events, we may collect payment details such as billing address and
            transaction data. We do not store payment card information, as
            payments are securely processed by our third-party payment partners.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          2. How We Use Your Information
        </h2>
        <p className="mb-4">
          We use the collected data for the following purposes:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Event Management:</strong> To facilitate registration,
            communication, and participation in DNA events such as DIIMUN.
          </li>
          <li>
            <strong>Networking:</strong> To allow professionals to connect and
            collaborate through our platform.
          </li>
          <li>
            <strong>Payment Processing:</strong> To securely process payments
            for event registrations and other services offered through our
            website.
          </li>
          <li>
            <strong>Communication:</strong> To send updates, newsletters, and
            promotional content related to DNA activities and events.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          3. How We Protect Your Information
        </h2>
        <p className="mb-4">
          We implement various security measures to protect your personal
          information. These include encryption, secure servers, and access
          controls to ensure that your data is stored safely and transmitted
          securely. We also adhere to industry-standard practices for data
          security to prevent unauthorized access to your information.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          4. Sharing Your Information
        </h2>
        <p className="mb-4">
          We do not sell, trade, or rent your personal information to third
          parties. However, we may share your information in the following
          cases:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Service Providers:</strong> We may share your data with
            trusted third-party vendors who help us manage our website, verify
            phone numbers via sms, process payments, and provide other services
            necessary for the operation of DNA.
          </li>
          <li>
            <strong>Legal Requirements:</strong> If required by law or in
            response to legal requests, we may disclose your information to
            comply with regulations or to protect our rights and the rights of
            others.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">5. Your Rights</h2>
        <p className="mb-4">You have the right to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Request access to the personal information we hold about you.</li>
          <li>
            Request corrections to any inaccurate or incomplete personal data.
          </li>
          <li>
            Request the deletion of your personal information (subject to legal
            obligations).
          </li>
          <li>Opt-out of receiving promotional communications from us.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          6. Cookies and Tracking Technologies
        </h2>
        <p className="mb-4">
          Our website does not use cookies or similar technologies for tracking.
          Http-only cookies which is mandatory for JWT authentication is used
          when browsing as a logged in user. No data is collected to enhance
          your browsing experience, or analyze site traffic, or to improve our
          services.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          7. Changes to This Privacy Policy
        </h2>
        <p className="mb-4">
          We reserve the right to update or modify this Privacy Policy at any
          time. Any changes will be posted on this page, with an updated "Last
          Updated" date. We encourage you to review this policy periodically to
          stay informed about how we are protecting your information.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">8. Contact Us</h2>
        <p className="mb-4">
          If you have any questions or concerns about this Privacy Policy or our
          data practices, please contact us at:
        </p>
        <p className="mb-4">
          <strong>Email:</strong> admin@dna.org <br />
        </p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
