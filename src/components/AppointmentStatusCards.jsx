import React from "react";
import {
  Clock,
  CheckCircle,
  Calendar,
  XCircle,
  Star,
  TrendingUp,
  File
} from "lucide-react";

const AppointmentCard = ({
  status,
  icon: Icon,
  count,
  bgColor,
  iconColor,
  textColor,
}) => {
  return (
    <div
      className={`${bgColor} rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 `}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg ${iconColor}`}>
          <Icon size={20} className="text-white" />
        </div>
        <span className={`md:text-2xl text-lg font-bold ${textColor}`}>{count}</span>
      </div>
      <div className="space-y-1">
        <h3 className={`font-semibold text-base ${textColor}`}>{status}</h3>
        <p className="text-sm text-gray-500">
          {status === "Requests" && "Pending approval"}
          {status === "Confirmed" && "Scheduled appointments"}
          {status === "Rescheduled" && "Modified appointments"}
          {status === "Cancelled" && "Cancelled appointments"}
          {status === "Completed" && "Finished appointments"}
        </p>
      </div>
      <div className="mt-3 w-full bg-gray-200 rounded-full h-1">
        <div
          className={`h-1 rounded-full ${
            status === "Requests"
              ? "bg-yellow-500 w-3/4"
              : status === "Confirmed"
              ? "bg-blue-500 w-full"
              : status === "Rescheduled"
              ? "bg-orange-500 w-2/3"
              : status === "Cancelled"
              ? "bg-red-500 w-1/2"
              : "bg-green-500 w-full"
          }`}
        ></div>
      </div>
    </div>
  );
};

const AppointmentStatusCards = () => {
  const cardData = [
    {
      status: "Requests",
      icon: Clock,
      count: 12,
      bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
      iconColor: "bg-yellow-500",
      textColor: "text-yellow-800",
    },
    {
      status: "Confirmed",
      icon: CheckCircle,
      count: 8,
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconColor: "bg-blue-500",
      textColor: "text-blue-800",
    },
    {
      status: "Rescheduled",
      icon: Calendar,
      count: 5,
      bgColor: "bg-gradient-to-br from-orange-50 to-orange-100",
      iconColor: "bg-orange-500",
      textColor: "text-orange-800",
    },
    {
      status: "Cancelled",
      icon: XCircle,
      count: 3,
      bgColor: "bg-gradient-to-br from-red-50 to-red-100",
      iconColor: "bg-red-500",
      textColor: "text-red-800",
    },
    {
      status: "Completed",
      icon: Star,
      count: 24,
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      iconColor: "bg-green-500",
      textColor: "text-green-800",
    },
  ];

  return (
    <div className="md:p-8 p-2 bg-blue-100  rounded-3xl">
      <div className="max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center">
            <div className="w-10 h-10  bg-gradient-to-br from-[#007BBD] to-[#005A8C] rounded-xl flex items-center justify-center shadow-lg">
              <File className="w-5 h-5 text-white" />
            </div>
            <h2 className="ml-4 md:text-xl text-base font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
              Appointment Requests
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 ">
          {cardData.map((card, index) => (
            <AppointmentCard
              key={index}
              status={card.status}
              icon={card.icon}
              count={card.count}
              bgColor={card.bgColor}
              iconColor={card.iconColor}
              textColor={card.textColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentStatusCards;
