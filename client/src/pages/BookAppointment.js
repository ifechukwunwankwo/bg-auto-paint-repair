import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import DOMPurify from "dompurify";
import toast, { Toaster } from "react-hot-toast";

function BookAppointment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    preferredDate: "",
    preferredTime: "",
    serviceType: "",
    pickUpOrDropOff: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500 && !isFormActive);
    };

    const handleFocus = () => setIsFormActive(true);
    const handleBlur = () => setIsFormActive(false);

    window.addEventListener("scroll", handleScroll);
    const inputs = formRef.current?.querySelectorAll("input, select, textarea") || [];
    inputs.forEach((input) => {
      input.addEventListener("focus", handleFocus);
      input.addEventListener("blur", handleBlur);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      inputs.forEach((input) => {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
      });
    };
  }, [isFormActive]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validateField = (name, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+[1-9]\d{9,14}$/;
    const today = new Date().toISOString().split("T")[0];

    switch (name) {
      case "fullName":
        return value.trim().length >= 2 ? "" : "Name must be at least 2 non-whitespace characters.";
      case "email":
        return emailRegex.test(value) ? "" : "Invalid email address.";
      case "phoneNumber":
        return phoneRegex.test(value)
          ? ""
          : "Phone must include country code (e.g., +2341234567890).";
      case "preferredDate":
        return value >= today ? "" : "Date must be today or in the future.";
      case "preferredTime":
        // Convert 12-hour format to 24-hour for validation
        let hours = value.includes("PM") ? parseInt(value.split(":")[0]) + 12 : parseInt(value.split(":")[0]);
        if (value.includes("AM") && hours === 12) hours = 0;
        if (value.includes("PM") && hours === 12) hours = 12;
        return hours >= 8 && hours <= 17 ? "" : "Time must be between 8:00 AM and 5:00 PM.";
      case "serviceType":
      case "pickUpOrDropOff":
        return value ? "" : "This field is required.";
      case "message":
        return value.length <= 500 ? "" : "Message must be 500 characters or less.";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = DOMPurify.sanitize(
      name === "phoneNumber" || name === "email" ? value.trim() : value
    );
    setFormData({ ...formData, [name]: sanitizedValue });
    setErrors({ ...errors, [name]: validateField(name, sanitizedValue) });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.dismiss();
      toast.error("Please fix the form errors.", { duration: 2000 });
      return;
    }

    setIsSubmitting(true);

    try {
      const whatsappNumber = process.env.REACT_APP_WHATSAPP_NUMBER || "+0000000000";
      if (!process.env.REACT_APP_WHATSAPP_NUMBER) {
        console.warn("REACT_APP_WHATSAPP_NUMBER is not set in .env. Using fallback.");
      }
      const message = `
New Appointment Booking:
Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phoneNumber}
Date: ${formData.preferredDate}
Time: ${formData.preferredTime}
Service: ${formData.serviceType}
Pick Up/Drop Off: ${formData.pickUpOrDropOff}
Message: ${formData.message || "None"}
      `.trim();
      const encodedMessage = encodeURIComponent(message);
      const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      window.open(whatsappLink, "_blank");

      toast.dismiss();
      toast.success("WhatsApp message sent.", { duration: 2000 });
      setTimeout(() => {
        navigate("/appointment-confirmation", { state: formData });
      }, 1500);
    } catch (error) {
      console.error("WhatsApp Error:", error);
      toast.dismiss();
      toast.error("Failed to open WhatsApp. Please try again.", { duration: 2000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      phoneNumber: "",
      email: "",
      preferredDate: "",
      preferredTime: "",
      serviceType: "",
      pickUpOrDropOff: "",
      message: "",
    });
    setErrors({});
    toast.dismiss();
    toast("Form reset.", { duration: 2000 });
  };

  return (
    <main className="bg-bng-light min-h-screen flex flex-col" role="main">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            marginTop: "80px",
            padding: "12px 16px",
            fontSize: "14px",
            maxWidth: "90%",
            borderRadius: "8px",
          },
          limit: 1,
        }}
      />
      <section
        className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 flex-1"
        aria-labelledby="appointment-heading"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2
              id="appointment-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-bng-blue uppercase mb-4 tracking-tight"
            >
              Schedule Your Car Service
            </h2>
            <p className="text-bng-text-gray text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Book your appointment with B&G Auto Paint and Repair for fast, reliable service.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg sm:max-w-xl md:max-w-2xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg space-y-6"
            noValidate
            ref={formRef}
          >
            <div className="space-y-3 sm:space-y-2">
              <label
                htmlFor="fullName"
                className="block text-sm sm:text-base font-medium text-bng-text"
              >
                Full Name <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full p-3 sm:p-4 border text-sm sm:text-base ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-bng-blue focus:border-bng-blue transition-colors`}
                required
                aria-required="true"
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
              />
              {errors.fullName && (
                <p id="fullName-error" className="text-red-500 text-xs sm:text-sm mt-1" role="alert">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div className="space-y-3 sm:space-y-2">
              <label
                htmlFor="phoneNumber"
                className="block text-sm sm:text-base font-medium text-bng-text"
              >
                Phone Number <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+2341234567890"
                className={`w-full p-3 sm:p-4 border text-sm sm:text-base ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-bng-blue focus:border-bng-blue transition-colors`}
                required
                aria-required="true"
                aria-describedby={errors.phoneNumber ? "phoneNumber-error" : undefined}
              />
              {errors.phoneNumber && (
                <p id="phoneNumber-error" className="text-red-500 text-xs sm:text-sm mt-1" role="alert">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            <div className="space-y-3 sm:space-y-2">
              <label
                htmlFor="email"
                className="block text-sm sm:text-base font-medium text-bng-text"
              >
                Email <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 sm:p-4 border text-sm sm:text-base ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-bng-blue focus:border-bng-blue transition-colors`}
                required
                aria-required="true"
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-red-500 text-xs sm:text-sm mt-1" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-3 sm:space-y-2">
                <label
                  htmlFor="preferredDate"
                  className="block text-sm sm:text-base font-medium text-bng-text"
                >
                  Preferred Date <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className={`w-full p-3 sm:p-4 border text-sm sm:text-base ${
                    errors.preferredDate ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-bng-blue focus:border-bng-blue transition-colors`}
                  required
                  aria-required="true"
                  aria-describedby={errors.preferredDate ? "preferredDate-error" : undefined}
                />
                {errors.preferredDate && (
                  <p id="preferredDate-error" className="text-red-500 text-xs sm:text-sm mt-1" role="alert">
                    {errors.preferredDate}
                  </p>
                )}
              </div>
              <div className="space-y-3 sm:space-y-2">
                <label
                  htmlFor="preferredTime"
                  className="block text-sm sm:text-base font-medium text-bng-text"
                >
                  Preferred Time <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className={`w-full p-3 sm:p-4 border text-sm sm:text-base ${
                    errors.preferredTime ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-bng-blue focus:border-bng-blue transition-colors`}
                  required
                  aria-required="true"
                  aria-describedby={errors.preferredTime ? "preferredTime-error" : undefined}
                >
                  <option value="" disabled>
                    Select a Time
                  </option>
                  {[
                    "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
                    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
                  ].map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                {errors.preferredTime && (
                  <p id="preferredTime-error" className="text-red-500 text-xs sm:text-sm mt-1" role="alert">
                    {errors.preferredTime}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-3 sm:space-y-2">
                <label
                  htmlFor="serviceType"
                  className="block text-sm sm:text-base font-medium text-bng-text"
                >
                  Service Type <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className={`w-full p-3 sm:p-4 border text-sm sm:text-base ${
                    errors.serviceType ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-bng-blue focus:border-bng-blue transition-colors`}
                  required
                  aria-required="true"
                  aria-describedby={errors.serviceType ? "serviceType-error" : undefined}
                >
                  <option value="" disabled>
                    Select a Service
                  </option>
                  <option value="Engine Repair">Engine Repair</option>
                  <option value="Painting Services">Painting Services</option>
                  <option value="Oil Change">Oil Change</option>
                  <option value="Car Wash">Car Wash</option>
                  <option value="Repair Parts">Repair Parts</option>
                  <option value="Modification">Modification</option>
                </select>
                {errors.serviceType && (
                  <p id="serviceType-error" className="text-red-500 text-xs sm:text-sm mt-1" role="alert">
                    {errors.serviceType}
                  </p>
                )}
              </div>
              <div className="space-y-3 sm:space-y-2">
                <label
                  htmlFor="pickUpOrDropOff"
                  className="block text-sm sm:text-base font-medium text-bng-text"
                >
                  Pick Up or Drop Off <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <select
                  id="pickUpOrDropOff"
                  name="pickUpOrDropOff"
                  value={formData.pickUpOrDropOff}
                  onChange={handleChange}
                  className={`w-full p-3 sm:p-4 border text-sm sm:text-base ${
                    errors.pickUpOrDropOff ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-bng-blue focus:border-bng-blue transition-colors`}
                  required
                  aria-required="true"
                  aria-describedby={errors.pickUpOrDropOff ? "pickUpOrDropOff-error" : undefined}
                >
                  <option value="" disabled>
                    Select an Option
                  </option>
                  <option value="Pick Up">Pick Up</option>
                  <option value="Drop Off">Drop Off</option>
                </select>
                {errors.pickUpOrDropOff && (
                  <p id="pickUpOrDropOff-error" className="text-red-500 text-xs sm:text-sm mt-1" role="alert">
                    {errors.pickUpOrDropOff}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3 sm:space-y-2">
              <label
                htmlFor="message"
                className="block text-sm sm:text-base font-medium text-bng-text"
              >
                Message or Comment
                <span className="text-gray-500 text-xs sm:text-sm ml-2">
                  ({formData.message.length}/500)
                </span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`w-full p-3 sm:p-4 border text-sm sm:text-base ${
                  errors.message ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-bng-blue focus:border-bng-blue transition-colors resize-y`}
                rows="4 sm:rows-5"
                maxLength="500"
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <p id="message-error" className="text-red-500 text-xs sm:text-sm mt-1" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 bg-bng-blue text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base hover:bg-bng-dark transition-colors duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
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
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Book Appointment"
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 bg-gray-200 text-bng-text px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base hover:bg-gray-300 transition-colors duration-300"
              >
                Reset Form
              </button>
            </div>
          </form>
        </div>
      </section>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-4 sm:bottom-5 right-4 sm:right-5 z-50 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-bng-blue text-white rounded-full shadow-lg hover:bg-bng-dark transition-all duration-300 transform ${
          showBackToTop ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
        }`}
        aria-label="Scroll back to top"
        tabIndex={showBackToTop ? 0 : -1}
      >
        <FaArrowUp className="text-base sm:text-xl" />
      </button>
    </main>
  );
}

export default BookAppointment;