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
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { getCookieItem } from "../Hooks/cookie";

const HospitalRegistration = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { userProfileData, isLoggedIn } = useSelector((state) => state.user);
  const UserId = getCookieItem("UserId");
  // Profile Image states
  const [profileFile, setProfileFile] = useState(null);
  const [uploadProfileImage, setUploadProfileImage] = useState("");
  const [profilePreview, setProfilePreview] = useState(null);
  const [category, setCategory] = useState([]);
  const [doctors, setDoctor] = useState([]);
  const [healthCard, setHealthCard] = useState([]);
  const [doctorData, setDoctorData] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    profileImage: "",
    phone: "",
    email: "",
    description: "",
    accountType: "Hospital",
    categories: [],
    healthCard: [],
    latitude: "",
    longitude: "",
    facilities: [{ name: "", discription: "" }],
    profileImages: [],
  });
  console.log("formData", formData);

  const categoryOption = category?.map((item, index) => ({
    label: item?.name,
    value: item._id,
  }));
  const healthCardOption = healthCard?.map((item, index) => ({
    label: item?.name,
    value: item._id,
  }));

  const selectCategory = (selectedValues) => {
    console.log("selectedValues", selectedValues);
    setFormData((prev) => ({
      ...prev,
      categories: selectedValues, // This will save only the selected category IDs
    }));
  };
  const selectHealthCard = (selectedValues) => {
    console.log("selectedValues", selectedValues);
    setFormData((prev) => ({
      ...prev,
      healthCard: selectedValues,
    }));
  };

  const handleFacilityChange = (e, index) => {
    const { name, value } = e.target;
    const updatedFacilities = [...formData.facilities];

    if (name.includes("Name")) {
      updatedFacilities[index].name = value;
    } else if (name.includes("Description")) {
      updatedFacilities[index].discription = value;
    }

    setFormData((prev) => ({
      ...prev,
      facilities: updatedFacilities,
    }));
  };

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
      toast.error("Please fill all required fields");
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const payload = { ...formData };
      console.log("Final payload before submit:", payload);

      const response = await postRequest({
        url: `hospital/registerHospital/${UserId}`,
        cred: payload,
      });

      // ✅ Sirf success hone par popup dikhao
      if (
        response?.status === 201 ||
        response?.data?.statusCode === 201 ||
        response?.data?.success === true
      ) {
        toast.success(
          response?.data?.message || "Hospital registered successfully!"
        );
        setShowSuccess(true);
        setTimeout(() => {
          navigate("/verification"); // 👈 Verification page par redirect
        }, 2000);
      } else {
        toast.error(response?.data?.message || "Something went wrong!");
      }
    } catch (err) {
      console.error("Error Registering Hospital:", err);
      const message =
        err?.response?.data?.message || "Failed to register hospital";
      toast.error(message);
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

  const addFacility = () => {
    setFormData((prev) => ({
      ...prev,
      facilities: [...prev.facilities, { name: "", discription: "" }],
    }));
  };

  const removeFacility = (index) => {
    const updatedFacilities = formData.facilities.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      facilities: updatedFacilities,
    }));
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

  useEffect(() => {
    getRequest(`category?isPagination=false`)
      .then((res) => {
        setCategory(res?.data?.data);
        console.log("res?data0", res?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    getRequest(`doctor/doctors?isPagination=false`)
      .then((res) => {
        setDoctor(res?.data?.data?.doctors);
        console.log("setDoctor?data0==========???", res?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    getRequest(`healthCard?isPagination=false`)
      .then((res) => {
        setHealthCard(res?.data?.data);
        console.log("res?data0", res?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Hospital name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Contact number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.ownerName) newErrors.ownerName = "Owner name is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Verification phone is required";
    if (!formData.categories || formData.categories.length === 0) {
      newErrors.categories = "Please select at least one category";
    }
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
            Hospital Registration
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
              <p className="text-gray-600">Hospital registered successfully!</p>
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
                  <p>Click to upload hospital logo</p>
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
                  Hospital Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData?.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter hospital name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors?.name}</p>
                )}
              </div>

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
                  placeholder="hospital@example.com"
                />
                {errors.officialEmail && (
                  <p className="text-red-500 text-xs">{errors?.email}</p>
                )}
              </div>
            </div>

            {/* Contact & Category */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2 group">
                <label
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                  htmlFor="phone"
                >
                  <Phone className="w-4 h-4 text-purple-600" />
                  Officail Hospital Contact Number
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

              <div className="space-y-2 group">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="cat"
                >
                  Category
                </label>
                <Select
                  id="cat"
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  defaultValue={[]}
                  onChange={selectCategory}
                  options={categoryOption}
                  size="large"
                  value={formData?.categories} // Ensure selected categories are controlled by formData
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outine-none"
                />
                {errors?.categories && (
                  <p className="text-red-500 text-xs">{errors?.categories}</p>
                )}
              </div>

              <div className="space-y-2 group">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="health"
                >
                  Health Card
                </label>
                <Select
                  id="health"
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  defaultValue={[]}
                  onChange={selectHealthCard}
                  options={healthCardOption}
                  size="large"
                  value={formData?.healthCard} // Ensure selected categories are controlled by formData
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500"
                />
                {errors?.healthCard && (
                  <p className="text-red-500 text-xs">{errors?.healthCard}</p>
                )}
              </div>
            </div>

            {/* Decription */}
            <div className="space-y-2 group">
              <label
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
                htmlFor="description"
              >
                <FileText className="w-4 h-4 text-red-600" />
                Decription
              </label>
              <input
                id="description"
                type="text"
                value={formData?.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Complete pharmacy description"
              />
              {errors?.description && (
                <p className="text-red-500 text-xs">{errors?.description}</p>
              )}
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
                id="address"
                value={formData.address}
                onSelect={
                  (place) => setFormData({ ...formData, ...place }) // address + lat/lng update
                }
              />
              {errors?.address && (
                <p className="text-red-500 text-xs">{errors?.address}</p>
              )}
            </div>

            {/* Owner Details */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2 group">
                <label
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                  htmlFor="owner"
                >
                  <User className="w-4 h-4 text-gray-600" />
                  Owner Name
                </label>
                <input
                  id="owner"
                  type="text"
                  value={formData?.ownerName}
                  onChange={(e) =>
                    handleInputChange("ownerName", e.target.value)
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Full name"
                />
                {errors?.ownerName && (
                  <p className="text-red-500 text-xs">{errors?.ownerName}</p>
                )}
              </div>

              <div className="space-y-2 group">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="name"
                >
                  GST Number
                </label>
                <input
                  id="name"
                  type="number"
                  value={formData?.gstNumber}
                  onChange={(e) =>
                    handleInputChange("gstNumber", e.target.value)
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="GST registration number"
                />
              </div>

              <div className="space-y-2 group">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="phone"
                >
                  Verification Phone
                </label>
                <input
                  id="phone"
                  type="number"
                  value={formData?.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="+91 98765 43210"
                />
                {errors?.phoneNumber && (
                  <p className="text-red-500 text-xs">{errors?.phoneNumber}</p>
                )}
              </div>
            </div>

            {/* Facilities Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Facilities & Services
                </h3>
                <button
                  type="button"
                  onClick={addFacility}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Facility
                </button>
              </div>

              <div className="space-y-3">
                {formData?.facilities?.map((facility, index) => (
                  <div
                    key={index}
                    className="grid md:grid-cols-2 gap-4 p-4 mb-3 bg-gray-50 rounded-xl border"
                  >
                    {/* Facility Name */}
                    <div className="flex flex-col">
                      <label
                        className="text-sm font-medium text-gray-700 mb-1"
                        htmlFor="fname"
                      >
                        Name
                      </label>
                      <input
                        id="fname"
                        type="text"
                        name={`facilityName_${index}`}
                        value={facility?.name}
                        onChange={(e) => handleFacilityChange(e, index)}
                        placeholder="Facility name (e.g., ICU, X-Ray)"
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    {/* Facility Description + Remove Button */}
                    <div className="flex gap-2">
                      <div className="flex flex-col flex-1">
                        <label
                          className="text-sm font-medium text-gray-700 mb-1"
                          htmlFor="fdec"
                        >
                          Description
                        </label>
                        <input
                          id="fdec"
                          type="text"
                          name={`facilityDescription_${index}`}
                          value={facility?.discription}
                          onChange={(e) => handleFacilityChange(e, index)}
                          placeholder="Enter description"
                          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>

                      {/* Remove Button */}
                      {formData?.facilities?.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFacility(index)}
                          className="h-10 w-10 self-end flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
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
                {loading ? "Registering..." : "Register Hospital"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalRegistration;
