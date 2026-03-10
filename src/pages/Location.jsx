/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { login, updateLocationData } from "../redux/slices/userSlice";
import { patchRequest } from "../Helpers";
import toast from "react-hot-toast";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { setCookieItem } from "../Hooks/cookie";

const Location = () => {
  const loc = useLocation();
  const { userId } = loc.state || {};
  console.log("Userid passed", userId);

  const [permissionStatus, setPermissionStatus] = useState("pending");
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userProfileData = useSelector((state) => state.user.userProfileData);

  const requestLocationPermission = async () => {
    setIsLoading(true);
    try {
      const permission = await navigator.permissions.query({
        name: "geolocation",
      });

      if (permission.state === "denied") {
        setPermissionStatus("denied");
        setIsLoading(false);
        return;
      }

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        });
      });

      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
      setPermissionStatus("granted");
      dispatch(updateLocationData({ latitude, longitude }));

      // ✅ fetch and store address
      const addr = await fetchAddressFromCoords(latitude, longitude);
      setAddress(addr);
      // ✅ save to Redux
      dispatch(updateLocationData({ latitude, longitude, address: addr }));
      // ✅ immediately update profile
      await updateUserProfileWithLocation(latitude, longitude, addr);
    } catch (error) {
      console.error("Location permission error:", error);
      setPermissionStatus("denied");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAddressFromCoords = async (latitude, longitude) => {
    try {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
      );
      if (response.data.results.length > 0) {
        return response.data.results[0].formatted_address;
      }
      return "Address not found";
    } catch (err) {
      console.error("Error fetching address:", err);
      return "Unable to fetch address";
    }
  };

  const updateUserProfileWithLocation = async (latitude, longitude, addr) => {
    if (!userId) {
      console.error("UserId not available");
      return;
    }

    setIsUpdatingProfile(true);

    const cred = {
      name: userProfileData?.name,
      email: userProfileData?.email,
      gender: userProfileData?.gender,
      latitude,
      longitude,
      address: addr || "",
    };

    try {
      const res = await patchRequest({
        url: `auth/updateProfile/${userId}`,
        cred,
      });
      toast.success("Profile updated successfully!");
      setCookieItem("isAuthenticated", "true", 30);
      setCookieItem("UserId", userId, 30);
      setCookieItem("loginTime", new Date().toISOString(), 30);
      dispatch(login({ userData: res?.data?.data }));
    } catch (err) {
      console.error("Error in updateProfile API:", err);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const containerStyle = {
    width: "100%",
    height: "250px",
    borderRadius: "12px",
    marginTop: "10px",
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-4 my-20 mt-46">
        <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full transform transition-all duration-300">
          {/* Header */}
          <div className="relative p-6 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Enable Location Access
            </h2>
            <p className="text-gray-600 text-center text-sm leading-relaxed">
              We need your location to provide you with the best healthcare
              services nearby.
            </p>
          </div>

          {/* Location Granted */}
          {permissionStatus === "granted" && (
            <div className="px-6 pb-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <span className="text-green-800 font-medium">
                  Location access granted!
                </span>
                {location && (
                  <p className="text-green-700 text-sm mt-1">
                    📍 {address || "Fetching address..."} <br />(
                    {location.latitude.toFixed(4)},{" "}
                    {location.longitude.toFixed(4)})
                  </p>
                )}
              </div>

              {/* Google Map */}
              {location && (
                <LoadScript
                  googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                >
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={{ lat: location.latitude, lng: location.longitude }}
                    zoom={14}
                  >
                    <Marker
                      position={{
                        lat: location.latitude,
                        lng: location.longitude,
                      }}
                    />
                  </GoogleMap>
                </LoadScript>
              )}
            </div>
          )}

          {/* Pending */}
          {permissionStatus === "pending" && (
            <div className="px-6 pb-6">
              <button
                onClick={requestLocationPermission}
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-white ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 shadow-lg"
                }`}
              >
                {isLoading ? "Getting location..." : "Allow Location Access"}
              </button>
            </div>
          )}

          {/* Continue Button */}
          {permissionStatus === "granted" && (
            <div className="px-6 pb-6">
              <button
                onClick={async () => {
                  if (location && userId) {
                    await updateUserProfileWithLocation(
                      location.latitude,
                      location.longitude,
                      address // ✅ pass correct addr
                    );
                  }
                  navigate("/");
                }}
                disabled={isUpdatingProfile}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-white ${
                  isUpdatingProfile
                    ? "bg-gray-400"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isUpdatingProfile ? "Updating Profile..." : "Continue"}
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Location;
