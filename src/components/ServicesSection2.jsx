/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../Helpers";
import { Skeleton } from "antd"; 
// gkhky

const ServicesSection2 = () => {
  const navigation = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true); // for skeleton

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await getRequest("services?page=1&limit=10");
         console.log(" services:", res?.data?.data?.services);
        setServices(res?.data?.data?.services || []);
      } catch (error) {
        console.error("Error fetching services:", error);
      }finally {
      setLoading(false);
    }
    };
    fetchServices();
  }, []);

  return (
    <div className="w-full bg-white py-2 md:py-8">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 sm:w-full lg:w-[80%]  xl:w-[80%] 2xl:w-[70%] ">
        {/* Header */}
        <div className="text-center mb-4 md:mb-8">
          <h2 className="text-xl  md:text-2xl lg:text-4xl font-bold text-gray-800 mb-2 md:mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Categories
            </span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Quality healthcare services at your fingertips
          </p>
        </div>

        {/* Grid Services */}
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {loading ? (
                        // 🔹 Skeleton grid (shows 4 placeholders)
                        Array.from({ length: 6 }).map((_, i) => (
                          <div className="flex flex-col items-center " key={i}>
                          <Skeleton.Image active  />
                            
                            < Skeleton.Input className=" mt-2" />
                       
                          </div>
                        ))
                      ) :
          services.map((service) => (
            <div
              key={service.id}
              className="group cursor-pointer transition-all duration-300"
              onClick={() => {
                if (service?.name === "Blood Bank") navigation("/bloodbank");
                else if (service?.name === "Ambulance") navigation("/ambulance");
                else if (service?.name === "Pharmacies") navigation("/pharmacy");
                else if (service?.name === "Diagnostic") navigation("/diagnostic");
                else if (service?.name === "Doctors & Specialists") navigation("/doctor"); 
                else if (service?.name === "Hospitals & Clinics") navigation("/hospital");
              }}
            >
              {/* Image */}
              <div className="w-full h-20 sm:h-36 lg:h-30 2xl:h-40 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  
                />
              </div>

              {/* Service Name */}
              <h3 className="text-center mt-3 text-sm sm:text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 md:min-h-[3rem]">
                {service.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection2;
