import React, { useState, useEffect } from "react";
import {
  Stethoscope,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// import logo from "../assets/doctor-adda-logo.png";
import logo from "../assets/dr-adda-logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToggle = () => {
    if (isAtTop) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white md:py-16 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:max-w-[85%] ">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-18 h-18  rounded-lg flex items-center justify-center">
                  <Stethoscope className="w-18 h-18 text-white" />
                  <img src={logo} alt="" />
                </div>
                {/* <span className="text-2xl  font-bold">Doctor Adda</span> */}
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your trusted healthcare partner, providing quality medical
                services and connecting you with the best doctors.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  to="/"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/login"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Login
                </Link>

                <Link
                  to="/contact"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
                <Link
                  to="/about"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  About
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <div className="flex flex-col space-y-2">
                <Link
                  to="/doctor"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Doctor & Specialists
                </Link>
                <Link
                  to="/ambulance"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Ambulance
                </Link>
                <Link
                  to="/diagnostic"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Diagnostics
                </Link>
                <Link
                  to="/hospital"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Hospitals
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400">+91 9450180033</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-blue-400 mt-1" />

                  <div className="flex flex-col leading-tight">
                    <span className="text-gray-400">
                      support@doctoradda.com
                    </span>
                    <span className="text-gray-400">info@doctoradda.com</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 fs-6 text-blue-400" />
                  <span className="text-gray-400">
                    H NO 39-B Block B Vani Elite <br /> Homes Laulai Chinhat
                    LUCKNOW UP 226028 IND
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Doctor Adda. All rights reserved</p>
            <div className="mt-4 flex justify-center items-center flex-wrap gap-4 text-sm">
              <Link
                to="/privacy-policy"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                to="/terms-and-conditions"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Terms & Conditions
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                to="/refund"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Refund And Cancellation
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                to="/price-policy"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Pricing And Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll Toggle Button */}
      <button
        onClick={handleScrollToggle}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors z-50"
        aria-label="Scroll toggle"
      >
        {isAtTop ? (
          <ChevronDown className="w-5 h-5" />
        ) : (
          <ChevronUp className="w-5 h-5" />
        )}
      </button>
    </>
  );
};

export default Footer;
