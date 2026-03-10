import React from "react";
import { useNavigate } from "react-router-dom";

const Verification = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen bg-gray-50">
      {/* Content */}
      <div className="flex flex-col items-center justify-center flex-grow px-6 text-center">
        {/* Image */}
        <img
          src="https://png.pngtree.com/png-vector/20200319/ourmid/pngtree-young-woman-giving-stars-rating-on-giant-smartphone-customer-review-satisfaction-png-image_2158027.jpg"
          alt="Profile Review"
          className="w-56 h-56 mb-8"
        />

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Your profile is under review
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 max-w-sm">
          Your profile has been submitted & will be reviewed by our team. You
          will be notified if any extra information is needed.
        </p>
      </div>

      {/* Button */}
      <button
        onClick={goHome}
        className="px-6 py-2 bg-teal-500 text-white text-lg font-semibold rounded-lg hover:bg-teal-600 transition mb-22"
      >
        CONTINUE
      </button>
    </div>
  );
};

export default Verification;
