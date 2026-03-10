import React, { useEffect, useState } from "react";
import {
  Smartphone,
  Heart,
  Calendar,
  Video,
  Shield,
  Star,
  Download,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DoctorsBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    { icon: Heart, text: "Top Doctors" },
    { icon: Video, text: "Video Consults" },
    { icon: Calendar, text: "Instant Booking" },
  ];

  return (
    <div
      className={`relative overflow-hidden text-white rounded-3xl shadow-2xl transform transition-all duration-1000 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
      style={{
        background:
          "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 50%, rgb(0, 101, 157) 100%)",
      }}
    >
      <div
              className={`relative overflow-hidden text-white rounded-3xl shadow-2xl transform transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{
                background:
                  "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 50%, rgb(0, 101, 157) 100%)",
              }}
            >
              {/* Enhanced Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Floating orbs with different animations */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-cyan-300/30 to-blue-300/20 rounded-full animate-pulse blur-sm"></div>
                <div
                  className="absolute top-1/3 -left-12 w-24 h-24 bg-gradient-to-br from-purple-300/25 to-pink-300/15 rounded-full animate-bounce blur-sm"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div
                  className="absolute bottom-8 right-1/3 w-16 h-16 bg-gradient-to-br from-yellow-300/30 to-orange-300/20 rounded-full animate-ping blur-sm"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute top-1/4 left-1/4 w-20 h-20 bg-gradient-to-br from-green-300/20 to-teal-300/15 rounded-full animate-float blur-sm"
                  style={{ animationDelay: "1.5s" }}
                ></div>
      
                {/* Moving gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
      
                {/* Floating medical icons */}
                <div className="absolute top-8 right-20 animate-float-slow">
                  <Heart
                    className="w-8 h-8 text-red-300 opacity-60"
                    fill="currentColor"
                  />
                </div>
                <div
                  className="absolute bottom-12 left-16 animate-float-slow"
                  style={{ animationDelay: "2s" }}
                >
                  <Shield className="w-7 h-7 text-green-300 opacity-50" />
                </div>
                <div
                  className="absolute top-1/2 right-12 animate-bounce-slow"
                  style={{ animationDelay: "1s" }}
                >
                  <Sparkles className="w-6 h-6 text-yellow-300 opacity-70" />
                </div>
                <div
                  className="absolute bottom-16 left-1/3 animate-pulse"
                  style={{ animationDelay: "2.5s" }}
                >
                  <Star
                    className="w-5 h-5 text-pink-300 opacity-60"
                    fill="currentColor"
                  />
                </div>
              </div>
      
              {/* Enhanced Glassmorphism Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-blue-900/10 backdrop-blur-sm"></div>
      
              <div className="relative z-10 relative max-w-7xl mx-auto px-4 pt-40">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                  {/* Left Content - Enhanced */}
                  <div className="flex-1 text-center lg:text-left max-w-2xl">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-5 py-2 mb-6 transform hover:scale-105 transition-all duration-300 border border-white/20 hover:bg-white/25">
                      <Smartphone className="w-4 h-4 animate-pulse" />
                      <span className="text-sm font-medium">New App Available</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                    </div>
      
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                      <span className="block bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent animate-text-shimmer">
                         Welcome to 
                      </span>
                      <span className="relative inline-block mt-2">
                        <span className="bg-gradient-to-r from-yellow-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent animate-color-shift">
                          Doctor's Adda
                        </span>
                        <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 rounded-full transform scale-x-0 animate-scale-x-delayed"></div>
                      </span>
                    </h2>
      
                    <p
                      className="text-white/90 text-lg mb-8 leading-relaxed animate-fade-in-up"
                      style={{ animationDelay: "0.5s" }}
                    >
                      Your one-stop solution for seamless healthcare services. Bridging the gap between doctors and patients with technology.
                    </p>
      
                    {/* Enhanced Feature Pills */}
                    <div className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start">
                      {features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-full px-4 py-2 transform hover:scale-110 hover:bg-white/25 transition-all duration-300 border border-white/10 animate-slide-in-up"
                          style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                        >
                          <feature.icon
                            className="w-4 h-4 animate-pulse"
                            style={{ animationDelay: `${index * 0.2}s` }}
                          />
                          <span className="text-sm font-medium">{feature.text}</span>
                        </div>
                      ))}
                    </div>
      
                    {/* Enhanced Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <a href="https://play.google.com/store/apps/details?id=com.doctors.adda">
                        <button
                          onMouseEnter={() => setHoveredButton("download")}
                          onMouseLeave={() => setHoveredButton(null)}
                          className="group relative bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 overflow-hidden animate-slide-in-left cursor-pointer"
                          style={{ animationDelay: "1s" }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                          <div className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300">
                            <Download className="w-5 h-5 group-hover:animate-bounce" />
                            Download App
                            {hoveredButton === "download" && (
                              <div className="absolute -right-2 -top-2 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                            )}
                          </div>
                        </button>
                      </a>
      
                      <button
                        onMouseEnter={() => setHoveredButton("book")}
                        onMouseLeave={() => setHoveredButton(null)}
                        className="group relative bg-gradient-to-r from-pink-500 to-rose-400 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 overflow-hidden animate-slide-in-right cursor-pointer"
                        style={{ animationDelay: "1.2s" }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        <div className="relative z-10 flex items-center gap-3">
                          <Calendar className="w-5 h-5 group-hover:animate-spin" />
                          Book Now
                          {hoveredButton === "book" && (
                            <div className="absolute -right-2 -top-2 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
                          )}
                        </div>
                      </button>
                    </div>
                  </div>
      
                  {/* Right Content - New Image Section */}
                  <div
                    className="flex-1 max-w-lg lg:max-w-xl relative animate-slide-in-right"
                    style={{ animationDelay: "0.8s" }}
                  >
                    <div className="relative">
                      {/* Main Image Container */}
                      <div className="relative transform hover:scale-105 transition-transform duration-700 group">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-3xl blur-xl transform rotate-6 animate-pulse"></div>
                        <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-4 border border-white/20">
                          <img
                            src="https://i.pinimg.com/1200x/c6/58/c9/c658c97ed95a94b2990dc7abe2715c96.jpg"
                            alt="Medical consultation"
                            className="w-full h-72 md:h-80 object-cover rounded-2xl shadow-2xl group-hover:shadow-3xl transition-shadow duration-700"
                          />
      
                          {/* Floating Elements on Image */}
                          <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-md rounded-2xl p-3 shadow-xl animate-float border border-white/30">
                            <Video className="w-6 h-6 text-blue-600" />
                            <div className="text-xs font-semibold text-gray-800 mt-1">
                              Live Consult
                            </div>
                          </div>
      
                          <div
                            className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-md rounded-2xl p-3 shadow-xl animate-float"
                            style={{ animationDelay: "1s" }}
                          >
                            <Heart
                              className="w-6 h-6 text-red-500"
                              fill="currentColor"
                            />
                            <div className="text-xs font-semibold text-gray-800 mt-1">
                              Health Care
                            </div>
                          </div>
      
                          <div className="absolute top-1/2 -right-6 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl p-2 shadow-xl animate-bounce-slow">
                            <div className="text-sm font-bold">24/7</div>
                            <div className="text-xs">Available</div>
                          </div>
                        </div>
                      </div>
      
                      {/* Decorative Elements */}
                      <div
                        className="absolute -z-10 top-4 right-4 w-64 h-64 bg-gradient-to-br from-pink-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse"
                        style={{ animationDelay: "2s" }}
                      ></div>
                      <div
                        className="absolute -z-10 bottom-8 left-8 w-48 h-48 bg-gradient-to-br from-cyan-300/20 to-blue-300/20 rounded-full blur-2xl animate-pulse"
                        style={{ animationDelay: "3s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      
            {/* Enhanced Keyframes and Animations */}
            <style jsx>{`
              @keyframes float {
                0%,
                100% {
                  transform: translateY(0px) rotate(0deg);
                }
                50% {
                  transform: translateY(-10px) rotate(180deg);
                }
              }
      
              @keyframes float-slow {
                0%,
                100% {
                  transform: translateY(0px);
                }
                50% {
                  transform: translateY(-15px);
                }
              }
      
              @keyframes bounce-slow {
                0%,
                100% {
                  transform: translateY(0);
                }
                50% {
                  transform: translateY(-10px);
                }
              }
      
              @keyframes scale-x-delayed {
                0% {
                  transform: scaleX(0);
                }
                100% {
                  transform: scaleX(1);
                }
              }
      
              @keyframes shimmer {
                0% {
                  transform: translateX(-100%);
                }
                100% {
                  transform: translateX(100%);
                }
              }
      
              @keyframes text-shimmer {
                0%,
                100% {
                  background-position: 200% center;
                }
                50% {
                  background-position: 0% center;
                }
              }
      
              @keyframes color-shift {
                0%,
                100% {
                  filter: hue-rotate(0deg);
                }
                50% {
                  filter: hue-rotate(60deg);
                }
              }
      
              @keyframes fade-in-up {
                from {
                  opacity: 0;
                  transform: translateY(30px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
      
              @keyframes slide-in-up {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
      
              @keyframes slide-in-left {
                from {
                  opacity: 0;
                  transform: translateX(-30px);
                }
                to {
                  opacity: 1;
                  transform: translateX(0);
                }
              }
      
              @keyframes slide-in-right {
                from {
                  opacity: 0;
                  transform: translateX(30px);
                }
                to {
                  opacity: 1;
                  transform: translateX(0);
                }
              }
      
              @keyframes number-count {
                from {
                  transform: scale(0.8);
                }
                to {
                  transform: scale(1);
                }
              }
      
              .animate-float {
                animation: float 3s ease-in-out infinite;
              }
      
              .animate-float-slow {
                animation: float-slow 4s ease-in-out infinite;
              }
      
              .animate-bounce-slow {
                animation: bounce-slow 3s ease-in-out infinite;
              }
      
              .animate-scale-x-delayed {
                animation: scale-x-delayed 2s ease-in-out 1s forwards;
              }
      
              .animate-shimmer {
                animation: shimmer 3s ease-in-out infinite;
              }
      
              .animate-text-shimmer {
                background-size: 200% auto;
                animation: text-shimmer 3s ease-in-out infinite;
              }
      
              .animate-color-shift {
                animation: color-shift 4s ease-in-out infinite;
              }
      
              .animate-fade-in-up {
                animation: fade-in-up 0.8s ease-out forwards;
                opacity: 0;
              }
      
              .animate-slide-in-up {
                animation: slide-in-up 0.6s ease-out forwards;
                opacity: 0;
              }
      
              .animate-slide-in-left {
                animation: slide-in-left 0.8s ease-out forwards;
                opacity: 0;
              }
      
              .animate-slide-in-right {
                animation: slide-in-right 0.8s ease-out forwards;
                opacity: 0;
              }
      
              .animate-number-count {
                animation: number-count 0.6s ease-out forwards;
              }
      
              .shadow-3xl {
                box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
              }
            `}</style>
    </div>
  );
};

export default DoctorsBanner;
