// bng-auto/client/src/components/Footer.js
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../Assets/BnG_Logo.svg";
import { services } from "../constants/services";
import { generateServiceId } from "../utils/generateId";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-bng-footer-dark text-bng-white p-4 md:p-6 min-h-[200px]"
      role="contentinfo"
      aria-label="Footer"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-3">
        {/* Column 1: Logo and Social Media */}
        <div>
          <img
            src={logo}
            alt="B&G Logo"
            className="h-16 md:h-20 mb-2"
            width="160"
            height="80"
            loading="lazy"
          />
          <p className="text-sm md:text-base mb-4">Paint. Precision. Perfection.</p>
          <p className="text-sm md:text-base mb-2">FOLLOW US ON:</p>
          <div className="flex space-x-3">
            <a
              href="https://www.facebook.com/BandGovenbakepainting"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-bng-blue bg-bng-white rounded-sm p-2.5 hover:bg-bng-appointment-hover hover:text-bng-white transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-bng-white focus-visible:rounded"
              aria-label="Visit our Facebook page"
            >
              <span aria-hidden="true">
                <FaFacebook />
              </span>
            </a>
            <a
              href="https://www.instagram.com/b_gautopaint"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-bng-blue bg-bng-white rounded-sm p-2.5 hover:bg-bng-appointment-hover hover:text-bng-white transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-bng-white focus-visible:rounded"
              aria-label="Visit our Instagram page"
            >
              <span aria-hidden="true">
                <FaInstagram />
              </span>
            </a>
            <a
              href="https://www.twitter.com/bngautopaint"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-bng-blue bg-bng-white rounded-sm p-2.5 hover:bg-bng-appointment-hover hover:text-bng-white transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-bng-white focus-visible:rounded"
              aria-label="Visit our Twitter page"
            >
              <span aria-hidden="true">
                <FaTwitter />
              </span>
            </a>
          </div>
        </div>

        {/* Column 2: Best Services */}
        <div>
          <h3
            className="text-lg font-bold mb-2 relative after:content-[''] after:block after:w-16 after:h-1 after:bg-bng-blue after:absolute after:-bottom-2 after:left-0"
            id="services-heading"
          >
            Best Services
          </h3>
          <ul className="space-y-1 mt-4" aria-labelledby="services-heading">
            {services.map((service) => (
              <li key={service.title}>
                <Link
                  to={`/services?service=${generateServiceId(service.title)}`}
                  className="text-sm md:text-base md:hover:text-bng-blue transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-bng-white focus-visible:rounded inline-block"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact Us */}
        <div>
          <h3
            className="text-lg font-bold mb-2 relative after:content-[''] after:block after:w-16 after:h-1 after:bg-bng-blue after:absolute after:-bottom-2 after:left-0"
            id="contact-heading"
          >
            Contact Us
          </h3>
          <ul className="space-y-1 mt-4" aria-labelledby="contact-heading">
            <li className="flex items-center space-x-3 text-sm md:text-base">
              <span aria-hidden="true">
                <FaMapMarkerAlt className="w-4 h-4 md:w-5 md:h-5 text-bng-blue inline-block align-middle" />
              </span>
              <a
                href="https://maps.google.com/?cid=10950666242300572531"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm md:text-base md:hover:text-bng-blue transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-bng-white focus-visible:rounded"
                aria-label="View B&G Auto Paint location on Google Maps"
              >
                3, Kilometer, Umuoji Rd, Idemmli, Nkpor
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <span aria-hidden="true">
                <FaPhone className="w-4 h-4 md:w-5 md:h-5 text-bng-blue inline-block align-middle" />
              </span>
              <a
                href="tel:+2348034079878"
                className="text-sm md:text-base md:hover:text-bng-blue transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-bng-white focus-visible:rounded"
              >
                +234 803 407 9878
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <span aria-hidden="true">
                <FaEnvelope className="w-4 h-4 md:w-5 md:h-5 text-bng-blue inline-block align-middle" />
              </span>
              <a
                href="mailto:chuccoanike@yahoo.com"
                className="text-sm md:text-base md:hover:text-bng-blue transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-bng-white focus-visible:rounded"
              >
                chuccoanike@yahoo.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="text-center text-sm md:text-base mt-6 border-t border-bng-white/20 pt-4">
        © B&G All Rights Reserved {currentYear}
      </div>
    </footer>
  );
}

export default Footer;