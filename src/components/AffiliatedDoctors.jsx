import React, { useState } from "react";
import { Trash2, UserPlus, Stethoscope } from "lucide-react";
import AddDoctorModal from "./AddDoctorModal";

const AffiliatedDoctors = () => {
  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. Zaid", specialty: "Web Specialist" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (id) => {
    setDoctors(doctors.filter((doc) => doc.id !== id));
  };

  return (
    <div className="md:w-[90%] mx-auto bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className=" bg-white/80 backdrop-blur-md shadow-sm md:px-6 md:py-4 px-3 py-2 flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center">
          <Stethoscope className="text-blue-600" size={26} />
          <h1 className="text-lg sm:text-xl font-bold text-gray-800">
            Affiliated Doctors
          </h1>
        </div>

        {/* Floating Add Doctor Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="  right-6 px-6 py-3 rounded-full bg-gradient-to-r from-[#007BBD] to-[#005A8C] text-white font-semibold shadow-lg hover:shadow-2xl flex items-center gap-2 transition transform hover:scale-105"
        >
          <UserPlus size={20} />
          Add Doctor
        </button>

        {/* Modal */}
        <AddDoctorModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </header>

      {/* Doctors List */}
      <main className="flex-1 md:px-4  py-6 space-y-4">
        {doctors.length === 0 ? (
          <div className="text-center text-gray-500 mt-16">
            <p className="text-lg font-medium">No doctors added yet.</p>
            <p className="text-sm">Click below to add your first doctor.</p>
          </div>
        ) : (
          doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="flex items-center justify-between p-5 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Left side - Profile */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-[#007BBD] to-[#005A8C] text-white text-lg font-bold shadow">
                  {doctor.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-lg">
                    {doctor.name}
                  </p>
                  <p className="text-sm text-gray-500">{doctor.specialty}</p>
                </div>
              </div>

              {/* Delete button */}
              <button
                onClick={() => handleDelete(doctor.id)}
                className="p-2 rounded-full text-red-500 hover:bg-red-100 transition"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default AffiliatedDoctors;
