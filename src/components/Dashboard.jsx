/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import {
  Home,
  Briefcase,
  Wallet,
  Bell,
  Menu,
  X,
  Star,
  TrendingUp,
  ArrowRightLeft,
} from "lucide-react";
import DashboardService from "./DashboardService";
import DashboardWallet from "./DashboardWallet";
import dasboardlogo from "../assets/dashboard-logo.png";

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("mydashboard");

  const statsData = [
    {
      label: "Total Orders",
      value: "12",
      icon: "https://img.icons8.com/ios-filled/50/FFFFFF/shopping-cart.png",
      color: "from-teal-500 to-teal-600",
      bg: "from-blue-50 to-blue-100",
    },
    {
      label: "Total Customer",
      value: "12",
      icon: "https://img.icons8.com/ios-filled/50/FFFFFF/human-resources.png",
      color: "from-teal-500 to-teal-600",
      bg: "from-emerald-50 to-emerald-100",
    },
    {
      label: "Accepted Orders",
      value: "2",
      icon: "https://img.icons8.com/color/48/verified-account--v1.png",
      color: "from-teal-500 to-teal-600",
      bg: "from-purple-50 to-purple-100",
    },
    {
      label: "Pending Orders",
      value: "2",
      icon: "https://img.icons8.com/ios-filled/50/FFFFFF/hourglass.png",
      color: "from-teal-500 to-teal-600",
      bg: "from-amber-50 to-amber-100",
    },
    {
      label: "In Transit",
      value: "1",
      icon: "https://img.icons8.com/ios-filled/50/FFFFFF/semi-truck-side-view.png",
      color: "from-teal-500 to-teal-600",
      bg: "from-orange-50 to-orange-100",
    },
    {
      label: "Delivered",
      value: "5",
      icon: "https://img.icons8.com/pulsar-gradient/48/shipped.png",
      color: "from-teal-500 to-teal-600",
      bg: "from-teal-50 to-teal-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Top Navigation */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg md:p-4 p-2 flex justify-between items-center lg:pl-80">
        <div className="flex items-center">
          <button
            className="mr-4 p-2 hover:bg-gray-100 rounded-xl transition-colors lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
          <button
            onClick={() => setActiveView("mydashboard")}
            className="text-xl font-bold bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            Dashboard
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="p-2 hover:bg-blue-50 rounded-xl transition-all duration-300 group">
              <Bell className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></div>
            </button>
          </div>
          <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
            N
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Enhanced Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white/95 backdrop-blur-xl shadow-2xl z-50 transform transition-all duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:shadow-xl lg:border-r lg:border-white/20`}
      >
        <div>
          <img
            className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-4"
            src={dasboardlogo}
            alt=""
          />
        </div>
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center">
            {/* <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg"> */}
            <img
              className="rounded-full"
              width="80"
              height="80"
              src="https://i.pinimg.com/1200x/86/4d/e2/864de24af6de03ad0f3b2c7d19aeec61.jpg"
              alt="doctor-male-skin-type-3"
            />
            {/* </div> */}
            <div className="flex-1 ml-4">
              <p className="font-bold text-gray-800">Nayatik Pharmacy</p>
              <button className="text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors">
                Edit Profile
              </button>
            </div>
            <button
              className="p-1 text-gray-400 hover:text-gray-600 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <nav className="p-6 space-y-2">
          {[
            { id: "mydashboard", icon: Home, label: "My Dashboard" },
            { id: "services", icon: Briefcase, label: "Services" },
            { id: "wallet", icon: Wallet, label: "Your Wallet" },
            { id: "home", icon: ArrowRightLeft, label: "Home" },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => {
                setActiveView(id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeView === id
                  ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-blue-50 hover:text-teal-600"
              }`}
            >
              <Icon
                className={`h-5 w-5 mr-3 ${
                  activeView === id ? "text-white" : "text-teal-500"
                }`}
              />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="md:p-6  lg:pl-80">
        {activeView === "services" ? (
          <DashboardService />
        ) : activeView === "wallet" ? (
          <DashboardWallet />
        ) : (
          <div className="space-y-8 md:p-6 p-2  bg-gradient-to-br from-slate-50 to-blue-50/30 min-h-screen">
            {/* Premium Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-teal-500 to-teal-600 rounded-3xl p-2 md:p-6 text-white shadow-2xl border border-white/10">
              {/* Animated Background Elements */}
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-48 translate-x-48 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full translate-y-32 -translate-x-32"></div>
                <div
                  className="absolute top-1/2 left-1/2 w-32 h-32 bg-purple-400/10 rounded-full -translate-x-16 -translate-y-16 animate-bounce"
                  style={{ animationDelay: "2s" }}
                ></div>
              </div>

              {/* Subtle Pattern Overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                  backgroundSize: "20px 20px",
                }}
              ></div>

              <div className="relative z-20 flex justify-between items-center">
                <div className="flex-1 md:pr-8">
                  {/* Time-based Greeting */}
                  <div className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-amber-400/30 to-yellow-400/20 rounded-full mb-2 md:mb-6 border border-amber-300/30 backdrop-blur-sm">
                    <div className="w-2 h-2 bg-amber-300 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-amber-100 md:text-sm text-xs font-semibold tracking-wide">
                      Good Morning
                    </span>
                  </div>

                  <div className="mb-2 md:mb-6">
                    <h1 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                      Nayatik Pharmacy Store
                    </h1>
                    <p className="text-blue-100/90 text-sm md:text-base leading-relaxed max-w-md">
                      Wishing you a healthy and productive day ahead
                    </p>
                  </div>

                  {/* Enhanced Points Display */}
                  <div className="inline-flex items-center bg-white/15 backdrop-blur-md rounded-2xl px-3 py-2 border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300">
                    <div className="w-4 h-4 md:w-6 md:h-6 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center text-xl shadow-lg mr-4">
                      <img
                        src="https://img.icons8.com/emoji/48/coin-emoji.png"
                        alt="coin-emoji"
                      />
                    </div>
                    <div>
                      {/* <span className="text-sm text-blue-100/80 uppercase tracking-wider font-medium">
                        Reward Points
                      </span> */}
                      <div className="md:text-base text-xs font-bold text-white">
                        15,565
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Avatar */}
                <div className="relative">
                  {/* <div className="w-36 h-36 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl flex items-center justify-center text-7xl backdrop-blur-md border border-white/20 shadow-2xl hover:scale-105 transition-transform duration-300"> */}
                  <img
                    className="rounded-full"
                    width="120"
                    height="120"
                    src="https://i.pinimg.com/1200x/86/4d/e2/864de24af6de03ad0f3b2c7d19aeec61.jpg"
                    alt="doctor-male-skin-type-3"
                  />
                  {/* </div> */}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sophisticated Rating Card */}
            <div className="bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl mr-2 ml-2 md:mr-0 md:ml-0 p-4 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center text-3xl shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <img
                        width="30"
                        height="30"
                        src="https://img.icons8.com/emoji/48/star-emoji.png"
                        alt="star-emoji"
                      />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-xs text-white font-bold shadow-lg">
                      ✓
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-base md:text-xl font-bold text-gray-800 mb-2">
                      Customer Rating
                    </h3>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`md:w-6 md:h-6  w-3 h-3 transition-colors duration-200 ${
                            i < 2
                              ? "text-amber-400 fill-current drop-shadow-sm"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-3 text-xs md:text-sm text-gray-500 font-medium">
                        Based on 247 reviews
                      </span>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block text-right">
                  <div className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    2.5
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    out of 5.0
                  </div>
                  <div className="mt-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                    Needs Improvement
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Statistics Grid */}
            <div className="px-1 md:px-0 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-400 rounded-xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="ml-4 md:text-xl text-lg font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                    Business Analytics
                  </h1>
                </div>
                <div className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full font-medium">
                  Last 30 days
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {statsData.map((stat, index) => (
                  <div
                    key={index}
                    className="group relative  overflow-hidden bg-white/95 backdrop-blur-lg border border-white/40 rounded-3xl md:p-8  p-4 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]"
                  >
                    {/* Dynamic Background Gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${stat.bg} opacity-0 group-hover:opacity-10 transition-all duration-500`}
                    ></div>

                    {/* Subtle Pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                      <div
                        className={`w-full h-full bg-gradient-to-br ${stat.color} rounded-full transform translate-x-16 -translate-y-16`}
                      ></div>
                    </div>

                    <div className="relative flex items-start justify-between">
                      <div className="flex-1">
                        <div
                          className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-3xl shadow-xl text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                        >
                          <img
                            src={stat.icon}
                            alt={stat.label}
                            className="w-8 h-8"
                          />
                        </div>

                        <div className="space-y-2">
                          <p className="md:text-sm font-semibold text-xs text-gray-600 uppercase tracking-wider">
                            {stat.label}
                          </p>
                          <p className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                            {stat.value}
                          </p>
                        </div>
                      </div>

                      {/* Trend Indicator */}
                      <div className="hidden md:block flex items-center space-x-1 bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                        <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                        <span>+12%</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6 relative">
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000 group-hover:animate-pulse`}
                          style={{ width: `${60 + index * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
