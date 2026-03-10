/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  MapPin,
  BadgeCheck,
  Clock,
  Shield,
  Award,
  Stethoscope,
  Heart,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../../Helpers";
import { Download } from "lucide-react";
import { FaGooglePlay } from "react-icons/fa";
import { Skeleton, Card, Pagination } from "antd";
import useSelection from "antd/es/table/hooks/useSelection";
import { useSelector } from "react-redux";

// Mock DiagnosticCard component for demonstration

export const DiagnosticCard = ({
  name,
  services,
  storeTiming,
  address,
  averageRating,
  profileImage,
  _id,
}) => {
  const navigate = useNavigate();
  const handleViewDetails = () => {
    console.log("id", _id);
    navigate(`/bloodbank/${_id}`);
  };
  return (
    <div
      onClick={() => handleViewDetails()}
      className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row gap-4 p-4">
        {/* Thumbnail */}
        <img
          src={
            profileImage ||
            "https://media.istockphoto.com/id/1778188472/photo/doctor-examining-x-ray-images-in-mri-control-room.jpg?s=612x612&w=0&k=20&c=Qyw6_HvR1H7Yy4U7Nqz_fByN9n5n0tJcfNOVGRJEPjQ="
          }
          alt={profileImage}
          className="w-full md:w-20 h-40 md:h-28 rounded-xl object-cover border border-gray-200"
        />

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-[#00669e]">
              {name}
            </h3>
            <div className="text-sm sm:text-base text-gray-600 mt-1">
              {services &&
                services.map((service, index) => (
                  <div key={service._id || index} className="mb-1">
                    <div className="font-medium">Services:{service?.name}</div>
                    {/* <div className="text-gray-500">₹{service?.price}</div> */}
                  </div>
                ))}
            </div>
          </div>

          {/* Meta Info */}
          <div className="mt-3 text-sm text-gray-500 space-y-1">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>{storeTiming}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="line-clamp-1">{address}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Rating + Buttons */}
        <div className="flex md:flex-col justify-between items-center md:items-end mt-4 md:mt-0 gap-2 md:gap-4">
          {/* Rating */}
          <div className="flex items-center gap-1 text-yellow-400 text-sm font-medium">
            {"★".repeat(Math.floor(averageRating))}
            {averageRating % 1 !== 0 ? "½" : ""}
            <span className="ml-1 text-gray-700">
              {(averageRating ?? 0).toFixed(1)}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2">
            <button
              onClick={handleViewDetails}
              className="h-9 px-4 text-sm text-[#00659d] bg-white hover:bg-[#00659d] hover:text-white border border-[#00659d] font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer"
            >
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BloodBankListing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [hoveredButton, setHoveredButton] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [diagnosticData, setDiagnosticData] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 loading state
  const [location, setLocation] = useState({
    radius: "5000",
    latitude: "",
    longitude: "",
    page: 1,
    limit: 6,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [totalDiagnostics, setTotalDiagnostics] = useState(0);

  const locationData = useSelector((state) => state?.user?.locationData);
  console.log("locationData", locationData);

  useEffect(() => {
    const fetchDiagostic = async () => {
      const url = `diagnostics?longitude=${location?.longitude}&latitude=${location?.latitude}&radius=${location?.radius}&page=${location?.page}&isBloodBank=true`;
      try {
        setLoading(true);
        const response = await getRequest(url);
        if (response?.data?.data) {
          const diagnostics = response.data.data.diagnostics || [];
          const pages = response.data.data.totalPages || 1;
          const current = response.data.data.currentPage || 1;
          const total = response.data.data.totalDiagnostics || 0;

          setDiagnosticData(diagnostics);
          setTotalPages(pages);
          setLocation((prev) => ({ ...prev, page: current }));
          setTotalDiagnostics(total);
          setLocation((prev) => ({ ...prev, page: current }));
        }
      } catch (error) {
        console.error("Error in Diagnostic Search:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiagostic();
  }, [location.page]);

  const filteredData = diagnosticData.filter((diagnostic) => {
    const name = diagnostic?.name?.toLowerCase() || "";
    const address = diagnostic?.address?.toLowerCase() || "";
    const type = diagnostic?.type?.toLowerCase() || "";

    const matchesSearch =
      name.includes(searchTerm.toLowerCase()) ||
      address.includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterType === "all" || type.includes(filterType.toLowerCase());

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen pt-18">
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
        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.6),
              0 0 60px rgba(59, 130, 246, 0.4);
          }
        }
        @keyframes slideInLeft {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideInRight {
          0% {
            transform: translateX(100px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          0% {
            transform: translateY(50px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes rotateIn {
          0% {
            transform: rotate(-180deg) scale(0);
            opacity: 0;
          }
          100% {
            transform: rotate(0deg) scale(1);
            opacity: 1;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .animate-slide-left {
          animation: slideInLeft 1s ease-out;
        }
        .animate-slide-right {
          animation: slideInRight 1s ease-out;
        }
        .animate-fade-up {
          animation: fadeInUp 1s ease-out;
        }
        .animate-rotate-in {
          animation: rotateIn 1s ease-out;
        }
        .gradient-text {
          background: linear-gradient(135deg, #60a5fa, #34d399, #fbbf24);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Enhanced Hero Banner */}
      <div
        className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900"
        style={{
          background:
            "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/10 rounded-full animate-float"></div>
          <div
            className="absolute top-40 right-20 w-24 h-24 bg-cyan-400/10 rounded-full animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-400/10 rounded-full animate-float"
            style={{ animationDelay: "4s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/3 w-16 h-16 bg-green-400/10 rounded-full animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Medical Icons Floating */}
        <div className="absolute inset-0 pointer-events-none">
          <Stethoscope
            className="absolute top-20 left-1/4 w-8 h-8 text-blue-300/30 animate-float"
            style={{ animationDelay: "1s" }}
          />
          <Heart
            className="absolute top-60 right-1/4 w-6 h-6 text-red-300/30 animate-float"
            style={{ animationDelay: "3s" }}
          />
          <Shield
            className="absolute bottom-40 left-1/3 w-7 h-7 text-green-300/30 animate-float"
            style={{ animationDelay: "5s" }}
          />
        </div>

        <div className="relative sm:w-full lg:w-[80%] xl:w-[80%] 2xl:w-[70%] mx-auto px-4 pt-6 pb-14  md:px-6 md:pt-24 md:pb-22">
          <div className="grid grid-cols-2 md:gap-16 items-center">
            {/* Left Content - Enhanced with Animations */}
            <div className="text-white space-y-4 md:space-y-8 animate-slide-left">
              {/* Main Heading */}
              <div className="">
                <h2 className="text-xl md:text-2xl lg:text-4xl font-bold leading-tight">
                  <span className="block animate-fade-up">Blood Bank</span>
                  <span
                    className="block gradient-text animate-fade-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    Solutions
                  </span>
                </h2>
              </div>

              {/* Description */}
              <p
                className="text-white/90 text-sm sm:text-base leading-relaxed max-w-2xl animate-fade-up hidden md:block"
                style={{ animationDelay: "0.6s" }}
              >
                Ensuring life-saving support with safe, reliable blood services,
                advanced screening, and a commitment to compassionate care for
                every patient in need.
              </p>
              <p
                className="text-white/90 text-sm sm:text-base leading-relaxed max-w-2xl animate-fade-up  md:hidden"
                style={{ animationDelay: "0.6s" }}
              >
                Experience world-class blood bank services with safe donations
                and advanced screening technology.
              </p>

              {/* Enhanced Stats Grid */}

              {/* CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-4 md:pt-6 animate-fade-up"
                style={{ animationDelay: "1.6s" }}
              >
                <a href="https://play.google.com/store/apps/details?id=com.doctors.adda">
                  <button
                    onMouseEnter={() => setHoveredButton("download")}
                    onMouseLeave={() => setHoveredButton(null)}
                    className="group relative bg-white text-[#00669e] md:px-6 md:py-4 px-3 py-2 md:rounded-2xl rounded-lg font-bold text-xs md:text-base lg:text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 overflow-hidden animate-slide-in-left cursor-pointer"
                    style={{ animationDelay: "1s" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <div className="relative z-10 flex items-center md:gap-3 gap-1 group-hover:text-white transition-colors duration-300">
                      <FaGooglePlay className="w-5 h-5 group-hover:animate-bounce" />
                      Download App
                      {hoveredButton === "download" && (
                        <div className="absolute -right-2 -top-2 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                      )}
                    </div>
                  </button>
                </a>
              </div>
            </div>

            {/* Right Content - Enhanced Medical Imagery */}
            <div className="relative animate-slide-right">
              {/* Background Decorative Elements */}
              <div className="absolute -inset-4">
                <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div
                  className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>

              {/* Main Image Container */}
              <div className="relative z-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-2 md:p-8 animate-pulse-glow">
                  {/* Primary Diagnostic Image */}
                  <div className="relative overflow-hidden rounded-2xl md:mb-6">
                    <img
                      src="https://i.pinimg.com/736x/01/39/fc/0139fcb41a7ffb94ee6a3cb21b709116.jpg"
                      alt="Modern Diagnostic Equipment"
                      className="w-full h-32 md:h-64 object-cover transform hover:scale-110 transition-transform duration-700"
                    />
                    <div className=""></div>

                    {/* Floating Icons on Image */}
                    <div className="absolute top-4 right-4 bg-white/90 rounded-full p-3 animate-float">
                      <Stethoscope className="w-6 h-6 text-blue-600" />
                    </div>
                    <div
                      className="absolute bottom-4 left-4 bg-green-400/90 rounded-full p-3 animate-float "
                      style={{ animationDelay: "2s" }}
                    >
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Mini Feature Cards */}
                  <div className="grid grid-cols-2 gap-4 ">
                    <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl p-4 text-center hidden md:block">
                      <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 animate-rotate-in">
                        <Shield className="w-6 h-6 text-green-300" />
                      </div>
                      <p className="text-white text-sm font-semibold">
                        ISO Certified
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-4 text-center hidden md:block">
                      <div
                        className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 animate-rotate-in"
                        style={{ animationDelay: "0.5s" }}
                      >
                        <Award className="w-6 h-6 text-yellow-300" />
                      </div>
                      <p className="text-white text-sm font-semibold">
                        Award Winning
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Medical Equipment Images */}
                {/* <div className="absolute -top-8 -left-8 w-24 h-24 bg-white rounded-2xl shadow-2xl p-4 animate-float">
                  <img 
                    src="https://i.pinimg.com/736x/8d/56/07/8d56074f643dd94119cf773c6f74356e.jpg" 
                    alt="Medical Equipment" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div> */}

                <div
                  className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-br from-green-400 to-cyan-500 rounded-2xl shadow-2xl flex items-center justify-center animate-float hidden md:flex"
                  style={{ animationDelay: "3s" }}
                >
                  <Heart className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full md:h-12 h-8 fill-white"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
            ></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </div>

      {/* Rest of the component stays the same... */}
      <div className="sm:w-full lg:w-[80%]  xl:w-[80%] 2xl:w-[70%] mx-auto px-6 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-2 md:p-6 mb-8 border border-gray-100">
          <div className="flex flex-row items-center md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative ">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name or location..."
                className="w-full pl-10 pr-4 md:py-3 py-1  text-sm md:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-xl px-4 md:py-3 py-1 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="icu">ICU</option>
                <option value="emergency">Emergency</option>
                <option value="24/7">24/7</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl  md:text-2xl lg:text-3xl font-bold text-gray-800 text-center text-gray-800">
            Available{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Blood banks{" "}
            </span>
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <span>Live Updates</span>
          </div>
        </div>

        {/* Diagnostic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {loading ? (
            // 🔹 Skeleton grid (shows 4 placeholders)
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="rounded-2xl shadow-md">
                <Skeleton active avatar paragraph={{ rows: 3 }} />
              </Card>
            ))
          ) : filteredData.length > 0 ? (
            filteredData.map((data, index) => (
              <div
                key={index}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <DiagnosticCard {...data} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No blood bank found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {!loading && totalDiagnostics > 0 && (
        <div className="flex justify-center mt-8">
          <Pagination
            current={location.page}
            total={totalDiagnostics} // 👈 uses total items, not totalPages
            pageSize={10} // 👈 same as your API limit
            showSizeChanger={false} // hide pageSize dropdown (optional)
            onChange={(page) => setLocation((prev) => ({ ...prev, page }))}
          />
        </div>
      )}

      {/* WHY CHOOSE US */}
      {/* Why Choose Us Section */}
      <div className="sm:w-full lg:w-[80%]  xl:w-[80%] 2xl:w-[70%] mx-auto px-6 py-16">
        <h2 className="text-xl  md:text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-12 animate-fade-up">
          Why Choose <span className="gradient-text">Our Diagnostics</span>?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center transition-transform transform hover:scale-105 animate-fade-up">
            <Shield className="mx-auto w-10 h-10 text-blue-500 mb-4 animate-rotate-in" />
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Trusted & Certified Labs
            </h4>
            <p className="text-gray-600 text-sm">
              All our labs are NABL/ISO certified to maintain highest safety and
              accuracy standards.
            </p>
          </div>

          {/* Feature 2 */}
          <div
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center transition-transform transform hover:scale-105 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <Clock className="mx-auto w-10 h-10 text-indigo-500 mb-4 animate-rotate-in" />
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Fast & Timely Reports
            </h4>
            <p className="text-gray-600 text-sm">
              Get your reports delivered on time via email, app, or doorstep –
              hassle-free.
            </p>
          </div>

          {/* Feature 3 */}
          <div
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center transition-transform transform hover:scale-105 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Award className="mx-auto w-10 h-10 text-yellow-500 mb-4 animate-rotate-in" />
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Award-Winning Services
            </h4>
            <p className="text-gray-600 text-sm">
              Recognized for exceptional patient care and diagnostic innovation
              across regions.
            </p>
          </div>

          {/* Feature 4 */}
          <div
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center transition-transform transform hover:scale-105 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Heart className="mx-auto w-10 h-10 text-red-500 mb-4 animate-rotate-in" />
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Patient-Centric Approach
            </h4>
            <p className="text-gray-600 text-sm">
              Your comfort and health are our top priorities—always.
            </p>
          </div>

          {/* Feature 5 */}
          <div
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center transition-transform transform hover:scale-105 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Users className="mx-auto w-10 h-10 text-purple-500 mb-4 animate-rotate-in" />
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Expert Medical Team
            </h4>
            <p className="text-gray-600 text-sm">
              Our professionals ensure precise diagnostics and reliable
              reporting.
            </p>
          </div>

          {/* Feature 6 */}
          <div
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center transition-transform transform hover:scale-105 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            <MapPin className="mx-auto w-10 h-10 text-green-500 mb-4 animate-rotate-in" />
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Pan-India Presence
            </h4>
            <p className="text-gray-600 text-sm">
              Locate diagnostic centers near you with seamless booking via app
              or web.
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Contact Banner */}
      <div
        className=" text-white py-8 mt-12"
        style={{
          background:
            "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-2xl">🚨</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold">Medical Emergency?</h3>
              <p className="text-red-100">
                Call immediately for urgent medical assistance
              </p>
            </div>
          </div>
          <a
            href="tel:108"
            className="inline-flex items-center gap-2 bg-white text-red-600 font-bold py-3 px-12 rounded-full text-lg hover:bg-red-50 transition-all duration-300 transform hover:scale-105"
          >
            <span>📞</span>
            <span>Call 108</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BloodBankListing;
