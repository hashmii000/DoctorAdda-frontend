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
import LocationSearchInput from "./LocationSearchInput";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUpdate } from "../context/updateContext";
import { getCookieItem } from "../Hooks/cookie";
const PharmacyRegistration = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { setUpdate } = useUpdate();
  const { userProfileData, isLoggedIn, userData } = useSelector(
    (state) => state.user
  );
  const UserId = getCookieItem("UserId");
  console.log("userProfileData user id ", UserId);

  // Profile Image states
  const [profileFile, setProfileFile] = useState(null);
  const [uploadProfileImage, setUploadProfileImage] = useState("");
  const [profilePreview, setProfilePreview] = useState(null);
  const [services, setservices] = useState([{ name: "", discription: "" }]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    profileImage: "",
    storeTiming: "",
    description: "",
    accountType: "Pharmacy",
    latitude: "",
    longitude: "",
    ownerDetails: {
      name: "",
      gstNumber: "",
      phoneNumber: "",
    },
    onlinePayment: true,
    cod: true,
    profileImages: [],
  });
  console.log("formData", formData);

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

    setErrors({});
    setLoading(true);

    try {
      const payload = { ...formData, services };
      console.log("Final payload before submit:", payload);
      const response = await postRequest({
        url: `pharmacy/registerPharmacy/${UserId}`,
        cred: payload,
      });

      // console.log("Pharmacy Register Response:", response?.data?.data);
      // ✅ Sirf success hone par popup dikhao
      // setUpdate((prev) => !prev);
      if (
        response?.status === 201 ||
        response?.data?.statusCode === 201 ||
        response?.data?.success === true
      ) {
        toast.success(
          response?.data?.message || "Pharmacy registered successfully!"
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
      console.error(" Error Registering Pharmacy:", err);
      toast.error(
        err?.response?.data?.message || "Failed to register pharmacy"
      );
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

  const handleServiceChange = (index, field, value) => {
    const updated = [...services];
    updated[index][field] = value;
    setservices(updated);
  };

  const addService = () => {
    setservices([...services, { name: "", description: "" }]);
  };

  const removeService = (index) => {
    if (services.length > 1) {
      setservices(services.filter((_, i) => i !== index));
    }
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

  const validateForm = () => {
    const newErrors = {};
    if (!profilePreview) {
      newErrors.profilePic = "Profile picture is required";
    }
    if (!formData.name) newErrors.name = "Pharmacy name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Contact number is required";
    if (!formData.storeTiming)
      newErrors.storeTiming = "Please select a storeTiming";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.ownerDetails.name)
      newErrors.ownerDetails.name = "Owner name is required";
    if (!formData.ownerDetails.gstNumber)
      newErrors.ownerDetails.gstNumber = "Gst Number name is required";
    if (!formData.ownerDetails.phoneNumber)
      newErrors.ownerDetails.phoneNumber = "Verification phone is required";
    if (!formData.description)
      newErrors.description = "Description is required";

    return newErrors;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-34 px-4">
      <div className=" sm:w-full lg:w-[80%]  xl:w-[80%] 2xl:w-[70%] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full mb-4 transform hover:scale-110 transition-transform duration-300">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl  md:text-2xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Pharmacy Registration
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
              <p className="text-gray-600">Pharmacy registered successfully!</p>
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
                  <p>Click to upload Pharmacy logo</p>
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
                  Pharmacy Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData?.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none "
                  placeholder="Enter Pharmacy name"
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

            {/* Email & Description */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  <Mail className="w-4 h-4 text-green-600" />
                  Official Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData?.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="abc@example.com"
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
                  placeholder="Complete Pharmacy address"
                />
                {errors?.description && (
                  <p className="text-red-500 text-xs">{errors?.description}</p>
                )}
              </div>
            </div>

            {/* Address & timings*/}
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

            <div className="space-y-2 group">
              <label
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
                htmlFor="tym"
              >
                {/* <MapPin className="w-4 h-4 text-red-600" /> */}
                Store Timings
              </label>
              <input
                id="tym"
                type="text"
                value={formData?.storeTiming}
                onChange={(e) =>
                  handleInputChange("storeTiming", e.target.value)
                }
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Ex: 9:00 AM - 9:00 PM"
              />
              {errors?.storeTiming && (
                <p className="text-red-500 text-xs">{errors?.storeTiming}</p>
              )}
            </div>

            {/* services Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Services Offered
                </h3>
                <button
                  type="button"
                  onClick={addService}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700"
                >
                  <Plus className="w-4 h-4" />
                  Add More
                </button>
              </div>

              <div className="space-y-3">
                {services.map((Service, index) => (
                  <div
                    key={index}
                    className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <input
                      type="text"
                      placeholder="Services Offered Name"
                      value={Service?.name}
                      onChange={(e) =>
                        handleServiceChange(index, "name", e.target.value)
                      }
                      className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Services Offered Description"
                        value={Service?.discription}
                        onChange={(e) =>
                          handleServiceChange(
                            index,
                            "discription",
                            e.target.value
                          )
                        }
                        className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      {services.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeService(index)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Owner Details */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Owner Name */}
              <div className="space-y-2 group">
                <label
                  htmlFor="oname"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                >
                  <User className="w-4 h-4 text-gray-600" />
                  Owner Name
                </label>
                <input
                  id="oname"
                  type="text"
                  value={formData.ownerDetails.name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      ownerDetails: {
                        ...prev.ownerDetails,
                        name: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Full name"
                />
                {errors?.ownerDetails?.name && (
                  <p className="text-red-500 text-xs">
                    {errors.ownerDetails.name}
                  </p>
                )}
              </div>

              {/* GST Number */}
              <div className="space-y-2 group">
                <label
                  htmlFor="gnum"
                  className="text-sm font-medium text-gray-700"
                >
                  GST Number
                </label>
                <input
                  id="gnum"
                  type="text"
                  value={formData.ownerDetails.gstNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      ownerDetails: {
                        ...prev.ownerDetails,
                        gstNumber: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="GST registration number"
                />
                {errors?.ownerDetails?.gstNumber && (
                  <p className="text-red-500 text-xs">
                    {errors.ownerDetails.gstNumber}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-2 group">
                <label
                  htmlFor="vphone"
                  className="text-sm font-medium text-gray-700"
                >
                  Verification Phone
                </label>
                <input
                  id="vphone"
                  type="text"
                  value={formData.ownerDetails.phoneNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ""); // only numbers
                    if (value.length <= 10) {
                      setFormData((prev) => ({
                        ...prev,
                        ownerDetails: {
                          ...prev.ownerDetails,
                          phoneNumber: value,
                        },
                      }));
                    }
                  }}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter 10-digit phone number"
                  maxLength={10}
                />
                {errors?.ownerDetails?.phoneNumber && (
                  <p className="text-red-500 text-xs">
                    {errors.ownerDetails.phoneNumber}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                COD Preference
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleInputChange("cod", "true")}
                  className={`w-full px-4 py-3 border rounded-xl font-medium transition-all duration-200
        ${
          formData?.cod === "true"
            ? "bg-green-500 text-white border-green-500"
            : "bg-white text-gray-700 border-gray-300 hover:bg-green-50"
        }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange("cod", "false")}
                  className={`w-full px-4 py-3 border rounded-xl font-medium transition-all duration-200
        ${
          formData?.cod === "false"
            ? "bg-red-500 text-white border-red-500"
            : "bg-white text-gray-700 border-gray-300 hover:bg-red-50"
        }`}
                >
                  No
                </button>
              </div>
              {errors?.cod && (
                <p className="text-red-500 text-xs">{errors?.cod}</p>
              )}
            </div>

            <div className="space-y-2 group">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                Online Payment
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleInputChange("onlinePayment", "true")}
                  className={`flex-1 px-4 py-3 border rounded-xl font-medium transition-all duration-200
        ${
          formData?.onlinePayment === "true"
            ? "bg-green-500 text-white border-green-500"
            : "bg-white text-gray-700 border-gray-300 hover:bg-green-50"
        }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange("onlinePayment", "false")}
                  className={`flex-1 px-4 py-3 border rounded-xl font-medium transition-all duration-200
        ${
          formData?.onlinePayment === "false"
            ? "bg-red-500 text-white border-red-500"
            : "bg-white text-gray-700 border-gray-300 hover:bg-red-50"
        }`}
                >
                  No
                </button>
              </div>
              {errors?.onlinePayment && (
                <p className="text-red-500 text-xs">{errors?.onlinePayment}</p>
              )}
            </div>

            <div className="space-y-2 group">
              <p className="text-gray-700 font-medium font-semibold">
                Select Hospital Display images
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
                {loading ? "Registering..." : "Register Pharmacy"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyRegistration;
