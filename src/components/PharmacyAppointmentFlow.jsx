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
import { getRequest } from "../Helpers";
import { postRequest } from "../Helpers";
import { useSelector, useDispatch } from "react-redux";

const PharmacyAppointmentFlow = ({ open, onClose, id }) => {

    console.log("PharmacyAppointmentFlow component rendered with id:", id);
    console.log("Open state:", open);
    console.log("onClose function:", onClose);


  const [selectedDate, setSelectedDate] = useState(null);
  const [clinicData, setClinicData] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [step, setStep] = useState(1);
  const [selectedFor, setSelectedFor] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const selectedClinic = clinicData || {};
  const [showPatientList, setShowPatientList] = useState(false);
  const [showAddPatientForm, setShowAddPatientForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookedData, setBookedData] = useState(null);

  console.log("bookedData in PharmacyAppointmentFlow:", bookedData);

  const { userProfileData } = useSelector((state) => state.user);
    const userId = userProfileData?._id;


  // Dummy patient data
  const [otherPatients, setOtherPatients] = useState([
    { name: "Anjali Sharma", gender: "Female", age: 28 },
    { name: "Ravi Kumar", gender: "Male", age: 35 },
  ]);

  // Get user profile data from Redux
  const {  isLoggedIn } = useSelector((state) => state.user);

  // Dummy pharmacy and patient IDs for demonstration (replace with real data as needed)
  const pharmacyId = id
  const patientId = userId 
  const prescriptionUrl = "http://example.com/report.pdf"; // Replace with actual prescription/report URL if available

  // Function to handle pharmacy booking API call
  const handlePharmacyBooking = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await postRequest({
        url: "pharmacyBooking/addWithPriscription",
        cred: {
          patient: patientId,
          pharmacy: pharmacyId,
          report: prescriptionUrl,
        },
      });
      setStep(4);
      setBookedData(response?.data?.data);

      console.log("Booking response:", response);
    } catch (err) {
      setError("Failed to book pharmacy appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  console.log("user profile data from redux in navbar", userProfileData);
  console.log("isLoggedIn from redux", isLoggedIn);

  const handleClose = () => {
    setStep(1);
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
  const navigate = useNavigate();

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
                      setShowPatientList(false);
                      setShowAddPatientForm(false);
                    }}
                  >
                    {option === "self" ? "Self" : "Other"}
                  </button>
                ))}
              </div>

              {selectedFor === "other" && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Other Patients:
                  </h4>
                  {otherPatients.length > 0 ? (
                    <ul className="space-y-2 text-sm text-gray-700">
                      {otherPatients.map((p, i) => (
                        <li
                          key={i}
                          className="border border-gray-200 rounded-lg p-2 shadow-sm"
                        >
                          {p.name} – {p.gender}, {p.age} yrs
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No data available</p>
                  )}
                </div>
              )}

              {showPatientList && <div className="mt-4 border-t pt-4"></div>}

              {showAddPatientForm && (
                <div className="mt-4 border-t pt-4 space-y-2">
                  <h4 className="text-sm font-semibold text-gray-700">
                    Add Patient
                  </h4>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-3 py-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Gender"
                    className="w-full px-3 py-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    className="w-full px-3 py-2 border rounded"
                  />
                  <button
                    onClick={() => {
                      setShowAddPatientForm(false);
                    }}
                    className="w-full bg-blue-600 text-white py-2 rounded font-medium"
                  >
                    Save Patient
                  </button>
                </div>
              )}

              <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
                <button
                  onClick={handleClose}
                  className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    if (selectedFor === "self") {
                      setStep(2);
                    } else {
                      navigate("/manage-patients");
                    }
                  }}
                  disabled={!selectedFor}
                  className={`w-full px-4 py-3 font-medium rounded-lg transition-all duration-200 ${
                    selectedFor
                      ? "bg-[#006fab] hover:bg-blue-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {selectedFor === "self"
                    ? "Continue as Self"
                    : "Manage Patients"}
                </button>
                
              </div>
            </>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <>
              <Dialog.Title className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-6">
                Select Delivery Mode
              </Dialog.Title>

              <div className="space-y-4">
                {[
                  { id: "online", label: "PickUp From Pharmacy" },
                  { id: "clinic", label: "Home Delivery" },
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
                      setStep(3);
                      // setStep(3); // Can later redirect online payment step here if needed
                    }
                  }}
                  disabled={!selectedPayment}
                  className={`w-full px-4 py-3 font-medium rounded-lg transition-all duration-200 ${
                    selectedPayment
                      ? "bg-[#006fab] hover:bg-blue-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Continue
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
                Are you sure you want to book this pharmacy appointment?
              </p>

              {error && (
                <div className="mb-4 text-red-600 text-center text-sm font-medium">{error}</div>
              )}

              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <button
                  onClick={handleClose}
                  className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all duration-200"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handlePharmacyBooking}
                  className={`w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                  disabled={loading}
                >
                  {loading ? "Booking..." : "Yes, Book"}
                </button>
              </div>
            </>
          )}

          {/* Step 4: Final Appointment Details */}
          {step === 4 && (
        <>
  <Dialog.Title className="text-2xl font-bold text-center text-green-700 mb-8">
    My Appointment
  </Dialog.Title>

  {/* Status */}
  <div className="bg-red-50 border border-red-200 text-red-600 font-semibold text-sm rounded-xl px-4 py-2 mb-6 shadow-sm text-center">
    {bookedData?.status || "⏳ Awaiting Confirmation"}
  </div>

  {/* Pharmacy Info */}
  <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-6">
    <div className="flex items-center gap-4 sm:gap-5">
      <img
        src={bookedData?.pharmacy?.profileImage || "https://i.pinimg.com/736x/92/eb/b8/92ebb8868a7d96bb48184758f0a76e9f.jpg"}
        alt="Pharmacy"
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border border-gray-200 shadow-sm"
      />
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
          {bookedData?.pharmacy?.name || "Health Plus Pharmacy"}
        </h3>
        <p className="text-sm text-gray-500">
          {bookedData?.pharmacy?.address || "Gomti Nagar, Lucknow"}
        </p>
      </div>
    </div>
  </div>

  {/* Appointment Time */}
  <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-6">
    <h4 className="text-base font-semibold text-gray-800 mb-4">
      Scheduled Appointment
    </h4>
    <p className="text-sm text-gray-500 mb-2">
      Appointment ID:{" "}
      <span className="font-semibold text-gray-700">
        {bookedData?.appointmentId || "APT-73673"}
      </span>
    </p>
    <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
      <Calendar className="w-5 h-5 text-blue-600" />
      <strong>
        {bookedData?.createdAt
          ? new Date(bookedData.createdAt).toLocaleDateString()
          : "14 Aug 2025"}
      </strong>
    </div>
    <div className="flex items-center gap-2 text-sm text-gray-700">
      <Clock className="w-5 h-5 text-blue-600" />
      <strong>03:50 PM - 04:25 PM</strong>
    </div>
    <span className="inline-block mt-4 px-4 py-1 text-xs bg-blue-100 text-blue-700 rounded-full font-medium">
      MYSELF
    </span>
  </div>

  {/* Patient Info */}
  <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-6">
    <h4 className="text-base font-semibold text-gray-800 mb-4">
      Patient Information
    </h4>
    <div className="space-y-1 text-sm text-gray-700">
      <p>
        <strong>Name:</strong> {bookedData?.patient?.name || "User"}
      </p>
      <p>
        <strong>Gender:</strong> {bookedData?.patient?.gender || "Male"}
      </p>
      <p>
        <strong>Contact:</strong> {bookedData?.patient?.phone || "N/A"}
      </p>
    </div>
  </div>

  

  {/* Actions */}
  <div className="mt-6 flex justify-between text-sm text-blue-700 font-medium">
    <a href={`tel:${bookedData?.pharmacy?.phone || "108"}`}>
      <button className="hover:underline hover:text-blue-800 transition-all flex items-center gap-2">
        <Phone className="w-4 h-4" /> Call Pharmacy
      </button>
    </a>

    <a
      href="https://maps.app.goo.gl/jb3Koe47X8UqEUXm8"
      target="_blank"
      rel="noopener noreferrer"
    >
      <button className="hover:underline hover:text-blue-800 transition-all flex items-center gap-2">
        <MapPin className="w-4 h-4" /> Get Location
      </button>
    </a>
  </div>

  {/* Continue */}
  <div className="mt-8">
    <button
      onClick={handleClose}
      className="w-full px-6 py-3 bg-[#006fab] text-white font-semibold text-base rounded-full hover:bg-[#005b8a] transition-all duration-200"
    >
      Go to Appointments →
    </button>
  </div>
</>

          )}

        </Dialog.Panel>


      </div>
    </Dialog>
  );
};

export default PharmacyAppointmentFlow;
