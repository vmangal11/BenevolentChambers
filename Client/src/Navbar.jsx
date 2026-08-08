import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import benevoletIcon from "./logos/benevoletIcon.png";
import benevolentText from "./logos/BenevolentLawChambersText.png";

export default function Navbar({ currentUser, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="bg-white shadow-md py-2 px-4 sticky top-0 z-50 font-serif w-full">
      <nav>
        <div className="flex justify-between items-center">
          {/* Logo Section */}
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

          {/* Mobile Hamburger Menu */}
          <button
            className="md:hidden text-[#001c3d] text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {/* Navigation Links */}
          <div
            className={`absolute md:static top-full left-0 w-full md:w-auto bg-white shadow-md md:shadow-none transition-all duration-300 z-20 ${
              menuOpen ? "block" : "hidden md:block"
            }`}
          >
            <ul className="flex flex-col md:flex-row md:space-x-6 p-1 mb-0 md:p-0 items-center">
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
                        if (location.pathname !== "/") {
                          navigate("/", { state: { scrollTo: section } });
                        } else {
                          document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
                        }
                      }
                      setMenuOpen(false);
                    }}
                    className="text-left md:text-center w-full md:w-auto text-[#001c3d] mx-2 hover:text-blue-700 hover:underline"
                  >
                    {label}
                  </button>
                </li>
              ))}
              
              {/* Display logout option if user is logged in */}
              {currentUser && (
                <li className="md:py-0 text-[20px]">
                  <button
                    onClick={() => {
                      onLogout();
                      setMenuOpen(false);
                    }}
                    className="text-left md:text-center w-full md:w-auto text-red-600 mx-2 hover:underline font-bold"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}