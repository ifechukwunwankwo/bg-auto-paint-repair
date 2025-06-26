import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
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
import PullToRefresh from "react-pull-to-refresh";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top on route change
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, location.search, location.hash]);

  // Handler to "refresh" the current route/component
  const handleRefresh = () => {
  window.location.reload();
  return Promise.resolve();
  };

  return (
    <div className="min-h-screen bg-bng-white">
      <Navbar />
      <PullToRefresh onRefresh={handleRefresh}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/appointment-confirmation" element={<AppointmentConfirmation />} />
        </Routes>
      </PullToRefresh>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;