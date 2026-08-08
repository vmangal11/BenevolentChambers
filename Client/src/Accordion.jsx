import { useState } from "react";
import { ReactComponent as ChevronDown } from "./icons/chevronDown.svg";

export default function CustomAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const items = [
    {
      title: "Corporate & Commercial Advisory",
      content:
        "We advise businesses on corporate governance, compliance, and commercial transactions. Our practice encompasses review and negotiation of commercial agreements, corporate structuring, and resolution of organizational matters under applicable corporate laws.",
    },
    {
      title: "Intellectual Property",
      content:
        "We handle trademark, copyright, design, and patent matters including registration, enforcement, infringement proceedings, and IP due diligence. Our services extend to IP portfolio management and protection strategies.",
    },
    {
      title: "Private Equity & Mergers and Acquisitions",
      content:
        "We advise on M&A transactions and private equity investments. Our services include transaction structuring, legal due diligence, preparation of transaction documents, FEMA compliance, and advisory on security instruments and exit mechanisms.",
    },
    {
      title: "Dispute Resolution & Litigation",
      content:
        "We represent clients in commercial disputes before courts, tribunals, and arbitral forums. Our practice covers corporate law, intellectual property, and contractual disputes through litigation and domestic and international arbitration.",
    },
    {
      title: "Prevention of Sexual Harassment (PoSH) Compliance",
      content:
        "We advise on compliance with the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013. Our services include policy drafting, establishment and training of Internal Complaints Committees, awareness programs, and investigation protocols.",
    },
    {
      title: "Private Client & Family Advisory",
      content:
        "We advise individuals and families on wealth structuring, succession planning, estate matters, creation and administration of trusts, inheritance, and family dispute resolution.",
    },
    {
      title: "Data Protection & Privacy",
      content:
        "We advise on compliance with the Digital Personal Data Protection Act, 2023. Our services include compliance assessments, policy implementation, advisory on data subject rights and cross-border transfers, breach response protocols, and obligations applicable to Data Fiduciaries.",
    },
    {
      title: "Other Practice Areas",
      content:
        "We offer comprehensive legal and strategic advisory services across a diverse range of sectors, including celebrity endorsements, capital markets, real estate, and other specialized areas. We assist clients in navigating complex regulatory frameworks, structuring transactions, and protecting their interests, ensuring tailored solutions that align with both business objectives and legal compliance.",
    },
  ];

  return (
    <div className="w-full mx-auto space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="border border-gray-200 bg-white rounded-md overflow-hidden">
            <button
              onClick={() => toggle(index)}
              // Hover text-color removed; applies blue strictly when open
              className={`w-full flex justify-between items-center px-6 py-4 font-semibold transition-all duration-300 ${
                isOpen ? "text-blue-700 bg-blue-50/20" : "text-[#001c3d]"
              }`}
            >
              <span className="text-left w-full text-[16px] md:text-lg">
                {item.title}
              </span>
              <ChevronDown
                className={`h-5 w-5 ml-2 shrink-0 transform transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-blue-700" : "rotate-0 text-[#001c3d]"
                }`}
              />
            </button>
            {/* The line separating header and content is gone */}
            {isOpen && (
              <div className="px-6 py-4 bg-white text-sm md:text-base text-gray-800 leading-relaxed">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}