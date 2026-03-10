import React, { useState, useEffect } from "react";
import { Calendar, Clock, Phone, MessageSquare, Trash2, Info } from "lucide-react";

const initialAppointments = [
  {
    id: 1,
    status: "Pending",
    type: "Medical Consultation",
    doctorName: "Dr. Aditya Kumar",
    specialization: "Skin & Hair Specialist",
    date: "Today",
    time: "04:23 PM",
    service: "In-clinic",
  },
  {
    id: 2,
    status: "Pending",
    type: "Medical Consultation",
    doctorName: "Dr. Ramesh Chandra",
    specialization: "General Physician",
    date: "Tomorrow",
    time: "10:30 AM",
    service: "In-clinic",
  },
];

const DoctorAppointmentsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [filter, setFilter] = useState("All");
  const [notification, setNotification] = useState("");

  const filteredAppointments = appointments.filter((appt) => {
    if (filter === "All") return true;
    if (filter === "Video") return appt.service === "Video";
    if (filter === "In-Clinic") return appt.service === "In-clinic";
    return true;
  });

  const handleCancelAppointment = (id) => {
    setAppointments((prev) => prev.filter((appt) => appt.id !== id));
    showNotification("Appointment cancelled successfully");
  };

  const handleDeleteAppointment = (id) => {
    setAppointments((prev) => prev.filter((appt) => appt.id !== id));
    showNotification("Appointment deleted");
  };

  const handleCall = (doctorName) => {
    showNotification(`Calling ${doctorName}...`);
  };

  const handleMessage = (doctorName) => {
    showNotification(`Opening chat with ${doctorName}...`);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  const getFilterCounts = () => {
    return {
      all: appointments.length,
      video: appointments.filter((appt) => appt.service === "Video").length,
      inClinic: appointments.filter((appt) => appt.service === "In-clinic").length,
    };
  };

  const counts = getFilterCounts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="sm:w-full lg:w-[80%] xl:w-[80%] 2xl:w-[70%] mx-auto px-4 py-24 sm:px-6 lg:px-8 sm:py-38">
        {/* Notification */}
        {notification && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-lg">
            {notification}
          </div>
        )}

        {/* Header */}
        <div className="text-center md:mb-8 mb-4 px-2">
          <h2 className="text-xl md:text-3xl  font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-1 md:mb-3">
            My Appointments
          </h2>
          <p className="text-gray-600 text-xs sm:text-base">
            Manage your upcoming medical consultations
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-3 sm:gap-4 md:mb-8 mb-4 flex-wrap justify-center">
          {[
            { label: "All", value: "All", count: counts.all },
            { label: "Video", value: "Video", count: counts.video },
            { label: "In-Clinic", value: "In-Clinic", count: counts.inClinic },
          ].map((btn) => (
            <button
              key={btn.value}
              onClick={() => setFilter(btn.value)}
              className={`px-5 sm:px-8 py-2 sm:py-3 rounded-full text-xs sm:text-base font-semibold shadow-md sm:shadow-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 ${
                filter === btn.value
                  ? "bg-gradient-to-r from-[#007BBD] to-[#005A8C] text-white"
                  : "bg-white/70 backdrop-blur-sm border border-blue-200 text-[#007BBD] hover:bg-white hover:shadow-md"
              }`}
            >
              {btn.label} ({btn.count})
            </button>
          ))}
        </div>

        <p className="text-gray-500 md:mb-8 mb-3 text-center text-sm sm:text-base">
          Showing {filteredAppointments.length} appointments
        </p>

        {/* No Appointments Message */}
        {filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl sm:text-6xl mb-4">🏥</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
              No appointments found
            </h3>
            <p className="text-gray-500 text-sm sm:text-base">
              {filter === "All"
                ? "You don't have any appointments scheduled."
                : `No ${filter.toLowerCase()} appointments found.`}
            </p>
          </div>
        )}

        {/* Appointment Cards */}
        <div className="space-y-4 grid grid-cols-1  gap-4 items-start sm:grid-cols-1 lg:grid-cols-2">
          {filteredAppointments.map((appt) => (
            <div
              key={appt.id}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group hover:-translate-y-1 border border-white/60"
            >
              {/* Compact Header */}
              <div className="relative bg-gradient-to-r from-[#007BBD] to-[#005A8C] p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-sm">Dr</span>
                      </div>
                    </div>
                    <div className="text-white">
                      <h2 className="font-semibold text-lg leading-tight">{appt.doctorName}</h2>
                      <p className="text-blue-100 text-sm">{appt.specialization}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${
                        appt.status === "Pending"
                          ? "bg-red-50 text-red-600"
                          : "bg-green-50 text-green-600"
                      }`}
                    >
                      {appt.status}
                    </span>
                    <button
                      onClick={() => handleDeleteAppointment(appt.id)}
                      className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 hover:scale-110 transition-all duration-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Compact Details and Actions */}
              <div className="p-4">
                <div className="grid grid-cols-1  gap-4 items-center">
                  {/* Appointment Details - Horizontal Layout */}
                  <div className="lg:col-span-3 grid sm:grid-cols-3 grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                      <div className="p-1.5 bg-white rounded-md text-grey-800">
                        <Calendar size={12} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-xs md:text-sm 2xl:text-base">{appt.date}</p>
                        <p className="text-gray-500 text-xs md:text-sm 2xl:text-base">Date</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-green-100">
                      <div className="p-1.5 bg-white rounded-md text-grey-800">
                        <Clock size={12} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-xs md:text-sm 2xl:text-base">{appt.time}</p>
                        <p className="text-gray-500 text-xs md:text-sm 2xl:text-base">Time</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-purple-100">
                      <div className="p-1.5 bg-white rounded-md text-grey-800">
                        <Info size={12} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-xs md:text-sm 2xl:text-base">{appt.service}</p>
                        <p className="text-gray-500 text-xs md:text-sm 2xl:text-base">Service</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="lg:col-span-2 grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleCall(appt.doctorName)}
                      className="flex items-center justify-center gap-1 py-2 px-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all duration-300 text-xs md:text-sm 2xl:text-base font-semibold border border-blue-200"
                    >
                      <Phone size={12} />
                      Call
                    </button>
                    <button
                      onClick={() => handleMessage(appt.doctorName)}
                      className="flex items-center justify-center gap-1 py-2 px-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-all duration-300 text-xs md:text-sm 2xl:text-base font-semibold border border-green-200"
                    >
                      <MessageSquare size={12} />
                      Message
                    </button>
                    <button
                      onClick={() => handleCancelAppointment(appt.id)}
                      className="flex items-center justify-center py-2 px-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-300 text-xs md:text-sm 2xl:text-base font-semibold border border-red-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointmentsPage;