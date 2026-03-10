import React from "react";
import { FaGooglePlay, FaApple } from "react-icons/fa";

const DownloadAppSection = () => {
  return (
    <section className="bg-[#f2f7fd] py-12 px-4 sm:px-6 md:px-12">
      <div className="bg-white px-4 rounded-2xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10 sm:w-full lg:w-[80%]  xl:w-[80%] 2xl:w-[70%] ">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-lg sm:text-4xl   text-black font-bold mb-4">
            Download the Dr. Adda App
          </h2>
          <p className="text-sm sm:text-base text-black mb-6">
            Book appointments, consult doctors, and manage your health — all in one place. Get the best care anytime, anywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start">
            {/* Play Store Button */}
            <a
              href="https://play.google.com/store/apps/details?id=com.doctors.adda"
              className="flex items-center gap-3 bg-white text-[#00669e] px-5 py-3 rounded-xl shadow-md hover:bg-gray-100 transition"
            >
              <FaGooglePlay size={22} />
              <span className="text-xs md:text-base font-semibold">Download App</span>
            </a>

            {/* App Store Button
            <a
              href="#"
              className="flex items-center gap-3 bg-white text-blue-700 px-5 py-3 rounded-xl shadow-md hover:bg-gray-100 transition"
            >
              <FaApple size={22} />
              <span className="text-xs md:text-base font-semibold">App Store</span>
            </a> */}
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 text-center">
          <img
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=500"
            alt="Dr. Adda App Preview"
            className="mx-auto w-64 sm:w-80 md:w-96 drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default DownloadAppSection;
