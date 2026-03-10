/* eslint-disable no-constant-binary-expression */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-labels */
import React, { useEffect, useState } from "react";
import {
  Star,
  StarHalf,
  MapPin,
  PhoneCall,
  BadgeCheck,
  Mail,
  LocateFixed,
  PlusCircle,
  Award,
  Shield,
  Clock,
  Users,
  CheckCircle,
  Heart,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { getRequest, postRequest } from "../Helpers";
import TimeSlotsSection from "../components/TimeSlotsSelection";
import DiagonsticsReviewPopup from "../components/DiagonsticsReviewPopup";
import DiagonsticsAppointmentFlow from "../components/DiagonsticsAppointmentFlow";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
//import ManagePatientsModal from "../components/ManagePatientsModal";
import { useNavigate } from "react-router-dom";
const DiagnosticDetailPage = () => {
  const userId = useSelector((state) => state?.user?.userProfileData?._id);
  const userProfileData = useSelector((state) => state.user.userProfileData);
  console.log("userProfileData", userProfileData);

  console.log("userId", userId);

  const [activeTab, setActiveTab] = useState("about");
  const [diagnostics, setDiagnostics] = useState(null);
  console.log("diagnostics", diagnostics);

  const [reviews, setReviews] = useState();
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const { id } = useParams();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDateData, setSelectedDateData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [updateStatus, setUpdateStatus] = useState(false);
  //for booking
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [showAppointmentPopup, setShowAppointmentPopup] = useState(false);
  const [appointmentData, setAppointmentData] = useState(null);
  const [otherPatientDetails, setOtherPatientDetails] = useState({
    name: "",
    age: "",
    gender: "",
    number: "",
    weight: "",
  });

  console.log("otherPatientDetails", otherPatientDetails);

  const navigate = useNavigate();
  const handleAddOtherPatient = (patientData) => {
    setOtherPatientDetails((prev) => [...prev, patientData]);
  };

  const handleOpenManagePatients = () => {
    navigate("/manage-patients");
  };

  const fetchDiagnosticsDetails = async () => {
    try {
      const res = await getRequest(`diagnostics/${id}`);
      console.log("diagnostic data fetch ===", res?.data?.data);
      setDiagnostics(res?.data?.data);
      setReviews(res?.data?.data?.reviews || []);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!id) return;
    fetchDiagnosticsDetails();
  }, [id, updateStatus]);

  const handleServiceCheckbox = (id) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handlePackageCheckbox = (id) => {
    setSelectedPackages((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const bookDiagonstics = async (e, date, slot) => {
    e.preventDefault();
    console.log("Parent function called with:", date, slot);

    // Filter selected services and packages
    const selectedServiceDetails = diagnostics?.services?.filter((s) =>
      selectedServices.includes(s._id)
    );
    const selectedPackageDetails = diagnostics?.packages?.filter((p) =>
      selectedPackages.includes(p._id)
    );

    // // Block submission if nothing selected
    if (
      (!selectedServiceDetails || selectedServiceDetails.length === 0) &&
      (!selectedPackageDetails || selectedPackageDetails.length === 0)
    ) {
      toast.error("Please select at least one service or package.");
      return;
    }

    // Calculate total amount
    const totalAmount =
      (selectedServiceDetails?.reduce((sum, s) => sum + Number(s.price), 0) ||
        0) +
      (selectedPackageDetails?.reduce((sum, p) => sum + Number(p.price), 0) ||
        0);

    // Build payload
    const payload = {
      // referalId: "" ,
      // referBy: "",
      // report:  "",
      patient: userId,
      diagnostic: diagnostics?._id,
      date: date,
      slots: { startTime: slot?.startTime, endTime: slot?.endTime },
      amount: totalAmount,
      otherPatientDetails,
      service:
        selectedServiceDetails?.map((s) => ({
          _id: s._id,
          name: s.name,
          price: s.price,
        })) || [],
      packages:
        selectedPackageDetails?.map((p) => ({
          _id: p._id,
          name: p.name,
          price: p.price,
          details: p.details,
        })) || [],
    };

    setAppointmentData(payload);
    setShowAppointmentPopup(true);

    // Log key debug values
    console.log("Selected Services: ", selectedServices);
    console.log("Selected Packages: ", selectedPackages);
    console.log("Date: ", date);
    console.log("Slot: ", slot);
    console.log("User ID: ", userId);
    console.log("Amount: ", totalAmount);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const email = diagnostics?.email;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div
        className="relative  text-white overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-75"></div>
          <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-150"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-12 sm:py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
              <span className="text-4xl"></span>
            </div>
            <h2 className="text-4xl md:text-4xl font-bold">Diagnotic & Labs</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Fast, reliable, and professional medical transport when you need
              it most
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-green-400">✓</span>
                <span className="text-sm font-medium">24/7 Available</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-green-400">✓</span>
                <span className="text-sm font-medium">
                  Trained Professionals
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-green-400">✓</span>
                <span className="text-sm font-medium">Quick Response</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            className="relative block w-full h-8"
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

      {/* Action Bar */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="tel:108"
              className="group bg-white from-red-500 to-red-600 text-[#00659d] px-8 py-3 rounded-full hover:bg-[#00659d] hover:text-white transition-all duration-300 font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <PhoneCall className="w-5 h-5 group-hover:animate-pulse" />
              Call Now
            </a>

            <a
              href={email ? `mailto:${email}` : "#"}
              className="group bg-white text-[#00659d] px-8 py-3 rounded-full hover:bg-[#00659d] hover:text-white transition-all duration-300 font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center"
            >
              <Mail className="w-5 h-5 group-hover:animate-bounce" />
              Email Us
            </a>
            <a
              href={`https://maps.google.com/?q=${
                diagnostics?.doctor?.coordinates[1]
              },${diagnostics?.location?.coordinates[0]} (${encodeURIComponent(
                diagnostics?.address || ""
              )})`}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white text-[#00659d] px-8 py-3 rounded-full hover:bg-[#00659d] hover:text-white transition-all duration-300 font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center"
            >
              <LocateFixed className="w-5 h-5 group-hover:animate-pulse" />
              Get Directions
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto  py-16 space-y-16">
        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Tests & Services */}
          <div className="group">
            <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-full p-3">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Available Tests & Services
                  </h2>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  {diagnostics?.services?.map((service) => (
                    <label
                      key={service._id}
                      className="group/item flex items-center gap-4 p-4 rounded-2xl bg-blue-50 transition-colors cursor-pointer border border-transparent hover:border-blue-200"
                    >
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service._id)}
                        onChange={() => handleServiceCheckbox(service._id)}
                        className="w-5 h-5 rounded border-2 border-blue-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">
                          {service.name}
                        </div>
                        <div className="text-blue-600 font-bold text-lg">
                          ₹{service.price}
                        </div>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-500 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </label>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
                  <div className="text-center">
                    {/* <h3 className="font-bold text-emerald-800 mb-2">Premium Package Coming Soon!</h3> */}
                    <p className="text-sm text-emerald-600">
                      Advanced diagnostic tests for early detection &
                      prevention.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Health Packages */}
          <div className="group">
            <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-full p-3">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Health Packages
                  </h2>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  {diagnostics?.packages?.map((pkg) => (
                    <label
                      key={pkg._id}
                      className="group/item flex items-center gap-4 p-4 rounded-2xl bg-emerald-50 transition-colors cursor-pointer border border-transparent hover:border-emerald-200"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPackages.includes(pkg._id)}
                        onChange={() => handlePackageCheckbox(pkg._id)}
                        className="w-5 h-5 rounded border-2 border-emerald-300 text-emerald-600 focus:ring-emerald-500 focus:ring-2"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">
                          {pkg.name}
                        </div>
                        <div className="text-emerald-600 font-bold text-lg">
                          ₹{pkg.price}
                        </div>
                        {pkg.details && (
                          <div className="text-sm text-emerald-700">
                            {pkg.details}
                          </div>
                        )}
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-500 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </label>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
                  <div className="text-center">
                    {/* <h3 className="font-bold text-emerald-800 mb-2">Premium Package Coming Soon!</h3> */}
                    <p className="text-sm text-emerald-600">
                      Comprehensive health screening with advanced diagnostics
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="group">
            <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-full p-3">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Book Time Slot
                  </h2>
                </div>
              </div>
              <div className="p-8">
                <TimeSlotsSection
                  availability={diagnostics?.availability || []}
                  onBook={bookDiagonstics}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Tab Navigation */}
          <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
            <nav className="flex gap-2">
              <button
                className={`px-8 py-4 font-semibold rounded-2xl transition-all duration-300 ${
                  activeTab === "about"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105"
                    : "text-gray-600 hover:bg-white hover:shadow-md"
                }`}
                onClick={() => setActiveTab("about")}
              >
                About Us
              </button>
              <button
                className={`px-8 py-4 font-semibold rounded-2xl transition-all duration-300 ${
                  activeTab === "review"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105"
                    : "text-gray-600 hover:bg-white hover:shadow-md"
                }`}
                onClick={() => setActiveTab("review")}
              >
                Patient Reviews
              </button>
            </nav>
          </div>

          <div className="p-8">
            {/* About Tab */}
            {activeTab === "about" && (
              <div className="space-y-8 text-gray-700 leading-relaxed">
                {/* <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                    <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-bold text-gray-900 mb-2">
                      24/7 Available
                    </h3>
                    <p className="text-sm text-gray-600">
                      Round-the-clock emergency services
                    </p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
                    <Users className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                    <h3 className="font-bold text-gray-900 mb-2">
                      Expert Team
                    </h3>
                    <p className="text-sm text-gray-600">
                      Trained professionals & paramedics
                    </p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                    <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="font-bold text-gray-900 mb-2">Certified</h3>
                    <p className="text-sm text-gray-600">
                      Accredited diagnostic center
                    </p>
                  </div>
                </div> */}

                <div className="prose prose-lg max-w-none">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                    About {diagnostics?.name}
                  </h3>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 mb-6">
                    <p className="text-lg leading-relaxed">
                      {diagnostics?.description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "review" && (
              <div className="space-y-8">
                <div className="flex items-center justify-between w-full">
                  {/* Left side: Reviews */}
                  <div className="text-left">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      What Our Patients Say
                    </h3>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => {
                          const rating = diagnostics?.averageRating || 0;
                          if (i + 1 <= rating) {
                            // Full star
                            return (
                              <Star key={i} className="w-6 h-6 fill-current" />
                            );
                          } else if (i < rating && rating < i + 1) {
                            // Half star
                            return (
                              <StarHalf
                                key={i}
                                className="w-6 h-6 fill-current"
                              />
                            );
                          } else {
                            // Empty star
                            return (
                              <Star key={i} className="w-6 h-6 text-gray-300" />
                            );
                          }
                        })}
                      </div>

                      <span className="text-2xl font-bold text-gray-900 ml-2">
                        {diagnostics?.averageRating?.toFixed(1) || "0.0"}
                      </span>

                      <span className="ml-2 text-gray-500 text-sm">
                        ({diagnostics?.reviews?.length || 0} reviews)
                      </span>
                      {/* <span className="text-gray-600">(250+ reviews)</span> */}
                    </div>
                  </div>

                  {/* Right side: Share button */}
                  <div className="text-right">
                    <button
                      onClick={() => setShowReviewPopup(true)}
                      className="group bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <PlusCircle className="w-5 h-5 group-hover:animate-spin" />
                      Share Your Experience
                    </button>
                  </div>
                </div>

                <div className="grid gap-6">
                  {diagnostics?.reviews?.map((review) => (
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
                            className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                          />
                          <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                            <BadgeCheck className="w-4 h-4 text-white" />
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-bold text-gray-900 text-lg">
                              {review?.user?.name}
                            </h4>
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-5 h-5 ${
                                    i < review.rating
                                      ? "fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed italic">
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
        </div>

        {/* CTA Section */}
        <div
          className=" rounded-3xl shadow-2xl overflow-hidden relative"
          style={{
            background:
              "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          <div className="relative p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Book Your Diagnostic?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Experience premium healthcare services with our state-of-the-art
              facilities and expert medical team.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="tel:108"
                className="group bg-gradient-to-r from-red-500 to-red-600 text-white px-10 py-4 rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-300 font-bold text-lg flex items-center gap-3 justify-center shadow-xl hover:shadow-2xl transform hover:-translate-y-2"
              >
                <PhoneCall className="w-6 h-6 group-hover:animate-pulse" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
      <DiagonsticsReviewPopup
        setUpdateStatus={setUpdateStatus}
        open={showReviewPopup}
        onClose={() => setShowReviewPopup(false)}
        id={diagnostics?._id}
        entityType="diagnostics"
        onReviewAdded={(review) => setReviews([...reviews, review])}
        // onReviewAdded={fetchDiagnosticsDetails}
      />
      <DiagonsticsAppointmentFlow
        open={showAppointmentPopup}
        onClose={() => setShowAppointmentPopup(false)}
        id={diagnostics?._id}
        appointmentData={appointmentData}
        otherPatientDetails={otherPatientDetails}
        setOtherPatientDetails={setOtherPatientDetails}
        onOpenManagePatients={handleOpenManagePatients}
      />
    </div>
  );
};

export default DiagnosticDetailPage;
