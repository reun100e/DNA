import { ContactForm } from "@/components/Auth/ContactForm";
import React from "react";

const ContactPage = () => {
  return (
    <section className="relative py-20 px-6 sm:px-10 lg:px-20 bg-background text-foreground">
      <div className="max-w-screen-lg mx-auto">
        <h1 className="text-3xl font-extrabold mb-6">Contact Us</h1>
        <p className="mb-6">
          We would love to hear from you! Whether you have questions, feedback,
          or suggestions, feel free to reach out to us. Below are our contact
          details, and you can also use the form to get in touch with us
          directly.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Our Address</h2>
        <p className="mb-4">
          Doctors Nexus Amity (DNA) <br />
          Office Address <br />
          City, State, Zip Code <br />
          India
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Details</h2>
        <p className="mb-4">
          <strong>Email:</strong> contact@dna.org <br />
          <strong>Phone:</strong> +91 94000 76226 <br />
          <strong>Working Hours:</strong> Monday to Friday - 9:00 AM to 6:00 PM
        </p>

        <ContactForm />

        <div className="mt-8">
          <p>
            If you prefer to reach us via social media, you can connect with us
            on:
          </p>
          <ul className="mt-4 space-y-2">
            <li>
              <a
                href="https://facebook.com/dna"
                target="_blank"
                className="text-primary hover:underline"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/dna"
                target="_blank"
                className="text-primary hover:underline"
              >
                X (Twitter)
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/dna"
                target="_blank"
                className="text-primary hover:underline"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/company/yourpage"
                target="_blank"
                className="text-primary hover:underline"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
