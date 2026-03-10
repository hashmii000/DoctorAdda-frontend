import React, { useEffect, useRef, useState } from "react";

const hospitals = [
  { name: "Apollo Hospital", image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400" },
  { name: "Fortis", image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400" },
  { name: "Max Healthcare", image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400" },
  { name: "AIIMS", image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400" },
  { name: "Medanta", image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400" },
  { name: "Manipal", image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400" },
  { name: "BLK Hospital", image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400" },
  { name: "Narayana Health", image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400" },
];

const FeaturedHospitals = () => {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(true);

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    const scroll = () => {
      if (!scrollContainer || !isScrolling) return;

      scrollContainer.scrollLeft += 0.5;

      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }

      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationRef.current);
  }, [isScrolling]);

  const hospitalList = [...hospitals, ...hospitals];

  const stopScrolling = () => setIsScrolling(false);
  const resumeScrolling = () => setIsScrolling(true);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
        Featured  <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Hospitals</span>
      </h2>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex whitespace-nowrap overflow-x-auto no-scrollbar"
          onMouseEnter={stopScrolling}
          onMouseLeave={resumeScrolling}
        >
          {hospitalList.map((hospital, index) => (
            <div
              key={index}
              className="mx-3 flex-shrink-0 text-center cursor-pointer"
              onClick={stopScrolling}
            >
              <div className="w-44 h-28 rounded-md overflow-hidden shadow-md border bg-white">
                <img
                  src={hospital.image}
                  alt={hospital.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-2 text-sm font-medium text-blue-900 w-44 truncate">
                {hospital.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar {
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default FeaturedHospitals;
