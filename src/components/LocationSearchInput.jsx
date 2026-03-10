import React, { useState } from "react";
import axios from "axios";

const LocationSearchInput = ({ value, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState(value || "");
  const [places, setPlaces] = useState([]);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState("pending");

  // ✅ Load from .env (Vite convention)
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const url = "https://places.googleapis.com/v1/places:searchText";

  // 🧹 Clean Plus Code from address
  const cleanAddress = (address) => {
    if (!address) return "";
    if (address.match(/^[A-Z0-9]+\+[A-Z0-9]+/)) {
      return address.substring(address.indexOf(",") + 1).trim();
    }
    return address;
  };

  // 🔎 Search Places (Google Places API)
  const handleSearch = async (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    setDetailsVisible(true);

    if (val.trim().length < 1) {
      setPlaces([]);
      return;
    }

    try {
      const response = await axios.post(
        url,
        { textQuery: val },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask":
              "places.displayName,places.formattedAddress,places.location",
          },
        }
      );

      if (response.data?.places) {
        const cleaned = response.data.places.map((p) => ({
          ...p,
          formattedAddress: cleanAddress(p.formattedAddress),
        }));
        setPlaces(cleaned);
      } else {
        setPlaces([]);
      }
    } catch (err) {
      console.error("Error fetching places:", err);
      setPlaces([]);
    }
  };

  // ✅ When user selects a place
  const handlePlaceSelect = (place) => {
    const formatted = cleanAddress(place.formattedAddress);
    setSearchTerm(formatted);
    setDetailsVisible(false);

    onSelect({
      address: formatted,
      latitude: place.location.latitude,
      longitude: place.location.longitude,
      location: {
        type: "Point",
        coordinates: [place.location.longitude, place.location.latitude],
      },
    });
  };

  // 📍 Handle current location with Google Geocoding API
  const handleCurrentLocation = async () => {
    try {
      if (!navigator.geolocation) {
        setPermissionStatus("unsupported");
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
      console.log("Fetched Location:", latitude, longitude);

      setLocation({ latitude, longitude });
      setPermissionStatus("granted");

      // 🌍 Reverse geocoding with Google API
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
      );

      let currentAddress = `${latitude}, ${longitude}`;
      if (res.data?.results?.length > 0) {
        currentAddress = res.data.results[0].formatted_address;
      }

      setSearchTerm(currentAddress);

      onSelect({
        address: currentAddress,
        latitude,
        longitude,
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
      });

      setDetailsVisible(false);
    } catch (error) {
      console.error("Location permission error:", error);
      setPermissionStatus("denied");
    }
  };

  return (
    <div className="space-y-2 group">
      {/* Input + Current Location Button */}
      <div className="flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for a location"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <button
          type="button"
          onClick={handleCurrentLocation}
          className="px-4 py-2 bg-gradient-to-r from-[#007BBD] to-[#005A8C] text-white rounded-lg hover:from-blue-700 hover:to-green-700 whitespace-nowrap"
        >
           Current Location
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {detailsVisible && places.length > 0 && (
        <div className="absolute bg-white border border-gray-300 rounded shadow w-full z-10 mt-1 max-h-60 overflow-auto">
          {places.map((place, idx) => (
            <div
              key={idx}
              onClick={() => handlePlaceSelect(place)}
              className="cursor-pointer py-2 px-3 hover:bg-gray-100 text-sm"
            >
              <p className="font-medium">{place.displayName?.text}</p>
              <p className="text-gray-600">{place.formattedAddress}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearchInput;
