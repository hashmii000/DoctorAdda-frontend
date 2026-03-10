import React from "react";
import { useNavigate } from "react-router-dom";

const DiagnosticCard = ({ name, type, services, timming, location, rating, image }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/diagnostic/${name}`);
  };
  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Card Content */}
      <div className="relative p-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-4">
          {/* Image with enhanced styling */}
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-md ring-2 ring-blue-100 group-hover:ring-blue-200 transition-all duration-300">
              <img 
                src={image} 
                alt={name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            {/* Online indicator */}
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          
          {/* Title and Rating */}
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors duration-300">
              {name}
            </h2>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center  text-white text-xs px-3 py-1 rounded-full font-semibold shadow-sm" style={{
    background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)"}}>
                <span className="mr-1">⭐</span>
                <span className="font-semibold">{rating}</span>
              </div>
               <div className="flex items-center bg-gradient-to-r from-green-100 to-green-200 text-green-800 text-xs px-3 py-1 rounded-full font-semibold shadow-sm">
                <span className="mr-1">✓</span>
                <span>Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors duration-200">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-sm"><img src="https://i.pinimg.com/1200x/9d/d0/f2/9dd0f2f55fb40d05d3f8a10991dbde22.jpg"  alt=""  /></span>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Type</p>
              <p className="text-sm font-semibold text-gray-800">{type}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors duration-200">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-sm"><img src="https://i.pinimg.com/736x/71/26/7e/71267e196665cb6a2e48310bcf87f2c7.jpg"  height={25} width={25} alt="" /></span>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">services</p>
              <p className="text-sm font-semibold text-gray-800">{services} </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors duration-200">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-sm">₹</span>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">timming</p>
              <p className="text-sm font-semibold text-gray-800">{timming}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors duration-200">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-red-600 text-sm"><img src="https://i.pinimg.com/736x/1b/18/dc/1b18dcc8c9b6e8c9e8876b28422e6f61.jpg"  height={25} width={25} alt="" /></span>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
              <p className="text-sm font-semibold text-gray-800">{location}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center">
          <div className="flex flex-col sm:flex-row gap-3 w-80">
            <button
              onClick={handleViewDetails}
              className="flex-1 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              style={{
                background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
              }}
            >
              <span className="flex items-center justify-center gap-2">
                <span>View Details</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-blue-100 to-transparent rounded-full translate-y-10 -translate-x-10 opacity-20"></div>
    </div>
  );
};

export default DiagnosticCard;