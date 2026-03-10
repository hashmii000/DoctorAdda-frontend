/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Star,
  MapPin,
  PhoneCall,
  BadgeCheck,
  PlusCircle,
  StarHalf,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { getRequest } from "../Helpers";
import DiagonsticsReviewPopup from "../components/DiagonsticsReviewPopup";

const AmbulanceDetailPage = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [ambulance, setAmbulance] = useState(null);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    getRequest(`ambulance/${id}`)
      .then((res) => {
        console.log("ambulance ===", res?.data?.data);
        setAmbulance(res?.data?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [id, updateStatus]);

  const phoneNumber = "108";
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const [showFallback, setShowFallback] = useState(false);
  const tryTelLink = () => {
    const telUrl = `tel:${phoneNumber}`;
    const timeout = setTimeout(() => {
      // If nothing happened → show fallback popup
      setShowFallback(true);
    }, 1500);

    window.location.href = telUrl;

    // If the page is hidden (meaning app opened), cancel timeout
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) clearTimeout(timeout);
    });
  };

  const handleClick = () => {
    if (isMobile) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      tryTelLink();
    }
  };

  return (
    <div className="sm:w-full lg:w-[80%]  xl:w-[80%] 2xl:w-[70%] mx-auto  py-10 space-y-8 pt-24 md:pt-40 ">
      {/* Heading */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2 bg-white rounded-xl shadow overflow-hidden flex">
          <img
            src={ambulance?.profilepic || "N/A"}
            alt="Ambulance"
            className="w-full h-70 md:h-130  object-cover object-center"
          />
        </div>

        {/* Right Side - Basic Info */}
        <div className="w-full md:w-1/2 space-y-4">
          <div className="bg-white rounded-xl shadow-md p-5">
            <h1 className="text-2xl font-bold text-[#00679f] mb-2">
              {ambulance?.name || "N/A"}
            </h1>
            <p className="text-gray-600 flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-red-500" />{" "}
              {ambulance?.address || "N/A"}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 grid grid-cols-2 gap-4 text-sm text-gray-700">
            <p className="">
              <strong className="text-[#00679f]">Price:</strong>{" "}
              {ambulance?.price || "N/A"}
            </p>
            <p>
              <strong className="text-[#00679f]">Capacity:</strong>{" "}
              {ambulance?.capacity || "N/A"} Patients
            </p>
            <p>
              <strong className="text-[#00679f]">Status:</strong>{" "}
              <span className="text-green-600 font-medium">
                {ambulance?.availabilityStatus || "N/A"}
              </span>
            </p>
            <p>
              <strong className="text-[#00679f]">Approval:</strong>{" "}
              <BadgeCheck className="inline w-4 h-4 text-blue-500" />{" "}
              {ambulance?.isApprove || "N/A"}
            </p>
            <p>
              <strong className="text-[#00679f]">Operating Hours:</strong>{" "}
              {ambulance?.operatingHours || "N/A"}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 space-y-2 text-sm">
            <p>
              <strong className="text-[#00679f]">Driver:</strong>{" "}
              {ambulance?.driverInfo?.name || "N/A"}
            </p>
            <p>
              <strong className="text-[#00679f]">Mobile No:</strong>{" "}
              {ambulance?.driverInfo?.mobile || "N/A"}{" "}
            </p>
            <p>
              <strong className="text-[#00679f]">License No:</strong>{" "}
              {ambulance?.driverInfo?.licenseNumber || "N/A"}
            </p>
            <p>
              <strong className="text-[#00679f]">Emergency Contact:</strong>{" "}
              {ambulance?.driverInfo?.emergencyContact || "N/A"}
            </p>
          </div>

          {/* <div className="bg-white rounded-xl shadow-md p-4">
            <button
              onClick={handleClick}
              className="w-full bg-[#9f004e] text-white py-2 rounded-lg hover:bg-red-700 transition duration-200 text-sm font-medium flex justify-center items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" /> Call Now
            </button>
            
          </div> */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <a
              href={`tel:${ambulance?.driverInfo?.mobile}`}
              className="w-full bg-[#9f004e] text-white py-2 rounded-lg hover:bg-red-700 transition duration-200 text-sm font-medium flex justify-center items-center gap-2 rounded-lg justify-center"
            >
              <PhoneCall className="w-4 h-4" /> Call Now
            </a>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="border-b border-gray-200 mb-4">
          <nav className="flex gap-8">
            <button
              className={`pb-2 font-medium ${
                activeTab === "about"
                  ? "border-b-2 border-[#00679f] text-[#00679f] "
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("about")}
            >
              About
            </button>
            <button
              className={`pb-2 font-medium ${
                activeTab === "review"
                  ? "border-b-2 border-[#00679f] text-[#00679f]"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("review")}
            >
              Reviews
            </button>
          </nav>
        </div>

        {/* About Section */}
        {activeTab === "about" && (
          <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
            <div>
              <h3 className="text-lg font-semibold text-[#00679f] mb-3">
                About {ambulance?.name || "N/A"}
              </h3>
              <p className="text-gray-700 text-justify">
                {ambulance?.name || "N/A"}
              </p>
              <p className="mt-2 text-gray-700 text-justify">
                {ambulance?.description || "N/A"}
              </p>
            </div>
          </div>
        )}

        {/* Review Section */}
        {activeTab === "review" && (
          <div className="space-y-8">
            <div className="flex  justify-between  w-full">
              {/* Left side: Reviews */}
              <div className="text-left">
                <h3 className="text-lg font-semibold text-[#00679f] mb-3">
                  What Our Patients Say
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => {
                      const rating = ambulance?.averageRating || 0;
                      if (i + 1 <= rating) {
                        // Full star
                        return (
                          <Star
                            key={i}
                            className="w-4 h-4 md:w-6 md:h-6 fill-current"
                          />
                        );
                      } else if (i < rating && rating < i + 1) {
                        // Half star
                        return (
                          <StarHalf
                            key={i}
                            className="md:w-6 md:h-6 fill-current"
                          />
                        );
                      } else {
                        // Empty star
                        return (
                          <Star
                            key={i}
                            className="md:w-6 md:h-6 text-gray-300"
                          />
                        );
                      }
                    })}
                  </div>

                  <span className="text-xs md:text-base font-bold text-gray-900 ml-2">
                    {ambulance?.averageRating?.toFixed(1) || "0.0"}
                  </span>

                  <span className="ml-2 text-gray-500 text-xs md:text-base">
                    ({ambulance?.reviews?.length || 0} reviews)
                  </span>
                </div>
              </div>
              {/* Right side: Share button */}
              <div className="text-right">
                <button
                  onClick={() => setShowReviewPopup(true)}
                  className="group bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-2 py-2 md:px-8 md:py-4 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 text-xs md:text-base font-semibold flex items-center gap-1 md:gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <PlusCircle className="w-5 h-5 group-hover:animate-spin" />
                  Share Your Experience
                </button>
              </div>
            </div>
            <div className="grid gap-6">
              {ambulance?.reviews?.map((review) => (
                <div
                  key={review._id}
                  className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start gap-6">
                    <div className="relative">
                      <img
                        src={
                          review?.user?.profilepic ||
                          "https://ui-avatars.com/api/?name=Anonymous&background=random"
                        }
                        alt={review?.user?.name}
                        className="h-12 w-12  md:w-16 md:h-16 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                        <BadgeCheck className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-sm text-gray-900 ">
                          {review?.user?.name}
                        </h4>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 md:w-5 md:h-5 ${
                                i < review.rating
                                  ? "fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs md:text-base text-gray-700 leading-relaxed italic">
                        "{review?.comment}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <DiagonsticsReviewPopup
        setUpdateStatus={setUpdateStatus}
        open={showReviewPopup}
        onClose={() => setShowReviewPopup(false)}
        id={ambulance?._id}
        entityType="ambulance"
        //onReviewAdded={fetchAmbulance}
      />
    </div>
  );
};

export default AmbulanceDetailPage;
