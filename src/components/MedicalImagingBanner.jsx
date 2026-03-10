import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getRequest } from "../Helpers";
import { Skeleton } from "antd";
import { useNavigate } from "react-router-dom";

const fallbackImages = [
  "https://i.pinimg.com/736x/e3/e9/c8/e3e9c89572ed78a8172ea954618946eb.jpg",
  "https://i.pinimg.com/736x/9d/6b/af/9d6baf6d9fbc4aa810f9f78b8f42616a.jpg",
  "https://i.pinimg.com/736x/e2/6d/35/e26d352c8710bab40b472bca96997506.jpg",
];

const MedicalImagingBanner = () => {
  const [bannerData, setBannerData] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getRequest(`banner?isPagination=false`)
      .then((res) => {
        setBannerData(res?.data?.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  }, []);

  const images =
    bannerData.length > 0
      ? bannerData
      : fallbackImages.map((url) => ({ imageUrl: url, name: "default" }));

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const getIndex = (index) => {
    return (index + images.length) % images.length;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [current, images.length]);

  const handleClick = (item) => {
    switch (item.name?.toLowerCase()) {
      case "doctor":
        navigate(`/doctordetail/${item.id}`);
        break;
      case "hospital":
        navigate(`/hospital/${item.id}`);
        break;
      case "diagnostic":
        navigate(`/diagnostic/${item.id}`);
        break;
      case "ambulance":
        navigate(`/ambulance/${item.id}`);
        break;
      case "pharmacy":
        navigate(`/pharmacy/${item.id}`);
        break;
      default:
        console.log("No route for:", item.name);
    }
  };

  if (loading) {
    return (
      <div className="relative mx-auto flex items-center justify-center h-[170px] md:h-[280px] sm:w-full lg:w-[80%] xl:w-[80%] 2xl:w-[70%]">
        <div className="relative flex items-center justify-center w-full overflow-hidden">
          {/* Prev skeleton */}
          <Skeleton.Image
            active
            className="!w-[700px] !h-[120px] md:!h-[260px] rounded-2xl opacity-50 scale-90"
          />

          {/* Current skeleton */}
          <Skeleton.Image
            active
            className="!absolute !w-[700px] !h-[120px] md:!h-[260px] rounded-2xl z-10 shadow-xl"
          />

          {/* Next skeleton */}
          <Skeleton.Image
            active
            className="!w-[700px] !h-[120px] md:!h-[260px] rounded-2xl opacity-50 scale-90"
          />
        </div>
      </div>
    );
  }

  if (images.length === 0) return null;

  return (
    <div className="relative mx-auto flex items-center justify-center h-[170px] md:h-[280px] sm:w-full lg:w-[80%] xl:w-[80%] 2xl:w-[70%]">
      <div className="relative flex items-center justify-center w-full overflow-hidden">
        <img
          src={images[getIndex(current - 1)].imageUrl}
          alt="prev"
          className="w-[700px] md:h-[260px] h-[120px] object-cover rounded-2xl opacity-50 scale-90 transition-all duration-300"
        />

        {/* Clickable current banner */}
        <div
          onClick={() => handleClick(images[current])}
          className="absolute h-[120px] md:w-[700px] md:h-[260px] rounded-2xl z-10 shadow-xl transition-all duration-500 cursor-pointer"
        >
          <img
            src={images[current].imageUrl}
            alt="current"
            className="w-full h-full object-contain bg-[#1f73a7] rounded-2xl"
          />
        </div>

        <img
          src={images[getIndex(current + 1)].imageUrl}
          alt="next"
          className="w-[700px] md:h-[260px] h-[120px] object-cover rounded-2xl opacity-50 scale-90 transition-all duration-300"
        />
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-10 top-1/2 -translate-y-1/2 bg-white md:w-10 md:h-10 w-8 h-8 flex items-center justify-center rounded-full shadow-md z-20"
      >
        <ChevronLeft className="text-black" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-10 top-1/2 -translate-y-1/2 bg-white md:w-10 md:h-10 w-8 h-8 flex items-center justify-center rounded-full shadow-md z-20"
      >
        <ChevronRight className="text-black" />
      </button>
    </div>
  );
};

export default MedicalImagingBanner;
