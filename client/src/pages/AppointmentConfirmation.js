// bng-auto/client/src/pages/AppointmentConfirmation.js
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function AppointmentConfirmation() {
  const { state } = useLocation();
  const {
    fullName = "Guest",
    email = "Not provided",
    phoneNumber = "Not provided",
    preferredDate = "Not set",
    preferredTime = "Not set",
    serviceType = "Not selected",
    pickUpOrDropOff = "Not selected",
    message = "None",
  } = state || {};

  return (
    <main className="bg-bng-light" role="main">
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="confirmation-heading">
        <div className="max-w-lg mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-4xl text-green-500">✔</span>
            </div>
          </div>
          <h2
            id="confirmation-heading"
            className="text-3xl md:text-4xl font-bold text-bng-blue mb-4"
          >
            Appointment Confirmed
          </h2>
          <p className="text-bng-text-gray text-base md:text-lg mb-6">
            We’ll see you on {preferredDate} at {preferredTime}!
          </p>
          <div className="p-4 bg-white border border-gray-200 rounded-lg mb-6">
            <h3 className="text-lg font-bold text-bng-blue mb-2">Appointment Details</h3>
            <dl className="text-bng-text text-left space-y-2">
              <div>
                <dt className="font-medium inline">Name:</dt>{" "}
                <dd className="inline">{fullName}</dd>
              </div>
              <div>
                <dt className="font-medium inline">Email:</dt>{" "}
                <dd className="inline">{email}</dd>
              </div>
              <div>
                <dt className="font-medium inline">Phone:</dt>{" "}
                <dd className="inline">{phoneNumber}</dd>
              </div>
              <div>
                <dt className="font-medium inline">Service:</dt>{" "}
                <dd className="inline">{serviceType}</dd>
              </div>
              <div>
                <dt className="font-medium inline">Pick Up/Drop Off:</dt>{" "}
                <dd class Aalass="inline">{pickUpOrDropOff}</dd>
              </div>
              <div>
                <dt className="font-medium inline">Message:</dt>{" "}
                <dd className="inline">{message}</dd>
              </div>
            </dl>
          </div>
          <div className="p-4 bg-white border border-gray-200 rounded-lg mb-6">
            <h3 className="text-lg font-bold text-bng-blue mb-2">What’s Next?</h3>
            <p className="text-bng-text text-left">
              1. Check WhatsApp for your appointment details (sent to {phoneNumber}).<br />
              2. Prepare your car for service (e.g., remove personal items).<br />
              3. {pickUpOrDropOff === "Pick Up" ? "We’ll pick up your car" : "Drop off your car"} on {preferredDate} at {preferredTime}.
            </p>
          </div>
          <Link
            to="/book-appointment"
            className="bg-bng-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-bng-dark transition-colors duration-300"
          >
            Book Another Appointment
          </Link>
        </div>
      </section>
    </main>
  );
}

export default AppointmentConfirmation;