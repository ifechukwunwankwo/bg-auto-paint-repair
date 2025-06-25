// bng-auto/client/src/pages/About.js
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowUp, FaTrophy, FaWrench, FaSmile, FaStar } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Cloudinary } from "@cloudinary/url-gen";
import { team } from "../constants/aboutData";
import CallToAction from "../components/CTA";

// Initialize Cloudinary
const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || "your-cloud-name",
  },
});

const backgroundImageUrl = cld.image("bg").format("auto").quality("auto").toURL();
const workerImg = cld.image("work_pictures_143_g8ku7x").format("auto").quality("auto").toURL();

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

// React Slick settings for Testimonials carousel
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
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

function About() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [progress, setProgress] = useState({ serviceQuality: 0, supportQuality: 0, warranty: 0 });
  const aboutRef = useRef(null);

  // Scroll detection for Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
    <main className="bg-bng-light">
      {/* Header Section */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat relative overflow-hidden pt-12 pb-10 sm:pt-14 sm:pb-12 md:pt-16 md:pb-14 min-h-[150px] sm:min-h-[180px] md:min-h-[200px]"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg font-montserrat">
            About Us
          </h1>
          <nav className="flex justify-center space-x-2 mt-4 text-white text-base md:text-lg lg:text-xl" aria-label="Breadcrumb">
            <Link to="/" className="text-white hover:underline" aria-label="Home">
              Home
            </Link>
            <span className="text-white">/</span>
            <span className="text-white">About</span>
          </nav>
        </div>
      </div>

      {/* About Us Section */}
      <section ref={aboutRef} className="py-12 md:py-16 bg-bng-white relative" aria-label="About Us Section">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-bng-text text-left mb-6 relative after:content-[''] after:block after:w-16 after:h-1 after:bg-bng-blue after:absolute after:-bottom-13 after:left-0">
            WELCOME TO B&G
          </h2>
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="flex-1">
              <p className="text-bng-gray mb-6 text-sm md:text-base text-left">
                Welcome to B&G (Auto Paint and Repair), where exceptional care for your vehicle is our promise. Founded by Chukwuka Anike, our premier auto shop in Nkpor, Anambra, specializes in custom auto painting and precision repairs. Located at 3 Kilometer, Umuoji Road, Idemili, we are dedicated to delivering top-tier service backed by unmatched expertise and reliability. At B&G, we transform your vehicle with craftsmanship and passion, ensuring every job meets the highest standards of quality. Trust us to restore your ride with pride.
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

      {/* Mission Statement Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-bng-white text-center" aria-labelledby="mission-heading">
        <div className="container mx-auto">
          <h2
            id="mission-heading"
            className="text-2xl md:text-3xl font-bold text-bng-text uppercase mb-6 relative after:content-[''] after:block after:w-16 after:h-1 after:bg-bng-blue after:absolute after:-bottom-15 after:left-1/2 after:-translate-x-1/2"
          >
            Our Mission
          </h2>
          <div className="max-w-3xl mx-auto text-center mt-12">
            <p className="text-bng-text-gray text-sm md:text-base leading-relaxed">
              At B&G Auto Paint and Repair Services, our mission is to deliver exceptional auto care with a focus on quality, reliability, and customer satisfaction. We strive to transform every vehicle with precision and creativity, ensuring our clients drive away with confidence and pride.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-bng-light text-center" aria-labelledby="values-heading">
        <div className="container mx-auto">
          <h2
            id="values-heading"
            className="text-2xl md:text-3xl font-bold text-bng-text uppercase mb-6 relative after:content-[''] after:block after:w-16 after:h-1 after:bg-bng-blue after:absolute after:-bottom-15 after:left-1/2 after:-translate-x-1/2"
          >
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-12">
            {[
              {
                title: "Quality",
                description: "We use the best materials and techniques to ensure lasting results.",
                icon: <FaTrophy className="text-4xl text-bng-gold mx-auto mb-4" />,
              },
              {
                title: "Reliability",
                description: "Our clients can count on us for consistent and dependable service.",
                icon: <FaWrench className="text-4xl text-bng-silver mx-auto mb-4" />,
              },
              {
                title: "Customer Satisfaction",
                description: "We prioritize your needs and aim to exceed your expectations.",
                icon: <FaSmile className="text-4xl text-bng-gold mx-auto mb-4" />,
              },
            ].map((value, index) => (
              <div
                key={index}
                className="p-6 bg-bng-white rounded-md shadow-sm hover:shadow-md transition-all duration-300 text-center"
              >
                {value.icon}
                <h3 className="text-xl font-bold text-bng-blue mb-2">{value.title}</h3>
                <p className="text-bng-text-gray text-sm md:text-base">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bng-white" aria-labelledby="team-heading">
          <div className="container mx-auto text-center">
            <h2
              id="team-heading"
              className="text-3xl md:text-4xl font-bold text-bng-text uppercase mb-12 relative after:content-[''] after:block after:w-16 after:h-1 after:bg-bng-blue after:absolute after:-bottom-4 after:left-1/2 after:-translate-x-1/2"
            >
              Our Team
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  <div className="w-full aspect-[4/3] overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.alt || member.name}
                      loading="lazy"
                      className="w-full h-full object-top transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-bng-blue mb-1">{member.name}</h3>
                    <p className="text-bng-text-gray text-sm md:text-base">{member.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


      {/* Testimonials Section with Carousel */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-bng-light text-center" aria-labelledby="testimonials-heading">
        <div className="container mx-auto">
          <h2
            id="testimonials-heading"
            className="text-2xl md:text-3xl font-bold text-bng-text uppercase mb-6 relative after:content-[''] after:block after:w-16 after:h-1 after:bg-bng-blue after:absolute after:-bottom-15 after:left-1/2 after:-translate-x-1/2"
          >
            Testimonials
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

      {/* Location Map Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-bng-white text-center" aria-labelledby="location-heading">
        <div className="container mx-auto">
          <h2
            id="location-heading"
            className="text-2xl md:text-3xl font-bold text-bng-text uppercase mb-6 relative after:content-[''] after:block after:w-16 after:h-1 after:bg-bng-blue after:absolute after:-bottom-15 after:left-1/2 after:-translate-x-1/2"
          >
            Find Us
          </h2>
          <div className="max-w-4xl mx-auto mt-12">
            <p className="text-bng-text-gray text-center text-sm md:text-base mb-6 leading-relaxed">
              Visit us at 3, Kilometer, Umuoji Rd, Idemmli, Nkpor, Anambra State.
            </p>
            <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src= "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.93557436888477!2d6.843573173306803!3d6.134842090485061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1043916665501bad%3A0xd18eaacce7262bde!2sB%20%26%20g!5e0!3m2!1sen!2sng!4v1747334733342!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="B&G Auto Paint and Repair Services Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CallToAction headline="Ready to Experience Top-Notch Auto Care? Contact Us!" />

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
    </main>
  );
}

export default About;