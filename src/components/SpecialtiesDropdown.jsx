import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const specialties = [
  "All Specialties",
  "Radiology",
  "Cardiology",
  "Neurology",
  "Dentistry",
  "Orthopedic",
];

// Dropdown component
const SpecialtiesDropdown = ({ specialty, setSpecialty }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full max-w-xl mx-auto text-black">
      {/* Selected box */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2 
                   rounded-lg border border-gray-300 bg-white shadow-md 
                   focus:outline-none focus:ring-2 focus:ring-blue-400 
                   transition duration-200"
      >
        <span className="text-sm 2xl:text-base text-gray-700 font-medium">
          {specialty}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown options */}
      {open && (
        <ul
          className="absolute z-50 mt-2 w-full bg-white shadow-2xl rounded-xl border border-gray-200 
                     overflow-hidden animate-in slide-in-from-top-2 duration-200"
        >
          {specialties.map((item, idx) => (
            <li
              key={idx}
              onClick={() => {
                setSpecialty(item);
                setOpen(false);
              }}
              className={`px-4 py-2 text-sm 2xl:text-base cursor-pointer 
                          hover:bg-blue-50 hover:text-blue-600 transition duration-150 
                          ${
                            specialty === item
                              ? "bg-blue-100 text-blue-700 font-semibold"
                              : ""
                          }`}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Parent component
const App = () => {
  // 👇 Default set to "All Specialties"
  const [specialty, setSpecialty] = useState("All Specialties");

  return (
    <div className="">
      <SpecialtiesDropdown
        specialty={specialty}
        setSpecialty={setSpecialty}
      />

    </div>
  );
};

export default App;
