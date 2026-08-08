import React, { useState, useEffect } from "react";

export default function DisclaimerPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("disclaimerAccepted");
    if (!hasAccepted) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleAccept = () => {
    if (isChecked) {
      localStorage.setItem("disclaimerAccepted", "true");
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    // ✅ Changed background to a frosted glass blur effect
    <div className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-md bg-[#eaeef3]/40 p-4 font-serif">
      <div className="bg-[#fefcf6] rounded-md shadow-2xl max-w-2xl w-full p-6 md:p-8 relative border border-gray-200">
        
        <h2 className="text-2xl font-bold text-[#001c3d] mb-4 border-b border-gray-300 pb-3">
          Disclaimer & Terms of Use
        </h2>
        
        <div className="text-gray-800 text-sm md:text-base h-60 overflow-y-auto mb-6 pr-3 leading-relaxed">
          <p className="mb-4">
            By accessing this website, you acknowledge and confirm that you are seeking information relating to <strong>Benevolent Law Chambers</strong> of your own accord and that there has been no form of solicitation, advertisement, or inducement by Benevolent Law Chambers or its members.
          </p>
          <p className="mb-4">
            The content of this website is for informational purposes only and should not be interpreted as soliciting or advertisement. No material/information provided on this website should be construed as legal advice.
          </p>
          <p className="mb-4">
            Benevolent Law Chambers shall not be liable for the consequences of any action taken by relying on the material/information provided on this website. In cases where the user requires any legal issues to be addressed, they must seek independent legal advice.
          </p>
          <p>
            The rules of the Bar Council of India prohibit law firms from soliciting work or advertising in any manner. By clicking "Agree & Continue," you acknowledge that you are accessing this website voluntarily.
          </p>
        </div>
        
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              id="accept-disclaimer"
              className="w-5 h-5 text-[#001c3d] border-gray-400 rounded cursor-pointer focus:ring-[#001c3d]"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
          </div>
          <label 
            htmlFor="accept-disclaimer" 
            className="ml-3 text-sm text-gray-900 cursor-pointer font-medium"
          >
            I have read and understood the disclaimer.
          </label>
        </div>

        <div className="flex justify-end border-t border-gray-300 pt-4">
          <button
            onClick={handleAccept}
            disabled={!isChecked}
            className={`px-6 py-2 rounded-md font-semibold transition-all duration-300 ${
              isChecked
                ? "bg-[#001c3d] text-white hover:bg-blue-900 cursor-pointer shadow-md"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Agree & Continue
          </button>
        </div>
      </div>
    </div>
  );
}