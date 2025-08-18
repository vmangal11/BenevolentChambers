// import CompanyLogo from "./logos/companylogo.png";
import React, { useEffect, useState } from "react";
import { ReactComponent as Instagram } from "./icons/instagram.svg";
import { ReactComponent as Linkedin } from "./icons/linkedin.svg";
import Clients from "./Clients.jsx";
import Accordion from "./Accordion.jsx";
import benevoletIcon from "./logos/benevoletIcon.png";
import benevolentText from "./logos/BenevolentLawChambersText.png";
import { motion } from "framer-motion";
import bg1 from "./logos/Carousel3.jpg";
import bg2 from "./logos/Carousel2.jpg";
import bg3 from "./logos/Carousel1.jpg";
import { ReactComponent as ChevronDown } from "./icons/chevronDown.svg";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MapPin, Mail, PhoneCall, Timer } from "lucide-react";
import { MdEmail } from "react-icons/md";
// import Instagram from "./icons/instagram.svg";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const links = [
    { label: "About Us", href: "#about" },
    { label: "Practice Areas", href: "#practice" },
    { label: "Our Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Our Clients", href: "#clients" },
    { label: "Contact", href: "Contact" },
    { label: "Blog", href: "#blog" },
  ];

  const [servicesDone, setServicesDone] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo;
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const services = [
    "General corporate advisory work - review/drafting, negotiation and finalization of agreements",
    "Transactions - structuring and documentation related advisory work",
    "Intellectual property rights management",
    "Data privacy compliance related work",
    "Pre-litigation/pre-dispute strategy and documentation",
    "Private client related advisory work",
  ];

  const portfolioItems = [
    "Assisting a solar energy player in its strategic sale to a major infrastructure player.",
    "Assisting a tech enabled services platform in closing its Pre-Series A round, by way of funding from the alternate investment fund of a well known investment firm.",
    "Assisting a tech enabled solar energy player in procuring services from its major vendor against private placement of its securities.",
    <>
      Assisted Standard Glass Lining Technology Limited in its{" "}
      <a href="#" className="underline text-blue-700">
        pre-IPO private placement
      </a>
      .
    </>,
    'Assisted in the majority stake sale by a non-bank finance company "NPFPL".',
    "Assisted Septalhalon Services Private Limited (Machaxi) in securing its Pre-Series A fund raise.",
    "Assisting numerous clients in transactional/general corporate work.",
    "Assisting numerous clients in IP registration and prosecution work.",
  ];

  const aboutImages = [bg1, bg2, bg3];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % aboutImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="font-serif text-[#001c3d] bg-blue-200">
      {/* Header */}
      <header className="bg-white shadow-md py-2 px-4 sticky top-0 z-50">
        <nav>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img
                src={benevoletIcon}
                alt="Benevolent Law Chambers Logo"
                className="h-8 cursor-pointer transition-transform ease-in-out duration-300 hover:scale-110 hover:rotate-1"
              />
              <img
                src={benevolentText}
                alt="Benevolent Law Chambers Logo"
                className="h-8 cursor-pointer"
              />
            </div>
            {/* Hamburger for mobile */}
            <button
              className="md:hidden text-[#001c3d]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>

            <div
              className={`absolute md:static top-full left-0 w-full md:w-auto bg-white shadow-md md:shadow-none transition-all duration-300 z-20 ${
                menuOpen ? "block" : "hidden md:block"
              }`}
            >
              <ul className="flex flex-col md:flex-row md:space-x-6 p-1 mb-0 md:p-0">
                {[
                  { label: "About Us", section: "About Us" },
                  { label: "Practice Areas", section: "Practice Areas" },
                  { label: "Our Services", section: "Our Services" },
                  { label: "Portfolio", section: "Portfolio" },
                  { label: "Our Clients", section: "clients" },
                  { label: "Contact", route: "/contact" },
                  { label: "Blog", route: "/blog" },
                ].map(({ label, section, route }) => (
                  <li key={label} className="md:py-0 text-[20px]">
                    <button
                      onClick={() => {
                        if (route) {
                          navigate(route);
                        } else if (section) {
                          navigate("/", { state: { scrollTo: section } });
                        }
                        setMenuOpen(false);
                      }}
                      className="text-left md:text-center w-full md:w-auto text-[#001c3d] mx-2 hover:text-blue-700 hover:underline"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      {/* About Section */}
      <section
        id="About Us"
        className="relative text-center scroll-mt-14 h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] xl:h-[100vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={aboutImages[currentImage]}
            alt="About Background"
            className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          />
          <div className="absolute inset-0 bg-white opacity-40"></div>
        </div>

        {/* Foreground content */}
        <div className="relative z-20 px-4 text-center flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#001c3d]">
            ABOUT OUR FIRM
          </h1>
          <p className="text-sm md:text-base max-w-3xl mx-auto text-[#001c3d]">
            We are a young and dynamic team of transactional, data privacy and
            intellectual property rights lawyers, individually having experience
            of 8+ years in tier-1 law firms and international organisations. We
            started Benevolent Law Chambers (BLC) in February of 2024; and in
            this short period, have managed to scale our profile across multiple
            sectors, with clients ranging from start-ups to listed entities,
            spanning the length and breadth of India.
          </p>
        </div>
      </section>
      {/* Practice Areas */}
      <motion.section
        id="Practice Areas"
        className="bg-[#f4f7fa] dark:bg-[#0f172a] text-[#001c3d] dark:text-white px-6 py-10 scroll-mt-14"
        // initial={{ opacity: 0, y: 50 }}
        // animate={{ opacity: 1, y: 0 }}
        // transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold mb-8 text-center">PRACTICE AREAS</h2>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Accordion - 50% */}
          <div className="w-full md:w-1/2">
            <Accordion />
          </div>

          {/* Video - 50% */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <video
              className="w-[800px] h-[350px] rounded-lg border-2 border-gray-300 shadow-[4px_4px_10px_rgba(0,0,0,0.2)] object-cover"
              controls
              muted
              loop
              playsInline
              src={`${process.env.PUBLIC_URL}/videos/practice-areas.mp4`}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </motion.section>

      {/* Our Services */}
      <div className="bg-[#eaeef3]">
        <motion.section
          id="Our Services"
          className="bg-[#eaeef3] text-[#001c3d] p-6 scroll-mt-14"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2
            className="text-3xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            OUR SERVICES
          </motion.h2>

          <ul className="list-disc list-inside space-y-4 text-lg font-medium">
            {services.map((item, index) => (
              <motion.li
                key={index}
                className="transition-shadow duration-300"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{
                  delay: 0.2 + index * 0.1,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                // when the last item animates, trigger setServicesDone
                onAnimationComplete={() => {
                  if (index === services.length - 1) {
                    setServicesDone(true);
                  }
                }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.section>

        {/* PORTFOLIO */}
        <motion.section
          id="Portfolio"
          className="bg-[#eaeef3] text-[#001c3d] p-6 pt-0 scroll-mt-14"
          initial={{ opacity: 0, x: -80 }}
          animate={servicesDone ? { opacity: 1, x: 0 } : { opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {servicesDone && (
            <>
              <motion.h2
                className="text-3xl font-bold mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                PORTFOLIO
              </motion.h2>

              <ul className="list-disc list-inside space-y-4 text-lg font-medium">
                {portfolioItems.map((item, index) => (
                  <motion.li
                    key={index}
                    className="transition-shadow duration-300"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{
                      delay: 0.2 + index * 0.1,
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </>
          )}
        </motion.section>
      </div>
      {/* Why choose us */}
      <section
        id="choose"
        className="bg-[#f4f7fa] text-center p-6 scroll-mt-14"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold mb-4">WHY CHOOSE US?</h2>
        <p className="max-w-3xl mx-auto text-sm md:text-base mb-6">
          We combine top-tier expertise with a client-centric approach, ensuring
          strategic, practical, and tailored legal solutions for businesses of
          all scales. Our deep industry knowledge and proactive legal counsel
          empower you to navigate complex regulatory landscapes with confidence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {[
            {
              title: "Expertise",
              text: "Our team brings 8+ years of experience from tier-1 law firms and global organizations, ensuring top-tier legal counsel.",
            },
            {
              title: "Personalized Service",
              text: "We provide tailored legal solutions with a hands-on, client-first approach to meet your unique business needs.",
            },
            {
              title: "Proven Results",
              text: "From startups to listed entities, our strategic guidance has helped businesses successfully navigate complex legal landscapes.",
            },
            {
              title: "Comprehensive Support",
              text: "We offer end-to-end legal assistance. From consultation to courtroom, we’ve got you covered.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#dceefc] p-4 rounded-md transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02]"
            >
              <h3 className="font-semibold mb-2 transition-all duration-300 hover:font-bold">
                {item.title}
              </h3>
              <p className="text-sm transition-colors duration-300 hover:text-gray-800">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section id="clients" className="scroll-mt-14">
        <Clients />
      </section>
      <footer className="text-black py-8 shadow-lg bg-[#eaeef3]">
        <div className="mx-8 flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
            <p className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <a
                href="https://www.google.co.in/maps/place/7th+Floor,+Express+Trade+Tower,+2+B-36,+Expressway,+Block+B,+Sector+132,+Noida,+Uttar+Pradesh+201301/@28.5141572,77.3752256,17z/data=!3m1!4b1!4m6!3m5!1s0x390ce6278e7abe5d:0x9b6f1f160085caac!8m2!3d28.5141572!4d77.3778005!16s%2Fg%2F11tngfx8yw?entry=ttu&g_ep=EgoyMDI1MDYyMy4yIKXMDSoASAFQAw%3D%3D"
                className="hover:text-blue-300"
              >
                Unit no. 20, 1701, 7th Floor, Express Trade Tower -2,
                Sector-132, Noida -201301
              </a>
            </p>
            <p className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              <a
                href="mailto:contact@benevolentlaw.com"
                className="hover:text-blue-300"
              >
                contact@benevolentlaw.com
              </a>
            </p>
            <p className="flex items-center">
              <PhoneCall className="w-5 h-5 mr-2" />
              <a href="tel:+911234567890" className="hover:text-blue-300">
                +91- 9899997595
              </a>
            </p>
            <p className="flex items-center">
              <Timer className="w-5 h-5 mr-2" />
              <a href="Timing" className="hover:text-blue-300">
                Mon – Sat: 09:00am – 07:00pm
              </a>
            </p>
          </div>

          {/* Social Icons */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-400 mt-6">
          © {new Date().getFullYear()} Benevolent Law Chambers. All rights
          reserved.
        </div>
      </footer>
      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 bg-white/70 text-black w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-200 transition duration-300"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}
