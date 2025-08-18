import React, { useState } from "react";
import { motion } from "framer-motion";
import ContactUsGIF from "./logos/ContactUsGIF.jpg";
import Navbar from "./Navbar.jsx";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      const formData = new FormData(form);
      const response = await fetch(
        "https://formsubmit.co/mvidisha06@gmail.com",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setSubmitted(true);
        form.reset(); // Reset form after successful submission
        setError(null);
      } else {
        setError("Submission failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="font-serif text-[#001c3d] bg-blue-200 min-h-screen">
      <Navbar />
      <section id="Contact" className="text-white py-12 px-4 bg-[#001c3d]">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-5xl font-serif font-bold mb-12 text-left max-w-6xl mx-auto"
        >
          CONTACT THE FIRM
        </motion.h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#fdfcf6] text-[#001c3d] rounded-md shadow-lg overflow-hidden">
          <div className="w-full h-full">
            <img
              src={ContactUsGIF}
              alt="Contact Visual"
              className="object-cover w-full h-full transition-all duration-1000 ease-in-out"
            />
          </div>

          <div className="p-6 flex flex-col justify-center">
            <p className="text-sm md:text-base leading-relaxed mb-6">
              At Benevolent Law Chambers, we are committed to providing expert
              legal counsel with integrity, diligence, and a client-first
              approach. Whether you need legal advice, representation, or a
              consultation, we are here to assist you.
            </p>

            {/* ✅ Success or error message */}
            {submitted && (
              <p className="text-green-600 font-semibold mb-4">
                Form submitted successfully!
              </p>
            )}
            {error && (
              <p className="text-red-600 font-semibold mb-4">{error}</p>
            )}

            {/* ✅ Updated form with fetch */}
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="flex flex-col">
                <label className="text-sm mb-1">Name*</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  className="border-b border-gray-400 focus:outline-none p-1 bg-transparent"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm mb-1">Last name*</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  className="border-b border-gray-400 focus:outline-none p-1 bg-transparent"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className="border-b border-gray-400 focus:outline-none p-1 bg-transparent"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="border-b border-gray-400 focus:outline-none p-1 bg-transparent"
                />
              </div>
              <div className="flex flex-col md:col-span-2">
                <label className="text-sm mb-1">
                  Got a question or case? Tell us!
                </label>
                <textarea
                  name="message"
                  rows="4"
                  className="border-b border-gray-400 focus:outline-none p-1 bg-transparent"
                ></textarea>
              </div>

              {/* Hidden Inputs */}
              <input
                type="hidden"
                name="_subject"
                value="New Contact Form Submission"
              />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <div className="md:col-span-2 flex justify-center">
                <button
                  type="submit"
                  className="mt-4 px-10 py-2 border border-[#001c3d] text-[#001c3d] rounded-full hover:bg-[#001c3d] hover:text-white transition-all duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
