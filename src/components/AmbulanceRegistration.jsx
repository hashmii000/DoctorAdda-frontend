/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Plus,
  Upload,
  Building2,
  Mail,
  Phone,
  MapPin,
  User,
  FileText,
} from "lucide-react";
import { fileUpload, getRequest, postRequest } from "../Helpers/index";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import LocationSearchInput from "./LocationSearchInput";
import { getCookieItem } from "../Hooks/cookie";
import { useNavigate } from "react-router-dom";

const AmbulanceRegistration = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [categories, setCategories] = useState([]);
  const { userProfileData, isLoggedIn } = useSelector((state) => state.user);
  const UserId = getCookieItem("UserId");

  // Profile Image states
  const [profileFile, setProfileFile] = useState(null);
  const [uploadProfileImage, setUploadProfileImage] = useState("");
  const [profilePreview, setProfilePreview] = useState(null);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState([
    { name: "", phone: "", licenseNumber: "" },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    latitude: "28.6139",
    longitude: "77.2090",
    capacity: 4,
    price: 1500,
    description: "",
    ambulanceType: "",
    ambulanceNumber: "",
    availabilityStatus: "Available",
    operatingHours: "24/7",
    emergencyContact: "911",
    profileImages: [],
  });

  const uploadImage = async (file) => {
    try {
      const formDataData = new FormData();
      formDataData.append("file", file);
      const response = await postRequest({
        url: `upload/uploadImage`,
        cred: formDataData,
      });
      const uploadedUrl = response?.data?.data?.imageUrl;
      setUploadProfileImage(uploadedUrl);
      setFormData((prev) => ({ ...prev, profileImage: uploadedUrl }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const payload = { ...formData, drivers };
      console.log("Final payload before submit:", payload);

      const response = await postRequest({
        url: `ambulance/registerAmbulances/${UserId}`,
        cred: payload,
      });

      // console.log("Ambulance Register Response:", response?.data);

      // ✅ Sirf success hone par popup dikhao
      if (
        response?.status === 201 ||
        response?.data?.statusCode === 201 ||
        response?.data?.success === true
      ) {
        toast.success(
          response?.data?.message || "Ambulance registered successfully!"
        );
        setShowSuccess(true); // success popup
        // navigate("/verification");
        setTimeout(() => {
          navigate("/verification"); // 👈 Verification page par redirect
        }, 2000);
      } else {
        toast.error(response?.data?.message || "Something went wrong!");
      }
    } catch (err) {
      console.error("Error Registering Ambulance:", err);
      toast.error(
        err?.response?.data?.message || "Failed to register ambulance"
      );
    } finally {
      setLoading(false);
    }
  };
  // Profile Pic Handler
  const handleProfilePic = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
      setProfilePreview(URL.createObjectURL(file));
    }
    uploadImage(file);
  };

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDriverChange = (index, field, value) => {
    const updated = [...drivers];
    updated[index][field] = value;
    setDrivers(updated);
  };

  const addDriver = () => {
    setDrivers([...drivers, { name: "", phone: "", licenseNumber: "" }]);
  };

  const removeDriver = (index) => {
    if (drivers.length > 1) {
      setDrivers(drivers.filter((_, i) => i !== index));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    if (currentIndex >= updated.length) {
      setCurrentIndex(0);
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!profilePreview) {
      newErrors.profilePic = "Profile picture is required";
    }

    if (!formData.name) newErrors.name = "Ambulance name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.ambulanceType)
      newErrors.ambulanceType = "Ambulance type is required";
    if (!formData.ambulanceNumber)
      newErrors.ambulanceNumber = "Ambulance number is required";
    if (!formData.operatingHours)
      newErrors.operatingHours = "Operating hours are required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.description)
      newErrors.description = "Description is required";

    // ✅ driver validation
    const driverErrors = drivers.map((driver) => {
      const dErrors = {};
      if (!driver.name) dErrors.name = "Driver name is required";
      if (!driver.phone) dErrors.phone = "Driver phone is required";
      if (!driver.licenseNumber)
        dErrors.licenseNumber = "License number is required";
      return dErrors;
    });

    if (driverErrors.some((d) => Object.keys(d).length > 0)) {
      newErrors.drivers = driverErrors;
    }
    return newErrors;
  };

  const uploadDocument = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      fileUpload({
        url: `upload/uploadImage`,
        cred: { file },
      })
        .then((res) => {
          const imageUrl = res.data?.data?.imageUrl;
          if (imageUrl) {
            setFormData((prev) => ({
              ...prev,
              profileImages: [...prev.profileImages, imageUrl],
              // documentImage: [...prev.documentImage, { url: imageUrl }],
            }));
          }
        })
        .catch((error) => {
          console.error("Image upload failed:", error);
        });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-34 px-4">
      <div className=" sm:w-full lg:w-[80%]  xl:w-[80%] 2xl:w-[70%] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full mb-4 transform hover:scale-110 transition-transform duration-300">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl  md:text-2xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            AMBULANCE Registration
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Join our healthcare network today
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowSuccess(false)}
          >
            <div className="bg-white rounded-2xl p-8 text-center transform animate-bounce">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">
                Success!
              </h3>
              <p className="text-gray-600">
                AMBULANCE registered successfully!
              </p>
            </div>
          </div>
        )}

        {/* Main Form */}
        <div className="bg-white/70 backdrop-blur-sm shadow-2xl rounded-3xl p-8 border border-white/20">
          <div className="space-y-6">
            {/* Profile Section */}
            <div className="group">
              <div className="flex items-center gap-3 mb-4">
                <Upload className="w-5 h-5 text-blue-600" />
                <label className="text-lg font-semibold text-gray-800">
                  Profile Picture
                </label>
              </div>
              <div className="flex items-center gap-6">
                <div className="relative w-24 h-24">
                  <input
                    type="file"
                    id="profilePic"
                    accept="image/*"
                    onChange={handleProfilePic}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-green-100 rounded-full border-4 border-dashed border-blue-300 flex items-center justify-center hover:border-blue-500 transition-colors duration-300 cursor-pointer group-hover:scale-105 transform transition-transform">
                    {profilePreview ? (
                      <img
                        src={profilePreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <Upload className="w-8 h-8 text-blue-500" />
                    )}
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Click to upload Ambulance logo</p>
                  <p className="text-xs">Max size: 5MB</p>
                  {errors.profilePic && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.profilePic}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Basic Info Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                  htmlFor="name"
                >
                  <Building2 className="w-4 h-4 text-blue-600" />
                  Ambulance Center Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData?.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter Ambulance center name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors?.name}</p>
                )}
              </div>

              <div className="space-y-2 group">
                <label
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                  htmlFor="phone"
                >
                  <Phone className="w-4 h-4 text-purple-600" />
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="number"
                  value={formData?.phone}
                  onChange={(e) => {
                    const value = e.target.value;
                    /^\d*$/.test(value) &&
                      value.length <= 10 &&
                      handleInputChange("phone", value);
                  }}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="+91 12345 67890"
                />
                {errors?.phone && (
                  <p className="text-red-500 text-xs">{errors?.phone}</p>
                )}
              </div>
            </div>

            {/* Contact & Decription*/}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  <Mail className="w-4 h-4 text-green-600" />
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData?.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors?.email}</p>
                )}
              </div>

              {/*Operating Hours*/}
              <div className="space-y-2 group">
                <label
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                  htmlFor="hours"
                >
                  Operating Hours
                </label>
                <input
                  id="hours"
                  type="text"
                  value={formData?.operatingHours}
                  onChange={(e) =>
                    handleInputChange("operatingHours", e.target.value)
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Operating Hours of ambulance service"
                />
                {/* Validation messages */}
                {errors?.operatingHours && (
                  <p className="text-red-500 text-xs">
                    {errors?.operatingHours}
                  </p>
                )}
              </div>
            </div>

            {/*ambulance*/}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="type"
                >
                  Ambulance Type
                </label>
                <select
                  id="type"
                  value={formData?.ambulanceType}
                  onChange={(e) =>
                    handleInputChange("ambulanceType", e.target.value)
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="" disabled>
                    Select Options
                  </option>
                  <option value="Emergency Ambulance">
                    Emergency Ambulance
                  </option>
                  <option value="Non-Emergency Ambulance">
                    Non-Emergency Ambulance
                  </option>
                  <option value="ICU Ambulance">ICU Ambulance</option>
                </select>
                {errors?.ambulanceType && (
                  <p className="text-red-500 text-xs">
                    {errors?.ambulanceType}
                  </p>
                )}
              </div>
              <div className="space-y-2 group">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="number"
                >
                  Number of Ambulance
                </label>
                <select
                  id="number"
                  value={formData?.ambulanceNumber}
                  onChange={(e) =>
                    handleInputChange("ambulanceNumber", e.target.value)
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="" disabled>
                    Select Options
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4+">4</option>
                </select>
                {errors?.ambulanceNumber && (
                  <p className="text-red-500 text-xs">
                    {errors?.ambulanceNumber}
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2 group">
              <label
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
                htmlFor="address"
              >
                <MapPin className="w-4 h-4 text-red-600" />
                Search Address
              </label>
              <LocationSearchInput
                value={formData?.address}
                onSelect={
                  (place) => setFormData({ ...formData, ...place }) // address + lat/lng update
                }
              />
              {errors?.address && (
                <p className="text-red-500 text-xs">{errors?.address}</p>
              )}
            </div>

            {/*Decription*/}
            <div className="space-y-2 group">
              <label
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
                htmlFor="dec"
              >
                <FileText className="w-4 h-4 text-red-600" />
                Decription
              </label>
              <textarea
                id="dec"
                value={formData?.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Brief about your Ambulance services"
                rows={2}
              />

              {errors?.description && (
                <p className="text-red-500 text-xs">{errors?.description}</p>
              )}
            </div>
            {/* Packages Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-700">
                  Driver Information
                </h3>
                <button
                  type="button"
                  onClick={addDriver}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700"
                >
                  Add Driver
                </button>
              </div>
              <div className="space-y-3">
                {drivers.map((driver, index) => (
                  <div
                    key={index}
                    className="grid md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    {/* Name */}
                    <div className="space-y-2">
                      <label
                        className="text-sm font-medium text-gray-700"
                        htmlFor="dname"
                      >
                        Name
                      </label>
                      <input
                        id="dname"
                        type="text"
                        placeholder="Driver name"
                        value={driver?.name}
                        onChange={(e) =>
                          handleDriverChange(index, "name", e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      {errors?.drivers?.[index]?.name && (
                        <p className="text-red-500 text-xs">
                          {errors.drivers[index].name}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label
                        className="text-sm font-medium text-gray-700"
                        htmlFor="dphone"
                      >
                        Phone
                      </label>
                      <input
                        id="dphone"
                        type="text"
                        placeholder="Phone number"
                        value={driver.phone}
                        onChange={(e) => {
                          const value = e.target.value;
                          /^\d*$/.test(value) &&
                            value.length <= 10 &&
                            handleDriverChange(index, "phone", value);
                        }}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      {errors?.drivers?.[index]?.phone && (
                        <p className="text-red-500 text-xs">
                          {errors.drivers[index].phone}
                        </p>
                      )}
                    </div>

                    {/* License Number */}
                    <div className="space-y-2">
                      <label
                        className="text-sm font-medium text-gray-700"
                        htmlFor="dnumber"
                      >
                        License Number
                      </label>
                      <div className="flex gap-2">
                        <input
                          id="dnumber"
                          type="text"
                          placeholder="License number"
                          value={driver.licenseNumber}
                          onChange={(e) =>
                            handleDriverChange(
                              index,
                              "licenseNumber",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {drivers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeDriver(index)}
                            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            ×
                          </button>
                        )}
                      </div>
                      {errors?.drivers?.[index]?.licenseNumber && (
                        <p className="text-red-500 text-xs">
                          {errors.drivers[index].licenseNumber}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 group">
              <p className="text-gray-700 font-medium font-semibold">
                Select Images to showcase your Ambulance
              </p>
              {/* Preview Area */}
              {images.length > 0 && (
                <div className="relative w-full h-56 border rounded-lg flex items-center justify-center bg-gray-100 overflow-hidden">
                  {/* Current Image */}
                  <img
                    src={images[currentIndex].url}
                    alt="preview"
                    className="h-full object-contain"
                  />

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeImage(currentIndex)}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
                  >
                    ✕
                  </button>

                  {/* Dots Indicator */}
                  <div className="absolute bottom-2 flex gap-2">
                    {images.map((_, i) => (
                      <span
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`w-3 h-3 rounded-full cursor-pointer ${
                          currentIndex === i ? "bg-green-600" : "bg-gray-300"
                        }`}
                      ></span>
                    ))}
                  </div>
                </div>
              )}
              {/* Image container */}
              {formData?.profileImages?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData?.profileImages?.map((img, index) => (
                    <div key={index} className="relative">
                      {/* Image clickable banayi */}
                      <a href={img} target="_blank" rel="noopener noreferrer">
                        <img
                          src={img}
                          alt={`doc-${index}`}
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "cover",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        />
                      </a>

                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            profileImages: prev.profileImages.filter(
                              (_, i) => i !== index
                            ),
                          }))
                        }
                        style={{
                          position: "absolute",
                          top: "-6px",
                          right: "-6px",
                          background: "red",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                          fontSize: "14px",
                          lineHeight: "18px",
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {/* Upload Button */}
              <label className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={uploadDocument}
                  className="hidden"
                />
                <span className="flex items-center gap-2">➕ Add Images</span>
              </label>
            </div>
            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full text-white font-semibold py-4 rounded-xl transition-all duration-300 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 hover:from-blue-700 hover:via-purple-700 hover:to-green-700"
                }`}
              >
                {loading ? "Registering..." : "Register Ambulance"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmbulanceRegistration;
