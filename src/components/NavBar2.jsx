/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const NavBar2 = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [disableHover, setDisableHover] = useState(false);

  const navigation = useNavigate();
  // Route mapping
  const routeMap = {
    blood: "/bloodbank",
    ambulance: "/ambulance",
    pharmacy: "/pharmacy",
    doctor: "/doctor",
    diagnostic: "/diagnostic",
    hospital: "/hospital",
  };
  const handleRedirect = (path) => {
    setDisableHover(true); // 🔥 hover temporarily off
    setOpenDropdown(null); // menu close
    setActiveSubCategory(null); // reset
    navigation(path);

    // thoda delay ke baad hover enable
    setTimeout(() => {
      setDisableHover(false);
    }, 300);
  };
  
  const megaMenuData = {
    blood: {
      left: [
        "Popular Packages",
        "Popular Tests",
        "Tests by Unhealthy Habits",
        "Tests by Health Risks",
        "Govt. Panel Health Test",
      ],
      right: {
        "Popular Packages": [
          "Healthians Comprehensive",
          "Healthy India 2025 Full Body",
          "Ayushman Package",
        ],
        "Popular Tests": ["Blood Sugar", "Liver Function", "Thyroid", "CBC"],
        "Tests by Unhealthy Habits": [
          "Alcoholism",
          "Junk Food",
          "Smoking",
          "Sleeplessness",
        ],
        "Tests by Health Risks": ["Heart Risk", "Diabetes", "Bone Density"],
        "Govt. Panel Health Test": ["ESIC", "CGHS", "PMJAY Scheme"],
      },
    },
    ambulance: {
      left: [
        "Emergency Services",
        "Ambulance Types",
        "CSR Schemes",
        "Booking",
        "Other Services",
      ],
      right: {
        "Emergency Services": [
          "Book Ambulance",
          "ICU Ambulance",
          "24x7 Availability",
        ],
        "Ambulance Types": [
          "Neonatal Ambulance",
          "Freezer Box",
          "Dead Body Carrier",
        ],
        "CSR Schemes": ["Govt. 108", "NGO Tie-ups", "Corporate Ambulance"],
        Booking: ["App Booking", "Web Booking", "Call Booking"],
        "Other Services": ["Event Medical", "First Aid On-Site"],
      },
    },
    pharmacy: {
      left: [
        "Order Online",
        "Upload Prescription",
        "Categories",
        "Nearby Stores",
        "Top Brands",
      ],
      right: {
        "Order Online": ["Medicines", "Wellness", "Essentials"],
        "Upload Prescription": ["Scan & Upload", "Chat Support"],
        Categories: [
          "Diabetes Care",
          "Heart Health",
          "Sexual Wellness",
          "Pain Relief",
        ],
        "Nearby Stores": ["Locate Pharmacy", "24x7 Open"],
        "Top Brands": ["Himalaya", "Dabur", "Glenmark", "Zydus"],
      },
    },
    doctor: {
      left: [
        "Find Doctor",
        "Specialists",
        "Consult Online",
        "Health Packages",
        "Ratings & Reviews",
      ],
      right: {
        "Find Doctor": ["Search by Name", "Search by Area"],
        Specialists: ["Cardiologist", "Gynecologist", "Orthopedic", "ENT"],
        "Consult Online": ["Chat", "Video Call", "Book Slot"],
        "Health Packages": ["Senior Citizen", "Women Health"],
        "Ratings & Reviews": ["Top Rated", "Verified Doctors"],
      },
    },
    diagnostic: {
      left: [
        "Pathology",
        "Radiology & Imaging",
        "Cardiac & Pulmonary",
        "Neurology",
        "Ophthalmology & ENT",
        "Genetic & Molecular",
        "Preventive Health Packages",
        "Govt & Corporate Panels",
      ],
      right: {
        Pathology: [
          "Hematology",
          "Biochemistry",
          "Hormones",
          "Infection & Immunology",
          "Tumor Markers",
          "Advanced Hematology",
          "Microbiology",
          "Urine & Stool",
          "Pregnancy & Fertility",
          "Condition-Based Packages",
        ],
        "Radiology & Imaging": [
          "X-Ray",
          "Ultrasound",
          "CT Scan",
          "MRI",
          "PET-CT",
          "Mammography",
          "Bone Densitometry",
        ],
        "Cardiac & Pulmonary": [
          "ECG / Echo",
          "Stress Tests",
          "Pulmonary Function",
        ],
        Neurology: ["Brain Function", "Nerve & Muscle", "Sensory Pathways"],
        "Ophthalmology & ENT": ["Eye Diagnostics", "ENT Diagnostics"],
        "Genetic & Molecular": [
          "DNA Tests",
          "Prenatal Testing",
          "Oncology Genetics",
          "Allergy Panels",
        ],
        "Preventive Health Packages": [
          "Basic Health Package",
          "Executive Health Package",
          "Master Health Package",
          "Women’s Health Package",
          "Senior Citizen Package",
          "Child Health Package",
          "",
        ],
        "Govt & Corporate Panels": [
          "Govt Schemes",
          "Corporate Medicals",
          "Insurance Packages",
        ],
      },
    },
    hospital: {
      left: [
        "Hospital Finder",
        "Surgeries",
        "Emergency",
        "Book Appointment",
        "Insurance & Panels",
      ],
      right: {
        "Hospital Finder": ["By City", "By Specialty", "By Ratings"],
        Surgeries: ["Knee Replacement", "Bypass", "Gallbladder", "Hernia"],
        Emergency: ["ICU Beds", "Ambulance", "24x7 Helpdesk"],
        "Book Appointment": ["Consult Now", "Scheduled Visit"],
        "Insurance & Panels": ["Cashless", "TPA List", "Govt. Panels"],
      },
    },
  };

  const menuItems = [
    { label: "Blood Bank", key: "blood" },
    { label: "Ambulance", key: "ambulance" },
    { label: "Pharmacies", key: "pharmacy" },
    { label: "Doctor & Specialists", key: "doctor" },
    { label: "Diagnostic", key: "diagnostic" },
    { label: "Hospitals & Clinics", key: "hospital" },
  ];

  const renderMegaMenu = (menuKey) => {
    const data = megaMenuData[menuKey];

    if (!data) return null;

    const active = activeSubCategory || data.left[0];

    // const handleRedirect = () => {
    //   navigation(routeMap[menuKey]);
    // };
    return (
      <div className="absolute left-0 top-full w-full bg-white shadow-2xl z-50 border-t border-gray-200 flex flex-col sm:flex-row p-4 rounded-b-md">
        {/* Left - Subcategories */}
        <div className="sm:w-1/4 w-full max-w-[250px] border-r pr-4 mb-4 sm:mb-0">
          {data.left.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => {
                setActiveSubCategory(item);
              }}
              // onClick={() => handleRedirect(menuKey)}   // <-- redirect only on CLICK
              onClick={() => handleRedirect(routeMap[menuKey])}
              className={`px-4 py-2 text-sm cursor-pointer transition ${
                active === item
                  ? "bg-[#0074b2] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Right - Subitems */}
        <div className="sm:w-3/4 w-full grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-6 px-2">
          {data.right[active]?.map((subItem, i) => (
            <div
              key={i}
              className="text-sm text-gray-700 hover:text-[#0074b2] cursor-pointer break-words"
              // onClick={() => handleRedirect(menuKey)}   // <-- redirect only on CLICK
              onClick={() => handleRedirect(routeMap[menuKey])}
            >
              {subItem}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-white border-t hidden sm:block relative z-50">
      <div
        className=" mx-auto relative sm:w-full lg:w-[80%]  xl:w-[80%] 2xl:w-[70%] "
        onMouseLeave={() => {
          setOpenDropdown(null);
          setActiveSubCategory(null);
        }}
      >
        {/* Top nav area + dropdown hover wrapper */}
        <div className="flex items-center sm:px-1 md:px-4 xl:px-4 justify-between font-medium text-gray-800 sm:text-[12px] md:text-[12px] xl:text-[15px]  overflow-x-auto ">
          <a href="/">
            <FaHome className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-[#0074b2]" />
          </a>

          {menuItems.map((menu) => (
            <div
              key={menu.key}
              className="relative"
              onMouseEnter={() => {
                setOpenDropdown(menu.key);
                setActiveSubCategory(null);
              }}
              onClick={() => handleRedirect(routeMap[menu.key])}

              // onClick={() => {
              //   console.log("menu", menu?.label);
              //   if (menu?.label == "Blood Bank") {
              //     navigation("/bloodbank");
              //   } else if (menu?.label == "Pharmacies") {
              //     navigation("/pharmacy");
              //   } else if (menu?.label == "Doctor & Specialists") {
              //     navigation("/doctor");
              //   } else if (menu?.label == "Diagnostic") {
              //     navigation("/diagnostic");
              //   } else if (menu?.label == "Hospitals & Clinics") {
              //     navigation("/hospital");
              //   } else if (menu?.label == "Ambulance") {
              //     navigation("/ambulance");
              //   }
              // }}
            >
              <div
                className={`flex items-center gap-1  md:px-1 md:py-1 lg:px-0 lg:py-1 xl:px-3 xl:py-2 rounded hover:bg-[#0074b2] hover:text-white transition cursor-pointer ${
                  openDropdown === menu.key ? "bg-[#0074b2] text-white" : ""
                }`}
              >
                {menu.label}
                <MdKeyboardArrowDown
                  className={`transition-transform duration-200 ${
                    openDropdown === menu.key ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
          ))}

          {/* <span className="cursor-pointer px-3 py-2 hover:bg-[#0074b2] hover:text-white rounded transition">
            More
          </span> */}
        </div>

        {/* Mega Menu dropdown — placed outside of loop, full area hoverable */}
        {openDropdown && renderMegaMenu(openDropdown)}
      </div>
    </div>
  );
};

export default NavBar2;
