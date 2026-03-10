/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  MapPin,
  PhoneCall,
  BadgeCheck,
  Star,
  Upload,
  PlusCircle,
  Clock,
  Shield,
  Truck,
  Award,
  Phone,
  MessageCircle,
  Heart,
  Share2,
  Camera,
  Check,
  ChevronRight,
  Zap,
  Users,
  Globe,
} from "lucide-react";
import ReviewPopup from "../components/ReviewPopup";
import Cookies from "js-cookie";
import { getRequest, postRequest } from "../Helpers";
import { useNavigate, useParams } from "react-router-dom";
import PharmacyAppointmentFlow from "../components/PharmacyAppointmentFlow";
import PharmacyOrder from "./Pharmacy/pharmacyOrder";
import AppDownloadModal from "../components/AppDownloadModal/AppDownLoadMOdal";
import UploadPrescriptionModal from "../components/uploadPriscriptionModal/uploadPrescriptionModal";
import SelectMedicineModal from "../components/medicineModal/selectMedicineModal";
import { useSelector } from "react-redux";

const PharmacyDetailPage = () => {
  const navigation = useNavigate();
  const userData = useSelector((state) => state?.user?.userData?.userData);
  const isLoggedIn = useSelector((state) => state?.user?.isLoggedIn);

  const [pharmacy, setPharmacy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [prescription, setPrescription] = useState(null);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [showAppointmentFlow, setShowAppointmentFlow] = useState(false);
  const [showAppDownloadModal, setShowAppDownloadModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openSelectModal, setOpenSelectModal] = useState(false);

  const { id } = useParams();

  console.log("pharmacyId in detail page", id);
  const handlePrescriptionUpload = (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("prescription", file);
    // send to API
    console.log("Uploading prescription:", file);
  };

  const handleCartSubmit = async (medicines) => {
    console.log("Medicines added to cart:", medicines);
    await postRequest({
      url: "/pharmacyBooking/add",
      cred: { ...medicines, patient: userData._id, pharmacy: id },
    })
      .then((res) => {
        console.log("Cart submission response:", res);
      })
      .catch((err) => {
        console.error("Error submitting cart:", err);
      });
  };

  //console.log("token",token);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetchPharmacy = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getRequest(`pharmacy/${id}`);
        const data = res.data;
        if (data.success) {
          setPharmacy(data.data);
          setReviews(data.data.reviews || []);
        } else {
          setError(data.message || "Failed to fetch pharmacy");
        }
      } catch (err) {
        setError("Failed to fetch pharmacy");
      } finally {
        setLoading(false);
      }
    };
    fetchPharmacy();
  }, [updateStatus]);

  const handleFileChange = (e) => {
    setPrescription(e.target.files[0]);
  };

  // Features can remain static or be enhanced with API data if available
  const features = [
    { icon: Shield, text: "100% Genuine Products", color: "text-green-600" },
    { icon: Truck, text: "Express Delivery", color: "text-blue-600" },
    { icon: Clock, text: "24/7 Available", color: "text-purple-600" },
    { icon: Award, text: "Licensed Pharmacy", color: "text-amber-600" },
  ];

  // Loading and error states
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }
  if (!pharmacy) {
    return null;
  }

  // Services from API
  const services =
    pharmacy.services && pharmacy.services.length > 0
      ? pharmacy.services.map((s) => ({
          name: s.name,
          icon: (
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/3d-fluency/94/pill.png"
              alt="pill"
            />
          ),
        }))
      : [
          { name: "Prescription Medicines", icon: "💊" },
          { name: "Health Supplements", icon: "🌿" },
          { name: "Personal Care", icon: "🧴" },
          { name: "Baby Care", icon: "👶" },
          { name: "Online Consultation", icon: "👨‍⚕️" },
          { name: "Health Checkup", icon: "🩺" },
        ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 md:pt-28">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 backdrop-blur-sm"></div>
        <div className="relative sm:w-full lg:w-[80%]  xl:w-[80%] 2xl:w-[70%] mx-auto  py-8 px-2">
          {/* Header Actions */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Home</span>
              <ChevronRight className="w-4 h-4" />
              <span>Pharmacies</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-blue-600 font-medium">{pharmacy.name}</span>
            </div>
            {/* <div className="flex items-center gap-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isLiked
                    ? "bg-red-100 text-red-600"
                    : "bg-white text-gray-400 hover:text-red-500"
                } shadow-lg hover:shadow-xl`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
              </button>
              <button className="p-2 rounded-full bg-white text-gray-600 hover:text-blue-600 shadow-lg hover:shadow-xl transition-all duration-300">
                <Share2 className="w-5 h-5" />
              </button>
            </div> */}
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Image & Gallery */}
            <div className="lg:col-span-2">
              <div className="relative group">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <img
                    src={
                      pharmacy.profileImage ||
                      "https://i.pinimg.com/1200x/72/59/6e/72596e499f868bdfce8220559315fcf5.jpg"
                    }
                    alt="Pharmacy"
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <feature.icon
                      className={`w-8 h-8 ${feature.color} mb-2 group-hover:scale-110 transition-transform duration-300`}
                    />
                    <p className="text-sm font-medium text-gray-700">
                      {feature.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Info Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white rounded-2xl shadow-2xl p-6 space-y-6">
                  {/* Header */}
                  <div className="text-center pb-4 border-b border-gray-100">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <h1 className="md:text-2xl text-xl font-bold text-gray-800">
                        {pharmacy.name}
                      </h1>
                      <BadgeCheck className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span>{pharmacy.address}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < (pharmacy.averageRating || 0)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {pharmacy.averageRating || 0} ({reviews.length} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <Clock className="w-4 h-4 text-green-700" />
                      <span className="text-sm font-medium text-green-700">
                        Open - {pharmacy.storeTiming}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-blue-600" />
                        <span>{pharmacy.phone}</span>
                      </div>
                      <div className="flex items-start gap-3 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-red-500 mt-0.5" />
                        <span>{pharmacy.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <a
                      href={`tel:${pharmacy.phone}`}
                      className=" w-full md:text-base text-sm block bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      <PhoneCall className="w-5 h-5" />
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="sm:w-full lg:w-[80%]  xl:w-[80%] 2xl:w-[70%] mx-auto  py-12 px-2">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-100 bg-gray-50/50">
            <nav className="flex">
              <button
                className={`px-8 py-4 font-semibold transition-all duration-300 relative ${
                  activeTab === "about"
                    ? "text-blue-600 bg-white shadow-lg"
                    : "text-gray-600 hover:text-blue-600 hover:bg-white/50"
                }`}
                onClick={() => setActiveTab("about")}
              >
                About & Services
                {activeTab === "about" && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-full"></div>
                )}
              </button>
              <button
                className={`px-8 py-4 font-semibold transition-all duration-300 relative ${
                  activeTab === "review"
                    ? "text-blue-600 bg-white shadow-lg"
                    : "text-gray-600 hover:text-blue-600 hover:bg-white/50"
                }`}
                onClick={() => setActiveTab("review")}
              >
                Reviews & Ratings
                {activeTab === "review" && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-full"></div>
                )}
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="md:p-8 p-4">
            {/* About Tab */}
            {activeTab === "about" && (
              <div className="space-y-8">
                {/* Description */}
                <div className="prose max-w-none">
                  <h2 className="md:text-2xl text-xl font-bold text-gray-800 mb-4">
                    About {pharmacy.name}
                  </h2>
                  <p className="text-gray-600 md:text-base text-sm leading-relaxed">
                    {pharmacy.description}
                  </p>
                </div>

                {/* Prescription Upload Section
                <PharmacyOrder
                  onUploadSubmit={handlePrescriptionUpload}
                  onCartSubmit={handleCartSubmit}
                /> */}
                {/* ✅ New Order Medicine Section */}
                <div className="md:p-6">
                  {/* ✅ New Order Medicine Section */}
                  <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl md:p-6 p-2 shadow-sm">
                    <p className="text-gray-800 font-semibold text-sm md:text-base">
                      Want to order medicine to nearby pharmacy?
                    </p>
                    <button
                      onClick={() => {
                        if (!isLoggedIn) {
                          alert("Please login to book an order");
                          navigation("/login");
                          return;
                        }
                        setOpenSelectModal(true);
                      }} // 👉 open modal
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white md:px-6 px-2 py-3 md:text-base text-xs rounded-lg font-semibold shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                    >
                      Book Now
                    </button>
                  </div>

                  {/* ✅ App Download Modal */}
                  <AppDownloadModal
                    open={showAppDownloadModal}
                    onClose={() => setShowAppDownloadModal(false)}
                    onUploadPrescription={() => {
                      console.log("Upload modal");

                      setOpenUpdateModal(true);
                      // navigate("/upload-prescription");
                    }}
                    onSelectMedicine={() => {
                      console.log("Select modal");

                      setOpenSelectModal(true);
                      // navigate("/select-medicine");
                    }}
                  />
                </div>

                {/* Services Grid */}
                <div>
                  <h3 className="md:text-xl text-lg font-bold text-gray-900 mb-6">
                    Our Services
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 group border border-gray-100"
                      >
                        <div className="text-xl mb-3 group-hover:scale-110 transition-transform duration-300">
                          {service.icon}
                        </div>
                        <h4 className="font-semibold md:text-base text-sm  text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          {service.name}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Review Tab */}
            {activeTab === "review" && (
              <div className="space-y-8">
                {/* Reviews Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="md:text-2xl text-xl font-bold text-gray-900 mb-2">
                      Customer Reviews
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < (pharmacy.averageRating || 0)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="md:text-lg text-base font-semibold text-gray-900">
                          {pharmacy.averageRating || 0}
                        </span>
                        <span className="text-gray-600">out of 5</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{reviews.length} reviews</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <button
                      onClick={() => setShowReviewPopup(true)}
                      className="group bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 md:text-base text-sm "
                    >
                      <PlusCircle className="w-5 h-5 group-hover:animate-spin" />
                      Share Your Experience
                    </button>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {reviews.length === 0 && (
                    <div className="text-gray-500">No reviews yet.</div>
                  )}
                  {reviews.map((review, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100"
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <img
                            src={
                              review.image ||
                              "https://randomuser.me/api/portraits/lego/1.jpg"
                            }
                            alt={review.name || "User"}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
                          />
                          {review.verified && (
                            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <h4 className="font-semibold text-gray-900">
                                {review?.user?.name || "Anonymous"}
                              </h4>
                              {review.verified && (
                                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                                  Verified Purchase
                                </span>
                              )}
                            </div>
                            <span className="text-sm text-gray-500">
                              {review.date ||
                                (review.createdAt
                                  ? new Date(
                                      review.createdAt
                                    ).toLocaleDateString()
                                  : "")}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex text-yellow-500">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "fill-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-medium text-gray-700">
                              ({review.rating}/5)
                            </span>
                          </div>
                          <p className="text-gray-600 leading-relaxed">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ReviewPopup
        setUpdateStatus={setUpdateStatus}
        open={showReviewPopup}
        onClose={() => setShowReviewPopup(false)}
        pharmacyId={id}
        onReviewAdded={(review) => setReviews([...reviews, review])}
      />

      <UploadPrescriptionModal
        open={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
      />
      <SelectMedicineModal
        open={openSelectModal}
        onClose={() => setOpenSelectModal(false)}
        medicines={pharmacy?.medicine}
        onPlaceOrder={(payload) => {
          console.log("Selected payload", payload);

          handleCartSubmit(payload);
        }}
      />

      <PharmacyAppointmentFlow
        open={showAppointmentFlow}
        onClose={() => setShowAppointmentFlow(false)}
        id={id}
      />
    </div>
  );
};

export default PharmacyDetailPage;
