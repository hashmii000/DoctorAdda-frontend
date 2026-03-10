import React, { useState } from "react";
import { File } from "lucide-react";

const tabs = ["Pending", "Confirmed", "Completed", "Cancelled"];

const ManageAppointments = () => {
  const [activeTab, setActiveTab] = useState("Pending");

  // Example data (can come from API)
  const counts = {
    Pending: 0,
    Confirmed: 0,
    Completed: 0,
    Cancelled: 0,
  };

  return (
    <div className="md:p-4 p-2 md:w-[90%] mx-auto">
      {/* Header */}
      <div className="flex items-center mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-green-400 rounded-xl flex items-center justify-center shadow-lg">
          <File className="w-5 h-5 text-white" />
        </div>
        <h2 className="ml-4 md:text-xl text-lg font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
          Manage Appointments
        </h2>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {["Pending", "Confirmed", "Completed"].map((status) => (
          <div
            key={status}
            className="bg-white shadow-md rounded-xl flex flex-col items-center justify-center py-5"
          >
            <p className="text-2xl font-bold text-gray-800">{counts[status]}</p>
            <p className="text-gray-500 text-sm">{status}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full border text-sm font-medium transition ${
              activeTab === tab
                ? "bg-gradient-to-br from-blue-400 to-green-400 text-white border-blue-600"
                : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-gray-50 flex items-center justify-center rounded-xl py-16 shadow-inner">
        <p className="text-gray-500">No appointments found.</p>
      </div>
    </div>
  );
};

export default ManageAppointments;
