import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { getRequest } from "../Helpers";
import { Skeleton } from "antd";

const ProfessionalImagePopup = ({data}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true); // for skeleton
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isLoading, setIsLoading] = useState(true);



  console.log("data---------",data);
  

  const images = [
    {
      url: "https://i.pinimg.com/736x/89/01/7c/89017cd7b1b2e4c5fbfd214253cb08be.jpg",
     
    },
    {
      url: "https://i.pinimg.com/736x/89/8f/8e/898f8e9a67421273d816d3c0c86b6d3d.jpg",

    },
    {
      url: "https://i.pinimg.com/1200x/1d/49/dc/1d49dcda5c949785d99d71d7fbd235a0.jpg",
 
    },
  ];

  useEffect(() => {

   



    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isAutoplay || !isOpen) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoplay, isOpen, images.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className=" rounded-3xl relative overflow-hidden transform animate-slideUp">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/60 to-transparent p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4"></div>

            <button
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 hover:rotate-90"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Main Content */}
        {/* Main Content */}
        <div className="rounded-3xl relative  md:h-[28rem]  overflow-hidden">
          {/* Loading Skeleton */}
          {isLoading && (
            <div className=" absolute inset-0 bg-white animate-pulse" />
          )}

          {/* Image Display */}
          <div className="relative w-full h-full">
            {loading && (
                      <Skeleton.Image
                        active
                         className="!w-[700px] !h-[200px] sm:!h-[300px] md:!h-[500px] !rounded-xl"
                      />
                    )}
            <img
              src={data[currentSlide]?.imageUrl}
              alt={images[currentSlide]?.title}
              className="w-full h-[100%] bg-white object-contain transition-all duration-700 ease-in-out"
              
              onLoad={() => setLoading(false)}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 " />
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 z-10"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 z-10"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots Indicator BELOW image */}
        {/* Dots Indicator BELOW image with transparent background */}
        <div className="flex justify-center items-center space-x-3 mt-4 mb-4 ">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative transition-all duration-300 ${
                index === currentSlide
                  ? "w-12 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                  : "w-3 h-3 bg-gray-300 hover:bg-gray-400 rounded-full"
              }`}
            >
              {index === currentSlide && (
                <div className="absolute inset-0 bg-white rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes fadeIn {
          from { 
            opacity: 0;
            backdrop-filter: blur(0px);
          }
          to { 
            opacity: 1;
            backdrop-filter: blur(12px);
          }
        }
        
        @keyframes slideUp {
          from { 
            transform: translateY(100px) scale(0.95);
            opacity: 0;
          }
          to { 
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
        }

        /* Custom scrollbar for future content */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #2563eb, #7c3aed);
        }
      `}</style>
    </div>
  );
};

export default ProfessionalImagePopup;
