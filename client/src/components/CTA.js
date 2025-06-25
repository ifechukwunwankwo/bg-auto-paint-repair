// src/components/CallToAction.js
import { Link } from "react-router-dom";

export default function CallToAction({ headline = "You Have To Fix The Problem, Let Us Help You!" }) {
  console.log("CallToAction rendered");

  return (
    <section
      className="bg-bng-blue py-3 min-h-[200px] flex items-center"
      role="complementary"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center justify-center gap-3 px-3 sm:px-4 text-center">
        <article className="flex flex-col gap-2">
          <h2 id="cta-heading" className="text-bng-white text-xl md:text-2xl font-semibold">
            {headline}
          </h2>
          <p className="text-bng-light text-base md:text-lg">
            Schedule your appointment today and let our experts fix your vehicle!
          </p>
        </article>
        <div className="md:hidden" data-testid="cta-button">
          <Link
            to="/book-appointment"
            className="inline-block bg-bng-white text-bng-blue font-bold px-4 py-2 rounded border-2 border-bng-white hover:bg-bng-appointment-hover hover:text-bng-white hover:border-bng-white transition duration-300 focus-visible:ring-2 focus-visible:ring-bng-white focus-visible:rounded border-red-500"
            style={{ display: 'inline-block', backgroundColor: '#ffffff', color: '#1e3a8a', padding: '8px 16px' }}
            tabIndex={0}
          >
            Book An Appointment
          </Link>
        </div>
      </div>
    </section>
  );
}