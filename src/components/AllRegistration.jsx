 import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Stethoscope,
  Microscope,
  Home,
  HelpCircle,
  ArrowRight,
  Calendar,
  Ambulance,
  Hospital,
} from "lucide-react";

const AppointmentTypeCard = ({
  icon: Icon,
  title,
  description,
  color,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden p-5 sm:p-6 rounded-2xl border cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${color.bg} ${color.border} bg-gradient-to-br`}
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 opacity-5">
        <Icon size={96} className="text-current sm:size-[128px]" />
      </div>

      <div className="relative z-10">
        {/* Icon */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={`flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${color.iconBg} shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className={`${color.iconText}`} size={28} />
          </div>
        </div>

        {/* Title & Description */}
        <div className="mb-4">
          <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${color.iconText}`}>
            Manage appointments
          </span>
          <ArrowRight
            className={`${color.iconText} group-hover:translate-x-1 transition-transform duration-300`}
            size={18}
          />
        </div>
      </div>

      {/* Hover Gradient */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${color.hoverOverlay}`}
      ></div>
    </div>
  );
};

const AllRegistration = () => {
  const navigate = useNavigate();
  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50">
      <div className="mx-auto px-4 sm:px-6 py-28 sm:py-38 lg:w-[70%]">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4">
            <Calendar className="text-white" size={28} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
            Welcome! Let's Get You Started 
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Please select the role that best describes your service. we'll guide you through a personalized setup.
          </p>
        </div>

        {/* Appointment Types */}
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          <AppointmentTypeCard
            icon={Hospital}
            title="Hospital Registration"
            description="For clinics, hospitals, and healthcare centers."
            color={{
              bg: "from-blue-50 to-blue-100/50",
              border: "border-blue-200/50",
              iconBg: "bg-white shadow-blue-100",
              iconText: "text-blue-600",
              hoverOverlay: "bg-blue-600",
            }}
            onClick={() => navigate("/hospital-registration")}
          />
          <AppointmentTypeCard
            icon={Microscope}
            title="Pharmacy Registration"
            description="Retail or online pharmacy service provider"
            color={{
              bg: "from-emerald-50 to-emerald-100/50",
              border: "border-emerald-200/50",
              iconBg: "bg-white shadow-emerald-100",
              iconText: "text-emerald-600",
              hoverOverlay: "bg-emerald-600",
            }}
            onClick={() => navigate("/pharmacy-registration")}
          />
          <AppointmentTypeCard
            icon={Home}
            title="Diagnostic Center Registration"
            description="Pathology, lab testing, or scan centers."
            color={{
              bg: "from-rose-50 to-rose-100/50",
              border: "border-rose-200/50",
              iconBg: "bg-white shadow-rose-100",
              iconText: "text-rose-600",
              hoverOverlay: "bg-rose-600",
            }}
            onClick={() => navigate("/diagonstics-registration")}
          />
          <AppointmentTypeCard
            icon={Stethoscope}
            title="Doctor Registration"
            description="Individual medical professionals."
            color={{
              bg: "from-rose-50 to-rose-100/50",
              border: "border-rose-200/50",
              iconBg: "bg-white shadow-rose-100",
              iconText: "text-rose-600",
              hoverOverlay: "bg-rose-600",
            }}
            onClick={()=> navigate("/doctors-registration")}
          />
          <AppointmentTypeCard
            icon={Ambulance}
            title="Ambulance Registration"
            description="Emergency or transport vehicle services."
            color={{
              bg: "from-blue-50 to-blue-100/50",
              border: "border-rose-200/50",
              iconBg: "bg-white shadow-rose-100",
              iconText: "text-rose-600",
              hoverOverlay: "bg-rose-600",
            }}
            onClick={()=> navigate("/ambulance-registration")}
          />
        </div>

        {/* Support Section */}
        <div className="relative overflow-hidden p-6 sm:p-8 bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 rounded-3xl shadow-2xl">
          {/* Background Icons */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-20 sm:w-32 h-20 sm:h-32">
              <HelpCircle size={96} className="text-white sm:size-[128px]" />
            </div>
            <div className="absolute bottom-4 left-4 w-20 sm:w-24 h-20 sm:h-24">
              <Calendar size={72} className="text-white sm:size-[96px]" />
            </div>
          </div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="md:mr-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                  Need Assistance?
                </h3>
                <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-lg">
                  If you need assistance with your appointments, please contact our support team
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
               
                <button className="flex items-center justify-center px-5 py-3 border-2 border-white text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-white hover:text-indigo-600 transition-colors duration-300 w-full sm:w-auto">
                  <HelpCircle size={18} className="mr-2" />
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRegistration;
