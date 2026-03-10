import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UpgradeProfile({ onContinue }) {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleContinue = () => {
    if (typeof onContinue === "function") return onContinue();
    navigate("/all-registration"); // ✅ client-side navigation
  };

  const features = [
    { icon: "👩‍⚕️", text: "Trusted Doctors" },
    { icon: "🏥", text: "Clinic Details" },
    { icon: "📅", text: "Easy Booking" },
    { icon: "💊", text: "Health Records" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-sky-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6 py-34">
        <div className=" mx-auto sm:w-full lg:w-[80%]  xl:w-[80%] 2xl:w-[70%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              
              {/* Animated Badge */}
              <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-sm font-medium shadow-lg transition-all duration-700 delay-200 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                <span className="mr-2">✨</span>
                Healthcare Made Simple
              </div>

              {/* Main Heading */}
              <h1 className={`text-xl  md:text-2xl lg:text-4xl font-black leading-tight transition-all duration-800 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                <span className="block text-gray-900">Welcome to</span>
                <span className="block bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
                  Doctors Adda
                </span>
              </h1>

              {/* Description */}
              <p className={`text-sm sm:text-base text-gray-600 leading-relaxed max-w-lg transition-all duration-800 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                Your trusted healthcare companion for discovering doctors, comparing clinics, and booking appointments seamlessly.
              </p>

              {/* Feature Pills */}
              <div className={`flex flex-wrap gap-3 transition-all duration-800 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                {features.map((feature, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                    style={{animationDelay: `${idx * 0.1}s`}}
                  >
                    <span className="mr-2 text-lg">{feature.icon}</span>
                    <span className="text-gray-700 font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className={`transition-all duration-800 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                <button
                  onClick={handleContinue}
                  className="group relative px-8 py-4 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Continue
                    <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </div>
            </div>

            {/* Right Visual */}
            <div className={`relative transition-all duration-1000 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              
              {/* Main Image Container */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-3xl transform rotate-3 scale-105 opacity-20"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:rotate-1 transition-transform duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=1600&auto=format&fit=crop"
                    alt="Professional doctor with stethoscope"
                    className="w-full h-96 lg:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}