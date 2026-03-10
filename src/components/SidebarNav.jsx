import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  User,
  MapPin,
  Heart,
  Settings,
  Users,
  PawPrint,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SidebarNav = ({ formData }) => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { path: "/profile", label: "My Profile", icon: User },
    { path: "/manageAddresses", label: "Address", icon: MapPin },
    { path: "/manage-patients", label: "Manage Patients", icon: User },
    { path: "/pets", label: "Manage Pets", icon: PawPrint },
  ];

  return (
    <>
      {/* 🔹 Mobile Hamburger Button */}
      <div className="md:hidden relative top-16  z-50">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg bg-[#006ca7]  text-white shadow-md hover:bg-gray-100 transition"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 🔹 Sidebar for Desktop & Animated Drawer for Mobile */}
      <AnimatePresence>
        {(open || window.innerWidth >= 768) && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className={`fixed md:static top-18 left-0 h-full md:h-auto w-72 bg-white shadow-2xl md:shadow-lg rounded-none md:rounded-2xl p-6 z-40`}
          >
            {/* Profile Section */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
                  {formData?.name ? getInitials(formData?.name) : "NA"}
                </div>
                <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <h2 className="mt-3 font-semibold text-lg">
                {formData?.name || "NA"}
              </h2>
              <p className="text-sm text-gray-500">{formData?.email || "NA"}</p>
              <p className="text-sm text-gray-500">
                +91 {formData?.phone || "0000000000"}
              </p>
              {/* <button className="mt-3 px-4 py-2 text-white rounded-full bg-gradient-to-r from-orange-400 to-red-500 text-sm shadow-md hover:scale-105 transition">
                Edit Profile
              </button> */}
            </div>

            {/* Navigation Menu */}
            <div className="mt-6 space-y-2">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
                      isActive
                        ? "bg-[#006ca7] text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                  onClick={() => setOpen(false)} // close on click (mobile)
                >
                  <item.icon size={18} />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔹 Overlay for Mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

// Helper to get initials
const getInitials = (name = "") => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export default SidebarNav;
