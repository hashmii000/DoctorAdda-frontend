/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRequest } from "../Helpers";
import { useSelector } from "react-redux";

import { DoctorCard } from "../pages/DoctorList";
import HospitalCard from "./HospitalCard";
import { DiagnosticCard } from "../pages/DiagnosticPage";
import PharmacyCard from "./PharmacyCard";
import AmbulanceCard from "./AmbulanceCard";

const PopularSearch = () => {
  const locationState = useLocation();
  const { query = "" } = locationState.state || {};

  const location = useSelector((state) => state?.user?.locationData);

  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState({
    doctors: [],
    hospitals: [],
    ambulances: [],
    pharmacies: [],
    diagnostics: [],
  });
  const [activeTab, setActiveTab] = useState("doctors");
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch global search data
  const fetchData = async (searchText = "") => {
    try {
      setLoading(true);
      const res = await getRequest(
        `global-search?longitude=${location?.longitude}&latitude=${location?.latitude}&query=${searchText}&radius=10000`
      );
      console.log("Global Search Response:", res?.data?.data);

      setResults({
        doctors: res?.data?.data?.doctors || [],
        hospitals: res?.data?.data?.hospitals || [],
        ambulances: res?.data?.data?.ambulances || [],
        pharmacies: res?.data?.data?.pharmacies || [],
        diagnostics: res?.data?.data?.diagnostics || [],
      });
    } catch (err) {
      console.error("Error fetching search results:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchQuery || query);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData(searchQuery);
  };

  // 🔹 Card Renderer
  // 🔹 Card Renderer
  const renderCards = (data, type) => {
    if (!data || data.length === 0) {
      return (
        <div className="col-span-full text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No {type} found
          </h3>
          <p className="text-gray-500">Try a different search</p>
        </div>
      );
    }

    return data.map((item, index) => {
      switch (type) {
        case "doctors":
          return (
            <div key={index} className="animate-fadeIn">
              <DoctorCard data={item} />
            </div>
          );
        case "hospitals":
          return (
            <div key={index} className="animate-fadeIn">
              <HospitalCard data={item} />
            </div>
          );
        case "ambulances":
          return (
            <div key={index} className="animate-fadeIn">
              <AmbulanceCard {...item} />
            </div>
          );
        case "pharmacies":
          return (
            <div key={index} className="animate-fadeIn">
              <PharmacyCard {...item} />
            </div>
          );
        case "diagnostics":
          return (
            <div key={index} className="animate-fadeIn">
              <DiagnosticCard {...item} />
            </div>
          );
        default:
          return null;
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      <div className="sm:w-full lg:w-[80%] mx-auto px-4 py-10 pt-33 pb-10">
        {/* 🔹 Search Box */}
        <form onSubmit={handleSearch} className="mb-8 flex items-center gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search doctors, hospitals, ambulances..."
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            //className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
             className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            style={{
              background:
                "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
            }}
          >
            Search
          </button>
        </form>

        {/* 🔹 Tabs for categories */}
        <div className="flex flex-wrap gap-3 mb-8 border-b border-gray-200">
          {[
            "doctors",
            "hospitals",
            "ambulances",
            "pharmacies",
            "diagnostics",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-t-md text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-white border border-b-0 border-gray-300 text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}{" "}
              <span className="ml-1 text-gray-400">
                ({results[tab]?.length || 0})
              </span>
            </button>
          ))}
        </div>

        {/* 🔹 Results */}
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {renderCards(results[activeTab], activeTab)}
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularSearch;
