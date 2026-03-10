import React, { useEffect, useState } from "react";
import PharmacyCard from "../components/PharmacyCard";
import { getRequest } from "../Helpers";
import { Download } from "lucide-react";
import { FaGooglePlay } from "react-icons/fa";
import { Skeleton, Card, Pagination } from "antd";

const PharmacyPage = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [pharmacyData, setPharmacyData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Pagination states (from API)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPharmacies, setTotalPharmacies] = useState(0);
  const itemsPerPage = 6; // server decides, but we’ll keep it for UI control

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 🔹 Fetch pharmacies (server-side pagination)
  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        setLoading(true);
        // Pass pagination params to API
        const response = await getRequest(
          `pharmacy?page=${currentPage}&limit=${itemsPerPage}`
        );
        const result = response?.data?.data;

        setPharmacyData(result?.pharmacies || []);
        setTotalPages(result?.totalPages || 1);
        setTotalPharmacies(result?.totalPharmacies || 0);
      } catch (error) {
        console.error("Error Fetching Pharmacies:", error);
        setPharmacyData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPharmacies();
  }, [currentPage]);

  // 🔹 Client-side filter/search (only on current page data)
  const filteredData = pharmacyData.filter((pharmacy) => {
    const matchesSearch =
      pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === "all" ||
      pharmacy.type?.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-22">
      {/*  Hero Banner with Animations and Images */}
      <div
        className="relative text-white overflow-hidden "
        style={{
          background:
            "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Floating Medical Icons */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-full animate-bounce"
            style={{ animationDelay: "0s", animationDuration: "3s" }}
          >
            <div className="w-full h-full flex items-center justify-center text-2xl"></div>
          </div>
          <div
            className="absolute top-32 right-20 w-20 h-20 bg-white/10 rounded-full animate-bounce"
            style={{ animationDelay: "1s", animationDuration: "4s" }}
          >
            <div className="w-full h-full flex items-center justify-center text-3xl"></div>
          </div>
          <div
            className="absolute bottom-32 left-1/4 w-14 h-14 bg-white/10 rounded-full animate-bounce"
            style={{ animationDelay: "2s", animationDuration: "3.5s" }}
          >
            <div className="w-full h-full flex items-center justify-center text-xl"></div>
          </div>
          <div
            className="absolute top-40 left-1/2 w-12 h-12 bg-white/10 rounded-full animate-bounce"
            style={{ animationDelay: "0.5s", animationDuration: "2.8s" }}
          >
            <div className="w-full h-full flex items-center justify-center text-lg"></div>
          </div>
          <div
            className="absolute bottom-20 right-1/3 w-18 h-18 bg-white/10 rounded-full animate-bounce"
            style={{ animationDelay: "1.5s", animationDuration: "3.2s" }}
          >
            <div className="w-full h-full flex items-center justify-center text-2xl"></div>
          </div>
        </div>

        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse"></div>
          <div
            className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative sm:w-full lg:w-[80%] xl:w-[80%] 2xl:w-[70%] mx-auto  pt-4 pb-12  px-4 md:px-4 md:pt-22 md:pb-28 ">
          <div className="grid grid-cols-2 lg:grid-cols-2 md:gap-12 items-center">
            {/* Left Content */}
            <div className=" lg:text-left">
              <h2 className="text-xl md:text-2xl lg:text-4xl font-bold mb-2 md:mb-6 animate-fadeIn">
                <span className="block">Pharmacy &</span>
                <span className="block bg-gradient-to-r from-cyan-200 to-green-200 bg-clip-text text-transparent">
                  Medicine
                </span>
              </h2>

              <p
                className="text-white/90 text-sm sm:text-base mb-4 md:mb-8 max-w-2xl animate-fadeIn"
                style={{ animationDelay: "0.3s" }}
              >
                Fast, genuine and accessible medication for you and your loved
                ones.
                <span className="block mt-2 text-cyan-200 hidden md:block ">
                  Available 24/7 with home delivery
                </span>
              </p>

              <div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center md:mb-8 animate-fadeIn"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 transform hover:scale-105 transition-all duration-300 hidden md:block">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-sm font-medium">Open 24/7</span>
                </div>
                <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 transform hover:scale-105 transition-all duration-300 hidden md:block">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-sm font-medium">Home Delivery</span>
                </div>
                <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 transform hover:scale-105 transition-all duration-300 hidden md:block">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-sm font-medium">Affordable Rates</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-4  lg:justify-start animate-fadeIn "
                style={{ animationDelay: "0.9s" }}
              >
                <a href="https://play.google.com/store/apps/details?id=com.doctors.adda">
                  <button
                    onMouseEnter={() => setHoveredButton("download")}
                    onMouseLeave={() => setHoveredButton(null)}
                    className="group relative bg-white text-[#00669e] md:px-6 md:py-4 px-3 py-2 md:rounded-2xl rounded-lg font-bold   text-xs md:text-base lg:text-lg hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 overflow-hidden animate-slide-in-left cursor-pointer"
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

                {/* <button className="border-2 border-white text-white font-bold py-4 px-6 rounded-full text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                  Book Appointment
                </button> */}
              </div>
            </div>

            {/* Right Image Section */}
            <div
              className="relative animate-fadeIn"
              style={{ animationDelay: "1.2s" }}
            >
              {/* Main Pharmacy Image */}
              <div className="relative  transform hover:scale-105 transition-all duration-500">
                <img
                  src="https://i.pinimg.com/1200x/22/5f/72/225f7235a14637546d64444531eafee2.jpg"
                  alt="Modern Pharmacy"
                  className="lg:w-full lg:h-80 md:w-full md:h-60 w-full h-50 object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
              </div>

              {/* Floating Medicine Cards */}
              {/* <div
                className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-xl animate-bounce hidden md:block"
                style={{ animationDelay: "1s", animationDuration: "3s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">
                      <img
                        width="25"
                        height="25"
                        src="https://img.icons8.com/emoji/48/pill-emoji.png"
                        alt="pill-emoji"
                      />
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">
                      Quick Delivery
                    </p>
                    <p className="text-xs text-gray-600">30 mins</p>
                  </div>
                </div>
              </div> */}

              <div
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl animate-bounce hidden md:block"
                style={{ animationDelay: "2s", animationDuration: "2.5s" }}
              >
                <div className="flex items-center gap-3 ">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">
                      <img
                        width="25"
                        height="25"
                        src="https://img.icons8.com/emoji/48/hospital-emoji.png"
                        alt="hospital-emoji"
                      />
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">
                      24/7 Available
                    </p>
                    <p className="text-xs text-gray-600">Always Open</p>
                  </div>
                </div>
              </div>

              <div
                className="absolute top-1/2 -left-8 bg-white rounded-2xl p-3 shadow-xl animate-bounce hidden md:block"
                style={{ animationDelay: "0.5s", animationDuration: "4s" }}
              >
                <div className="text-center ">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-lg">
                      <img
                        width="25"
                        height="25"
                        src="https://img.icons8.com/fluency/48/verified-badge--v1.png"
                        alt="verified-badge--v1"
                      />
                    </span>
                  </div>
                  <p className="text-xs font-bold text-gray-800">Verified</p>
                </div>
              </div>

              {/* Background Decoration */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-2xl animate-pulse"></div>
              <div
                className="absolute -bottom-8 -left-8 w-28 h-28 bg-gradient-to-r from-green-400/30 to-teal-400/30 rounded-full blur-2xl animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Enhanced Wave divider with animation */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden ">
          <svg
            className="relative block w-full md:h-12 h-8 animate-pulse"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              fill="currentColor"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              fill="currentColor"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>

      {/* Add custom CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>

      {/* Search + Filters */}
      <div className="sm:w-full lg:w-[80%] xl:w-[80%] 2xl:w-[70%] mx-auto px-2 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-2 md:p-6 mb-8 border border-gray-100">
          <div className="flex flex-row items-center md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by name or location..."
              className="w-full pl-4 pr-4 md:py-3 py-1 text-sm md:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* <select
              className="bg-white text-sm md:text-base border border-gray-300 rounded-xl px-4 md:py-3 py-1 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="24/7">24/7</option>
              <option value="generic">Generic Medicine</option>
              <option value="home delivery">Home Delivery</option>
            </select> */}
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {loading ? (
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
                <PharmacyCard {...data} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Pharmacies found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Pagination (now uses API totalPharmacies) */}
        {totalPharmacies > itemsPerPage && (
          <div className="flex justify-center mt-10">
            <Pagination
              current={currentPage}
              total={totalPharmacies} // from API
              pageSize={itemsPerPage}
              onChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 500, behavior: "smooth" });
              }}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>
      {/* why choose us */}
      {/* Why Choose Section */}
      <div className="sm:w-full lg:w-[80%]  xl:w-[80%] 2xl:w-[70%] mx-auto px-4 md:py-8">
        <h2 className="text-xl  md:text-2xl lg:text-3xl font-bold text-gray-800 text-center text-gray-800 md:mb-10">
          Why Choose{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Our Pharmacy Services?
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 animate-fadeIn">
            <div className="w-14 h-14 bg-green-100 text-green-600 flex items-center justify-center rounded-full mb-4">
              <img
                src="https://img.icons8.com/emoji/48/pill-emoji.png"
                alt="pill"
                width={28}
              />
            </div>
            <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
              24/7 Availability
            </h4>
            <p className="text-gray-600 text-sm">
              We’re always open — day or night — ensuring you get essential
              medicines without delays.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 animate-fadeIn"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="w-14 h-14 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full mb-4">
              <img
                src="https://img.icons8.com/color/48/motorcycle-delivery-single-box.png"
                alt="delivery"
                width={28}
              />
            </div>
            <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
              Home Delivery
            </h4>
            <p className="text-gray-600 text-sm">
              Hassle-free doorstep delivery of your medicines, saving your time
              and travel.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 animate-fadeIn"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="w-14 h-14 bg-yellow-100 text-yellow-600 flex items-center justify-center rounded-full mb-4">
              <img
                src="https://img.icons8.com/emoji/48/money-mouth-face.png"
                alt="affordable"
                width={28}
              />
            </div>
            <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
              Affordable Rates
            </h4>
            <p className="text-gray-600 text-sm">
              Best prices on genuine medicines, with discounts on generic
              alternatives.
            </p>
          </div>

          {/* Card 4 */}
          <div
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 animate-fadeIn"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="w-14 h-14 bg-purple-100 text-purple-600 flex items-center justify-center rounded-full mb-4">
              <img
                src="https://img.icons8.com/emoji/48/clipboard-emoji.png"
                alt="verified"
                width={28}
              />
            </div>
            <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
              Verified Pharmacies
            </h4>
            <p className="text-gray-600 text-sm">
              All listed pharmacies are verified for authenticity, quality, and
              compliance.
            </p>
          </div>

          {/* Card 5 */}
          <div
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 animate-fadeIn"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="w-14 h-14 bg-red-100 text-red-600 flex items-center justify-center rounded-full mb-4">
              <img
                src="https://img.icons8.com/emoji/48/syringe-emoji.png"
                alt="stocked"
                width={28}
              />
            </div>
            <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
              Wide Medicine Range
            </h4>
            <p className="text-gray-600 text-sm">
              From regular prescriptions to rare generics — we ensure maximum
              availability.
            </p>
          </div>

          {/* Card 6 */}
          <div
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 animate-fadeIn"
            style={{ animationDelay: "1s" }}
          >
            <div className="w-14 h-14 bg-cyan-100 text-cyan-600 flex items-center justify-center rounded-full mb-4">
              <img
                src="https://img.icons8.com/ultraviolet/50/phone.png"
                alt="support"
                width={28}
              />
            </div>
            <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
              Supportive Staff
            </h4>
            <p className="text-gray-600 text-sm">
              Trained professionals to help you with your medicine queries and
              refills.
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Call Banner */}
      <div
        className=" text-white py-8 mt-12"
        style={{
          background:
            "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">
                <img src="src/assets/alert.png" height={40} width={40} alt="" />
              </span>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold">Emergency?</h3>
              <p className=" text-sm md:text-base text-red-100">
                Call immediately for urgent medical assistance
              </p>
            </div>
          </div>
          <a
            href="tel:108"
            className="flex inline-block bg-white text-red-600 font-bold py-3 px-12 rounded-full text-lg hover:bg-red-50 transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex gap-1">
              <img
                src="https://i.pinimg.com/1200x/7e/21/b9/7e21b9661c85d61676143a8ae2c9a73b.jpg"
                height={20}
                width={20}
                alt=""
              />
              <span className="text-sm md:text-base">Call 108</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PharmacyPage;
