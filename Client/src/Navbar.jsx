import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import benevoletIcon from "./logos/benevoletIcon.png";
import benevolentText from "./logos/BenevolentLawChambersText.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md py-2 px-4 sticky top-0 z-50 font-serif">
      <nav>
        <div className="flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src={benevoletIcon}
              alt="Benevolent Law Chambers Logo"
              className="h-8 transition-transform ease-in-out duration-300 hover:scale-110 hover:rotate-1"
            />
            <img
              src={benevolentText}
              alt="Benevolent Law Chambers Text"
              className="h-8"
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
  );
}
