// src/components/WhatsAppButton.js
import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const WhatsAppButton = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // Admin WhatsApp number from .env with dummy fallback
  const whatsappNumber = process.env.REACT_APP_WHATSAPP_NUMBER || "+0000000000";
  if (!process.env.REACT_APP_WHATSAPP_NUMBER) {
    console.warn("REACT_APP_WHATSAPP_NUMBER is not set in .env. Using fallback number.");
  }
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hi%20B%26G%2C%20I%27m%20interested%20in%20your%20auto%20paint%20and%20repair%20services%21`;

  // Show button when scrolling past 500px
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide button on /book-appointment
  if (location.pathname === "/book-appointment") {
    return null;
  }

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-4 left-4 md:bottom-5 md:left-5 z-50 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-whatsapp-green text-white rounded-full shadow-lg hover:bg-whatsapp-dark transition-all duration-300 transform group ${
        isVisible
          ? "opacity-100 scale-100 animate-pulse"
          : "opacity-0 scale-75 pointer-events-none"
      }`}
      aria-label="Contact us on WhatsApp"
      tabIndex={isVisible ? 0 : -1}
    >
      <FaWhatsapp className="text-xl md:text-2xl" />
      {/* Tooltip for desktop */}
      <span className="absolute left-16 md:left-18 bg-whatsapp-dark text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden md:block">
        Chat with us!
      </span>
    </a>
  );
};

export default WhatsAppButton;