// bng-auto/client/src/pages/Services.js
import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import { services } from "../constants/services";
import { generateServiceId } from "../utils/generateId";
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || "your-cloud-name",
  },
});

const backgroundImageUrl = cld.image("engine-repair-service-bc").format("auto").quality("auto").toURL();

function Services() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialServiceId = searchParams.get("service");
  const initialService = services.find(
    (service) => generateServiceId(service.title) === initialServiceId
  ) || services[0];

  const [selectedService, setSelectedService] = useState(initialService);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [progressValues, setProgressValues] = useState({});
  const skillsRef = useRef(null);

  useEffect(() => {
    const serviceId = searchParams.get("service");
    const service = services.find(
      (s) => generateServiceId(s.title) === serviceId
    );
    if (service) {
      setSelectedService(service);
    } else {
      setSelectedService(services[0]);
    }
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const serviceDetails = useMemo(() => ({
    "Painting Services": {
      image: cld.image("paintingi_service").format("auto").quality("auto").toURL(),
      alt: "Professional car painting at B&G Auto Paint and Repair",
      description:
        "Transform your vehicle with our premium painting services at B&G Auto Paint and Repair, where artistry meets precision. Whether you're restoring a faded finish, repairing scratches, or craving a bold custom color, our state-of-the-art spray booths and eco-friendly paints deliver a flawless, showroom-quality result. We meticulously prepare surfaces, removing imperfections and applying multiple layers of high-grade paint and clear coat to protect against UV rays, rust, and road debris. Our color-matching technology ensures your vision comes to life, boosting your car’s aesthetic appeal and resale value. Drive away with a vibrant, durable finish that turns heads!",
      keyFeatures: [
        "Precision color matching for factory or custom shades",
        "Advanced spray booth for dust-free, even application",
        "Eco-friendly paints with low VOC emissions",
        "Multi-layer clear coat for UV and scratch resistance",
        "Expert surface preparation and paint correction",
      ],
      whyChooseUs: [
        "Certified painters with years of experience",
        "Competitive pricing with transparent quotes",
        "Commitment to eco-friendly practices",
      ],
      skills: [
        { label: "Painting Precision", value: 90 },
        { label: "Finish Durability", value: 85 },
        { label: "Customer Satisfaction", value: 95 },
      ],
    },
    "Engine Repair": {
      image: cld.image("engine_service").format("auto").quality("auto").toURL(),
      alt: "Certified mechanic performing engine repair at B&G Auto Paint and Repair",
      description:
        "Is your engine sputtering, making odd noises, or triggering warning lights? At B&G Auto Paint and Repair, our engine repair services breathe new life into your vehicle. Our ASE-certified mechanics use cutting-edge diagnostic tools to pinpoint issues, from faulty spark plugs to complex timing belt failures. We handle everything from minor tune-ups to full engine rebuilds, using genuine OEM parts to restore power, efficiency, and reliability. With our transparent diagnostics and detailed repair plans, you’ll understand every step of the process. Get back on the road with an engine that purrs like new!",
      keyFeatures: [
        "Advanced diagnostics with OBD-II scanners",
        "Repairs for pistons, valves, gaskets, and more",
        "Performance tuning to optimize fuel economy",
        "Warranty on parts and labor for peace of mind",
        "Preventive maintenance to avoid future breakdowns",
      ],
      whyChooseUs: [
        "ASE-certified technicians with deep expertise",
        "Use of genuine OEM parts for reliability",
        "Clear communication and fair pricing",
      ],
      skills: [
        { label: "Diagnostic Accuracy", value: 90 },
        { label: "Repair Quality", value: 85 },
        { label: "Customer Satisfaction", value: 95 },
      ],
    },
    "Oil Change": {
      image: cld.image("oil_change").format("auto").quality("auto").toURL(),
      alt: "Technician performing oil change at B&G Auto Paint and Repair",
      description:
        "An oil change is more than routine maintenance—it’s the key to a healthy, long-lasting engine. At B&G Auto Paint and Repair, we make oil changes quick, affordable, and thorough. Our technicians use premium synthetic or conventional oils, matched to your vehicle’s specifications, to reduce friction, prevent overheating, and protect vital engine components. Every oil change includes a new filter, fluid top-offs, and a complimentary 20-point inspection to catch potential issues early. With our eco-friendly oil disposal and fast service, you’ll drive away knowing your engine is ready for the road ahead!",
      keyFeatures: [
        "Premium synthetic, semi-synthetic, or conventional oils",
        "High-quality oil filter replacement included",
        "Complimentary 20-point vehicle inspection",
        "Environmentally responsible oil recycling",
        "No-appointment service for your convenience",
      ],
      whyChooseUs: [
        "Top-grade oils from trusted brands",
        "Fast, hassle-free service",
        "Proactive maintenance to save you money",
      ],
      skills: [
        { label: "Service Efficiency", value: 90 },
        { label: "Maintenance Quality", value: 85 },
        { label: "Customer Satisfaction", value: 95 },
      ],
    },
    "Car Wash": {
      image: cld.image("car_wash").format("auto").quality("auto").toURL(),
      alt: "Detailed car wash service at B&G Auto Paint and Repair",
      description:
        "Make your vehicle sparkle inside and out with our top-tier car wash services at B&G Auto Paint and Repair. Our meticulous hand-washing process removes dirt, grime, and road salts, while our eco-friendly soaps protect your paint and the environment. We don’t stop at the exterior—our interior detailing includes vacuuming, upholstery cleaning, and dashboard conditioning for a fresh, comfortable cabin. Choose from basic washes to deluxe packages with waxing and tire shine. Your car deserves to shine, and we’re here to make it happen!",
      keyFeatures: [
        "Hand washing with pH-balanced, eco-friendly soaps",
        "Interior vacuuming and upholstery stain removal",
        "Protective wax and sealant for lasting shine",
        "Tire cleaning and shine for a polished look",
        "Customizable packages to fit your needs",
      ],
      whyChooseUs: [
        "Meticulous attention to every detail",
        "Eco-conscious cleaning products",
        "Affordable options for all budgets",
      ],
      skills: [
        { label: "Detailing Quality", value: 90 },
        { label: "Cleaning Efficiency", value: 85 },
        { label: "Customer Satisfaction", value: 95 },
      ],
    },
    "Repair Parts": {
      image: cld.image("Repair_parts").format("auto").quality("auto").toURL(),
      alt: "Technician installing repair parts at B&G Auto Paint and Repair",
      description:
        "When your vehicle needs new parts, trust B&G Auto Paint and Repair to deliver quality and reliability. Our extensive inventory includes genuine OEM parts and high-grade aftermarket options for brakes, suspension, alternators, and more, covering a wide range of makes and models. Our skilled technicians ensure precise installation, restoring your vehicle’s performance and safety. We also source hard-to-find parts for specialty or vintage cars, with clear pricing and warranties to give you confidence. Keep your car running smoothly with parts you can trust!",
      keyFeatures: [
        "Genuine OEM and premium aftermarket parts",
        "Expert installation for mechanical and electrical components",
        "Parts sourcing for rare or discontinued models",
        "Warranty on parts and labor for reliability",
        "Transparent quotes with no hidden costs",
      ],
      whyChooseUs: [
        "High-quality parts from trusted suppliers",
        "Skilled installation by certified technicians",
        "Fast sourcing and competitive pricing",
      ],
      skills: [
        { label: "Installation Quality", value: 90 },
        { label: "Parts Reliability", value: 85 },
        { label: "Customer Satisfaction", value: 95 },
      ],
    },
    "Modification": {
      image: cld.image("modifcation_service").format("auto").quality("auto").toURL(),
      alt: "Custom vehicle modification at B&G Auto Paint and Repair",
      description:
        "Unleash your vehicle’s full potential with our custom modification services at B&G Auto Paint and Repair. Whether you’re dreaming of a sleek body kit, a performance-boosting exhaust, or a high-tech audio system, our expert team turns your vision into reality. We use premium materials and cutting-edge techniques to enhance both aesthetics and functionality, from suspension tuning to LED lighting upgrades. Every modification is tailored to your style and needs, ensuring your car stands out on the road. Ready to make your ride truly yours?",
      keyFeatures: [
        "Custom body kits, spoilers, and vinyl wraps",
        "Performance upgrades like exhausts and turbo kits",
        "High-end audio, navigation, and lighting installations",
        "Personalized design consultations for unique builds",
        "Quality assurance for durability and safety",
      ],
      whyChooseUs: [
        "Creative, customer-driven designs",
        "Premium materials and components",
        "Expert craftsmanship for flawless results",
      ],
      skills: [
        { label: "Customization Quality", value: 90 },
        { label: "Innovation", value: 85 },
        { label: "Customer Satisfaction", value: 95 },
      ],
    },
  }), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const animateProgress = () => {
            const duration = 1500;
            const steps = 60;
            const currentSkills = serviceDetails[selectedService.title].skills;
            const targetValues = currentSkills.reduce((acc, skill) => {
              acc[skill.label] = skill.value;
              return acc;
            }, {});
            const increment = Object.keys(targetValues).reduce((acc, label) => {
              acc[label] = targetValues[label] / steps;
              return acc;
            }, {});

            let current = Object.keys(targetValues).reduce((acc, label) => {
              acc[label] = 0;
              return acc;
            }, {});
            const interval = setInterval(() => {
              Object.keys(current).forEach((label) => {
                current[label] += increment[label];
              });

              setProgressValues(
                Object.keys(current).reduce((acc, label) => {
                  acc[label] = Math.min(
                    Math.round(current[label]),
                    targetValues[label]
                  );
                  return acc;
                }, {})
              );

              if (
                current[Object.keys(current)[0]] >=
                targetValues[Object.keys(current)[0]]
              ) {
                clearInterval(interval);
              }
            }, duration / steps);
          };
          animateProgress();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (skillsRef.current) observer.observe(skillsRef.current);

    return () => observer.disconnect();
  }, [selectedService, serviceDetails]);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setSearchParams({ service: generateServiceId(service.title) });
  };

  const handleKeyDown = (e, service, index) => {
    if (["Enter", " "].includes(e.key)) {
      e.preventDefault();
      handleServiceClick(service);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (index + 1) % services.length;
      handleServiceClick(services[nextIndex]);
      document.querySelectorAll('[role="tab"]')[nextIndex].focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (index - 1 + services.length) % services.length;
      handleServiceClick(services[prevIndex]);
      document.querySelectorAll('[role="tab"]')[prevIndex].focus();
    }
  };

  return (
    <section className="bg-bng-light">
      {/* Header Section */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat relative overflow-hidden pt-12 pb-10 sm:pt-14 sm:pb-12 md:pt-16 md:pb-14 min-h-[150px] sm:min-h-[180px] md:min-h-[200px]"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
            Our Services
          </h1>
          <ul className="flex justify-center space-x-2 mt-4 text-white text-base md:text-lg lg:text-xl">
            <li>
              <Link
                to="/"
                className="text-white hover:underline"
                aria-label="Home"
              >
                Home
              </Link>
            </li>
            <li className="text-white">/</li>
            <li className="text-white">Services</li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10">
            {/* Sidebar */}
            <div className="md:w-1/4 lg:w-1/5">
              <ul
                className="space-y-2"
                role="tablist"
                aria-labelledby="services-heading"
              >
                {services.map((service, index) => (
                  <li
                    key={index}
                    id={`tab-${generateServiceId(service.title)}`}
                    role="tab"
                    aria-selected={selectedService.title === service.title}
                    aria-controls={`service-panel-${generateServiceId(
                      service.title
                    )}`}
                    tabIndex={0}
                    className={`
                      p-3 sm:p-4 rounded cursor-pointer flex items-center gap-2
                      ${
                        selectedService.title === service.title
                          ? "bg-bng-blue text-white"
                          : "bg-bng-white text-bng-text hover:bg-bng-lighter"
                      }
                    `}
                    onClick={() => handleServiceClick(service)}
                    onKeyDown={(e) => handleKeyDown(e, service, index)}
                  >
                    <span className="text-lg">{service.icon}</span>
                    <span>{service.title}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Content */}
            <div
              className="md:w-3/4 lg:w-4/5"
              id={`service-panel-${generateServiceId(selectedService.title)}`}
              role="tabpanel"
              aria-labelledby={`tab-${generateServiceId(
                selectedService.title
              )}`}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-bng-text uppercase border-b-2 border-bng-blue pb-2">
                {selectedService.title}
              </h2>
              <img
                src={serviceDetails[selectedService.title].image}
                alt={serviceDetails[selectedService.title].alt}
                className="w-full aspect-[16/9] object-cover rounded mb-4"
                loading="lazy"
              />
              <p className="text-bng-gray text-sm md:text-base mb-4">
                {serviceDetails[selectedService.title].description}
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-bng-blue mb-2">
                Key Features
              </h3>
              <ul className="list-disc list-inside text-bng-gray text-sm md:text-base mb-4">
                {serviceDetails[selectedService.title].keyFeatures.map(
                  (feature, index) => (
                    <li key={index}>{feature}</li>
                  )
                )}
              </ul>
              <h3 className="text-xl md:text-2xl font-bold text-bng-blue mb-2">
                Why Choose Us?
              </h3>
              <ul className="list-disc list-inside text-bng-gray text-sm md:text-base mb-4">
                {serviceDetails[selectedService.title].whyChooseUs.map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
              <h3 className="text-xl md:text-2xl font-bold text-bng-blue mb-2">
                Our Skills
              </h3>
              <div className="space-y-4" ref={skillsRef}>
                {serviceDetails[selectedService.title].skills.map(
                  (skill, index) => (
                    <div key={index}>
                      <p className="text-sm md:text-base text-bng-text">
                        {skill.label} ({progressValues[skill.label] || 0}%)
                      </p>
                      <div className="w-full md:w-1/2 bg-bng-lighter rounded h-2 relative overflow-hidden">
                        <div
                          className="bg-bng-blue h-2 rounded transition-all duration-1500"
                          style={{
                            width: `${progressValues[skill.label] || 0}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )
                )}
              </div>
              <Link
                to="/book-appointment"
                className="inline-block mt-4 bg-bng-blue text-white font-semibold px-6 py-3 rounded uppercase hover:bg-bng-dark transition duration-300"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-5 right-5 z-50 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-bng-blue text-white rounded-full shadow-lg hover:bg-bng-dark transition-all duration-300 transform ${
          showBackToTop
            ? "opacity-100 scale-100"
            : "opacity-0 scale-75 pointer-events-none"
        }`}
        aria-label="Scroll back to top"
        tabIndex={showBackToTop ? 0 : -1}
      >
        <FaArrowUp className="text-lg md:text-xl" />
      </button>
    </section>
  );
}

export default Services;