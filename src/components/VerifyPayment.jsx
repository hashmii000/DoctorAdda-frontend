import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

const VerifyPayment = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0E6AA3] overflow-hidden">
      {/* Glass overlay background */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl"></div>

      {/* Animated floating orbs for soft depth */}
      <div className="absolute w-96 h-96 bg-white/20 rounded-full blur-3xl top-10 left-20 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl bottom-10 right-20 animate-pulse"></div>

      {show && (
        <div
          className="relative z-10 bg-white/15 border border-white/20 rounded-3xl shadow-2xl p-10 text-center 
          backdrop-blur-2xl transition-all duration-500 scale-100 animate-[fadeIn_0.6s_ease-out] max-w-md w-full mx-4"
        >
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <CheckCircle className="text-white w-20 h-20 drop-shadow-xl animate-bounce" />
              <div className="absolute inset-0 bg-white/20 blur-xl rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Text */}
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow">
            Payment Successful!
          </h1>
          <p className="text-gray-100 mb-6 text-lg">
            Thank you for your payment. Your transaction has been successfully
            completed.
          </p>

          {/* Button */}
          <button
            onClick={() => alert("Continue to Dashboard")}
            className="bg-white text-[#0E6AA3] px-8 py-3 rounded-full 
            font-semibold shadow-lg hover:scale-105 hover:bg-gray-100 transition-all duration-300"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default VerifyPayment;
