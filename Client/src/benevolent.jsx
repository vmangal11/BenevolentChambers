import React, { useEffect, useState } from "react";
import { ReactComponent as Instagram } from "./icons/instagram.svg";
import { ReactComponent as Linkedin } from "./icons/linkedin.svg";
import Clients from "./Clients.jsx";
import Accordion from "./Accordion.jsx";
import Navbar from "./Navbar.jsx";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { MapPin, Mail, PhoneCall, Timer, Briefcase, FileSignature, Lightbulb, Lock, Scale, Users, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  const location = useLocation();
  const [showScroll, setShowScroll] = useState(false);
  const [showHeroText, setShowHeroText] = useState(true);

  useEffect(() => {
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo;
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const services = [
    { text: "General corporate advisory work - review/drafting, negotiation and finalization of agreements", icon: <Briefcase className="w-8 h-8 mb-4 text-[#001c3d]" /> },
    { text: "Transactions - structuring and documentation related advisory work", icon: <FileSignature className="w-8 h-8 mb-4 text-[#001c3d]" /> },
    { text: "Intellectual property rights management", icon: <Lightbulb className="w-8 h-8 mb-4 text-[#001c3d]" /> },
    { text: "Data privacy compliance related work", icon: <Lock className="w-8 h-8 mb-4 text-[#001c3d]" /> },
    { text: "Pre-litigation/pre-dispute strategy and documentation", icon: <Scale className="w-8 h-8 mb-4 text-[#001c3d]" /> },
    { text: "Private client related advisory work", icon: <Users className="w-8 h-8 mb-4 text-[#001c3d]" /> },
  ];

  const portfolioItems = [
    "Assisting a solar energy player in its strategic sale to a major infrastructure player.",
    "Assisting a tech enabled services platform in closing its Pre-Series A round, by way of funding from the alternate investment fund of a well known investment firm.",
    "Assisting a tech enabled solar energy player in procuring services from its major vendor against private placement of its securities.",
    "Assisted Standard Glass Lining Technology Limited in its pre-IPO private placement.",
    'Assisted in the majority stake sale by a non-bank finance company "NPFPL".',
    "Assisted Septalhalon Services Private Limited (Machaxi) in securing its Pre-Series A fund raise.",
    "Assisting numerous clients in transactional/general corporate work.",
    "Assisting numerous clients in IP registration and prosecution work.",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleVideoTimeUpdate = (e) => {
    const video = e.target;
    if (video.duration) {
      const timeLeft = video.duration - video.currentTime;
      // Start fading out at the 5-second mark
      if (timeLeft <= 3.29) {
        if (showHeroText) setShowHeroText(false);
      } else {
        if (!showHeroText) setShowHeroText(true);
      }
    }
  };

  return (
    <div className="font-serif text-[#001c3d] bg-[#eaeef3]">
      <Navbar />
      
      {/* Hero Section */}
      <section
        id="About Us"
        className="w-full bg-[#eaeef3] scroll-mt-[80px]"
      >
        {/* Container is exactly the screen height minus navbar (no scrolling) */}
        <div className="relative w-full h-[calc(100vh-70px)] bg-[#001c3d] overflow-hidden flex justify-center items-center">
          
          {/* Changed to object-fill to force full width without cropping (will slightly stretch the video) */}
          <video
            className="absolute inset-0 w-full h-full object-fill"
            autoPlay
            muted
            loop
            playsInline
            src={`${process.env.PUBLIC_URL}/videos/firm-video.mp4`}
            onTimeUpdate={handleVideoTimeUpdate}
          />
          
          {/* Semi-transparent overlay */}
          <div 
            className={`absolute inset-0 bg-[#dceefc] transition-opacity duration-700 ease-in-out ${
              showHeroText ? "opacity-60" : "opacity-0"
            }`}
          ></div>

          {/* Hero Text */}
          <div 
            className={`absolute inset-0 z-20 px-6 md:px-12 text-center flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${
              showHeroText ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4 text-[#001c3d] uppercase drop-shadow-sm">
              ABOUT OUR FIRM
            </div>
            <p className="text-[11px] sm:text-sm md:text-base lg:text-lg font-semibold max-w-5xl mx-auto text-[#001c3d] leading-relaxed">
              We are a young and dynamic team of transactional, data privacy and
              intellectual property rights lawyers, individually having experience
              of 8+ years in tier-1 law firms and international organisations. We
              started Benevolent Law Chambers (BLC) in February of 2024; and in
              this short period, have managed to scale our profile across multiple
              sectors, with clients ranging from start-ups to listed entities,
              spanning the length and breadth of India.
            </p>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <motion.section
        id="Practice Areas"
        className="bg-[#eaeef3] text-[#001c3d] w-full px-6 md:px-12 lg:px-20 py-10 scroll-mt-14"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold mb-8 text-center uppercase">PRACTICE AREAS</h2>
        <div className="w-full mx-auto p-4 md:p-8">
          <Accordion />
        </div>
      </motion.section>

      {/* Our Services */}
      <motion.section
        id="Our Services"
        className="bg-[#eaeef3] text-[#001c3d] w-full px-6 md:px-12 lg:px-20 py-10 scroll-mt-14"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center uppercase">OUR SERVICES</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto">
          {services.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-md border border-gray-200 flex flex-col items-center text-center transition-all duration-300 hover:border-[#001c3d] shadow-sm"
            >
              {item.icon}
              <span className="text-sm md:text-base font-medium text-[#001c3d]">{item.text}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Portfolio */}
      <motion.section
        id="Portfolio"
        className="bg-[#eaeef3] text-[#001c3d] w-full px-6 md:px-12 lg:px-20 py-10 scroll-mt-14"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center uppercase">PORTFOLIO</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto">
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-md border border-gray-200 transition-all duration-300 hover:border-blue-700 flex items-start h-full gap-3 shadow-sm"
            >
              <CheckCircle2 className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
              <span className="text-sm md:text-base font-medium text-gray-800 w-full">
                {item}
              </span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Why choose us */}
      <motion.section
        id="choose"
        className="bg-[#eaeef3] text-center px-6 md:px-12 lg:px-20 py-10 scroll-mt-14"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold mb-4 uppercase">WHY CHOOSE US?</h2>
        <p className="max-w-3xl mx-auto text-sm md:text-base mb-10">
          We combine top-tier expertise with a client-centric approach, ensuring
          strategic, practical, and tailored legal solutions for businesses of
          all scales. Our deep industry knowledge and proactive legal counsel
          empower you to navigate complex regulatory landscapes with confidence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto text-left">
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
              className="bg-gradient-to-br from-blue-50 to-blue-200 p-6 rounded-md shadow-md border border-blue-100 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
            >
              <h3 className="font-semibold mb-2 text-[#001c3d]">
                {item.title}
              </h3>
              <p className="text-gray-800 text-sm">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Clients */}
      <section id="clients" className="scroll-mt-14 w-full bg-[#eaeef3]">
        <Clients />
      </section>

      {/* Footer */}
      <footer className="text-gray-100 py-10 bg-[#001c3d] w-full">
        <div className="mx-8 flex flex-col md:flex-row justify-between items-start gap-8 max-w-7xl md:mx-auto px-4 md:px-0">
          
          <div className="w-full md:w-1/3 text-left">
            <h2 className="text-xl font-bold text-white tracking-wide mb-3">
              Benevolent Law Chambers
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm">
              Providing trusted legal expertise with professionalism, integrity,
              and a client‑first approach. We are committed to delivering
              excellence in every case we handle.
            </p>
          </div>

          <div className="w-full md:w-1/3 flex flex-col md:items-center text-left">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Contact Us
              </h4>
              <ul className="space-y-3 text-sm text-gray-300 [&_a]:text-gray-300 [&_a:hover]:text-white">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                  <a href="https://maps.app.goo.gl/DQNNp7ybzX9ehwGS9" target="_blank" rel="noopener noreferrer" className="leading-relaxed transition-colors">
                    Unit no. 20, 1701, 7th Floor, Express Trade Tower -2,<br />
                    Sector-132, Noida -201301
                  </a>
                </li>
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 flex-shrink-0" />
                  <a href="mailto:contact@benevolentgroup.in" className="transition-colors">
                    contact@benevolentgroup.in
                  </a>
                </li>
                <li className="flex items-center">
                  <PhoneCall className="w-4 h-4 mr-3 flex-shrink-0" />
                  <a href="tel:+919899997595" className="transition-colors">+91-9899997595</a>
                </li>
                <li className="flex items-center">
                  <Timer className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span>
                    Mon – Sat: 09:00am – 07:00pm
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full md:w-1/3 flex flex-col md:items-end text-left md:text-right">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 md:text-right">Follow Us</h4>
              <div className="flex gap-4 justify-start md:justify-end">
                <a
                  href="https://www.instagram.com/benevolentlawchambers?igsh=bDA3aXp1dm12Z2Jj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-gray-400 rounded-full hover:bg-white hover:text-[#001c3d] transition-all duration-300 group"
                >
                  <Instagram className="w-5 h-5 text-white group-hover:text-[#001c3d]" />
                </a>
                <a
                  href="https://www.linkedin.com/company/benevolent-law-chambers/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-gray-400 rounded-full hover:bg-white hover:text-[#001c3d] transition-all duration-300 group"
                >
                  <Linkedin className="w-5 h-5 text-white group-hover:text-[#001c3d]" />
                </a>
              </div>
            </div>
          </div>
          
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-center text-gray-400 text-xs tracking-wide max-w-7xl mx-auto">
          © {new Date().getFullYear()} Benevolent Law Chambers. All rights
          reserved.
        </div>
      </footer>

      {showScroll && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 bg-[#001c3d] text-white w-10 h-10 rounded-sm shadow-md border border-[#001c3d] flex items-center justify-center hover:bg-white transition-all duration-300 group"
          aria-label="Scroll to top"
        >
          <span className="text-white group-hover:text-black text-xl font-bold transition-colors duration-300">↑</span>
        </button>
      )}
    </div>
  );
}