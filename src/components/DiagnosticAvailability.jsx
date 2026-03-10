import React, { useState } from "react";
import { ArrowLeft, Stethoscope, Trash2 } from "lucide-react";

const DiagnosticAvailability = () => {
  const [availability, setAvailability] = useState([
    { date: "Thursday 28 Aug, 2025", slots: 5 },
    { date: "Friday 29 Aug, 2025", slots: 5 },
  ]);

  const handleDelete = (date) => {
    setAvailability(availability.filter((item) => item.date !== date));
  };

  return (
    <div className="md:p-4 p-2 md:w-[90%] mx-auto">
      {/* Header */}
      <div className="flex items-center mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-green-400 rounded-xl flex items-center justify-center shadow-lg">
          <Stethoscope className="w-5 h-5 text-white" />
        </div>
        <h2 className="ml-4 md:text-xl text-lg font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
          Diagnostic Availability
        </h2>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">2</p>
          <p className="text-gray-500 text-sm">Available Days</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">10</p>
          <p className="text-gray-500 text-sm">Total Slots</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">0</p>
          <p className="text-gray-500 text-sm">Rating</p>
        </div>
      </div>

      {/* Diagnostic Lab Info */}
      <div className="bg-white rounded-xl shadow-md p-5 mb-6">
        <h2 className="text-sm font-semibold text-gray-700">
          Diagnostic Lab:
        </h2>
        <p className="text-gray-900 mb-2">Auctech diagnostic centre</p>

        <h2 className="text-sm font-semibold text-gray-700">Address:</h2>
        <p className="text-gray-900 mb-4">
          VX28+H76, Jiamau, Lucknow, Uttar Pradesh
        </p>

        <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium transition">
          Re-Generate Lab Availability
        </button>
      </div>

      {/* Lab Availability */}
      <h3 className="text-base font-semibold text-gray-800 mb-3">
        Lab Availability:
      </h3>

      <div className="space-y-4 mb-6">
        {availability.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-cyan-50 border border-cyan-200 rounded-xl px-4 py-3 shadow-sm"
          >
            <div>
              <p className="font-medium text-cyan-800">{item.date}</p>
              <p className="text-sm text-gray-500">
                Available ({item.slots} slots)
              </p>
            </div>
            <button
              onClick={() => handleDelete(item.date)}
              className="p-2 rounded-full hover:bg-red-100 transition"
            >
              <Trash2 className="text-red-500" size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button
        disabled
        className="w-full bg-cyan-300 text-white py-3 rounded-lg font-medium cursor-not-allowed"
      >
        No Changes to Save
      </button>
    </div>
  );
};

export default DiagnosticAvailability;
