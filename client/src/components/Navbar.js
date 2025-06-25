// bng-auto/client/src/components/Navbar.js
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../Assets/BnG_Logo.svg";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Handle scroll lock
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMobileMenuOpen]);

  // Base classes for links
  const baseLinkClass = `
    uppercase font-semibold relative
    transition-colors duration-200 ease-in-out
    md:after:content-[''] md:after:block md:after:h-[2px] md:after:bg-bng-red
    md:after:absolute md:after:bottom-[5px] md:after:left-0
    md:after:transition-all md:after:duration-500 md:after:ease-in-out
    focus-visible:ring-2 focus-visible:ring-bng-white focus-visible:rounded
  `;

  return (
    <header className="md:sticky top-0 z-50 bg-bng-blue text-bng-white p-4 min-h-[64px]">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
            <img src={logo} alt="B&G Company Logo" className="h-10 mr-2" />
          </Link>
        </div>

        {/* Hamburger Menu Icon (Visible on Mobile) */}
        <button
          className="md:hidden text-3xl p-2 hover:bg-bng-white/10 rounded focus-visible:ring-2 focus-visible:ring-bng-white focus-visible:rounded"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu Backdrop */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Navigation Links */}
        <nav
          className={`
            ${isMobileMenuOpen ? "flex" : "hidden"}
            md:flex flex-col md:flex-row md:items-center absolute md:static top-[64px] left-0 w-full md:w-auto
            bg-bng-blue md:bg-transparent p-4 md:p-0 space-y-4 md:space-y-0 md:space-x-4 lg:space-x-6
            z-50 transform transition-transform duration-300 ease-in-out
            ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
          `}
          role="navigation"
          aria-label="Main navigation"
          aria-hidden={!isMobileMenuOpen}
        >
          <Link
            to="/"
            className={`
              ${baseLinkClass}
              ${
                location.pathname === "/"
                  ? "text-bng-white md:after:w-full"
                  : "text-bng-light hover:text-bng-white md:after:w-0 md:hover:after:w-full"
              }
              ${isMobileMenuOpen ? "py-3 px-2 border-b border-bng-white/30 py-2" : "md:py-2 lg:py-3"}
            `}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/gallery"
            className={`
              ${baseLinkClass}
              ${
                location.pathname === "/gallery"
                  ? "text-bng-white md:after:w-full"
                  : "text-bng-light hover:text-bng-white md:after:w-0 md:hover:after:w-full"
              }
              ${isMobileMenuOpen ? "py-3 px-2 border-b border-bng-white/30 py-2" : "md:py-2 lg:py-3"}
            `}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Gallery
          </Link>
          <Link
            to="/services"
            className={`
              ${baseLinkClass}
              ${
                location.pathname === "/services"
                  ? "text-bng-white md:after:w-full"
                  : "text-bng-light hover:text-bng-white md:after:w-0 md:hover:after:w-full"
              }
              ${isMobileMenuOpen ? "py-3 px-2 border-b border-bng-white/30 py-2" : "md:py-2 lg:py-3"}
            `}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            to="/about"
            className={`
              ${baseLinkClass}
              ${
                location.pathname === "/about"
                  ? "text-bng-white md:after:w-full"
                  : "text-bng-light hover:text-bng-white md:after:w-0 md:hover:after:w-full"
              }
              ${isMobileMenuOpen ? "py-3 px-2 border-b border-bng-white/30 py-2" : "md:py-2 lg:py-3"}
            `}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className={`
              ${baseLinkClass}
              ${
                location.pathname === "/contact"
                  ? "text-bng-white md:after:w-full"
                  : "text-bng-light hover:text-bng-white md:after:w-0 md:hover:after:w-full"
              }
              ${isMobileMenuOpen ? "py-3 px-2 border-b border-bng-white/30 py-2" : "md:py-2 lg:py-3"}
            `}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/book-appointment"
            className={`
              inline-block bg-bng-white text-bng-blue font-bold px-4 py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 rounded border-2 border-bng-white
              hover:bg-bng-appointment-hover hover:text-bng-white hover:border-bng-white transition duration-300
              ${isMobileMenuOpen ? "py-3 px-2 border-b border-bng-white/30 py-2" : ""}
              focus-visible:ring-2 focus-visible:ring-bng-white focus-visible:rounded
            `}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Book An Appointment
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;