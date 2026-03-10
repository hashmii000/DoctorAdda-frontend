import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import { Stethoscope, Heart, Brain, Eye, Activity, User } from "lucide-react";
import { getRequest } from "../Helpers/index";
import { Skeleton } from "antd";

const DoctorCategoryCards = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await getRequest("category");
      console.log("categorie", response?.data?.data?.categories);

      setCategories(response?.data?.data?.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const getIconByCategory = (name = "") => {
    if (
      name.includes("General Physician") ||
      name.includes("Dental Care") ||
      name.includes("Cardiologist")
    )
      return Heart;
    if (name.includes("Neurologist")) return Brain;
    if (name.includes("Child Specialist")) return Stethoscope;
    if (name.includes("Ear,Nose,Throat")) return Eye;
    if (name.includes("Physio")) return Activity;
    return User;
  };
  const getColorByCategory = (name = "") => {
    if (name.includes("General Physician")) return "from-blue-500 to-blue-300";
    if (name.includes("Dental Care")) return "from-green-500 to-green-300";
    if (name.includes("Cardiologist")) return "from-red-500 to-red-300";
    if (name.includes("Neurologist")) return "from-purple-500 to-purple-300";
    if (name.includes("Child Specialist"))
      return "from-yellow-400 to-yellow-200";
    if (name.includes("Ear,Nose,Throat")) return "from-pink-500 to-pink-300";
    if (name.includes("Physio")) return "from-indigo-500 to-indigo-300";
    return "from-orange-400 to-orange-200";
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 md:py-8 py-2 relative">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 sm:w-full lg:w-[80%] xl:w-[80%] 2xl:w-[70%]">
        {/* Header */}
        <div className="text-center mb-4 md:mb-8">
          <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-gray-800 md:mb-4 mb-1">
            Doctors &{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Specialists
            </span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Choose from our comprehensive range of medical specialties and
            connect with expert doctors
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={2}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{
              el: ".swiper-pagination-custom",
              clickable: true,
            }}
            autoplay={{ delay: 4000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {loading
              ? // 🔹 Show skeleton slides when loading
                Array.from({ length: 4 }).map((_, i) => (
                  <SwiperSlide key={i}>
                    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center">
                      <Skeleton.Image active />
                      <Skeleton.Input
                        active
                        className="mt-4 w-3/4"
                        size="small"
                      />

                      <Skeleton.Button active className="mt-4 w-full" />
                    </div>
                  </SwiperSlide>
                ))
              : categories.map((category, index) => {
                  const IconComponent = getIconByCategory(category.name);
                  return (
                    <SwiperSlide key={index}>
                      <div
                        onClick={() => navigate(`/doctorlist/${category?._id}`)}
                        className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden"
                      >
                        <div className="relative h-30 sm:h-48 md:h-40 overflow-hidden">
                          <img
                            src={category.imageUrl}
                            alt={category.name}
                            className="w-full h-full md:p-4 p-1 object-contain group-hover:scale-110 transition-transform duration-500"
                          />

                          <div
                            className={`absolute inset-0 bg-gradient-to-t ${getColorByCategory(
                              category.name
                            )} opacity-0 group-hover:opacity-80 transition-opacity duration-300`}
                          />

                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 transform group-hover:scale-110 transition-transform duration-300">
                            <IconComponent className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="text-center text-white">
                              <IconComponent className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2" />
                              <p className="text-xs sm:text-sm font-medium">
                                Click to View Doctors
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="md:p-4 sm:p-6 p-2">
                          <h3 className="md:mb-2 text-sm sm:text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                            {category.name}
                          </h3>
                          <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2">
                            {category.description}
                          </p>
                          <button className="w-full bg-[#00669e] text-white text-xs md:text-base font-semibold py-2 sm:py-3 px-4 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg">
                            View More
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
          </Swiper>

          {/* Navigation Arrows */}
          <div className="hidden sm:flex absolute inset-y-0 -left-4 items-center z-10">
            <div className="swiper-button-prev-custom bg-white text-blue-600 border border-blue-500 rounded-full p-2 shadow hover:bg-blue-100 transition duration-300 cursor-pointer">
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </div>
          </div>
          <div className="hidden sm:flex absolute inset-y-0 -right-4 items-center z-10">
            <div className="swiper-button-next-custom bg-white text-blue-600 border border-blue-500 rounded-full p-2 shadow hover:bg-blue-100 transition duration-300 cursor-pointer">
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="swiper-pagination-custom md:mt-6 mt-2 text-center" />

        {/* View All Button */}
        <div className="flex justify-center md:mt-8 mt-2">
          <button
            onClick={() => navigate("/doctor")}
            className="w-40 bg-[#00669e] text-white text-xs md:text-base font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCategoryCards;
