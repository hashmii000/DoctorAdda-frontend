/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { AppointmentDateFormat } from "../Utils";
import { MessageCircle } from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ActionButton = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl transform hover:scale-105",
    secondary:
      "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg",
    tertiary:
      "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg",
    danger:
      "bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-xl transform hover:scale-105",
  };

  return (
    <button
      className={`py-3 px-6 rounded-xl font-bold transition-all duration-500 flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const TimeSlotsSection = ({ availability = [], onBook }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateData, setSelectedDateData] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const bookAppointment = (e) => {
    e.preventDefault();
    if (!selectedDate && !selectedSlot) {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Please select a date and time slot before booking.",
        confirmButtonColor: "#0d6efd",
      });
      return;
    }

    if (!selectedDate) {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Please select a date before booking.",
        confirmButtonColor: "#0d6efd",
      });
      return;
    }

    if (!selectedSlot) {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Please select a time slot before booking.",
        confirmButtonColor: "#0d6efd",
      });
      return;
    }

    if (onBook) {
      onBook(e, selectedDate, selectedSlot);
    }
  };

  // Helper: Compare dates in YYYY-MM-DD format
  const areDatesEqual = (date1, date2) => {
    if (!date1 || !date2) return false;
    return String(date1) === String(date2);
  };

  // Handle date click
  const handleDateClick = (dateObj) => {
    setSelectedDate(dateObj.date);
    setSelectedDateData(dateObj);
    setSelectedSlot(null);
  };

  // Default date selection on first load
  useEffect(() => {
    if (availability.length > 0 && !selectedDate) {
      handleDateClick(availability[0]);
    }
  }, [availability, selectedDate]);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 space-y-6">
      {/* Date Selector */}
      <div>
        <h4 className="text-sm font-semibold mb-2">Select Date</h4>
        <div className="flex flex-wrap gap-2">
          {availability.map((d, i) => (
            <button
              key={i}
              onClick={() => handleDateClick(d)}
              className={`px-3 py-2 text-sm rounded-lg font-medium ${
                areDatesEqual(selectedDate, d.date)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-50"
              }`}
            >
              {d.date ? AppointmentDateFormat(d.date) : "N/A"}
            </button>
          ))}
        </div>
      </div>

      {/* Time Slots */}
      <div>
        <h4 className="font-bold text-sm mb-2">Available Slots</h4>
        <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto">
          {selectedDateData?.slots?.filter((slot) => !slot.isBooked)?.length >
          0 ? (
            selectedDateData.slots
              .filter((slot) => !slot.isBooked)
              .map((slot, i) => (
                <button
                  key={i}
                  onClick={() =>
                    setSelectedSlot({
                      startTime: slot.startTime,
                      endTime: slot.endTime,
                    })
                  }
                  className={`px-2 py-2 text-sm rounded-lg font-medium ${
                    selectedSlot?.startTime === slot.startTime &&
                    selectedSlot?.endTime === slot.endTime
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-blue-50"
                  }`}
                >
                  {slot.startTime} - {slot.endTime}
                </button>
              ))
          ) : (
            <p className="text-gray-500 text-sm col-span-2">
              No slots available
            </p>
          )}
        </div>
      </div>

      <div className="space-y-3 pt-4">
        <ActionButton
          onClick={bookAppointment}
          className="w-full "
          style={{
            background:
              "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
          }}
        >
          <MessageCircle className="w-4 h-4" />
          Book Appointment
        </ActionButton>
      </div>
    </div>
  );
};

export default TimeSlotsSection;
