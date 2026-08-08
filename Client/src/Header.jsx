import React, { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import CompanyLogo from "./logos/companylogo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Practice", href: "#practice" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <img
          src={CompanyLogo}
          alt="Benevolent Law Chambers Logo"
          className="h-8"
        />

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-lg font-medium text-blue-900">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="hover:text-blue-700 transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl text-blue-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden z-50`}
      >
        <div className="flex flex-col px-6 py-6 space-y-6 text-lg font-medium text-blue-900">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="hover:text-blue-700"
              onClick={() => setIsOpen(false)} // close sidebar after click
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>

      {/* Overlay (when menu is open) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
