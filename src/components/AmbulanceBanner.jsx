import React, { useState } from "react";
import { Download } from "lucide-react";
import { FaGooglePlay } from "react-icons/fa";
const AmbulanceBanner = () => {
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    <div
      className="relative overflow-hidden pt-22"
      style={{
        background:
          "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/15 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-white/10 rounded-full animate-ping "></div>
        <div className="absolute top-60 right-1/3 w-20 h-20 bg-white/10 rounded-full animate-bounce delay-300"></div>
      </div>

      <div className="relative sm:w-full lg:w-[80%] xl:w-[80%] 2xl:w-[70%] mx-auto py-4 pb-14 md:pb-26  px-4 md:py-22 sm:py-8">
        <div className="grid grid-cols-2 lg:grid-cols-2 md:gap-12 items-center ">
          {/* Left Content */}
          <div className="text-white z-10 relative">
           

            <h2 className="text-xl md:text-2xl lg:text-4xl font-bold md:mb-6 mb-4 leading-tight">
              <span className="block animate-slide-in-left">Emergency</span>
              <span className="block text-red-200 animate-slide-in-left delay-200">
                Ambulance
              </span>
              <span className="block text-base md:text-2xl font-normal md:mt-2 animate-slide-in-left delay-400">
                Services
              </span>
            </h2>

            <p className="text-white/90 text-sm sm:text-base mb-8 max-w-2xl leading-relaxed hidden md:block">
              Professional medical transport available 24/7 with trained
              paramedics and advanced life support equipment.
            </p>
            <p className="text-white/90 text-sm sm:text-base mb-4 max-w-2xl leading-relaxed md:hidden">
              Professional medical transport available 24/7 with trained
              paramedics .
            </p>

            {/* Feature Badges */}
            <div className="flex flex-wrap gap-3 md:mb-8 animate-fade-in-up delay-700">
              {["24/7 Available", "ICU Equipment", "Quick Response"].map(
                (feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/30 transition-all duration-300 hidden md:block"
                  >
                    <span className="text-green-400 text-lg">✓</span>
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                )
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:gap-4 ">
              <a href="https://play.google.com/store/apps/details?id=com.doctors.adda">
                <button
                  onMouseEnter={() => setHoveredButton("download")}
                  onMouseLeave={() => setHoveredButton(null)}
                  className="group relative bg-white text-[#00669e] md:px-6 md:py-4 px-3 py-2 md:rounded-2xl rounded-lg font-bold text-xs md:text-base lg:text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 overflow-hidden animate-slide-in-left cursor-pointer"
                  style={{ animationDelay: "1s" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <div className="relative  z-10 flex items-center md:gap-3 gap-1 group-hover:text-white transition-colors duration-300">
                    <FaGooglePlay className="w-5 h-5 group-hover:animate-bounce" />
                    Download App
                    {hoveredButton === "download" && (
                      <div className="absolute -right-2 -top-2 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                    )}
                  </div>
                </button>
              </a>

              {/* <a href="#emergency">
                <button
                  className="group bg-red-500 hover:bg-red-600 text-white border border-white  text-xs md:text-base font-semibold py-2 px-4 md:px-4 md:py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center xl:gap-3 mb-4 cursor-pointer  "
                  style={{
                    background:
                      "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
                  }}
                >
                  <span className="text-xs md:text-base group-hover:scale-110 transition-transform">
                    <img
                      width="25"
                      height="25"
                      src="https://img.icons8.com/fluency-systems-regular/50/FFFFFF/phone.png"
                      alt="phone"
                    />
                  </span>
                  Emergency Call
                </button>
              </a> */}
            </div>
          </div>

          {/* Right Side - Large Ambulance Image */}
          <div className="relative flex items-center justify-center ">
            <div className="relative z-10 animate-float">
              <img
                src="https://plus.unsplash.com/premium_photo-1723708841860-5b00cc402a62?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YW1idWxhbmNlfGVufDB8fDB8fHww"
                alt="Emergency Ambulance"
                className="w-full max-w-lg md:h-auto h-45 w-45  transform hover:scale-105 transition-transform duration-5000 drop-shadow-2xl rounded-2xl"
              />
              <div className="absolute inset-0 bg-white/20  rounded-full blur-3xl scale-110 animate-pulse"></div>
            </div>

            {/* Floating Stats Cards */}
            {/* <div className="absolute -top-8 -left-8 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl animate-bounce z-20 hidden md:block">
              <div className="text-blue-600 text-2xl font-bold">24/7</div>
              <div className="text-gray-600 text-sm font-medium">Available</div>
            </div> */}

            <div className="absolute -bottom-8 -right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl animate-pulse z-20 hidden md:block">
              <div className="text-green-600 text-2xl font-bold">&lt;8min</div>
              <div className="text-gray-600 text-sm font-medium">Response</div>
            </div>

            <div className="absolute top-1/2 -right-12 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl animate-bounce delay-500 z-20 hidden md:block" >
              <div className="text-red-600 text-2xl font-bold">98%</div>
              <div className="text-gray-600 text-sm font-medium">Success</div>
            </div>

            {/* Background decoration circles */}
            <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-white/10 rounded-full blur-xl animate-spin-slow"></div>
            <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-red-400/20 rounded-full blur-xl animate-pulse"></div>
          </div>
        </div>
        
      </div>
       {/* Bottom Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full md:h-12 h-8 fill-white"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
            ></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
    </div>
  );
};

export default AmbulanceBanner;
