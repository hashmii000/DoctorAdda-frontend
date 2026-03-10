/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import SidebarNav from "./SidebarNav";
import { MapPin, Plus, Edit, Trash2, LocateFixed } from "lucide-react";
import { useSelector } from "react-redux";
import {
  getRequest,
  postRequest,
  patchRequest,
  deleteRequest,
} from "../Helpers";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { getCookieItem } from "../Hooks/cookie";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api"; // ✅ import loader

const libraries = ["places"]; // ✅ required for Autocomplete

const ManageAddresses = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const { userProfileData } = useSelector((state) => state.user);
  const [errors, setErrors] = useState({});
  const UserId = getCookieItem("UserId");
  console.log("userProfileData", userProfileData);

  const autocompleteRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    label: "Home",
    addressLine: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    lat: null,
    lng: null,
  });

  // ✅ load Google Maps API once
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const validateForm = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }

    if (!formData.addressLine.trim()) {
      newErrors.addressLine = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // Fetch current location
  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${
              import.meta.env.VITE_GOOGLE_MAPS_API_KEY
            }`
          );
          const data = await res.json();

          if (data.results?.[0]) {
            const components = data.results[0].address_components;

            const getComponent = (type) =>
              components.find((c) => c.types.includes(type))?.long_name || "";

            setFormData((prev) => ({
              ...prev,
              addressLine: data.results[0].formatted_address,
              lat: latitude,
              lng: longitude,
              city: getComponent("locality"),
              state: getComponent("administrative_area_level_1"),
              country: getComponent("country"),
              pincode: getComponent("postal_code"),
            }));
          } else {
            toast.error("Unable to fetch address details");
          }
        } catch {
          toast.error("Unable to fetch address");
        }
      },
      () => toast.error("Unable to fetch location")
    );
  };

  // Fetch addresses
  const fetchAddresses = async () => {
    try {
      const res = await getRequest(`auth/getorderAddress/${UserId}`);
      setAddresses(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  useEffect(() => {
    if (UserId) fetchAddresses();
  }, [UserId]);

  const openModal = (address = null) => {
    if (address) {
      setEditingAddress(address);
      setFormData({
        fullName: address?.fullName || "",
        mobile: address?.mobile || "",
        label: address?.label || "Home",
        addressLine: address?.addressLine || address.address || "",
        house: address?.house || "", // ✅ Add this
        city: address?.city || "",
        state: address?.state || "",
        country: address?.country || "",
        pincode: address?.pincode || "",
        lat: address?.lat || null,
        lng: address?.lng || null,
      });
    } else {
      setEditingAddress(null);
      setFormData({
        fullName: "",
        mobile: "",
        label: "Home",
        addressLine: "",
        house: "", // ✅ Reset house
        city: "",
        state: "",
        country: "",
        pincode: "",
        lat: null,
        lng: null,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const addAddress = async () => {
    if (!validateForm()) return;
    try {
      // Build the full address string
      const fullAddress = [
        formData.addressLine,
        formData.city,
        formData.state,
        formData.country,
        formData.pincode,
      ]
        .filter(Boolean) // remove empty values
        .join(", ");
      await postRequest({
        url: `auth/addorderAddress/${UserId}`,
        cred: {
          ...formData,
          address: fullAddress, // ✅ new field
        },
      });
      console.log("after api", formData);

      toast.success("Address added successfully!");
      await fetchAddresses();
      closeModal();
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("Failed to add address");
    }
  };

  const updateAddress = async () => {
    try {
      await patchRequest({
        url: `auth/updateorderAddress/${UserId}/${editingAddress?._id}`,
        cred: { ...formData },
      });
      toast.success("Address updated successfully!");
      await fetchAddresses();
      closeModal();
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error("Failed to update address");
    }
  };

  const handleDelete = async (addressId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This address will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteRequest(`auth/deleteorderAddress/${UserId}/${addressId}`);
          await fetchAddresses();
          Swal.fire("Deleted!", "The address has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting address:", error);
          Swal.fire("Error", "Something went wrong!", "error");
        }
      }
    });
  };

  // Handle Google Autocomplete selection
  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.formatted_address) {
        const lat = place.geometry?.location?.lat();
        const lng = place.geometry?.location?.lng();
        setFormData((prev) => ({
          ...prev,
          addressLine: place.formatted_address,
          lat,
          lng,
          city:
            place.address_components?.find((c) => c.types.includes("locality"))
              ?.long_name || "",
          state:
            place.address_components?.find((c) =>
              c.types.includes("administrative_area_level_1")
            )?.long_name || "",
          country:
            place.address_components?.find((c) => c.types.includes("country"))
              ?.long_name || "",
          pincode:
            place.address_components?.find((c) =>
              c.types.includes("postal_code")
            )?.long_name || "",
        }));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-sans">
      <div className="max-w-7xl mx-auto p-6 md:pt-42">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <SidebarNav activeTab="addresses" formData={userProfileData} />

          {/* Main Content */}
          <main className="flex-1 p-8 bg-white rounded-3xl shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="md:text-2xl text-xl font-bold text-gray-800 flex items-center gap-3">
                <MapPin size={30} className="text-[#006ca7]" />
                Manage Addresses
              </h2>
              <button
                onClick={() => openModal()}
                className="inline-flex items-center gap-2 md:px-6 md:py-3 px-4 py-2 bg-[#006ca7] text-white rounded-full shadow-lg hover:bg-[#005a8c] transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#004a70]"
              >
                <Plus size={20} />
                Add Address
              </button>
            </div>

            {/* Address List */}
            {addresses.length === 0 ? (
              <p className="text-gray-400 text-center py-12 text-lg font-medium">
                No addresses added yet.
              </p>
            ) : (
              <div className="space-y-6">
                {addresses.map((address) => (
                  <article
                    key={address._id}
                    className="flex items-center justify-between md:p-6 p-4 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {address.label}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {address.addressLine}, {address.city}, {address.state} -{" "}
                        {address.pincode}
                      </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-5">
                      <button
                        onClick={() => openModal(address)}
                        className="flex items-center gap-2 text-[#006ca7] font-semibold text-sm md:text-base hover:text-[#004a70]"
                      >
                        <Edit size={18} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(address._id)}
                        className="flex items-center gap-2 text-red-600 font-semibold text-sm md:text-base hover:text-red-700"
                      >
                        <Trash2 size={18} /> Remove
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </main>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  editingAddress ? updateAddress() : addAddress();
                }}
                className="space-y-5 bg-white p-6 rounded-2xl shadow-xl  z-50 max-w-lg overflow-y-auto"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-3">
                  <div className="bg-[#E6F3FA] p-3 rounded-full">
                    {editingAddress ? (
                      <Edit size={24} className="text-[#006ca7]" />
                    ) : (
                      <MapPin size={24} className="text-[#006ca7]" />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {editingAddress ? "Edit Address" : "Add New Address"}
                  </h3>
                </div>

                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#006ca7] focus:outline-none"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}

                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  maxLength={10} // ✅ restricts to 10 digits
                  onChange={(e) => {
                    const value = e.target.value;
                    // ✅ allow only numbers (0–9)
                    if (/^\d*$/.test(value)) {
                      setFormData({ ...formData, mobile: value });
                    }
                  }}
                  className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#006ca7] focus:outline-none"
                  required
                />
                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                )}

                <select
                  value={formData.label}
                  onChange={(e) =>
                    setFormData({ ...formData, label: e.target.value })
                  }
                  className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#006ca7] focus:outline-none"
                >
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>

                {/* Google Autocomplete Input */}
                {isLoaded && (
                  <div className="relative">
                    <Autocomplete
                      onLoad={(ref) => (autocompleteRef.current = ref)}
                      onPlaceChanged={handlePlaceChanged}
                    >
                      <input
                        type="text"
                        value={formData.addressLine}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            addressLine: e.target.value,
                          })
                        }
                        placeholder="Search Address..."
                        className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#006ca7] focus:outline-none"
                      />
                    </Autocomplete>
                    <button
                      type="button"
                      onClick={fetchCurrentLocation}
                      className="absolute top-3 right-3 text-[#006ca7] hover:text-[#004a70]"
                    >
                      <LocateFixed size={20} />
                    </button>
                  </div>
                )}
                {errors.addressLine && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.addressLine}
                  </p>
                )}

                <input
                  type="text"
                  placeholder="House No. / Street"
                  value={formData.house || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, house: e.target.value })
                  }
                  className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#006ca7] focus:outline-none"
                />
                {errors.house && (
                  <p className="text-red-500 text-sm mt-1">{errors.house}</p>
                )}

                {/* City, State, Pincode */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006ca7] focus:outline-none"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                  <input
                    type="text"
                    placeholder="State"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                    className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006ca7] focus:outline-none"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                  )}
                  <input
                    type="text"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={(e) =>
                      setFormData({ ...formData, pincode: e.target.value })
                    }
                    className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006ca7] focus:outline-none"
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.pincode}
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#006ca7] text-white rounded-xl hover:bg-[#005a8c] shadow-lg"
                  >
                    {editingAddress ? "Update" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageAddresses;
