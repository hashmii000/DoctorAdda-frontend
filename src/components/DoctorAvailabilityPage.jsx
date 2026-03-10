import React, { useState } from "react";
import { User, Heart, Stethoscope, Phone, Plus } from "lucide-react";
import UrgentRequirementModal from "./UrgentRequirementModal";

const DoctorAvailabilityPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const doctors = [
    {
      id: 1,
      name: "Rahul",
      specialty: "Cardiologist (Heart)",
      hospital: "AIMS Hospital",
      experience: "12 years",
      avatar: "R",
      isOnline: true,
      icon: Heart,
    },
    {
      id: 2,
      name: "Mehdi",
      specialty: "Veterinary",
      hospital: "City Hospital",
      experience: "5 years",
      avatar: "M",
      isOnline: true,
      icon: Stethoscope,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 md:p-4 p-2 lg:p-8">
      <div className="md:w-[90%] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className=" text-lg md:text-xl  font-bold text-gray-800 mb-2">
            Available Doctors
          </h1>
          <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 mb-12">
          {doctors.map((doctor) => {
            const IconComponent = doctor.icon;
            return (
              <div
                key={doctor.id}
                className="bg-white flex items-end justify-between rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-slate-100 hover:border-blue-200 transform hover:-translate-y-1"
              >
                <div>
                  {/* Doctor Avatar and Status */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-[#007BBD] to-[#005A8C] flex items-center justify-center text-white text-xl lg:text-2xl font-bold shadow-lg">
                        {doctor.avatar}
                      </div>
                      {doctor.isOnline && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-white shadow-sm animate-pulse"></div>
                      )}
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg lg:text-lg font-bold text-slate-800">
                        {doctor.name}
                      </h3>
                      {doctor.isOnline && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>

                    <p className="text-slate-600 font-medium mb-1">
                      {doctor.specialty}
                    </p>

                    {doctor.hospital && (
                      <p className="text-slate-500 text-sm mb-1 capitalize">
                        {doctor.hospital}
                      </p>
                    )}

                    <p className="text-slate-500 text-sm">
                      Experience: {doctor.experience}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white   py-1 rounded-xl text-sm 2xl-text-base transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                    <Phone size={16} />
                    Contact
                  </button>
                  <button className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-xl text-sm  2xl-text-base transition-all duration-200 shadow-md hover:shadow-lg">
                    Show Interest
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Requirements Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-slate-100">
          <div className="mb-6">
            <h2 className=" md:text-xl text-lg font-bold text-slate-800 mb-2">
              Your Posted Requirements
            </h2>
            <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
          </div>

          {/* Empty State */}
          <div className="text-center py-12 lg:py-16">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="text-slate-400" size={32} />
            </div>
            <p className="text-slate-500 text-base mb-8">
              No urgent requirements posted yet.
            </p>

            {/* Post Requirement Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-[#007BBD] to-[#005A8C] hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 flex items-center justify-center gap-3 mx-auto shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus size={24} />
              Post Urgent Requirement
            </button>

            {/* Modal */}
            <UrgentRequirementModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-500">
          <p className="text-sm">
            Connect with qualified healthcare professionals instantly
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorAvailabilityPage;
