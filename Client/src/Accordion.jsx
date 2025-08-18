import { useState } from "react";
import { ReactComponent as ChevronDown } from "./icons/chevronDown.svg";

export default function CustomAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const items = [
    {
      title: "Data Protection",
      content:
        "Change the text and add your own content, including any information that is relevant to share. Then customize the font, size and scale to make it your own.",
    },
    {
      title: "Corporate",
      content:
        "Change the text and add your own content, including any information that is relevant to share. Then customize the font, size and scale to make it your own.",
    },
    {
      title: "Commercial",
      content:
        "Change the text and add your own content, including any information that is relevant to share. Then customize the font, size and scale to make it your own.",
    },
    { title: "Project3", content: "yet another amazing project" },
    { title: "Project3", content: "yet another amazing project" },
    { title: "Project3", content: "yet another amazing project" },
  ];

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-2">
      {items.map((item, index) => (
        <div key={index} className="border rounded-md overflow-hidden">
          <button
            onClick={() => toggle(index)}
            className="w-full flex justify-between items-center px-4 py-3 font-semibold bg-white transition group hover:bg-gray-100"
          >
            <span className="group-hover:text-blue-700 transition text-left w-full">
              {item.title}
            </span>
            <ChevronDown
              className={`h-5 w-5 ml-2 shrink-0 transform transition-transform duration-200 group-hover:text-blue-700 ${
                openIndex === index ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
          {openIndex === index && (
            <div className="px-4 py-3 bg-gray-50 border-t text-sm text-gray-800 break-words">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
