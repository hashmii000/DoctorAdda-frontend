/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Camera,
  Calendar,
  User,
  Phone,
  Mail,
  Edit3,
  Check,
  X,
} from "lucide-react";
import SidebarNav from "./SidebarNav";
import { useSelector, useDispatch } from "react-redux";
import { getRequest, patchRequest, putRequest } from "../Helpers";
import { login, updateUserProfile } from "../redux/slices/userSlice"; // ✅ you need this action in your redux slice
import { getCookieItem } from "../Hooks/cookie";
import toast from "react-hot-toast";

const UserProfile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // console.log("userProfileData user id ", UserId);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);

  const { userProfileData, isLoggedIn } = useSelector((state) => state.user);
  //const UserId = userProfileData?._id;
  const UserId = getCookieItem("UserId");

  const [formData, setFormData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [errors, setErrors] = useState({});
  const [uodateStatus, setUpdateStatus] = useState(false);
  const formatForDateInput = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toISOString().split("T")[0];
};

  // ✅ calculate age
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // ✅ fetch user data
  useEffect(() => {
    if (!UserId) return;

    const fetchUserData = async () => {
      try {
        const res = await getRequest(`auth/getUserById/${UserId}`);
        const userData = res?.data?.data;

        const filled = {
          name: userData?.name || "",
          email: userData?.email || "",
          phone: userData?.phone || "",
          dob: userData?.dob ? formatForDateInput(userData.dob) : "",
          gender: userData?.gender || "",
          age: userData?.dob
            ? calculateAge(userData.dob)
            : userData?.age || null,
          profileImage: userData?.profileImage || null,
        };

        setFormData(filled);
        setOriginalData(filled);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [UserId]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData?.name?.trim()) newErrors.name = "Name is required";
    if (!formData?.dob) newErrors.dob = "Date of birth is required";
    if (!formData?.age || formData.age < 1 || formData.age > 120)
      newErrors.age = "Please enter a valid age";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    let updatedData = { ...formData, [field]: value };
    if (field === "dob" && value) updatedData.age = calculateAge(value);
    setFormData(updatedData);
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleEdit = () => {
    setOriginalData(formData);
    setEditMode(true);
  };

  const handleCancel = () => {
    setFormData(originalData);
    setEditMode(false);
    setErrors({});
  };

  // ✅ update API
  // const handleUpdate = async () => {
  //   if (!validateForm()) return;

  //   try {
  //     const res = await patchRequest({
  //       url: `auth/updateProfile/${UserId}`,
  //       cred: formData,
  //     });
  //     if (res?.data?.success) {
  //       // update redux
  //       dispatch(updateUserProfile(formData));
  //       setOriginalData(formData);
  //       setEditMode(false);
  //       setErrors({});
  //       console.log(res?.data?.data,"Profile updated successfully");
  //     }
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //   }
  // };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    const updatedPayload = {
      name: formData.name,
      dob: formData.dob,
      age: formData.age,
      gender: formData.gender,
    };
    setLoading(true); // start loader

    try {
      const res = await patchRequest({
        url: `auth/updateProfile/${UserId}`,
        cred: updatedPayload,
      });

      if (res?.data?.success) {
        dispatch(updateUserProfile(updatedPayload));
        setOriginalData(updatedPayload);
        setEditMode(false);
        setErrors({});
        toast.success(
          res?.data?.data?.message,
          "Profile updated successfully! 🎉"
        );
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false); // stop loader
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData((prev) => ({ ...prev, profileImage: e.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  if (!formData) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto p-6 md:pt-42">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <SidebarNav
            formData={formData}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleEdit={handleEdit}
          />

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-[#006ca7] p-8 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="md:text-2xl text-xl font-bold">
                      Profile Information
                    </h1>
                    <p className="text-blue-100 mt-1">
                      Manage your personal details
                    </p>
                  </div>
                  {!editMode && (
                    <button
                      className="px-4 py-2 bg-white/20 text-white rounded-full hover:bg-white/30"
                      onClick={handleEdit}
                    >
                      <Edit3 size={16} className="inline mr-2" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>

              {/* Profile Content */}
              <div className="md:p-6 p-3">
                {/* Profile Picture */}
                <div className="flex items-center gap-3 mb-5 bg-gray-50 p-6 rounded-xl">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-4xl text-white font-bold shadow-lg">
                      {formData.profileImage ? (
                        <img
                          src={formData?.profileImage}
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        getInitials(formData?.name)
                      )}
                    </div>
                    {editMode && (
                      <label className="absolute -bottom-2 -right-2 bg-orange-500 text-white rounded-full p-2 cursor-pointer shadow-lg">
                        <Camera size={16} />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mt-3">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                        Hi, {formData?.name}!
                      </h3>
                      <p className="text-gray-600 mt-1 text-sm md:text-base">
                        {formData?.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Full Name
                    </label>
                    {editMode ? (
                      <input
                        type="text"
                        value={formData?.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg">
                        {formData?.name}
                      </div>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Phone
                    </label>
                    <div className="px-4 py-3 bg-gray-100 rounded-lg text-gray-600">
                      <Phone size={16} className="inline mr-2" />
                      {formData?.phone}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Email
                    </label>
                    <div className="px-4 py-3 bg-gray-100 rounded-lg text-gray-600">
                      <Mail size={16} className="inline mr-2" />
                      {formData?.email}
                    </div>
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Gender
                    </label>
                    {editMode ? (
                      <select
                        value={formData?.gender}
                        onChange={(e) => handleChange("gender", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg">
                        <User size={16} className="inline mr-2" />
                        {formData?.gender}
                      </div>
                    )}
                  </div>

                  {/* DOB */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      DOB
                    </label>
                    {editMode ? (
                      <input
                        type="date"
                        value={formData?.dob}
                        onChange={(e) => handleChange("dob", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg">
                        <Calendar size={16} className="inline mr-2" />
                        {formatDate(formData?.dob) || "mm/dd/yyyy"}
                      </div>
                    )}
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Age
                    </label>
                    <div className="px-4 py-3 bg-gray-50 rounded-lg">
                      {formData?.age || "--"} years
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {editMode && (
                  <div className="mt-8 flex justify-end gap-4">
                    <button
                      onClick={handleCancel}
                      className="px-6 py-2 rounded-full border text-gray-700"
                      disabled={loading}
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleUpdate}
                      className="px-6 py-2 rounded-full bg-green-500 text-white flex items-center gap-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        "Update Profile"
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
