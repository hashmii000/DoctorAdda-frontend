import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, Play, Pause, Heart, Shield, Award } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      age: 34,
      location: "Mumbai, India",   
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      quote: "Dr. Sharma and his team performed a miracle. The level of care, expertise, and compassion I received was beyond exceptional. I'm grateful to be alive and healthy today.",
      verified: true,
    },
    {
      id: 2,
      name: "Michael Chen",
      age: 45,
      location: "Delhi, India", 
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      quote: "Outstanding orthopedic care! Dr. Patel's surgical precision and the rehabilitation team's support helped me regain my mobility. I'm back to playing tennis!",
      verified: true,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      age: 28,
      location: "Bangalore, India",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      quote: "Dr. Kumar's gentle approach with my daughter was incredible. The pediatric team made what could have been a scary experience into something positive and reassuring.",
      verified: true,
    },
    {
      id: 4,
      name: "David Thompson",
      age: 52,
      location: "Chennai, India",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      quote: "The neurological care I received was world-class. Dr. Mehta's expertise and the advanced treatment options available saved my quality of life.",
      verified: true,
    }
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        handleNext();
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, currentIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 300);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const current = testimonials[currentIndex];

  return (
    <div className="relative  py-8 px-4 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Stories of Hope <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> & Healing</span>
            </h2>
          
          
        </div>

        {/* Main Testimonial Card */}
        <div className="relative max-w-6xl mx-auto">
          <div className={`bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 transform ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
            <div className="lg:flex">
              {/* Image Section */}
              <div className="lg:w-2/5 relative">
                <div className="h-96 relative overflow-hidden">
                  <img 
                    src={current.image} 
                    alt={current.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Verified Badge */}
                  {current.verified && (
                    <div className="absolute top-6 right-6 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Shield className="w-4 h-4 mr-1" />
                      Verified
                    </div>
                  )}
                  
                  {/* Patient Info Overlay */}
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{current.name}</h3>
                    <p className="text-blue-200 text-sm">{current.location} • Age {current.age}</p>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-3/5 p-12">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    {/* Quote Icon */}
                    <div className="text-blue-500 mb-6">
                      <Quote className="w-12 h-12" />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-6">
                      <div className="flex space-x-1">
                        {renderStars(current.rating)}
                      </div>
                      <span className="ml-3 text-gray-500 font-medium">Perfect Rating</span>
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className=" text-gray-800 leading-relaxed mb-8 font-medium">
                      "{current.quote}"
                    </blockquote>

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-2">
            <button
              onClick={handlePrev}
              disabled={isAnimating}
              className="flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-50 group disabled:opacity-50"
            >
              <ChevronLeft className="w-8 h-8 text-gray-600 group-hover:text-blue-600" />
            </button>

            {/* Slide Indicators */}
            <div className="flex space-x-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative overflow-hidden transition-all duration-300 ${
                    index === currentIndex 
                      ? 'w-16 h-4 bg-blue-600 rounded-full' 
                      : 'w-4 h-4 bg-gray-300 rounded-full hover:bg-gray-400'
                  }`}
                >
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-blue-400 rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={isAnimating}
              className="flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-50 group disabled:opacity-50"
            >
              <ChevronRight className="w-8 h-8 text-gray-600 group-hover:text-blue-600" />
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default TestimonialsSection;