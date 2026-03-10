import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import dayjs from "dayjs";

const HospitalTimeSelection = ({ isOpen, onClose, slotDetails, onSlotSelected }) => {

  const [selectedDate, setSelectedDate] = useState( null);
  const [selectedTime, setSelectedTime] = useState(null);

  console.log('time selection slotDetails :', slotDetails)
  
  // const navigate = useNavigate()
  // const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

  // if (!isLoggedIn) {
  //   toast.error("You must be logged in to submit a review.");
  //   setTimeout(() => {
  //     navigate("/login");
  //   }, 1000);
  //   return;
  // }




  // Convert API dates to labels and values
  // const dates =
  //   slotDetails?.availability?.map((item) => {
  //     const dateObj = new Date(item.date);
  //     const label = dateObj.toLocaleDateString("en-US", {
  //       weekday: "short",
  //       day: "numeric",
  //       month: "short",
  //     });
  //     const value = dateObj.toISOString().split("T")[0]; // YYYY-MM-DD
  //     return { label, value, slots: item.slots };
  //   }) || []

  const today = new Date();
today.setHours(0, 0, 0, 0);

const dates =
  slotDetails?.availability
    ?.filter((item) => {
      const dateObj = new Date(item.date);
      dateObj.setHours(0, 0, 0, 0);
      return dateObj >= today; // ✅ keep only today & future
    })
    .map((item) => {
      const dateObj = new Date(item.date);
      const label = dateObj.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
      const value = dateObj.toISOString().split("T")[0]; // YYYY-MM-DD
      return { label, value, slots: item.slots };
    }) || [];


     // Disable background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);


  // Get slots for selected date
  // const slotsForSelectedDate =
  //   dates.find((d) => d.value === selectedDate)?.slots || [];


    const selectedDateObj = new Date(selectedDate);
selectedDateObj.setHours(0, 0, 0, 0);



let slotsForSelectedDate =
  dates.find((d) => d.value === selectedDate)?.slots || [];

// ✅ If selected date is today, filter past time slots
if (selectedDateObj.getTime() === today.getTime()) {
  const now = dayjs(); // current time

  slotsForSelectedDate = slotsForSelectedDate.filter((slot) => {
    const slotTime = dayjs(slot.startTime, "hh:mm A"); // Parse "10:00 AM"
    return slotTime.isAfter(now); // ✅ keep only upcoming slots
  });
}


    console.log("slotsForSelectedDate",slotsForSelectedDate);
    



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm ">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-2xl relative animate-fadeIn max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl z-10"
        >
          &times;
        </button>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Select Slot</h1>

        {/* Doctor Name */}
        <p className="text-lg font-semibold text-gray-700 mb-6">
           {slotDetails?.name || slotDetails?.doctorId?.fullName || "Unknown"}
        </p>
        
        {/* Experience and Fee Box */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">

           <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-blue-700">specialization:</span>
              <span className="text-sm font-semibold text-blue-900">{slotDetails?.specialization || "Unknown"}</span>
            </div>


            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-blue-700">Experience:</span>
              <span className="text-sm font-semibold text-blue-900">{slotDetails?.experience || "Unknown"}</span>
            </div>


            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-700">Fee:</span>
              <span className="text-sm font-semibold text-green-900">₹{slotDetails?.fee || "Unknown"}</span>
            </div>


          </div>
        </div>

        {/* Date Selection */}
        <div className="flex flex-wrap gap-3">
          {dates.map((d) => (
            <button
              key={d.value}
              onClick={() => {
                setSelectedDate(d.value);
                setSelectedTime(null);
              }}
              className={`px-5 py-2.5 rounded-full text-base font-medium transition-colors ${
                selectedDate === d.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Available Slots */}
        <h3 className="text-lg font-semibold text-blue-600 mt-8">
          Available Slots
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {slotsForSelectedDate.map((slot, idx) => (
            <button
              key={idx}
              disabled={slot.isBooked}
              onClick={() => setSelectedTime(slot.startTime)}
              className={`py-3 text-base font-medium rounded-lg border transition-all ${
                slot.isBooked
                  ? "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed"
                  : selectedTime === slot.startTime
                  ? "bg-green-500 text-white border-green-500"
                  : "text-green-600 border-green-500 hover:bg-green-50"
              }`}
            >
              {slot.startTime} - {slot.endTime}
            </button>
          ))}
        </div>

        {/* Book Button */}
        <button
          onClick={() => onSlotSelected(selectedDate, selectedTime)}
          className="w-full mt-8 py-4 rounded-full bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={!selectedTime}
        >
          Book Appointment
        </button>
      </div>
    </div>
  )

}

export default HospitalTimeSelection;
