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
import { useUpdate } from "../context/updateContext";

const DiagonsticRegistration = () => {
  const navigate = useNavigate();
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
  const [bloodBank, setBloodBank] = useState(false);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setUpdate } = useUpdate();

  const [packages, setPackages] = useState([
    { name: "", price: "", details: "" },
  ]);
  const [services, setservices] = useState([{ name: "fdgdf" }]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    profileImage: "",
    latitude: "28.6139",
    longitude: "77.2090",
    storeTiming: "8:00 am to 5:00 pm",
    description: "",
    accountType: "Diagnostic",
    startTime: "",
    endTime: "",
    profileImages: [],
    isBloodBank: true,
  });
  console.log("form data", formData);

  const uploadImage = async (file) => {
    try {
      const formDataData = new FormData();
      formDataData.append("file", file);
      const response = await postRequest({
        url: `upload/uploadImage`,
        cred: formDataData,
      });
      console.log("Image uploaded successfully:", response);
      const uploadedUrl = response?.data?.data?.imageUrl;
      setUploadProfileImage(uploadedUrl);
      console.log("uploadedUrl", uploadedUrl);
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
    if (!formData?.profileImage) {
      setErrors({ profileImage: "Please upload a profile image" });
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const payload = { ...formData, services, packages };
      console.log("Final payload before submit:", payload);
      const response = await postRequest({
        url: `diagnostics/registerDiagnostic/${UserId}`,
        cred: payload,
      });

      // console.log("Diagonstic Register Response:", response?.data?.data);
      // setUpdate((prev) => !prev);
      if (
        response?.status === 201 ||
        response?.data?.statusCode === 201 ||
        response?.data?.success === true
      ) {
        toast.success(
          response?.data?.message || "Diagonstics registered successfully!"
        );
        setShowSuccess(true); // success popup trigger
        // navigate("/verification");
        setTimeout(() => {
          navigate("/verification"); // 👈 Verification page par redirect
        }, 2000);
      } else {
        toast.error(response?.data?.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(" Error Registering :", err);
      toast.error(err?.respone?.data?.message);
    } finally {
      console.log(" Finally block executed");
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

  const handleServicesChange = (index, field, value) => {
    const updated = [...services];
    updated[index][field] = value;
    setservices(updated);
  };

  const addServices = () => {
    setservices([...services, { name: "" }]);
  };

  const removeServices = (index) => {
    if (services.length > 1) {
      setservices(services.filter((_, i) => i !== index));
    }
  };

  const handlePackageChange = (index, field, value) => {
    const updated = [...packages];
    updated[index][field] = value;
    setPackages(updated);
  };

  const addPackage = () => {
    setPackages([...packages, { name: "", price: "", details: "" }]);
  };

  const removePackage = (index) => {
    if (packages.length > 1) {
      setPackages(packages.filter((_, i) => i !== index));
    }
  };

  const handleImageUpload = (e) => {
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

  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    if (currentIndex >= updated.length) {
      setCurrentIndex(0);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic Info
    if (!formData.name) newErrors.name = "Diagnostic center name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.address) newErrors.address = "Address is required";

    // Clinic timings
    if (!formData.startTime) newErrors.startTime = "Start time is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";
    if (!formData.isBloodBank)
      newErrors.isBloodBank = "Please select blood bank availability";

    return newErrors;
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
            Diagnostic Registration
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
                Diagnostic registered successfully!
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
                  <p>Click to upload Diagnostic logo</p>
                  <p className="text-xs">Max size: 5MB</p>
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
                  Diagnostic Center Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData?.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter diagnostic center name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors?.name}</p>
                )}
              </div>

              <div className="space-y-2 group">
                <label
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 "
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
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 "
                  htmlFor="mail"
                >
                  <Mail className="w-4 h-4 text-green-600" />
                  Email
                </label>
                <input
                  id="mail"
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

              <div className="space-y-2 group">
                <label
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                  htmlFor="dec"
                >
                  <FileText className="w-4 h-4 text-red-600" />
                  Decription
                </label>
                <input
                  id="dec"
                  type="text"
                  value={formData?.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Brief about your diagonstic services"
                />
                {errors?.description && (
                  <p className="text-red-500 text-xs">{errors?.description}</p>
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
                value={formData.address}
                onSelect={
                  (place) => setFormData({ ...formData, ...place }) // address + lat/lng update
                }
              />
              {errors?.address && (
                <p className="text-red-500 text-xs">{errors?.address}</p>
              )}
            </div>

            {/* Store Timings*/}
            <div className="space-y-2 group">
              <label
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
                htmlFor="tm"
              >
                Clinic Availability
              </label>

              <div className="grid grid-cols-2 gap-6">
                {/* Start Time */}
                <input
                  id="tm"
                  type="time"
                  value={formData?.startTime}
                  onChange={(e) =>
                    handleInputChange("startTime", e.target.value)
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Select Time"
                />{" "}
                {errors?.startTime && (
                  <p className="text-red-500 text-xs">{errors?.startTime}</p>
                )}
                {/* End Time */}
                <input
                  id="tm"
                  type="time"
                  value={formData?.endTime}
                  onChange={(e) => handleInputChange("endTime", e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Select Time"
                />{" "}
                {errors?.endTime && (
                  <p className="text-red-500 text-xs">{errors?.endTime}</p>
                )}
              </div>
            </div>

            {/* Service Duration per patient field */}
            <div className="space-y-2 group">
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="service"
              >
                Service Duration Per Patient
              </label>
              <select
                id="service"
                value={formData?.serviceDuration}
                onChange={(e) =>
                  handleInputChange("serviceDuration", e.target.value)
                }
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select Duration</option>
                <option value="15">15 min</option>
                <option value="30">30 min</option>
                <option value="45">45 min</option>
                <option value="60">60 min</option>
                <option value="90">90 min</option>
                <option value="120">120 min</option>
              </select>
              {errors?.serviceDuration && (
                <p className="text-red-500 text-xs">
                  {errors?.serviceDuration}
                </p>
              )}
            </div>

            {/* Services Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3
                  className="text-lg font-semibold text-gray-700"
                  htmlFor="service"
                >
                  Services
                </h3>
                <button
                  type="button"
                  onClick={addServices}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Services
                </button>
              </div>

              <div className="space-y-3">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-4 bg-gray-50 rounded-xl"
                  >
                    <input
                      id="service"
                      type="text"
                      placeholder="Service name (e.g., ICU, X-Ray)"
                      value={service?.name}
                      onChange={(e) =>
                        handleServicesChange(index, "name", e.target.value)
                      }
                      className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />

                    {services.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeServices(index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Packages Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Packages
                </h3>
                <button
                  type="button"
                  onClick={addPackage}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Package
                </button>
              </div>

              <div className="space-y-3">
                {packages.map((pkg, index) => (
                  <div
                    key={index}
                    className="grid md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    {/* Name */}
                    <div className="space-y-2">
                      <label
                        className="text-sm font-medium text-gray-700"
                        htmlFor="pname"
                      >
                        Name
                      </label>
                      <input
                        id="pname"
                        type="text"
                        placeholder="Package name"
                        value={pkg?.name}
                        onChange={(e) =>
                          handlePackageChange(index, "name", e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                      <label
                        className="text-sm font-medium text-gray-700"
                        htmlFor="pprice"
                      >
                        Price
                      </label>
                      <input
                        id="pprice"
                        type="number"
                        placeholder="Price"
                        value={pkg?.price}
                        onChange={(e) =>
                          handlePackageChange(index, "price", e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    {/* Details + Remove */}
                    <div className="space-y-2">
                      <label
                        className="text-sm font-medium text-gray-700"
                        htmlFor="pdetails"
                      >
                        Details
                      </label>
                      <div className="flex gap-2">
                        <input
                          id="pdetails"
                          type="text"
                          placeholder="Details"
                          value={pkg?.details}
                          onChange={(e) =>
                            handlePackageChange(
                              index,
                              "details",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {packages.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePackage(index)}
                            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 group">
              {/* Checkbox */}
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  checked={formData.isBloodBank}
                  onChange={(e) => setBloodBank(e.target.checked)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                Blood bank services available
              </label>
            </div>

            <div className="space-y-2 group">
              <p className="text-gray-700 font-medium font-semibold">
                Select Images to showcase your
              </p>

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
                  onChange={handleImageUpload}
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
                {loading ? "Registering..." : "Register Diagontics"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagonsticRegistration;
