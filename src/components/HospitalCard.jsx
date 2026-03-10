import React from "react";
import { MapPin, BadgeCheck, Clock, Phone, Shield, Award, Stethoscope, Heart, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HospitalCard = (data) => {

  console.log("Hospital Card: data", data);

  const { name,
    address,
    _id,
    averageRating,
    phone,
    profileImage,
    facilities
  } = data.data;



  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/hospital/${_id
      }`);
  };

  // Provide fallbacks for missing data
  const displayName = name || "Hospital Name";
  const displayServices = facilities || "Medical Services";
  const displayPhone = phone || "Contact not available";
  const displayLocation = address || "Location not available";
  const displayRating = averageRating || 0;
  const displayImage = profileImage;

  return (
    <div
      onClick={handleViewDetails}
      className="bg-white cursor-pointer rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="flex flex-col md:flex-row gap-4 p-4">
        {/* Thumbnail */}
        <img
          src={displayImage}
          alt={displayName}
          className="w-full md:w-28 h-40 md:h-28 rounded-xl object-cover border border-gray-200"

        />

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-[#00669e]">{displayName}</h3>

            <p className="text-sm sm:text-base text-gray-600 mt-1 line-clamp-1">
              {displayServices.map((service) => service.name).join(", ")}
            </p>
          </div>

          {/* Meta Info */}
          <div className="mt-3 text-sm text-gray-500 space-y-1">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-400" />
              <span>{displayPhone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="line-clamp-1">{displayLocation}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Rating + Buttons */}
        <div className="flex md:flex-col justify-between items-center md:items-end mt-4 md:mt-0 gap-2 md:gap-4">
          {/* Rating */}
          <div className="flex items-center gap-1 text-yellow-400 text-sm font-medium">
            {"★".repeat(Math.floor(displayRating))}
            {displayRating % 1 !== 0 ? "½" : ""}
            <span className="ml-1 text-gray-700">{displayRating?.toFixed(1)}</span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2">
            <button

              className="h-9 px-4 text-sm text-[#00659d] bg-white hover:bg-[#00659d] hover:text-white border border-[#00659d] font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer"
            >
              View More
            </button>
            <button className="h-9 px-4 text-sm bg-[#00659d] hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer">
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;