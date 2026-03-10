import React, { useEffect, useRef } from "react";

const services = [
  { id: 1, name: "Ambulance", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150" },
  { id: 2, name: "Pharmacies", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=150" },
  { id: 3, name: "Diagnostic", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150" },
  { id: 4, name: "Doctors & Specialists", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150" },
  { id: 5, name: "Hospitals & Clinics", image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=150" },
  { id: 6, name: "Emergency Care", image: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=150" },
  { id: 7, name: "Lab Tests", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=150" },
  { id: 8, name: "Nursing Care", image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=150" },
  { id: 4, name: "Doctors & Specialists", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150" },
  { id: 5, name: "Hospitals & Clinics", image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=150" },
  { id: 6, name: "Emergency Care", image: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=150" },
  { id: 7, name: "Lab Tests", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=150" },
  { id: 8, name: "Nursing Care", image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=150" },
  { id: 4, name: "Doctors & Specialists", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150" },
  { id: 5, name: "Hospitals & Clinics", image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=150" },
  { id: 6, name: "Emergency Care", image: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=150" },
  { id: 7, name: "Lab Tests", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=150" },
  { id: 8, name: "Nursing Care", image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=150" },
];

const SimpleAutoScrollServices = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const interval = setInterval(() => {
      if (!scrollContainer) return;
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      if (scrollContainer.scrollLeft >= maxScroll) {
        scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollContainer.scrollBy({ left: 160, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto  py-12">
      <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Our <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Services</span></h2>

      <div className="flex justify-center">
        <div
          ref={scrollRef}
          className="overflow-x-auto whitespace-nowrap no-scrollbar"
        >
          <div className="flex space-x-8 w-max justify-center px-4">
            {services.map((service) => (
              <div key={service.id} className="flex flex-col items-center flex-shrink-0">
                <div className="w-24 h-24 rounded-full overflow-hidden shadow border-2 border-white">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-2 text-sm text-center text-blue-900 font-medium w-28 leading-tight">
                  {service.name}
                </p>
              </div>
            ))}
          </div>
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

export default SimpleAutoScrollServices;
