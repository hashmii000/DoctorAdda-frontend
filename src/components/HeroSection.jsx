import React from "react";
import Slider from "react-slick";
import {
  FaRupeeSign,
  FaMicroscope,
  FaVirus,
  FaClipboardList,
} from "react-icons/fa";
import { GiReceiveMoney, GiHealthPotion } from "react-icons/gi";

const slides = [
  {
    title: "Your one-stop destination for affordable and reliable imaging services",
    image:
      "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=400&h=300&fit=crop",
  },
  {
    title: "Advanced MRI, CT, X-Ray, and Ultrasound Scanning at Unbeatable Prices",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400",
  },
  {
    title: "Trusted by 130+ Radiologists Across India – Get Tested with Confidence",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
  },
];

const HeroCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div
      className="relative text-white overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
      }}
    >
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col md:flex-row items-center">
              {/* Left Section */}
              <div className="md:w-1/2 space-y-6">
                <h1 className="text-3xl md:text-4xl font-bold leading-snug">
                  {slide.title}
                </h1>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center space-x-3">
                    <FaRupeeSign className="text-xl text-yellow-300" />
                    <span>Honest pricing</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaVirus className="text-xl text-green-400" />
                    <span>100% covid safe</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaMicroscope className="text-xl text-pink-300" />
                    <span>130+ radiology experts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaClipboardList className="text-xl text-blue-300" />
                    <span>Labs across India</span>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex gap-4 mt-6">
                  <div className="bg-white text-black px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow">
                    <GiReceiveMoney className="text-green-600" />
                    100% Cash Back
                  </div>
                  <div className="bg-white text-black px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow">
                    <GiHealthPotion className="text-blue-600" />
                    100% Tax Benefit
                  </div>
                </div>

                {/* Search Box */}
                <div className="bg-white mt-8 p-4 rounded-lg shadow-lg text-black w-full max-w-xl flex items-center  justify-between">
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <input
                      type="text"
                      placeholder="Search doctors, specialties, or locations"
                      className="w-full md:w-2/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <select className="w-fit md:w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" style={{ width: "fit-content" }}>
                      <option>All Specialties</option>
                      <option>Radiology</option>
                      <option>Cardiology</option>
                      <option>Neurology</option>
                    </select>
                  </div>
                  <div className="">
                    <button className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
                      SEARCH
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Section with Larger Image */}
              <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center relative">
                <div className="w-96 h-96 bg-white rounded-full overflow-hidden shadow-2xl">
                  <img
                    src={slide.image}
                    alt="Slide Visual"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroCarousel;
