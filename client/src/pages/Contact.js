// bng-auto/client/src/pages/Contact.js
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaClock, FaPhone, FaArrowUp } from "react-icons/fa";
import { Cloudinary } from "@cloudinary/url-gen";
import toast, { Toaster } from "react-hot-toast";

// Initialize Cloudinary
const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || "your-cloud-name",
  },
});
const backgroundImageUrl = cld
  .image("contact_us_bg")
  .format("auto")
  .quality("auto")
  .toURL();

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const messageInputRef = useRef(null);

  // Scroll detection and input focus handling for Back to Top
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500 && !isInputFocused);
    };

    const handleFocus = () => setIsInputFocused(true);
    const handleBlur = () => setIsInputFocused(false);

    window.addEventListener("scroll", handleScroll);
    const inputs = [nameInputRef.current, emailInputRef.current, messageInputRef.current];
    inputs.forEach((input) => {
      if (input) {
        input.addEventListener("focus", handleFocus);
        input.addEventListener("blur", handleBlur);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      inputs.forEach((input) => {
        if (input) {
          input.removeEventListener("focus", handleFocus);
          input.removeEventListener("blur", handleBlur);
        }
      });
    };
  }, [isInputFocused]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = value
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "") // Remove script tags
      .replace(/[<>]/g, ""); // Remove < and > characters
    if (
      (name === "name" && sanitizedValue.length > 100) ||
      (name === "email" && sanitizedValue.length > 100) ||
      (name === "message" && sanitizedValue.length > 1000)
    ) {
      return;
    }
    setFormData({ ...formData, [name]: sanitizedValue });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.dismiss(); // Clear previous toasts
    if (!formData.name || !formData.message) {
      toast.error("Please fill in all required fields.", { duration: 2000 });
      return;
    }
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address.", { duration: 2000 });
      return;
    }

    setIsSubmitting(true);

    try {
      const whatsappNumber = process.env.REACT_APP_WHATSAPP_NUMBER || "+0000000000";
      if (!process.env.REACT_APP_WHATSAPP_NUMBER) {
        console.warn("REACT_APP_WHATSAPP_NUMBER is not set in .env. Using fallback.");
      }
      const message = `
Contact Form Submission:
Name: ${formData.name}
Email: ${formData.email}
Message: ${formData.message}
      `.trim();
      const encodedMessage = encodeURIComponent(message);
      const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      window.open(whatsappLink, "_blank");

      toast.success("Message sent via WhatsApp!", { duration: 2000 });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("WhatsApp Error:", error);
      toast.error("Failed to open WhatsApp. Please try again.", { duration: 2000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="bg-bng-light" role="main">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: { marginTop: "80px" },
          limit: 1,
        }}
      />
      {/* Header Section */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat relative overflow-hidden pt-12 pb-10 sm:pt-14 sm:pb-12 md:pt-16 md:pb-14 min-h-[150px] sm:min-h-[180px] md:min-h-[200px]"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/85"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
            Contact Us
          </h1>
          <nav
            aria-label="Breadcrumb"
            className="flex justify-center space-x-2 mt-4 text-white text-base md:text-lg lg:text-xl"
          >
            <Link to="/" className="text-white hover:underline" aria-label="Home">
              Home
            </Link>
            <span className="text-white">/</span>
            <span className="text-white">Contact</span>
          </nav>
        </div>
      </div>

      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          {/* Location Map Section */}
          <div className="mt-8 mb-12" aria-labelledby="location-heading">
            <h3
              id="location-heading"
              className="text-2xl md:text-3xl font-bold text-bng-text text-center uppercase mb-6 relative after:content-[''] after:block after:w-16 after:h-1 after:bg-bng-blue after:absolute after:-bottom-15 after:left-1/2 after:-translate-x-1/2"
            >
              Find Us
            </h3>
            <div className="max-w-4xl mx-auto">
              <p className="text-bng-text-gray text-center text-sm md:text-base mb-6 mt-12">
                Visit us at: 3, Kilometer, Umuoji Rd, Idemmili, Nkpor, Anambra State.
              </p>
              <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.93557436888477!2d6.843573173306803!3d6.134842090485061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1043916665501bad%3A0xd18eaacce7262bde!2sB%20%26%20g!5e0!3m2!1sen!2sng!4v1747334733342!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="B&G Auto Paint and Repair Services Location"
                ></iframe>
              </div>
            </div>
            <p className="sr-only">
              B&G Auto Paint is located at 3, Kilometer, Umuoji Rd, Idemmili, Nkpor, Anambra State.
            </p>
          </div>

          {/* Contact Details*/}
          <section className="max-w-5xl mx-auto mb-16 px-4" aria-labelledby="contact-info">
            <h2 id="contact-info" className="sr-only">Contact Information</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Address */}
              <div className="bg-white shadow-lg rounded-2xl p-6 flex items-start gap-4">
                <div className="bg-bng-blue text-white p-3 rounded-full">
                  <FaMapMarkerAlt className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-bng-text mb-1">Address</h3>
                  <p className="text-bng-text-gray text-sm">
                    3, Kilometer, Umuoji Rd,<br />
                    Idemmili, Nkpor,<br />
                    Anambra State
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white shadow-lg rounded-2xl p-6 flex items-start gap-4">
                <div className="bg-bng-blue text-white p-3 rounded-full">
                  <FaClock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-bng-text mb-1">Business Hours</h3>
                  <p className="text-bng-text-gray text-sm">
                    Weekdays: 8:00am – 6:30pm<br />
                    Sat–Sun: 10:00am – 5:00pm
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-white shadow-lg rounded-2xl p-6 flex items-start gap-4">
                <div className="bg-bng-blue text-white p-3 rounded-full">
                  <FaPhone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-bng-text mb-1">Contact</h3>
                  <p className="text-bng-text-gray text-sm">
                    Phone:{" "}
                    <a
                      href="tel:+2348034079987"
                      className="text-bng-blue hover:underline"
                      aria-label="Call +2348034079987"
                    >
                      +234 803 407 9987
                    </a><br />
                    Email:{" "}
                    <a
                      href="mailto:chuccoanike@yahoo.com"
                      className="text-bng-blue hover:underline"
                      aria-label="Email chuccoanike@yahoo.com"
                    >
                      chuccoanike@yahoo.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>


          {/* Contact Form */}
          <section aria-labelledby="form-heading">
            <h3
              id="form-heading"
              className="text-2xl md:text-3xl font-bold text-bng-text text-center uppercase mb-6 relative after:content-[''] after:block after:w-16 after:h-1 after:bg-bng-blue after:absolute after:-bottom-15 after:left-1/2 after:-translate-x-1/2"
            >
              Send Us a Message
            </h3>
            <form
              onSubmit={handleSubmit}
              className="max-w-lg mx-auto space-y-6"
              noValidate
            >
              <div>
                <label htmlFor="name" className="block text-bng-text mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  ref={nameInputRef}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Full Name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bng-blue focus:border-bng-blue"
                  required
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-bng-text mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  ref={emailInputRef}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bng-blue focus:border-bng-blue"
                  required
                  aria-required="true"
                  aria-describedby="email-error"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-bng-text mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  ref={messageInputRef}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Comments or Message"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bng-blue focus:border-bng-blue"
                  rows="5"
                  required
                  aria-required="true"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-bng-blue text-white px-6 py-3 rounded-lg font-semibold uppercase hover:bg-bng-dark transition-colors duration-300 flex items-center justify-center ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </section>
        </div>
      </section>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && scrollToTop()}
        className={`fixed bottom-5 right-5 z-50 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-bng-blue text-white rounded-full shadow-lg hover:bg-bng-dark transition-all duration-300 transform ${
          showBackToTop ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
        }`}
        aria-label="Scroll back to top"
        tabIndex={showBackToTop ? 0 : -1}
      >
        <FaArrowUp className="text-lg md:text-xl" />
      </button>
    </main>
  );
}

export default Contact;