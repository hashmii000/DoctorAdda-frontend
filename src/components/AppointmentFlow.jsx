/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import {
  Calendar,
  Clock,
  Phone,
  MapPin,
  User,
  CreditCard,
  CheckCircle,
  Timer,
} from "lucide-react";
import { getRequest, postRequest } from "../Helpers";
import { useSelector } from "react-redux";
import RenderRazorPay from "../components/RenderRazorPay";
import toast from "react-hot-toast";
import { getCookieItem } from "../Hooks/cookie";

const AppointmentFlow = ({
  open,
  onClose,
  id,
  appointmentData,
  otherPatientDetails = [],
  setOtherPatientDetails,
  onOpenManagePatients = () => {},
  onOpenManagePets = () => {},
}) => {
  const navigate = useNavigate();
  const [selectedDateData, setSelectedDateData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [clinicData, setClinicData] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedFor, setSelectedFor] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const selectedClinic = clinicData || {};

  // Get user profile data from Redux
  const { userProfileData } = useSelector((state) => state.user);
  const UserId = getCookieItem("UserId");
  console.log("User Profile Data:", userProfileData);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [pets, setPets] = useState([]); // empty array initially
  const [selectedPet, setSelectedPet] = useState(null);

  const otherPatients = patients.length > 0 ? patients : otherPatientDetails;

  // Extract appointment data
  const { appointmentId, slots, status } = appointmentData || {};

  // Show patient info based on selectedFor
  const isSelf = selectedFor === "self";
  const patientDetails = isSelf
    ? {
        name: userProfileData?.name,
        gender: userProfileData?.gender,
        phone: userProfileData?.phone,
      }
    : otherPatientDetails;

  //payment state
  // Razorpay state
  const [showRazorpay, setShowRazorpay] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const isVeterinary = doctor?.category?.name === "Veterinary";

  const handleConfirmBooking = async () => {
    setLoading(true);
    try {
      setOtherPatientDetails({ patient: selectedPatient });

      const res = await postRequest({
        url: `appointment/add`,
        cred: {
          ...appointmentData,
          otherPatientDetails: { patient: selectedPatient },
        },
      });
      console.log("Booking confirmed", res?.data?.data);
      setDoctor(res?.data?.data);
      setBookingData(res?.data?.data); // ✅ store complete booking details
      setStep(4);
    } catch (error) {
      console.log("Error booking appointment", error);
    } finally {
      setLoading(false); //stop loader
    }
  };

  const fetchPatients = async () => {
    if (!UserId) return;
    try {
      const res = await getRequest(`auth/getMembers/${UserId}`);
      console.log("Fetched patients:", res?.data?.data || []);
      setPatients(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };
  useEffect(() => {
    fetchPatients();
  }, [UserId]);
  console.log("UserId", UserId);

  // Fetch pets from API
  const fetchPets = async () => {
    try {
      const res = await getRequest(`auth/getpets/${UserId}`);
      console.log("=======Fetch Pets ===", res?.data?.data);
      setPets(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  useEffect(() => {
    if (UserId) fetchPets();
  }, [UserId]);

  const handleClose = () => {
    setStep(1);
    setSelectedFor(null);
    setSelectedPayment(null);
    navigate("/doctor-appointments");
    onClose();
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getRequest(`doctor/${id}`)
      .then((res) => {
        const doc = res?.data?.data;
        setDoctor(doc);
        setClinicData(doc?.clinics?.[0]);
        setSelectedDate(doc?.clinics?.[0]?.availability[0]?.date);
        setSelectedDateData(doc?.clinics?.[0]?.availability[0]);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [id]);

  // Razorpay integration
  const handlePayOnline = async () => {
    if (!selectedPayment || selectedPayment !== "online") return;
    setPaymentLoading(true); // start loader
    try {
      const res = await postRequest({
        url: `appointment/payment`,
        cred: {
          ...appointmentData,
        },
      });
      console.log("payment success:", res?.data?.data?.appointment);

      const orderIdFromApi = res?.data?.data?.orderId; // ✅ adjust according to API
      if (orderIdFromApi) {
        setOrderId(orderIdFromApi);

        console.log("orderId", orderIdFromApi);

        setShowRazorpay(true);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error(
        error?.response?.data?.message || "Failed to initiate payment"
      );
      setPaymentLoading(false); // stop loader on error
    }
  };

  // Razorpay verifyPayment
  const handlePayment = async (paymentResponse) => {
    console.log("paymentResponse", paymentResponse);

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      paymentResponse;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      toast.error("Invalid payment response");
      return;
    }

    const payload = {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    };

    try {
      setPaymentLoading(true);

      // ✅ Correct payload key
      const verifyRes = await postRequest({
        url: `appointment/verifyPayment`,
        cred: { ...payload },
      });

      console.log("Verify Payment API Response:", verifyRes?.data?.data);
      setBookingData(verifyRes?.data?.data); // ✅ store complete booking details

      if (verifyRes?.data?.success) {
        toast.success("Payment Verified Successfully");
      } else {
        toast.error("Payment Verification Failed");
      }
    } catch (err) {
      console.error("Error verifying payment:", err);
      toast.error("Error verifying payment");
    } finally {
      setPaymentLoading(false);
      setShowRazorpay(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Centered Panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6">
        <Dialog.Panel className="bg-white p-5 sm:p-6 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md lg:max-w-lg">
          {/* Step 1: Who for */}
          {step === 1 && (
            <>
              <Dialog.Title className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-6">
                Who is this appointment for?
              </Dialog.Title>

              {isVeterinary ? (
                <>
                  {/* Single Pet Button */}
                  <div className="space-y-4">
                    <button
                      className={`w-full px-4 py-3 border rounded-xl shadow-sm transition-all duration-200 font-medium text-sm sm:text-base ${
                        selectedFor === "pet"
                          ? "bg-blue-100 border-blue-600 text-blue-800"
                          : "border-gray-300 hover:bg-blue-50 hover:border-blue-600 text-gray-700"
                      }`}
                      onClick={() => {
                        setSelectedFor("pet");
                        setSelectedPet(null); // reset pet selection
                      }}
                    >
                      Pet
                    </button>
                  </div>

                  {/* Pet List */}
                  {selectedFor === "pet" && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Your Pets:
                      </h4>
                      {pets.length > 0 ? (
                        <ul className="space-y-2 text-sm text-gray-700 max-h-40 overflow-auto">
                          {pets.map((p, i) => (
                            <li
                              key={i}
                              className={`border rounded-lg p-2 shadow-sm cursor-pointer ${
                                selectedPet?.name === p.name
                                  ? "border-blue-600 bg-blue-50"
                                  : "border-gray-200"
                              }`}
                              onClick={() => setSelectedPet(p)}
                            >
                              {p.name}, {p.type}, {p.age?.year} yrs{" "}
                              {p.age?.month} months, {p?.weight}{" "}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500">No pets found</p>
                      )}

                      {/* Action Buttons */}
                      <div className="mt-4 flex flex-col sm:flex-row justify-between gap-4">
                        <button
                          onClick={handleClose}
                          className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all duration-200"
                        >
                          Cancel
                        </button>

                        {selectedPet ? (
                          <button
                            onClick={() => setStep(2)}
                            className="w-full px-4 py-3 bg-[#006fab] hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200"
                          >
                            Continue
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              onClose();
                              onOpenManagePets();
                            }}
                            className="w-full px-4 py-3 bg-gray-300 text-gray-700 font-medium rounded-lg transition-all duration-200 hover:bg-gray-400"
                          >
                            Manage Pets
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* Normal self/other buttons for non-veterinary */}
                  <div className="space-y-4">
                    {["self", "other"].map((option) => (
                      <button
                        key={option}
                        className={`w-full px-4 py-3 border rounded-xl shadow-sm transition-all duration-200 font-medium text-sm sm:text-base ${
                          selectedFor === option
                            ? "bg-blue-100 border-blue-600 text-blue-800"
                            : "border-gray-300 hover:bg-blue-50 hover:border-blue-600 text-gray-700"
                        }`}
                        onClick={() => {
                          setSelectedFor(option);
                          setSelectedPatient(null); // Reset selected patient when option changes
                        }}
                      >
                        {option === "self" ? "Self" : "Other"}
                      </button>
                    ))}
                  </div>

                  {/* If 'Other' selected show patients list */}
                  {selectedFor === "other" && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Other Patients:
                      </h4>
                      {otherPatients.length > 0 ? (
                        <ul className="space-y-2 text-sm text-gray-700 max-h-40 overflow-auto">
                          {otherPatients.map((p, i) => (
                            <li
                              key={i}
                              className={`border rounded-lg p-2 shadow-sm cursor-pointer ${
                                selectedPatient?.name === p.name
                                  ? "border-blue-600 bg-blue-50"
                                  : "border-gray-200"
                              }`}
                              onClick={() => {
                                setSelectedPatient(p);
                                setOtherPatientDetails({ patient: p }); // update parent state
                              }}
                            >
                              {p.name} , {p.gender}, {p.age}{" "}
                              {p.weight ? p.weight + "yrs" : ""}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500">
                          No data available
                        </p>
                      )}
                    </div>
                  )}

                  <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
                    <button
                      onClick={handleClose}
                      className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all duration-200"
                    >
                      Cancel
                    </button>

                    {/* Buttons logic: */}
                    {selectedFor === "self" && (
                      <button
                        onClick={() => setStep(2)}
                        disabled={!selectedFor}
                        className={`w-full px-4 py-3 font-medium rounded-lg transition-all duration-200 ${
                          selectedFor
                            ? "bg-[#006fab] hover:bg-blue-700 text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Continue as Self
                      </button>
                    )}

                    {selectedFor === "other" && (
                      <>
                        {selectedPatient ? (
                          // If patient selected, show Continue button
                          <button
                            onClick={() => setStep(2)}
                            className="w-full px-4 py-3 bg-[#006fab] hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200"
                          >
                            Continue as Other
                          </button>
                        ) : (
                          // No patient selected, show Manage Patients button
                          <button
                            onClick={() => {
                              onClose();
                              onOpenManagePatients();
                            }}
                            className="w-full px-4 py-3 bg-gray-300 text-gray-700 font-medium rounded-lg transition-all duration-200 hover:bg-gray-400"
                          >
                            Manage Patients
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </>
              )}
            </>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <>
              <Dialog.Title className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-6">
                Choose Payment Method
              </Dialog.Title>

              <div className="space-y-4">
                {[
                  { id: "online", label: "💳 Pay Online" },
                  { id: "clinic", label: "🏥 Pay at Clinic" },
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedPayment(id)}
                    className={`w-full px-4 py-3 border rounded-xl shadow-sm transition-all duration-200 font-medium text-sm sm:text-base ${
                      selectedPayment === id
                        ? "bg-blue-100 border-blue-600 text-blue-800"
                        : "border-gray-300 hover:bg-blue-50 hover:border-blue-600 text-gray-700"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
                <button
                  onClick={() => {
                    if (selectedPayment === "clinic") {
                      setStep(3);
                    } else {
                      console.log("Pay Online");
                      // setStep(3); // Can later redirect online payment step here if needed
                      handlePayOnline();
                    }
                  }}
                  disabled={!selectedPayment || paymentLoading}
                  className={`w-full px-4 py-3 font-medium rounded-lg transition-all duration-200 ${
                    selectedPayment && !paymentLoading
                      ? "bg-[#006fab] hover:bg-blue-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {paymentLoading ? "Processing..." : "Continue"}
                </button>
              </div>
            </>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <>
              <Dialog.Title className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-6">
                Confirm Appointment
              </Dialog.Title>

              <p className="text-gray-600 text-center mb-8 text-sm sm:text-base">
                Are you sure you want to book this clinic visit?
              </p>

              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <button
                  onClick={handleClose}
                  className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBooking}
                  disabled={loading}
                  className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200"
                >
                  {loading ? "Booking..." : "Yes, Book"}
                </button>
              </div>
            </>
          )}

          {/* Step 4: Final Appointment Details */}
          {step === 4 && (
            <div className="max-h-[80vh] sm:max-h-[85vh] md:max-h-[90vh] overflow-y-auto px-2">
              <>
                <Dialog.Title className="text-2xl font-bold text-center text-green-700 mb-4">
                  My Appointment
                </Dialog.Title>

                {/* Status */}
                <div className="bg-red-50 border border-red-200 text-red-600 font-semibold text-sm rounded-xl px-2 py-2 mb-2 shadow-sm text-center">
                  {bookingData?.status || status || "N/A"}
                </div>

                {/* Doctor Info */}
                <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-4">
                  <div className="flex items-center gap-4 sm:gap-5">
                    <img
                      src="https://i.pinimg.com/736x/92/eb/b8/92ebb8868a7d96bb48184758f0a76e9f.jpg"
                      alt="Doctor"
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border border-gray-200 shadow-sm"
                    />
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                        {doctor?.clinicName}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {" "}
                        {selectedClinic.clinicAddress}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Appointment Time */}
                <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-2">
                  <h4 className="text-base font-semibold text-gray-800 mb-2">
                    Scheduled Appointment
                  </h4>
                  <p className="text-sm text-gray-500 mb-2">
                    Appointment ID:{" "}
                    <span className="font-semibold text-gray-700">
                      {bookingData?.appointmentId || appointmentId || "N/A"}
                    </span>
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <strong>{selectedDate}</strong>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <strong>
                      {slots?.startTime} - {slots?.endTime}
                    </strong>
                  </div>
                  <span className="inline-block mt-4 px-4 py-1 text-xs bg-blue-100 text-blue-700 rounded-full font-medium">
                    {selectedFor?.toUpperCase() || "MYSELF"}
                  </span>
                </div>

                {/* Patient Info */}
                <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-4 w-full max-w-md mx-auto">
                  <h4 className="text-base font-semibold text-gray-800 mb-2">
                    Patient Information
                  </h4>

                  {selectedFor === "self" ? (
                    <div className="space-y-1 text-sm text-gray-700">
                      <p className="flex flex-wrap">
                        <strong className="mr-1">Name:</strong>{" "}
                        {userProfileData?.name || "N/A"}
                      </p>
                      <p className="flex flex-wrap">
                        <strong className="mr-1">Gender:</strong>{" "}
                        {userProfileData?.gender || "N/A"}
                      </p>
                      <p className="flex flex-wrap">
                        <strong className="mr-1">Contact:</strong>{" "}
                        {userProfileData?.phone || "N/A"}
                      </p>
                    </div>
                  ) : selectedFor === "other" ? (
                    <div className="space-y-1 text-sm text-gray-700">
                      <p className="flex flex-wrap">
                        <strong className="mr-1">Name:</strong>{" "}
                        {selectedPatient?.name ||
                          otherPatientDetails?.patient?.name ||
                          "N/A"}
                      </p>
                      <p className="flex flex-wrap">
                        <strong className="mr-1">Gender:</strong>{" "}
                        {selectedPatient?.gender ||
                          otherPatientDetails?.patient?.gender ||
                          "N/A"}
                      </p>
                      <p className="flex flex-wrap">
                        <strong className="mr-1">Contact:</strong>{" "}
                        {selectedPatient?.phone ||
                          otherPatientDetails?.patient?.phone ||
                          "N/A"}
                      </p>
                    </div>
                  ) : selectedFor === "pet" ? (
                    <div className="space-y-1 text-sm text-gray-700">
                      <p className="flex flex-wrap">
                        <strong className="mr-1">Name:</strong>{" "}
                        {selectedPet?.name || "N/A"}
                      </p>
                      <p className="flex flex-wrap">
                        <strong className="mr-1">Gender:</strong>{" "}
                        {selectedPet?.gender || "N/A"}
                      </p>
                      <p className="flex flex-wrap">
                        <strong className="mr-1">Age:</strong>{" "}
                        {selectedPet?.age ? `${selectedPet.age} yrs` : "N/A"}
                      </p>
                      {selectedPet?.weight && (
                        <p className="flex flex-wrap">
                          <strong className="mr-1">Weight:</strong>{" "}
                          {selectedPet.weight}
                        </p>
                      )}
                    </div>
                  ) : null}
                </div>

                {/* Fee */}
                <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-4">
                  <div className="flex justify-between items-center text-base">
                    <span className="flex items-center gap-2 text-blue-700 font-medium">
                      <CreditCard className="w-5 h-5" /> Consultation Fee
                    </span>
                    <span className="font-semibold text-blue-700 text-lg">
                      {selectedClinic.consultationFee}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex justify-between text-sm text-blue-700 font-medium">
                  <a href="tel:+108">
                    <button
                      onClick={() => alert("Calling clinic...")}
                      className="hover:underline hover:text-blue-800 transition-all flex items-center  gap-2"
                    >
                      <Phone className="w-4 h-4" /> Call Clinic
                    </button>
                  </a>

                  <a
                    href="https://maps.app.goo.gl/jb3Koe47X8UqEUXm8"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button
                      onClick={() => alert("Opening map...")}
                      className="hover:underline hover:text-blue-800 transition-all flex items-center  gap-2"
                    >
                      <MapPin className="w-4 h-4" /> Get Location
                    </button>
                  </a>
                </div>

                {/* Continue */}
                <div className="mt-6">
                  <button
                    onClick={handleClose}
                    className="w-full px-6 py-3 bg-[#006fab] hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-base rounded-full transition-all duration-200"
                  >
                    Go to Appointments →
                  </button>
                </div>
              </>
            </div>
          )}
          {/* Razorpay Component */}
          {showRazorpay && orderId && (
            <RenderRazorPay
              orderId={orderId}
              currency="INR"
              amount={appointmentData?.amount * 100 || 0}
              setUpdateStatus={async (response) => {
                console.log("🔄 Payment verified", response);
                await handlePayment(response); // backend verify
                setShowRazorpay(false);

                // Trigger Step 4 only after modal fully closes
                setTimeout(() => setStep(4), 100);
              }}
              onClose={() => setShowRazorpay(false)}
            />
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AppointmentFlow;
