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
          [Your Office Address] <br />
          [City, State, Zip Code] <br />
          [Country]
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Details</h2>
        <p className="mb-4">
          <strong>Email:</strong> [Your email address] <br />
          <strong>Phone:</strong> [Your phone number] <br />
          <strong>Working Hours:</strong> Monday to Friday - 9:00 AM to 6:00 PM
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Get In Touch</h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-muted-foreground"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:ring-2 focus:ring-primary"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-muted-foreground"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:ring-2 focus:ring-primary"
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-muted-foreground"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:ring-2 focus:ring-primary"
              placeholder="Write your message here"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary-dark focus:ring-2 focus:ring-primary"
          >
            Send Message
          </button>
        </form>

        <div className="mt-8">
          <p>
            If you prefer to reach us via social media, you can connect with us
            on:
          </p>
          <ul className="mt-4 space-y-2">
            <li>
              <a
                href="https://facebook.com/yourpage"
                target="_blank"
                className="text-primary hover:underline"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/yourpage"
                target="_blank"
                className="text-primary hover:underline"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/yourpage"
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
