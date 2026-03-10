/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import DoctorSearch from "./DoctorSearch";
import {
  Menu,
  X,
  Stethoscope,
  Bell,
  LogOut,
  User,
  Settings,
  File,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import logo from "../assets/doctor-adda-logo.png";
import logo from "../assets/dr-adda-logo.png";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { logout, updateLocationData } from "../redux/slices/userSlice";
import { deleteCookie, clearAuthCookies } from "../Hooks/cookie";
import NavBar2 from "./NavBar2";
import { toast } from "react-hot-toast";
import NotificationBell from "./NotificationBell";
import DashboardButton from "./DashboardButton";
import LocationDropdown from "./locationDropDown/locationDropdown";
import axios from "axios";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // added
  const dropdownRef = useRef(null); // added
  const [isVisible, setIsVisible] = useState({});
  const dispatch = useDispatch();
  const [locationOpen, setLocationOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Lucknow");

  const orderData = {
    patient: "689a0e42421e65d87e7f03cc",
    pharmacy: "689adb6eaaeb20ac65989bcc",
    amount: "500",
    orderId: "68c9533b77c0874b5bcb3281",
  };
  const handlePayment = async () => {
    try {
      // Send order data to backend
      const res = await axios.post(
        "http://localhost:5000/api/pharmacyBooking/ccvanuePayment",
        orderData,
        { headers: { "Content-Type": "application/json" } }
      );

      // CC Avenue returns HTML form
      const html = res.data;

      // Open payment page in a new tab
      const paymentWindow = window.open("", "_blank");
      paymentWindow.document.write(html);
      paymentWindow.document.close();
    } catch (error) {
      console.error("Payment initiation failed:", error);
      toast.error(error?.response?.data?.message);
    }
  };

  // Get user profile data from Redux
  const { userProfileData, isLoggedIn, locationData } = useSelector(
    (state) => state.user
  );

  console.log("userProfileData in Navbar:", userProfileData);
  console.log("User Id:", userProfileData?._id);
  console.log("Upgrade Id:", userProfileData?.upgradeAccountId);

  const hasUpgradeRequest = !!(
    userProfileData?.upgradeAccountId && userProfileData?.upgradeAccountType
  );

  console.log("Has Upgrade Request:", hasUpgradeRequest);

  const { upgradeAccountId, upgradeAccountType, upgradeAccountApproveStatus } =
    userProfileData ?? {};

  // Determine if user is upgraded
  const isUpgraded = upgradeAccountId && upgradeAccountType;

  console.log("isUpgraded", isUpgraded);

  const displayLocation =
    selectedLocation ||
    currentLocation ||
    locationData?.address ||
    "Detecting...";

  // Auto-detect location with Geolocation API + Google Maps
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;

            const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
            const res = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
            );
            const data = await res.json();

            if (data.status === "OK") {
              const formattedAddress = data.results[0].formatted_address;
              const addressComponents = data.results[0].address_components;
              let city = "";
              let state = "";

              addressComponents.forEach((component) => {
                if (component.types.includes("locality")) {
                  city = component.long_name;
                }
                if (component.types.includes("administrative_area_level_1")) {
                  state = component.long_name;
                }
              });

              // const detectedLocation = `${city}, ${state}`;
              setCurrentLocation(formattedAddress);
              setSelectedLocation(formattedAddress);

              // ✅ Save to Redux
              dispatch(
                updateLocationData({
                  latitude,
                  longitude,
                  address: formattedAddress,
                })
              );
            } else {
              console.error("Google Maps API error:", data.status);
            }
          } catch (err) {
            console.error("Error fetching location:", err);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll("[id]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle logout
  const handleLogout = () => {
    // Clear Redux state
    dispatch(logout());

    // Clear cookies
    clearAuthCookies();

    // Close dropdown
    setDropdownOpen(false);
    toast.success("Logged out successfully");

    console.log("All sessions cleared successfully");
  };

  return (
    <>
      <nav className="fixed w-full z-50 bg-white ">
        <div className=" mx-auto ">
          <div className="  m-auto flex justify-between items-center h-16 md:py-10 md:px-2 px-2 py-10 pr-4 sm:w-full lg:w-[80%]  xl:w-[80%] 2xl:w-[70%] ">
            {/* Logo */}
            <Link to="/">
              <div className="flex items-center space-x-2">
                <div className="w-18 h-18  rounded-lg flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-white" />
                  <img src={logo} alt="" />
                </div>
                {/* <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Doctor Adda
                </span> */}
              </div>
            </Link>

            {/* Location */}
            <div className="hidden md:flex items-center gap-2 pl-4 cursor-pointer relative">
              <div
                className="flex items-center gap-2"
                onClick={() => setLocationOpen(!locationOpen)}
              >
                <div className="bg-gray-100 p-2 rounded-full">
                  <FaMapMarkerAlt className="text-gray-600 text-base" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Your Location</div>
                  <div className="md:text-xs xl:text-sm text-gray-800 font-semibold flex items-center max-w-[150px] truncate">
                    <span className="truncate">{displayLocation}</span>
                    <span className="ml-1 flex-shrink-0">▾</span>
                  </div>
                </div>
              </div>

              {/* Dropdown */}
              {locationOpen && (
                <LocationDropdown
                  onClose={() => setLocationOpen(false)}
                  setSelectedLocation={async (addrObjOrString) => {
                    console.log(
                      "Address selected or clicked on current location",
                      addrObjOrString
                    );

                    const address =
                      typeof addrObjOrString === "string"
                        ? addrObjOrString
                        : addrObjOrString.address;

                    setSelectedLocation(address);

                    // prepare location payload
                    const payload = {
                      address,
                      latitude: addrObjOrString?.latitude,
                      longitude: addrObjOrString?.longitude,
                    };

                    // ✅ Save to Redux
                    dispatch(updateLocationData(payload));

                    // ✅ Update user profile via API
                    if (userProfileData?._id) {
                      try {
                        const res = await patchRequest({
                          url: `auth/updateProfile/${userProfileData._id}`,
                          cred: payload,
                        });
                        toast.success("Profile updated successfully!");
                        console.log("Update Location API Response:", res);
                      } catch (err) {
                        console.error("Error updating profile location:", err);
                        toast.error("Failed to update location");
                      }
                    }
                  }}
                />
              )}
            </div>
            {/* Example Debug UI (Remove in prod)
            <div className="hidden md:flex flex-col text-xs text-gray-500 ml-4">
              <span>🌍 Current: {currentLocation || "..."}</span>
              <span>📍 Selected: {selectedLocation || "None"}</span>
              <span>💾 Redux: {selectedLocation?.address || "None"}</span>
            </div> */}
            {/* Notification + Profile */}

            {/* Vertical Divider */}
            <div className="h-5 w-px bg-gray-300 hidden md:block" />

            {/* Customer Support */}

            <a href="tel:+919450180033">
              <div className="flex items-center space-x-2 text-gray-600 hidden md:block">
                <div className="flex items-center gap-1">
                  <FaPhoneAlt className="text-gray-500 text-base" />
                  <div>
                    <span className="text-xs block text-gray-500 ">
                      Customer Support
                    </span>
                    <span className="md:text-xs xl:text-sm font-semibold text-gray-800">
                      +91 9450180033
                    </span>
                  </div>
                </div>
              </div>
            </a>

            {/* Vertical Divider */}
            <div className="h-5 w-px bg-gray-300 hidden md:block" />

            {/* Corporate Bookings */}
            <a href="tel:919450180033">
              <div className="text-gray-600 hidden md:block ">
                <span className="text-xs block text-gray-500">
                  For Appointment Bookings/Enquiry
                </span>
                <span className="md:text-xs xl:text-sm font-semibold text-gray-800">
                  +91 9450180033
                </span>
              </div>
            </a>
            {/* <div>
              <button onClick={handlePayment}>Pay Now</button>
            </div> */}

            {/* User Profile */}
            {isLoggedIn && userProfileData ? (
              (console.log("userProfileData navbar", userProfileData.name),
              (
                <div className="relative hidden md:block " ref={dropdownRef}>
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <img
                      src={
                        userProfileData.profileImage ||
                        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                      }
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-semibold text-gray-800 ">
                      {/* hidden lg:block */}
                      {userProfileData?.name || "User"}
                    </span>
                    <span className="text-gray-500">▾</span>
                  </div>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute z-100 right-0 mt-2 w-55  bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200  ">
                      <Link
                        onClick={() => setDropdownOpen(false)}
                        to="/profile"
                      >
                        <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                          <User className="w-4 h-4" />
                          Profile
                        </button>
                      </Link>
                      <Link
                        onClick={() => setDropdownOpen(false)}
                        to="/appointments"
                      >
                        <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                          <File className="w-4 h-4" />
                          Appointments
                        </button>
                      </Link>
                      <Link
                        onClick={() => setDropdownOpen(false)}
                        to="/orders"
                      >
                        <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                          <File className="w-4 h-4" />
                          Orders
                        </button>
                      </Link>
                      <Link onClick={() => setDropdownOpen(false)} to="/">
                        <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                          <Settings className="w-4 h-4" />
                          Settings
                        </button>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                      <Link
                        onClick={() => setDropdownOpen(false)}
                        to={
                          isUpgraded
                            ? "https://play.google.com/store/apps/details?id=com.doctors.adda"
                            : "/upgrade-profile"
                        }
                      >
                        <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                          <User className="w-4 h-4" />
                          {isUpgraded ? "Dashboard" : "Upgrade Profile"}
                        </button>
                      </Link>
                      {/*  */}
                      {/*upgrde or dashbord button */}
                      {/* {hasUpgradeRequest ? (
                        <DashboardButton userDetails={userProfileData} />
                      ) : (
                        <Link to="/upgrade-profile">
                          <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                            <User className="w-4 h-4" />
                            Upgrade Profile
                          </button>
                        </Link>
                      )} */}

                      {/* <Link
                        onClick={() => setDropdownOpen(false)}
                        to={isUpgraded ? "/dashboard" : "/pharmacy-dashboard"}
                      >
                        <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                          <User className="w-4 h-4" />
                          {isUpgraded ? "Dashboard" : " Pharmacy Dashboard"}
                        </button>
                      </Link>
                      <Link
                        onClick={() => setDropdownOpen(false)}
                        to={isUpgraded ? "/dashboard" : "/hospital-dashboard"}
                      >
                        <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                          <User className="w-4 h-4" />
                          {isUpgraded ? "Dashboard" : "Hospital Dashboard"}
                        </button>
                      </Link>
                      <Link
                        onClick={() => setDropdownOpen(false)}
                        to={isUpgraded ? "/dashboard" : "/diagnostic-dashboard"}
                      >
                        <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                          <User className="w-4 h-4" />
                          {isUpgraded ? "Dashboard" : "Diagnostic Dashboard"}
                        </button>
                      </Link>
                      <Link
                        onClick={() => setDropdownOpen(false)}
                        to={isUpgraded ? "/dashboard" : "/ambulance-dashboard"}
                      >
                        <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                          <User className="w-4 h-4" />
                          {isUpgraded ? "Dashboard" : "Ambulance Dashboard"}
                        </button>
                      </Link>
                      <Link
                        onClick={() => setDropdownOpen(false)}
                        to={isUpgraded ? "/dashboard" : "/doctor-dashboard"}
                      >
                        <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                          <User className="w-4 h-4" />
                          {isUpgraded ? "Dashboard" : "Doctor Dashboard"}
                        </button>
                      </Link> */}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-1 text-gray-800 cursor-pointer hidden sm:block"
                >
                  <div className="flex gap-2">
                    <span className="text-sm font-semibold ">Login/Signup</span>
                  </div>
                </Link>
              </>
            )}

            {/* Notification Icon */}

            <NotificationBell />

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          <div>
            <NavBar2 />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isLoggedIn && userProfileData ? (
                (console.log("userProfileData navbar", userProfileData.name),
                (
                  <div className="relative " ref={dropdownRef}>
                    {/* hidden md:block */}
                    <div
                      className="flex items-center gap-2 cursor-pointer w-full mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full justify-center"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <img
                        src={
                          userProfileData.profileImage ||
                          "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                        }
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm font-semibold  ">
                        {/* hidden lg:block */}
                        {userProfileData?.name || "User"}
                      </span>
                      <span className="text-gray-500">▾</span>
                    </div>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                      <div className="absolute z-100 right-0 mt-2 w-full   bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200  ">
                        <Link
                          onClick={() => {
                            setDropdownOpen(false);
                            setIsMenuOpen(false);
                          }}
                          to="/profile"
                        >
                          <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                            <User className="w-4 h-4" />
                            Profile
                          </button>
                        </Link>
                        <Link
                          onClick={() => {
                            setDropdownOpen(false);
                            setIsMenuOpen(false);
                          }}
                          to="/appointments"
                        >
                          <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                            <File className="w-4 h-4" />
                            Appointments
                          </button>
                        </Link>
                        <Link
                          onClick={() => {
                            setDropdownOpen(false);
                            setIsMenuOpen(false);
                          }}
                          to="/"
                        >
                          <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                            <Settings className="w-4 h-4" />
                            Settings
                          </button>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                        <Link
                          onClick={() => {
                            setDropdownOpen(false);
                            setIsMenuOpen(false);
                          }}
                          to={isUpgraded ? "https://play.google.com/store/apps/details?id=com.doctors.adda" : "/upgrade-profile"}
                        >
                          <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                            <User className="w-4 h-4" />
                            {isUpgraded ? "Dashboard" : "Upgrade Profile"}
                          </button>
                        </Link>
                        {/* <Link
                        onClick={() => setDropdownOpen(false)}
                        to={isUpgraded ? "/dashboard" : "/pharmacy-dashboard"}
                      >
                        <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                          <User className="w-4 h-4" />
                          {isUpgraded ? "Dashboard" : " Pharmacy Dashboard"}
                        </button>
                      </Link>
                      <Link
                        onClick={() => setDropdownOpen(false)}
                        to={isUpgraded ? "/dashboard" : "/hospital-dashboard"}
                      >
                        <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                          <User className="w-4 h-4" />
                          {isUpgraded ? "Dashboard" : "Hospital Dashboard"}
                        </button>
                      </Link>
                      <Link
                        onClick={() => setDropdownOpen(false)}
                        to={isUpgraded ? "/dashboard" : "/diagnostic-dashboard"}
                      >
                        <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                          <User className="w-4 h-4" />
                          {isUpgraded ? "Dashboard" : "Diagnostic Dashboard"}
                        </button>
                      </Link>
                      <Link
                        onClick={() => setDropdownOpen(false)}
                        to={isUpgraded ? "/dashboard" : "/ambulance-dashboard"}
                      >
                        <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                          <User className="w-4 h-4" />
                          {isUpgraded ? "Dashboard" : "Ambulance Dashboard"}
                        </button>
                      </Link>
                      <Link
                        onClick={() => setDropdownOpen(false)}
                        to={isUpgraded ? "/dashboard" : "/doctor-dashboard"}
                      >
                        <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                          <User className="w-4 h-4" />
                          {isUpgraded ? "Dashboard" : "Doctor Dashboard"}
                        </button>
                      </Link> */}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <>
                  <Link onClick={() => setIsMenuOpen(false)} to="/login">
                    <button className="w-full mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full">
                      Login / SignUp
                    </button>
                  </Link>
                </>
              )}
              <Link
                onClick={() => setIsMenuOpen(false)}
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                Home
              </Link>
              <Link
                onClick={() => setIsMenuOpen(false)}
                to="/ambulance"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                Blood Bank{" "}
              </Link>
              <Link
                onClick={() => setIsMenuOpen(false)}
                to="/ambulance"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                Ambulance{" "}
              </Link>
              <Link
                onClick={() => setIsMenuOpen(false)}
                to="/pharmacy"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                Pharmacies{" "}
              </Link>
              <Link
                onClick={() => setIsMenuOpen(false)}
                to="/diagnostic"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                Diagnostic{" "}
              </Link>
              <Link
                onClick={() => setIsMenuOpen(false)}
                to="/doctor"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                Doctors & Specialists
              </Link>
              <Link
                onClick={() => setIsMenuOpen(false)}
                to="/hospital"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                Hospitals & Clinics
              </Link>

              {/* <Link onClick={() => setIsMenuOpen(false)} to="/login">
                <button className="w-full mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full">
                  Login / SignUp
                </button>
              </Link> */}
            </div>
          </div>
        )}
        {/* <span className="ml-1">▾</span> */}
      </nav>
    </>
  );
};

export default Navbar;
