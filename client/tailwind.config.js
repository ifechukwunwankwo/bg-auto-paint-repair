/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bng-blue': '#2563eb', // Updated to match Contact.js inline CSS
        'bng-dark': '#315deb', // Hover shade
        'bng-text': '#333', // Headings
        'bng-text-gray': '#4b5563', // Paragraphs
        'bng-light': '#f2f2f2', // Backgrounds
        'bng-lighter': '#e5e5e5', // Sub-footer background
        'bng-footer-dark': '#0F162B', // Footer background
        'bng-white': '#ffffff', // Footer text color
        'bng-footer-blue': '#00f', // Footer-specific blue
        'bng-appointment-hover': '#D92500', // Hover color for Book An Appointment
        'gray-200': '#e5e7eb',
        'gray-100': '#f3f4f6',
        'gray-50': '#f9fafb',
        'bng-red': '#ef4444',
        'bng-gold': '#E7AE28',
        'bng-silver': '#BDBDBD',
        'whatsapp-green': '#25D366',
        'whatsapp-dark': '#128C7E',
      },
      spacing: {
        '15': '15px',
        '13': '13px',
        '8': '-8px',
        '24': '24px', // For mb-6 equivalent
        '48': '48px', // For mt-12 equivalent
      },
      fontFamily: {
        'open-sans': ['Open Sans', 'sans-serif'],
      },
      animation: {
        fadeInUp: 'fadeInUp 0.8s ease-out both',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};