import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Star,
  Video,
  Calendar,
  Phone,
  Clock,
  Shield,
  Award,
  Users,
  Smartphone,
  Download,
  Briefcase,
  Home,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import { getRequest } from "../Helpers";
import { Skeleton, Card, Pagination } from "antd";
import { FaApple, FaGooglePlay } from "react-icons/fa";

export const DoctorCard = ({ data, modeFilter }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    console.log("id", id);

    navigate(`/doctordetail/${id?._id}?modeFilter=${modeFilter}`);
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group ${
        isHovered ? "scale-105" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        onClick={() => handleViewDetails(data)}
        className="p-6 relative cursor-pointer"
      >
        {/* Doctor Image with Animation */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-white shadow-lg group-hover:ring-blue-200 transition-all duration-300">
              <img
                src={data?.profilepic}
                alt={data?.fullName}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-xl text-gray-800 mb-1 group-hover:text-blue-600 transition-colors duration-300">
              {data?.fullName}
            </h3>
            <p className="text-blue-600 font-medium mb-2">
              {data?.category?.name}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold text-gray-700">
                  {data?.averageRating}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                • {data?.experience} experience
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-gray-600">
            <MapPin className="w-[18px] h-[18px] text-blue-500 stroke-[1.5] shrink-0" />
            <span className="text-sm">{data?.clinics[0]?.clinicAddress}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Briefcase className="w-[18px] h-[18px] text-blue-500 stroke-[1.5] shrink-0" />
            <span className="text-sm">Service Type: {modeFilter}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">₹</span>
              </div>
              <div>
                <div className="font-bold text-gray-800">
                  ₹{data?.clinics[0]?.consultationFee}
                </div>
                <div className="text-xs text-gray-500">Consultation Fee</div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-gray-500 mb-1">Available</div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600 font-medium">
                  Today
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            style={{
              background:
                "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
            }}
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

const DoctorList = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();

  console.log("id", id);

  const [modeFilter, setModeFilter] = useState("In-clinic");
  const [isLoaded, setIsLoaded] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [isVeterinary, setIsVeterinary] = useState(false);
  const [loading, setLoading] = useState(true); // for skeleton
  console.log("isVeterinary====", isVeterinary);
  console.log("res doctors ===========>", doctors);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // how many doctors per page

  useEffect(() => {
    if (!id) return;

    const fetchDoctors = async () => {
      try {
        const catRes = await getRequest(`category`);
        const categories = catRes?.data?.data?.categories || [];

        // Find current category by id
        const currentCategory = categories.find((cat) => cat._id === id);
        const isVet = currentCategory?.name === "Veterinary";
        setIsVeterinary(isVet);
        console.log("isVeterinary?", isVet);

        let serviceType = modeFilter;

        // Ensure valid modeFilter for Veterinary or normal
        if (isVet && !["In-clinic", "Home Visit"].includes(modeFilter)) {
          serviceType = "In-clinic";
          setModeFilter("In-clinic");
        } else if (
          !isVet &&
          !["In-clinic", "Video Consultation"].includes(modeFilter)
        ) {
          serviceType = "In-clinic";
          setModeFilter("In-clinic");
        }

        // Use veterinaryServiceType for Veterinary, serviceType for others
        const queryParam = isVet
          ? `veterinaryServiceType=${serviceType}`
          : `serviceType=${serviceType}`; // <-- just use modeFilter value

        // Fetch doctors based on current modeFilter
        const res = await getRequest(
          `doctor/doctors?category=${id}&${queryParam}`
        );
        const fetchedDoctors = res?.data?.data?.doctors || [];
        setDoctors(fetchedDoctors);
        setIsLoaded(true);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [id, modeFilter]); // Added modeFilter here

  const handleTabChange = (tabKey) => {
    setModeFilter(tabKey);
  };

  // slice doctors for current page
  const paginatedDoctors = doctors.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200/30 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-teal-200/30 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-pink-200/30 rounded-full animate-float"></div>
      </div>

      {/* Hero Banner */}
      <div className="relative text-white overflow-hidden pt-24">
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-700 to-teal-600"
          style={{
            background:
              "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Animated Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse blur-sm"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-white/15 rounded-full animate-pulse delay-75 blur-sm"></div>
          <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-150 blur-sm"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full animate-bounce"></div>
        </div>

        <div
          className="relative lg:w-[70%] sm:w-full xl:w-[70%] flex items-center  flex-col md:flex-row mx-auto py-8 px-2 pb-2 text-center transition-all duration-1000 
            "
        >
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4  bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              {loading ? (
                // 🔹 Skeleton grid
                <div className="flex flex-col items-center">
                  <Skeleton.Input className="mt-2" active />
                </div>
              ) : (
                <span>{doctors[0]?.category?.name}</span>
              )}
            </h2>

            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {[
                { icon: Clock, text: "24/7 Available", color: "green" },
                { icon: Shield, text: "Verified Doctors", color: "blue" },
                { icon: Award, text: "Top Rated", color: "purple" },
                { icon: Users, text: "1000+ Patients", color: "teal" },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/30 transition-all duration-300 cursor-pointer transform hover:scale-105`}
                >
                  <item.icon className="w-5 h-5 text-white" />
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* App Download Section */}
          <div className=" mx-auto">
            <div className="bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-md rounded-3xl p-4 border border-white/20 shadow-2xl">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Phone Mockup */}
                <div className="relative">
                  <div className="w-32 h-56 bg-gradient-to-b from-gray-900 to-black rounded-3xl p-2 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="w-full h-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-8 bg-black/20 rounded-t-2xl flex items-center justify-center">
                        <div className="w-12 h-1 bg-white/30 rounded-full"></div>
                      </div>
                      <Smartphone className="w-8 h-8 text-white mb-2" />
                      <div className="text-white text-xs font-bold">
                        Doctors Adda
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <div className="w-6 h-1 bg-white/50 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Download Content */}
                <div className="text-center md:text-left flex-1">
                  <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                    Download Our App
                  </h3>
                  <p className="text-blue-100 mb-4 text-sm">
                    Book appointments, chat with doctors, and manage your health
                    on the go
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                    {/* <button className="w-full sm:w-auto flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-2xl font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer">
                      <FaApple className="w-5 h-5" />
                      <span>App Store</span>
                    </button> */}
                    <a href="https://play.google.com/store/apps/details?id=com.doctors.adda">
                      <button className="w-full sm:w-auto flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer">
                        <FaGooglePlay className="w-5 h-5" />
                        <span>Play Store</span>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className=" mx-auto px-4 py-12 lg:w-[70%] sm:w-full xl:w-[70%]">
        {/* Mode Filter Tabs */}

        <div className="flex justify-center gap-2 mb-12">
          {(isVeterinary
            ? [
                {
                  key: "In-clinic",
                  label: "In-Clinic Appointment",
                  icon: Calendar,
                },
                { key: "Home Visit", label: "Home Visit", icon: Home },
              ]
            : [
                {
                  key: "In-clinic",
                  label: "In-Clinic Appointment",
                  icon: Calendar,
                },
                {
                  key: "Video Consultation",
                  label: "Video Consultation",
                  icon: Video,
                },
              ]
          ).map((tab) => (
            <button
              key={tab?.key}
              onClick={() => handleTabChange(tab?.key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                modeFilter === tab?.key
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab?.label}
            </button>
          ))}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-gray-800">
              Available Doctors
            </h2>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {doctors?.length} found
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live Updates</span>
          </div>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="rounded-2xl shadow-md">
                <Skeleton active avatar paragraph={{ rows: 3 }} />
              </Card>
            ))
          ) : paginatedDoctors?.length > 0 ? (
            paginatedDoctors.map((doctor, index) => (
              <div
                key={index}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <DoctorCard data={doctor} modeFilter={modeFilter} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="text-8xl mb-6 animate-bounce flex justify-center">
                <img
                  width="100"
                  height="100"
                  src="https://img.icons8.com/pin/100/search.png"
                  alt="search"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3">
                No doctors found
              </h3>
              <p className="text-gray-500 text-lg">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* ✅ Pagination */}
        {!loading && doctors.length > pageSize && (
          <div className="flex justify-center mt-6">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={doctors.length}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>

      {/* Emergency Section */}
      <div className="relative text-white py-16 mt-16 overflow-hidden">
        <div
          className="absolute inset-0 "
          style={{
            background:
              "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-8 left-8 w-16 h-16 bg-white/10 rounded-full animate-pulse blur-sm"></div>
          <div className="absolute bottom-8 right-8 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-75 blur-sm"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse">
              <Phone className="w-10 h-10 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-3xl font-bold mb-2">Medical Emergency?</h3>
              <p className="text-red-100 text-lg">
                Call immediately for urgent medical assistance
              </p>
            </div>
          </div>

          <a
            href="tel:108"
            className="inline-flex items-center gap-3 bg-white text-red-600 font-bold py-4 px-8 rounded-2xl text-xl hover:bg-red-50 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
          >
            <Phone className="w-6 h-6" />
            <span>Call 108 Now</span>
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-3deg);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default DoctorList;
