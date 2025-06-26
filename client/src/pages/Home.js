// bng-auto/client/src/pages/Home.js
import { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaArrowUp, FaPaintBrush, FaCar, FaOilCan, FaWrench, FaTools, FaStar } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Cloudinary } from "@cloudinary/url-gen";
import { generateServiceId } from "../utils/generateId";
import CallToAction from "../components/CTA";

// Initialize Cloudinary
const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || "your-cloud-name",
  },
});

const heroBg = cld.image("workshop_mtwqmt").format("auto").quality("auto").toURL();
const workerImg = cld.image("Worker_prwulz").format("auto").quality("auto").toURL();

function Home() {
  const [counts, setCounts] = useState({ years: 0, employees: 0, customers: 0, awards: 0 });
  const [progress, setProgress] = useState({ serviceQuality: 0, supportQuality: 0, warranty: 0 });
  const [showBackToTop, setShowBackToTop] = useState(false);
  const factsRef = useRef(null);
  const aboutRef = useRef(null);

  // Memoize gallery images
  const galleryImages = useMemo(
    () => [
      {
        src: cld.image("work_pictures_13_lrhn0w").format("auto").quality("auto").toURL(),
        alt: "Gallery Images",
      },
      {
        src: cld.image("work_pictures_19_epdpff").format("auto").quality("auto").toURL(),
        alt: "Gallery Images",
      },
      {
        src: cld.image("work_pictures_16_lrnycg").format("auto").quality("auto").toURL(),
        alt: "Gallery Images",
      },
      {
        src: cld.image("work_pictures_10_vjimvv").format("auto").quality("auto").toURL(),
        alt: "Gallery Images",
      },
      {
        src: cld.image("work_pictures_20_wo3auc").format("auto").quality("auto").toURL(),
        alt: "Gallery Images",
      },
      {
        src: cld.image("work_pictures_32_zfcqdc").format("auto").quality("auto").toURL(),
        alt: "Gallery Images",
      },
    ],
    []
  );

  const services = [
    {
      title: "Painting Services",
      icon: <FaPaintBrush className="text-3xl text-white" />,
      description: "Transform your vehicle with our custom paint solutions, tailored to your style and preference at B&G Chez Auto-Paint.",
    },
    {
      title: "Car Wash",
      icon: <FaCar className="text-3xl text-white" />,
      description: "Let B&G Chez make your car sparkle inside and out with top-notch cleaning services.",
    },
    {
      title: "Oil Change",
      icon: <FaOilCan className="text-3xl text-white" />,
      description: "Keep your engine running smoothly with a quick, reliable oil change from B&G Chez.",
    },
    {
      title: "Engine Repair",
      icon: <FaWrench className="text-3xl text-white" />,
      description: "Restore your engine’s performance with expert repair services at B&G Chez.",
    },
    {
      title: "Repair Parts",
      icon: <FaTools className="text-3xl text-white" />,
      description: "Get high-quality replacement parts for all your vehicle repair needs at B&G Chez.",
    },
    {
      title: "Modification",
      icon: <FaCar className="text-3xl text-white" />,
      description: "Customize your ride with professional modifications at B&G Chez Auto-Paint.",
    },
  ];

  const testimonials = [
    {
      text: "I got a custom paint job at B&G, and my car looks incredible now! The team was so easy to work with and really listened to what I wanted.",
      name: "Chukwudi Nwankwo",
      region: "Southeast",
    },
    {
      text: "A broken fender had me stressed, but B&G swapped it out fast with a perfect match. Their repair parts are solid, and the price was fair.",
      name: "Olumide Adekunle",
      region: "Southwest",
    },
    {
      text: "B&G did an oil change in no time, and my engine’s running smoother than ever. It’s great knowing I can count on them for quick service.",
      name: "Amaka Okeke",
      region: "Southeast",
    },
    {
      text: "My SUV was a mess until B&G gave it a car wash—inside and out, it’s spotless! They even got rid of that old coffee stain I thought was permanent.",
      name: "Temitope Ogunleye",
      region: "Southwest",
    },
    {
      text: "My engine was sputtering, and B&G fixed it up like it was nothing. Now it runs like a dream—those guys are pros!",
      name: "Nneka Eze",
      region: "Southeast",
    },
    {
      text: "I wanted a custom mod for my ride, and B&G totally nailed it with a slick new look. They made the whole process fun and stress-free!",
      name: "Funmilayo Adeyemi",
      region: "Southwest",
    },
  ];

  // Slider settings for Services and Testimonials
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  // Slider settings for Gallery (mobile only)
  const gallerySliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500, 
    arrows: false,
    lazyLoad: "ondemand",
    dotsClass: "slick-dots custom-dots",
    appendDots: (dots) => (
      <div>
        <ul className="flex justify-center space-x-2 mt-4">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <button className="w-3 h-3 bg-bng-blue/50 rounded-full hover:bg-bng-blue focus:outline-none focus:ring-2 focus:ring-bng-blue" aria-label="Carousel pagination dot"></button>
    ),
  };

  // Scroll detection for Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Animate Facts & Figures
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const animateNumbers = () => {
            const duration = 800; // Faster animation
            const steps = 40; // Reduced steps for smoother, quicker updates
            const increment = {
              years: 15 / steps,
              employees: 32 / steps, // Corrected to 32
              customers: 2500 / steps,
              awards: 10 / steps,
            };

            let current = { years: 0, employees: 0, customers: 0, awards: 0 };
            const interval = setInterval(() => {
              current.years += increment.years;
              current.employees += increment.employees;
              current.customers += increment.customers;
              current.awards += increment.awards;

              setCounts({
                years: Math.min(Math.round(current.years), 15),
                employees: Math.min(Math.round(current.employees), 32), // Corrected to 32
                customers: Math.min(Math.round(current.customers), 2500),
                awards: Math.min(Math.round(current.awards), 10),
              });

              if (current.years >= 15) clearInterval(interval);
            }, duration / steps);
          };
          animateNumbers();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (factsRef.current) observer.observe(factsRef.current);

    return () => observer.disconnect();
  }, []);

  // Animate Progress Bars
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const animateProgress = () => {
            const duration = 1500;
            const steps = 60;
            const target = { serviceQuality: 90, supportQuality: 85, warranty: 80 };
            const increment = {
              serviceQuality: target.serviceQuality / steps,
              supportQuality: target.supportQuality / steps,
              warranty: target.warranty / steps,
            };

            let current = { serviceQuality: 0, supportQuality: 0, warranty: 0 };
            const interval = setInterval(() => {
              current.serviceQuality += increment.serviceQuality;
              current.supportQuality += increment.supportQuality;
              current.warranty += increment.warranty;

              setProgress({
                serviceQuality: Math.min(Math.round(current.serviceQuality), target.serviceQuality),
                supportQuality: Math.min(Math.round(current.supportQuality), target.supportQuality),
                warranty: Math.min(Math.round(current.warranty), target.warranty),
              });

              if (current.serviceQuality >= target.serviceQuality) clearInterval(interval);
            }, duration / steps);
          };
          animateProgress();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (aboutRef.current) observer.observe(aboutRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="homepages-1">
      {/* Hero Section */}
      <section
        className="relative h-[70vh] min-h-[500px] bg-cover bg-center text-center"
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-label="Hero Section"
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 py-8 md:py-0">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
            Restoring Your Ride With Pride
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-10 text-white font-light max-w-2xl mx-auto">
            Get Premium Long Lasting Solution To Your Car Needs Only At B&G Auto Paint And Repair
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/about"
              className="border-2 border-white bg-bng-blue text-white px-6 py-3 rounded font-semibold uppercase hover:bg-bng-dark hover:border-bng-dark"
            >
              Learn More
            </Link>
            <Link
              to="/book-appointment"
              className="border-2 border-white bg-transparent text-white px-6 py-3 rounded font-semibold uppercase hover:bg-bng-dark hover:border-bng-dark"
            >
              Book An Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section ref={aboutRef} className="py-12 md:py-16 bg-bng-white relative" aria-label="About Us Section">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-bng-text text-left mb-6 relative after:content-[''] after:block after:w-16 after:h-1 after:bg-bng-blue after:absolute after:-bottom-13 after:left-0">
            WELCOME TO B&G
          </h2>
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="flex-1">
              <p className="text-bng-gray mb-6 text-sm md:text-base text-left">
                Welcome to B&G (Auto Paint and Repair), where exceptional care for your vehicle is our priority. Founded by Chukwuka Anike, our premier auto shop in Nkpor, Anambra, specializes in custom auto painting and precision repairs. Located at 3 Kilometer, Umuoji Road, Idemili, we are dedicated to delivering top-tier service backed by unmatched expertise and reliability. At B&G, we transform your vehicle with craftsmanship and passion, ensuring every job meets the highest standards of quality. Trust us to restore your ride with pride.
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-bng-text font-semibold text-sm md:text-base">Service Quality ({progress.serviceQuality}%)</p>
                  <div className="w-full md:w-1/2 bg-bng-lighter rounded h-2 relative overflow-hidden">
                    <div
                      className="bg-bng-blue h-2 rounded transition-all duration-1500"
                      style={{ width: `${progress.serviceQuality}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <p className="text-bng-text font-semibold text-sm md:text-base">Support Quality ({progress.supportQuality}%)</p>
                  <div className="w-full md:w-1/2 bg-bng-lighter rounded h-2 relative overflow-hidden">
                    <div
                      className="bg-bng-blue h-2 rounded transition-all duration-1500"
                      style={{ width: `${progress.supportQuality}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <p className="text-bng-text font-semibold text-sm md:text-base">Long Term Warranty ({progress.warranty}%)</p>
                  <div className="w-full md:w-1/2 bg-bng-lighter rounded h-2 relative overflow-hidden">
                    <div
                      className="bg-bng-blue h-2 rounded transition-all duration-1500"
                      style={{ width: `${progress.warranty}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 relative z-0">
              <img
                src={workerImg}
                alt="Worker at B&G Chez Auto-Paint performing a repair"
                className="w-full h-auto rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-12 md:py-16 bg-bng-lighter text-center relative z-10 -mt-40 md:-mt-48 lg:-mt-64" aria-label="Our Services Section">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-bng-text mb-6 relative after:content-[''] after:block after:w-16 after:h-1 after:bg-bng-blue after:absolute after:-bottom-15 after:left-1/2 after:-translate-x-1/2">
            OUR SERVICES
          </h2>
          <Slider {...sliderSettings} className="mt-12" role="region" aria-label="Services carousel">
            {services.map((service, idx) => (
              <div key={idx} className="px-4">
                <div className="services-content text-center">
                  <Link
                    to={`/services?service=${generateServiceId(service.title)}`}
                    className="services-icon w-16 h-16 mx-auto bg-bng-blue rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-500"
                  >
                    {service.icon}
                  </Link>
                  <div className="services-text pt-4 px-2">
                    <Link to={`/services?service=${generateServiceId(service.title)}`}>
                      <span className="font-bold text-lg md:text-xl text-bng-text">{service.title}</span>
                    </Link>
                    <p className="text-sm text-bng-gray mt-1">{service.description}</p>
                    <Link
                      to={`/services?service=${generateServiceId(service.title)}`}
                      className="text-sm text-bng-gray hover:text-bng-blue transition-colors duration-300"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 md:py-16 bg-bng-light text-center" aria-label="Gallery Section">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-bng-text mb-6 relative after:content-[''] after:block after:w-16 after:h-1 after:bg-bng-blue after:absolute after:-bottom-13 after:left-1/2 after:-translate-x-1/2">
            GALLERY
          </h2>
          {/* Mobile Carousel (<640px) */}
          <div className="block sm:hidden mt-12 mb-12">
            <Slider {...gallerySliderSettings} role="region" aria-label="Gallery carousel">
              {galleryImages.map((image, idx) => (
                <div key={idx} className="px-2">
                  <figure className="relative w-full">
                    <Link
                      to="/gallery"
                      className="block w-full aspect-[4/3] relative group focus:outline-none focus:ring-2 focus:ring-bng-blue"
                      role="link"
                      tabIndex={0}
                      aria-label={`View ${image.alt} in gallery`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          window.location.href = "/gallery";
                        }
                      }}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 group-active:scale-105"
                        loading="lazy"
                        style={{ aspectRatio: "4/3" }}
                      />
                    </Link>
                  </figure>
                </div>
              ))}
            </Slider>
          </div>
          {/* Grid Layout (≥640px) */}
          <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 gap-4 mt-12 mb-12 max-w-3xl mx-auto">
            {galleryImages.map((image, idx) => (
              <figure key={idx} className="relative w-full">
                <Link
                  to="/gallery"
                  className="block w-full aspect-[4/3] relative group focus:outline-none focus:ring-2 focus:ring-bng-blue"
                  role="link"
                  tabIndex={0}
                  aria-label={`View ${image.alt} in gallery`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      window.location.href = "/gallery";
                    }
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 group-active:scale-105"
                    loading="lazy"
                    style={{ aspectRatio: "4/3" }}
                  />
                </Link>
              </figure>
            ))}
          </div>
          <Link
            to="/gallery"
            className="inline-block border-2 border-white bg-bng-blue text-white px-6 py-3 rounded font-semibold uppercase hover:bg-bng-dark hover:border-bng-dark focus:outline-none focus:ring-2 focus:ring-bng-blue"
            aria-label="View full gallery"
          >
            View Full Gallery
          </Link>
        </div>
      </section>
      
      {/* Facts & Figures */}
      <section ref={factsRef} className="py-8 md:py-12 bg-bng-dark text-white text-center" aria-label="Facts and Figures Section">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-4">
              <h3 className="text-2xl md:text-3xl font-bold">{counts.years}</h3>
              <p className="text-bng-light text-sm md:text-base">Years Experience</p>
            </div>
            <div className="p-4">
              <h3 className="text-2xl md:text-3xl font-bold">{counts.employees}</h3>
              <p className="text-bng-light text-sm md:text-base">Our Employees</p>
            </div>
            <div className="p-4">
              <h3 className="text-2xl md:text-3xl font-bold">{counts.customers.toLocaleString() + "+"}</h3>
              <p className="text-bng-light text-sm md:text-base">Happy Customers</p>
            </div>
            <div className="p-4">
              <h3 className="text-2xl md:text-3xl font-bold">{counts.awards}</h3>
              <p className="text-bng-light text-sm md:text-base">Award Winning</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-16 bg-bng-white text-center" aria-label="Testimonials Section">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-bng-text mb-6 relative after:content-[''] after:block after:w-16 after:h-1 after:bg-bng-blue after:absolute after:-bottom-15 after:left-1/2 after:-translate-x-1/2">
            TESTIMONIALS
          </h2>
          <Slider {...sliderSettings} className="mt-12" role="region" aria-label="Testimonials carousel">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="px-4">
                <div className="p-4 bg-bng-white rounded-md shadow-sm">
                  <p className="text-bng-text-gray italic text-sm md:text-base leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <p className="mt-4 font-bold text-bng-text text-sm md:text-base">{testimonial.name}</p>
                  <div className="flex justify-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500 text-base" aria-hidden="true" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* CTA Section */}
      <CallToAction headline="You Have a Problem to Fix? Let Us Help You!" />

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-5 right-5 z-50 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-bng-blue text-white rounded-full shadow-lg hover:bg-bng-dark transition-all duration-300 transform ${
          showBackToTop ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
        }`}
        aria-label="Scroll back to top"
        tabIndex={showBackToTop ? 0 : -1}
      >
        <FaArrowUp className="text-lg md:text-xl" />
      </button>
    </div>
  );
}

export default Home;