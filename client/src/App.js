import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import About from "./pages/About";
import BookAppointment from "./pages/BookAppointment";
import AppointmentConfirmation from "./pages/AppointmentConfirmation";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, location.search, location.hash]);

  return (
    <div className="min-h-screen bg-bng-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/appointment-confirmation" element={<AppointmentConfirmation />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;