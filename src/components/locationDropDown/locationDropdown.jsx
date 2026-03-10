import React, { useState, useEffect, useRef } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

/**
 * LocationDropdown
 * Props:
 *  - onClose(): called when dropdown should close
 *  - setSelectedLocation(locationObject): called with { address, latitude, longitude }
 */
const LocationDropdown = ({ onClose, setSelectedLocation }) => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  // ✅ useJsApiLoader handles loading Google Maps JS API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"], // needed for autocomplete + geocoder
  });

  // 1) AUTOCOMPLETE SUGGESTIONS
  useEffect(() => {
    if (!isLoaded) return;
    if (!search.trim()) {
      setSuggestions([]);
      setActiveIndex(-1);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      try {
        const service = new window.google.maps.places.AutocompleteService();
        const sessionToken =
          new window.google.maps.places.AutocompleteSessionToken();

        service.getPlacePredictions(
          {
            input: search,
            componentRestrictions: { country: "IN" },
            sessionToken,
          },
          (predictions, status) => {
            if (
              status === window.google.maps.places.PlacesServiceStatus.OK &&
              Array.isArray(predictions)
            ) {
              setSuggestions(predictions);
              setActiveIndex(-1);
            } else {
              setSuggestions([]);
            }
          }
        );
      } catch (err) {
        console.error("AutocompleteService error:", err);
        setSuggestions([]);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search, isLoaded]);

  // 2) CLOSE WHEN CLICK OUTSIDE
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // 3) SELECT A PREDICTION -> fetch details
  const handleSelect = (prediction) => {
    if (!prediction || !isLoaded) return;

    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    service.getDetails(
      {
        placeId: prediction.place_id,
        fields: ["formatted_address", "geometry", "name"],
      },
      (placeResult, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          placeResult
        ) {
          const address = placeResult.formatted_address || placeResult.name;
          const lat = placeResult.geometry?.location?.lat?.();
          const lng = placeResult.geometry?.location?.lng?.();

          setSelectedLocation?.({ address, latitude: lat, longitude: lng });

          setSearch(address);
          setSuggestions([]);
          setActiveIndex(-1);
          onClose?.();

          setTimeout(() => inputRef.current?.focus(), 50);
        } else {
          console.error("getDetails failed:", status);
        }
      }
    );
  };

  // 4) KEYBOARD NAVIGATION
  const handleKeyDown = (e) => {
    if (!suggestions.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        handleSelect(suggestions[activeIndex]);
      }
    } else if (e.key === "Escape") {
      onClose?.();
    }
  };

  // 5) USE CURRENT LOCATION
  const handleUseCurrentLocation = () => {
    if (!isLoaded) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          const geocoder = new window.google.maps.Geocoder();
          const latlng = { lat: latitude, lng: longitude };

          geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === "OK" && results?.[0]) {
              const formatted = results[0].formatted_address;
              // ✅ Pass both address + lat/lng
              setSelectedLocation({
                address: formatted,
                lat: latitude,
                lng: longitude,
              });

              setSearch(formatted);
              setSuggestions([]);
              setActiveIndex(-1);
              onClose?.();
              setTimeout(() => inputRef.current?.focus(), 50);
            }
          });
        },
        (err) => console.error("Geolocation error:", err),
        { enableHighAccuracy: true }
      );
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute top-12 left-0 w-80 bg-white shadow-lg rounded-md border border-gray-200 z-[9999]"
    >
      <div className="p-3">
        {/* Search Box */}
        <input
          ref={inputRef}
          type="text"
          placeholder="Search location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="mt-2 max-h-48 overflow-y-auto text-sm text-gray-700">
            {suggestions.map((p, idx) => (
              <div
                key={p.place_id}
                className={`px-2 py-2 cursor-pointer rounded ${
                  idx === activeIndex ? "bg-blue-50" : "hover:bg-gray-100"
                }`}
                onClick={() => handleSelect(p)}
                onMouseEnter={() => setActiveIndex(idx)}
              >
                <div className="font-medium">{p.description}</div>
                <div className="text-xs text-gray-500">
                  {p.structured_formatting?.secondary_text || ""}
                </div>
              </div>
            ))}
          </div>
        )}

        <hr className="my-2" />

        {/* Use Current Location + Clear */}
        <div className="flex gap-2">
          {!isLoaded ? (
            <p className="text-gray-400 text-sm">Loading Google Maps…</p>
          ) : (
            <button
              onClick={handleUseCurrentLocation}
              className="flex-1 text-blue-600 text-sm hover:underline"
              type="button"
            >
              📍 Use Current Location
            </button>
          )}

          <button
            onClick={() => {
              setSearch("");
              setSuggestions([]);
              setActiveIndex(-1);
              setTimeout(() => inputRef.current?.focus(), 50);
            }}
            className="text-sm text-gray-500 hover:underline"
            type="button"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationDropdown;
