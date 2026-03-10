import React, { useState, useEffect } from "react";
import { Calendar, Phone, Trash2, MapPin, Plus, X, CreditCard, TestTube } from "lucide-react";

const initialAppointments = [
  {
    id: 1,
    status: "Pending",
    type: "Diagnostic Tests",
    labName: "City Lab Diagnostics",
    appointmentNumber: "APT-82775",
    date: "Aug 13, 2025",
    totalAmount: "300",
    payment: "Pending",
    tests: "1 items",
    services: [
      { name: "Blood Test", price: "300" }
    ],
  },
  {
    id: 2,
    status: "Pending",
    type: "Diagnostic Tests",
    labName: "Metro Health Lab",
    appointmentNumber: "APT-82776",
    date: "Aug 15, 2025",
    totalAmount: "450",
    payment: "Pending",
    tests: "2 items",
    services: [
      { name: "Blood Test", price: "300" },
      { name: "Urine Test", price: "150" }
    ],
  },
];

const DiagnosticAppointmentsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [filter, setFilter] = useState("All");
  const [notification, setNotification] = useState("");

  const filteredAppointments = appointments.filter((appt) => {
    if (filter === "All") return true;
    if (filter === "Pending") return appt.status === "Pending";
    if (filter === "Completed") return appt.status === "Completed";
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

  const handleCall = (labName) => {
    showNotification(`Calling ${labName}...`);
  };

  const handleBookAgain = (labName) => {
    showNotification(`Booking again at ${labName}...`);
  };

  const handleDirections = (labName) => {
    showNotification(`Getting directions to ${labName}...`);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  const getFilterCounts = () => {
    return {
      all: appointments.length,
      pending: appointments.filter((appt) => appt.status === "Pending").length,
      completed: appointments.filter((appt) => appt.status === "Completed").length,
    };
  };

  const counts = getFilterCounts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-5xl mx-auto px-4 py-24 sm:px-6 lg:px-8 sm:py-38">
        {/* Notification */}
        {notification && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-lg">
            {notification}
          </div>
        )}

        {/* Header */}
        <div className="text-center md:mb-8 mb-4 px-2">
          <h2 className="text-xl 2xl:text-3xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
            Diagnostic Appointments
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage your upcoming diagnostic tests and lab appointments
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-3 sm:gap-4 md:mb-8 mb-4 flex-wrap justify-center">
          {[
            { label: "All", value: "All", count: counts.all },
            { label: "Pending", value: "Pending", count: counts.pending },
            { label: "Completed", value: "Completed", count: counts.completed },
          ].map((btn) => (
            <button
              key={btn.value}
              onClick={() => setFilter(btn.value)}
              className={`px-5 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base font-semibold shadow-md sm:shadow-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 ${
                filter === btn.value
                  ? "bg-gradient-to-r from-[#007BBD] to-[#005A8C] text-white"
                  : "bg-white/70 backdrop-blur-sm border border-blue-200 text-[#007BBD] hover:bg-white hover:shadow-md"
              }`}
            >
              {btn.label} ({btn.count})
            </button>
          ))}
        </div>

        <p className="text-gray-500 md:mb-8 mb-4 text-center text-sm sm:text-base">
          Showing {filteredAppointments.length} appointments
        </p>

        {/* No Appointments Message */}
        {filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl sm:text-6xl mb-4">🧪</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
              No diagnostic appointments found
            </h3>
            <p className="text-gray-500 text-sm sm:text-base">
              {filter === "All"
                ? "You don't have any diagnostic appointments scheduled."
                : `No ${filter.toLowerCase()} appointments found.`}
            </p>
          </div>
        )}

        {/* Appointment Cards */}
        <div className="space-y-4">
          {filteredAppointments.map((appt) => (
            <div
              key={appt.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/60 hover:bg-white/90"
            >
              <div className="p-4 sm:p-5">
                {/* Header Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-r from-[#007BBD] to-[#005A8C] rounded-2xl flex items-center justify-center shadow-lg">
                        <TestTube className="text-white" size={20} />
                      </div>
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#007BBD] rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{appt.services.length}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{appt.labName}</h3>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="px-3 py-1 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 rounded-full font-semibold">
                          {appt.status}
                        </span>
                        <span className="text-gray-500">{appt.appointmentNumber}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteAppointment(appt.id)}
                    className="p-2 bg-red-50 hover:bg-red-100 rounded-xl text-red-500 hover:scale-110 transition-all duration-300 group"
                  >
                    <Trash2 size={16} className="group-hover:animate-pulse" />
                  </button>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 text-center">
                    <Calendar className="text-gray-600 mx-auto mb-1" size={16} />
                    <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">Date</p>
                    <p className="text-sm font-bold text-gray-800">{appt.date}</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 text-center">
                    <CreditCard className="text-gray-600 mx-auto mb-1" size={16} />
                    <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">Amount</p>
                    <p className="text-sm font-bold text-gray-800">₹{appt.totalAmount}</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 text-center">
                    <TestTube className="text-gray-600 mx-auto mb-1" size={16} />
                    <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">Tests</p>
                    <p className="text-sm font-bold text-gray-800">{appt.tests}</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 text-center">
                    <CreditCard className="text-gray-600 mx-auto mb-1" size={16} />
                    <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">Payment</p>
                    <p className="text-sm font-bold text-gray-800">{appt.payment}</p>
                  </div>
                </div>

                {/* Services List */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-800 text-sm">Services ({appt.services.length})</h4>
                    <div className="flex gap-1">
                      {appt.services.map((_, index) => (
                        <div key={index} className=" "></div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-2 space-y-1">
                    {appt.services.map((service, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-gray-700">{service.name}</span>
                        <span className="text-green-600 font-bold">₹{service.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
                  <button
                    onClick={() => handleCancelAppointment(appt.id)}
                    className="flex flex-col items-center justify-center py-2 px-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all duration-300 group border border-red-200"
                  >
                    <X size={16} className="mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-semibold">Cancel</span>
                  </button>
                  <button
                    onClick={() => handleBookAgain(appt.labName)}
                    className="flex flex-col items-center justify-center py-2 px-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-xl transition-all duration-300 group border border-green-200"
                  >
                    <Plus size={16} className="mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-semibold">Book</span>
                  </button>
                  <button
                    onClick={() => handleCall(appt.labName)}
                    className="flex flex-col items-center justify-center py-2 px-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-all duration-300 group border border-blue-200"
                  >
                    <Phone size={16} className="mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-semibold">Call</span>
                  </button>
                  <button
                    onClick={() => handleDirections(appt.labName)}
                    className="flex flex-col items-center justify-center py-2 px-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-all duration-300 group border border-blue-200"
                  >
                    <MapPin size={16} className="mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-semibold">Direction</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiagnosticAppointmentsPage;