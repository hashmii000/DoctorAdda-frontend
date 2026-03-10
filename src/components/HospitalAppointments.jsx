import React, { useState } from "react";
import { ArrowLeft, Calendar, User, Phone, Mail, CreditCard, Clock, Stethoscope, MapPin, MessageSquare, Video, FileText } from "lucide-react";

const hospitalAppointments = [
  {
    id: 1,
    doctorName: "arjun singh",
    status: "PENDING",
    appointmentId: "APT-54106",
    doctorType: "Internal",
    date: "Aug 18, 2025",
    time: "03:28 AM - 03:58 AM",
    patientName: "Self",
    phone: "8707767805",
    email: "abhishekyadav705439@gmail.com",
    fee: "500"
  },
  {
    id: 2,
    doctorName: "priya sharma",
    status: "CONFIRMED",
    appointmentId: "APT-54107",
    doctorType: "Cardiology",
    date: "Aug 20, 2025",
    time: "10:00 AM - 10:30 AM",
    patientName: "Self",
    phone: "8707767805",
    email: "abhishekyadav705439@gmail.com",
    fee: "800"
  },
  {
    id: 3,
    doctorName: "rajesh kumar",
    status: "COMPLETED",
    appointmentId: "APT-54105",
    doctorType: "Orthopedic",
    date: "Aug 10, 2025",
    time: "02:00 PM - 02:30 PM",
    patientName: "Self",
    phone: "8707767805",
    email: "abhishekyadav705439@gmail.com",
    fee: "600"
  }
];

const HospitalAppointments = () => {
  const [appointments] = useState(hospitalAppointments);
  const [notification, setNotification] = useState("");

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 border-orange-300";
      case "CONFIRMED":
        return "bg-gradient-to-r from-green-100 to-green-200 text-green-700 border-green-300";
      case "COMPLETED":
        return "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border-blue-300";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "PENDING":
        return "⏳";
      case "CONFIRMED":
        return "✅";
      case "COMPLETED":
        return "🎉";
      default:
        return "📋";
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleAction = (action, doctorName) => {
    showNotification(`${action} with ${doctorName}...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-26">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl shadow-2xl">
          {notification}
        </div>
      )}

      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md shadow-xl border-b border-gray-200/50">
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex items-center justify-between py-4 sm:py-6">
            <div className="flex items-center gap-4">
             
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                All Hospital Appointments
              </h1>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-[#007BBD] to-[#005A8C] rounded-xl">
                <Stethoscope className="text-white" size={20} />
              </div>
              <span className="text-sm text-gray-600 font-medium">Healthcare</span>
            </div>
          </div>
        </div> */}
      </div>

      {/* Content */}
      <div className="sm:w-full lg:w-[80%] xl:w-[80%] 2xl:w-[70%] mx-auto px-2 sm:px-6 lg:px-8  sm:py-12">
        
        {/* Appointments List */}
        <div className="space-y-6">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/70 hover:scale-[1.01] group"
            >
              {/* Card Header with Gradient Border */}
              <div className="bg-gradient-to-r from-[#007BBD] to-[#005A8C] p-[2px]">
                <div className="bg-white rounded-t-3xl p-2 sm:p-3">
                  <div className="flex  flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="md:w-14 md:h-14 w-10 h-10 bg-gradient-to-r from-[#007BBD] to-[#005A8C] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white font-bold text-sm sm:text-xl">
                            {appointment.doctorName.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </span>
                        </div>
                       
                      </div>
                      <div>
                        <h3 className="text-base sm:text-xl font-bold text-gray-900 capitalize mb-1">
                          {appointment.doctorName}
                        </h3>
                        
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <span className={`md:px-5 md:py-2 px-3 py-1 rounded-full md:text-sm text-xs font-bold border shadow-sm ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-2 sm:p-6 space-y-6">
                {/* Appointment Details */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl md:p-5 p-2 border border-gray-200/50">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Calendar className="text-[#007BBD]" size={20} />
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm md:text-lg">Appointment Details</h4>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-3 shadow-sm">
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">Appointment ID</p>
                      <p className="font-bold text-xs md:text-sm text-gray-900">{appointment.appointmentId}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 shadow-sm">
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">Date</p>
                      <p className="font-bold text-xs md:text-sm text-gray-900">{appointment.date}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 shadow-sm">
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">Time</p>
                      <p className="font-bold text-xs md:text-sm text-gray-900">{appointment.time}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 shadow-sm">
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">Doctor Type</p>
                      <p className="font-bold text-xs md:text-sm text-gray-900">{appointment.doctorType}</p>
                    </div>
                  </div>
                </div>

                {/* Patient Info */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl md:p-5 p-2 border border-blue-200/50">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <User className="text-[#007BBD]" size={20} />
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm md:text-lg">Patient Info</h4>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl p-3 shadow-sm">
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">Name</p>
                      <p className="font-bold text-xs md:text-sm text-gray-900">{appointment.patientName}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 shadow-sm">
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">Phone</p>
                      <p className="font-bold text-xs md:text-sm text-gray-900 flex items-center gap-2">
                        <Phone size={14} className="text-[#007BBD]" />
                        {appointment.phone}
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-3 shadow-sm">
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">Email</p>
                      <p className="font-bold text-xs md:text-sm text-gray-900 flex items-center gap-2 break-all">
                        <Mail size={14} className="text-[#007BBD] flex-shrink-0" />
                        <span className="break-all">{appointment.email}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl md:p-3 p-2 border border-green-200/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <CreditCard className="text-green-600" size={20} />
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm md:text-lg">Payment Info Fee</h4>
                    </div>
                    <div className="bg-white  rounded-xl md:p-3 p-2 text-right shadow-sm">

                      <p className="md:text-xl text-sm font-bold text-green-600">₹{appointment.fee}</p>
                    </div>
                  </div>
                </div>

              
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {appointments.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl mx-auto mb-6 flex items-center justify-center">
              <Stethoscope size={48} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No appointments found</h3>
            <p className="text-gray-500">You don't have any hospital appointments scheduled.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalAppointments;