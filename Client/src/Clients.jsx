import React from "react";
import Aurnument from "./logos/Aurnument.jpg";
import Brevistay from "./logos/Brevistay.jpg";
import Machaxi from "./logos/Machaxi.jpg";
import OptenPower from "./logos/Opten Power.jpg";
import StanaGlobal from "./logos/Stana Global.jpg";
import SRK from "./logos/SRK.jpg";
import Bigmint from "./logos/BIGMINT.jpg";
import Froovela from "./logos/Froovella.jpg";

const Clients = () => {
  const partners = [
    {
      name: "Aurnument",
      logo: Aurnument,
      link: "https://www.instagram.com/aurnument?igsh=dXJtZHRpdmQ5bno4",
    },
    { name: "Brevistay", logo: Brevistay, link: "https://www.brevistay.com/" },
    { name: "Machaxi", logo: Machaxi, link: "https://www.machaxi.com" },
    {
      name: "Opten Power",
      logo: OptenPower,
      link: "https://www.optenpower.com",
    },
    {
      name: "Stana Global",
      logo: StanaGlobal,
      link: "https://stanaglobal.com",
    },
    { name: "SRK Ventures", logo: SRK, link: "https://srkeventures.com" },
    { name: "Bigmint", logo: Bigmint, link: "https://www.bigmint.co" },
    {
      name: "Froovella",
      logo: Froovela,
      link: "https://froovella.com",
    },
  ];

  return (
    <section np className="px-4 py-12 bg-[#eaeef3] text-center">
      <h4 className="text-sm text-gray-600 mb-2">Our Valued Partners</h4>
      <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-10 text-[#0a1b38]">
        SERVING INDUSTRY LEADERS
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 place-items-center">
        {partners.map((partner, index) => (
          <div key={index} className="w-32 md:w-40">
            {partner.link ? (
              <a
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-auto object-contain hover:opacity-80 transition-opacity duration-300"
                />
              </a>
            ) : (
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-full h-auto object-contain"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Clients;
