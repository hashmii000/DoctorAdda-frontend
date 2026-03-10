import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// Sample appointment data
const appointmentData = [
  { name: "Pending", value: 4, color: "#22c55e" },
  { name: "Confirmed", value: 2, color: "#eab308" },
  { name: "Completed", value: 6, color: "#3b82f6" },
  { name: "Cancelled", value: 8, color: "#ef4444" },
  { name: "Rescheduled", value: 4, color: "#6b7280" },
];

const DashboardDistribution = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6 p-4">
      {/* Service Distribution */}
      <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center min-h-[250px]">
        <h2 className="text-lg font-semibold text-teal-700 mb-3">
          Service Distribution
        </h2>
        <p className="text-gray-500 text-sm">No data available</p>
      </div>

      {/* Appointment Status Distribution */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-teal-700 mb-4">
          Appointment Status Distribution
        </h2>

        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* Chart */}
          <div className="w-full md:w-1/2 h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={appointmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {appointmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="w-full md:w-1/2 space-y-3">
            {appointmentData.map((status, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: status.color }}
                  ></span>
                  <span className="text-gray-700 text-sm font-medium">
                    {status.name}
                  </span>
                </div>
                <span className="text-gray-500 text-xs">
                  {status.value} (0%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDistribution;
