import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HealthBlogSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  const blogPosts = [
    {
      id: 1,
      title: "8 Best Foods Good for Tonsillitis",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Want To Tackle Tennis Elbow? Try These 8 Nutritional Remedies",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      title: "10 Shocking Benefits of Eating Pickles in Winter",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      title: "How to Maintain Heart Health During Cold Weather",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      title: "5 Essential Vitamins for Boosting Immunity",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    },
    {
      id: 6,
      title: "Managing Diabetes: Diet and Exercise Tips",
      image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&h=300&fit=crop",
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(blogPosts.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getCurrentPosts = () => {
    const start = currentSlide * itemsPerSlide;
    return blogPosts.slice(start, start + itemsPerSlide);
  };

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">


      <div className=" mx-auto sm:w-full lg:w-[80%]  xl:w-[80%] 2xl:w-[70%] ">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-xl  md:text-2xl lg:text-4xl font-bold text-gray-900">
            Health <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Blogs</span>
          </h2>
        </div>

        {/* Blog Cards Container */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {getCurrentPosts().map((post) => (
              <div key={post.id} className="bg-white rounded-2xl shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden rounded-t-2xl">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                </div>
                <div className="p-5">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800 hover:text-teal-600 transition-colors duration-200">
                    {post.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows (hide on small screens) */}
          <div className="hidden md:flex justify-between items-center absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none">
            <button
              onClick={prevSlide}
              className="pointer-events-auto -ml-4 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:bg-gray-50 group"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-teal-600" />
            </button>
            <button
              onClick={nextSlide}
              className="pointer-events-auto -mr-4 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:bg-gray-50 group"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-teal-600" />
            </button>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 md:h-3 md:w-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-teal-600 w-6 md:w-8' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthBlogSection;
