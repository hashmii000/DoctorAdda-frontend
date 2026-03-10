import React from "react";
import { ArrowLeft, Share2 } from "lucide-react";

const DiagnosticReferrals = () => {
  const referrals = []; // Replace with API data later

  return (
    <div className="md:p-4 p-2 md:w-[90%] mx-auto">
      {/* Header */}
      <div className="flex items-center mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-green-400 rounded-xl flex items-center justify-center shadow-lg">
          <Share2 className="w-5 h-5 text-white" />
        </div>
        <h2 className="ml-4 md:text-xl text-base font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
          Diagnostic Referrals  
        </h2>
      </div>

      {/* Section Title */}
      <h2 className="text-lg font-semibold text-cyan-700 mb-3">
        Referral Details
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        {referrals.length} referrals found
      </p>

      {/* If no referrals */}
      {referrals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-cyan-700 font-medium text-lg">
            No referrals found
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Pull down to refresh or check back later
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {referrals.map((ref, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-xl shadow-sm border"
            >
              <p className="font-medium">{ref.name}</p>
              <p className="text-sm text-gray-500">{ref.details}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiagnosticReferrals;
