/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import {
  Plus,
  Upload,
  Building2,
  Mail,
  Phone,
  MapPin,
  User,
  FileText,
  Calendar,
} from "lucide-react";
import { fileUpload, getRequest, postRequest } from "../Helpers/index";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import LocationSearchInput from "./LocationSearchInput";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { getCookieItem } from "../Hooks/cookie";
import { useUpdate } from "../context/updateContext";

const DoctorsRegistration = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [category, setCategory] = useState([]);
  const [hospital, setHospital] = useState([]);
  const { userProfileData, isLoggedIn } = useSelector((state) => state.user);
  const UserId = getCookieItem("UserId");
  // Profile Image states
  const [profileFile, setProfileFile] = useState(null);
  const [uploadProfileImage, setUploadProfileImage] = useState("");
  const [profilePreview, setProfilePreview] = useState(null);
  const imageRef1 = useRef(null);
  const { setUpdate } = useUpdate();

  // Add new states for documents
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const [documents, setDocuments] = useState([]);
  const [docIndex, setDocIndex] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [formData, setFormData] = useState({
    phone: "",
    fullName: "",
    email: "",
    gender: "",
    dob: "",
    profilepic: "",
    experience: "",
    about: "",
    education: "",
    category: "",
    hospital: "",
    profileImages: [],
    documentImage: [],
    veterinaryDoctorType: [],
    serviceType: [],
    veterinaryserviceType: [],
    clinics: [
      {
        clinicName: "",
        clinicAddress: "",
        consultationFee: "",
        startTime: "",
        endTime: "",
        duration: 30,
        videoStartTime: "",
        videoEndTime: "",
        videoDuration: 30,
        location: {
          type: "Point",
          coordinates: [0, 0],
        },
      },
    ],
  });
  console.log("form data", formData);

  // Fetch categories
  useEffect(() => {
    getRequest(`category?isPagination=false`)
      .then((res) => {
        setCategory(res?.data?.data);
        console.log("res?data0", res?.data?.data);
        const filtrCategory = res?.data?.data?.filter(
          (item) => String(item._id) === String(formData?.category)
        );

        console.log("filtrCategory", filtrCategory);

        // Example: Set selected category name
        if (filtrCategory.length > 0) {
          setCategoryName(filtrCategory[0].name);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    getRequest(`hospital?isPagination=false`)
      .then((res) => {
        setHospital(res?.data?.data?.hospitals);
        console.log("Hospital", res?.data?.data?.hospitals);
        const filterHospital = res?.data?.data?.hospitals?.filter(
          (item) => String(item.name) === formData?.hospital
        );

        console.log("filterHospital", filterHospital);

        // Example: Set selected category name
        if (filterHospital.length == 0) {
          setSelectedHospital("Other");
          setFormData((prev) => ({
            ...prev,
            hospital: formData?.hospital,
          }));
        } else {
          setSelectedHospital(filterHospital[0].name);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  // category options

  const serviceProvideOption = [
    {
      label: "Small Animal",
      value: "Small Animal",
    },
    {
      label: "Big Animal",
      value: "Big Animal",
    },
  ];
  const serviceType = [
    {
      label: "In-clinic",
      value: "In-clinic",
    },
    {
      label: "Video Consultation",
      value: "Video Consultation",
    },
  ];
  const veterinaryserviceType = [
    {
      label: "In-clinic",
      value: "In-clinic",
    },
    {
      label: "Home Visit",
      value: "Home Visit",
    },
  ];
  const selectData = (value) => {
    setFormData((prev) => ({ ...prev, veterinaryDoctorType: value }));
  };
  const selectData1 = (value) => {
    setFormData((prev) => ({ ...prev, veterinaryserviceType: value }));
  };
  const selectData2 = (value) => {
    setFormData((prev) => ({ ...prev, serviceType: value }));
  };

  const categoryOption = category?.map((item, index) => {
    return (
      <option key={index} value={item._id}>
        {item?.name}
      </option>
    );
  });

  //  hospital options
  const hospitalOption = hospital?.map((item, index) => {
    return (
      <option key={index} value={item?.name}>
        {item?.name}
      </option>
    );
  });

  const handleSubmit = async () => {
    console.log("🚀 Start submit data");

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("✅ Step 2 passed (Validation done)");
    setErrors({});
    setLoading(true);

    try {
      const payload = {
        ...formData,
      };
      console.log("📦 Final payload before submit:", payload);

      const response = await postRequest({
        url: `doctor/registers/${UserId}`,
        cred: payload,
      });
      // console.log(" Doctors Register Response:", response);
      // setUpdate((prev) => !prev);

      // ✅ Sirf success hone par popup dikhao
      if (
        response?.status === 201 ||
        response?.data?.statusCode === 201 ||
        response?.data?.success === true
      ) {
        toast.success(
          response?.data?.message || "Doctor registered successfully!"
        );
        setShowSuccess(true); // success popup trigger
        //navigate("/verification");
        setTimeout(() => {
          navigate("/verification"); // 👈 Verification page par redirect
        }, 2000);
      } else {
        toast.error(response?.data?.message || "Something went wrong!");
      }
    } catch (err) {
      console.error("Error Registering Doctors:", err);
      toast.error(err?.response?.data?.message || "Failed to register doctors");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required Fields Validation
    if (!profilePreview) {
      newErrors.profilePic = "Profile picture is required";
    }
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";

    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.hospital) newErrors.hospital = "Hospital is required";
    if (!formData.profilepic)
      newErrors.profilepic = "Profile image is required";
    if (!formData.serviceType)
      newErrors.serviceType = "Service type is required";
    if (!formData.veterinaryserviceType)
      newErrors.veterinaryserviceType = "Veterinary service type is required";
    if (!formData.veterinaryDoctorType)
      newErrors.veterinaryDoctorType = "Veterinary Doctor type is required";
    if (!formData?.about) newErrors.about = "About is required";
    if (!formData?.experience) newErrors.experience = "Experience is required";
    if (!formData?.education) newErrors.education = "Education is required";
    if (!formData?.documentNumber)
      newErrors.documentNumber = "Document Number is required";
    if (!formData?.mci) newErrors.mci = "MCI is required";

    console.log("step3", newErrors);

    return newErrors;
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
      setFormData((prev) => ({ ...prev, profilepic: uploadedUrl }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleProfilePic = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
      setProfilePreview(URL.createObjectURL(file));
    }
    uploadImage(file);
  };

  // Remove clinic
  const removeClinic = (index) => {
    const updatedClinics = [...formData.clinics];
    updatedClinics.splice(index, 1);
    setFormData((prev) => ({ ...prev, clinics: updatedClinics }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      const filtrCategory = category?.filter(
        (item) => String(item._id) === String(value)
      );

      console.log("filtrCategory", filtrCategory);

      // Example: Set selected category name
      if (filtrCategory.length > 0) {
        setCategoryName(filtrCategory[0].name);
      }

      setFormData((prev) => ({
        ...prev,
        [name]: value,
        serviceType: [],
        veterinaryserviceType: [],
        veterinaryDoctorType: [],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Gallery handlers
  const handleGalleryUpload = (e) => {
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
              documentImage: [...prev.documentImage, imageUrl],
              // documentImage: [...prev.documentImage, { url: imageUrl }],
            }));
          }
        })
        .catch((error) => {
          console.error("Image upload failed:", error);
        });
    });
  };

  // Document handlers
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

  // multiple upload handler
  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    files.forEach((file) => {
      uploadDocument(file);
    });
  };

  // remove doc
  const removeDocument = (index) => {
    const updated = documents.filter((_, i) => i !== index);
    setDocuments(updated);
    if (docIndex >= updated.length) setDocIndex(0);
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
            Doctor Registration
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
              <p className="text-gray-600">Doctor registered successfully!</p>
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
                  {errors.profilePic && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.profilePic}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Basic Info Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2 group">
                <label
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                  htmlFor="name"
                >
                  <Building2 className="w-4 h-4 text-blue-600" />
                  Center Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="fullName"
                  value={formData?.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter center name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs">{errors?.fullName}</p>
                )}
              </div>
              {/*PHONE*/}
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
                  name="phone"
                  value={formData?.phone}
                  onChange={(e) => {
                    const value = e.target.value;
                    /^\d*$/.test(value) &&
                      value.length <= 10 &&
                      handleInputChange(e);
                  }}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="+91 12345 67890"
                />
                {errors?.phone && (
                  <p className="text-red-500 text-xs">{errors?.phone}</p>
                )}
              </div>
              {/* EMAIL*/}
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
                  name="email"
                  value={formData?.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors?.email}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Birth Date */}
              <div className="space-y-2 group">
                <label
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                  htmlFor="date"
                >
                  <Calendar className="w-4 h-4 text-red-600" />
                  Birth Date
                </label>
                <input
                  id="date"
                  type="date"
                  name="dob"
                  value={formData?.dob}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {errors?.dob && (
                  <p className="text-red-500 text-xs">{errors?.dob}</p>
                )}
              </div>

              {/* Gender */}
              <div className="space-y-2 group">
                <label
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                  htmlFor="gender"
                >
                  <User className="w-4 h-4 text-red-600" />
                  Gender
                </label>
                <select
                  id="gender"
                  value={formData?.gender}
                  name="gender"
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors?.gender && (
                  <p className="text-red-500 text-xs">{errors?.gender}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="cat"
                >
                  Select Your Specialization
                </label>
                <select
                  id="cat"
                  name="category"
                  value={formData?.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option disabled value="">
                    Select Your Specialization
                  </option>
                  {categoryOption}
                </select>

                {errors?.categories && (
                  <p className="text-red-500 text-xs">{errors?.category}</p>
                )}
              </div>

              {categoryName == "Veterinary" ? (
                <div className="space-y-2 group">
                  <label className="text-sm font-medium text-gray-700">
                    Provide Services
                  </label>
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%", height: "65%" }}
                    placeholder="Select Services"
                    defaultValue={[]}
                    onChange={selectData}
                    size="large"
                    options={serviceProvideOption}
                    value={formData?.veterinaryDoctorType}
                  />
                  {errors?.serviceType && (
                    <p className="text-red-500 text-xs">
                      {errors?.serviceType}
                    </p>
                  )}
                </div>
              ) : (
                ""
              )}

              {categoryName == "Veterinary" ? (
                <div className="col-md-6">
                  <label className="form-label" htmlFor="type">
                    Service Type
                  </label>
                  <Select
                    id="type"
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    defaultValue={[]}
                    onChange={selectData1}
                    options={veterinaryserviceType}
                    size="large"
                    value={formData?.veterinaryserviceType} // Ensure selected categories are controlled by formData
                  />
                </div>
              ) : (
                <div className="col-md-6">
                  <label className="form-label" htmlFor="type">
                    Service Type
                  </label>
                  <Select
                    id="type"
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    defaultValue={[]}
                    onChange={selectData2}
                    options={serviceType}
                    size="large"
                    value={formData?.serviceType}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                  htmlFor="ex"
                >
                  {/* <FileText className="w-4 h-4 text-red-600" /> */}
                  Experience
                </label>
                <input
                  id="ex"
                  type="text"
                  name="experience"
                  value={formData?.experience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="e.g.,5"
                />
                {errors?.experience && (
                  <p className="text-red-500 text-xs">{errors?.experience}</p>
                )}
              </div>
              <div className="space-y-2 group">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="aff"
                >
                  Affiliated Hospital
                </label>
                <select
                  id="aff"
                  name="hospital"
                  value={selectedHospital}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  onChange={(e) => {
                    if (e.target.value == "Other") {
                      setSelectedHospital(e.target.value);
                      setFormData((prev) => ({
                        ...prev,
                        hospital: "",
                      }));
                    } else {
                      setSelectedHospital(e.target.value);

                      setFormData((prev) => ({
                        ...prev,
                        hospital: e.target.value,
                      }));
                    }
                  }}
                >
                  <option value="" disabled>
                    Select Hospital
                  </option>
                  {hospitalOption}
                  <option value="Other">Other</option>
                </select>
                {selectedHospital === "Other" && (
                  <input
                    type="text"
                    name="hospital"
                    value={formData?.hospital}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter Hospital Name"
                  />
                )}

                {errors?.hospital && (
                  <p className="text-red-500 text-xs">{errors?.hospital}</p>
                )}
              </div>
            </div>
            {/* Clinics Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Clinics</h3>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      clinics: [
                        ...prev.clinics,
                        {
                          clinicName: "",
                          clinicAddress: "",
                          consultationFee: "",
                          // availability: '',
                          location: { type: "Point", coordinates: [0, 0] },
                        },
                      ],
                    }))
                  }
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Another Clinic
                </button>
              </div>

              <div className="space-y-3">
                {formData?.clinics.map((clinic, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-xl space-y-6 relative"
                  >
                    {formData.clinics.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeClinic(index)}
                        className="absolute top-2 right-2 text-red-600 hover:bg-red-100 rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        ×
                      </button>
                    )}

                    {/* Row 1 → Clinic Name */}
                    {/* Row 4 → Consultation Fee */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium text-gray-700"
                          htmlFor="cname"
                        >
                          Clinic Name
                        </label>
                        <input
                          id="cname"
                          type="text"
                          placeholder="Enter Clinic Name"
                          value={clinic?.clinicName}
                          onChange={(e) => {
                            const newClinics = [...formData.clinics];
                            newClinics[index].clinicName = e.target.value;
                            setFormData({ ...formData, clinics: newClinics });
                          }}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium text-gray-700"
                          htmlFor="fee"
                        >
                          Consultation Fee
                        </label>
                        <input
                          id="fee"
                          type="number"
                          placeholder="₹ Fee"
                          value={clinic?.consultationFee}
                          onChange={(e) => {
                            const newClinics = [...formData.clinics];
                            newClinics[index].consultationFee = e.target.value;
                            setFormData({ ...formData, clinics: newClinics });
                          }}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Row 2 → Clinic Availability */}

                    <div className="space-y-2">
                      <label
                        className="text-sm font-medium text-gray-700"
                        htmlFor="cabv"
                      >
                        Clinic Availability
                      </label>
                      <div className="grid md:grid-cols-3 gap-4">
                        <input
                          id="cabv"
                          type="time"
                          value={clinic?.startTime}
                          onChange={(e) => {
                            const newClinics = [...formData.clinics];
                            newClinics[index].startTime = e.target.value;
                            setFormData({ ...formData, clinics: newClinics });
                          }}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          placeholder="Select Time"
                        />
                        <input
                          id="cabv"
                          type="time"
                          value={clinic?.endTime}
                          onChange={(e) => {
                            const newClinics = [...formData.clinics];
                            newClinics[index].endTime = e.target.value;
                            setFormData({ ...formData, clinics: newClinics });
                          }}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          placeholder="Select Time"
                        />
                        <select
                          value={clinic?.duration}
                          onChange={(e) => {
                            const newClinics = [...formData.clinics];
                            newClinics[index].duration = e.target.value;
                            setFormData({ ...formData, clinics: newClinics });
                          }}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                          <option value="">Duration Per Patient</option>
                          <option value="15">15 min</option>
                          <option value="30">30 min</option>
                          <option value="45">45 min</option>
                          <option value="60">60 min</option>
                          <option value="90">90 min</option>
                          <option value="120">120 min</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 3 → Video Consulting Availability */}
                    <div className="space-y-2">
                      <label
                        className="text-sm font-medium text-gray-700"
                        htmlFor="video"
                      >
                        Video Consulting Availability
                      </label>
                      <div className="grid md:grid-cols-3 gap-4">
                        <input
                          id="video"
                          type="time"
                          value={clinic?.videoStartTime}
                          onChange={(e) => {
                            const newClinics = [...formData.clinics];
                            newClinics[index].videoStartTime = e.target.value;
                            setFormData({ ...formData, clinics: newClinics });
                          }}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          placeholder="Select Time"
                        />
                        <input
                          id="video"
                          type="time"
                          value={clinic?.videoEndTime}
                          onChange={(e) => {
                            const newClinics = [...formData.clinics];
                            newClinics[index].videoEndTime = e.target.value;
                            setFormData({ ...formData, clinics: newClinics });
                          }}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          placeholder="Select Time"
                        />
                        <select
                          value={clinic?.videoDuration}
                          onChange={(e) => {
                            const newClinics = [...formData.clinics];
                            newClinics[index].videoDuration = e.target.value;
                            setFormData({ ...formData, clinics: newClinics });
                          }}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                          <option value="">Duration Per Patient</option>
                          <option value="15">15 min</option>
                          <option value="30">30 min</option>
                          <option value="45">45 min</option>
                          <option value="60">60 min</option>
                          <option value="90">90 min</option>
                          <option value="120">120 min</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 5  Location + Address */}
                    <div className="grid md:grid-cols-1 gap-4">
                      <div className="space-y-2 group">
                        <label
                          className="flex items-center gap-2 text-sm font-medium text-gray-700"
                          htmlFor="address"
                        >
                          <MapPin className="w-4 h-4 text-red-600" />
                          Search Address
                        </label>
                        <LocationSearchInput
                          value={clinic.clinicAddress}
                          onSelect={(place) => {
                            const updatedClinics = [...formData.clinics];
                            updatedClinics[index].clinicAddress = place.address; // sirf clinicAddress update karega
                            setFormData({
                              ...formData,
                              clinics: updatedClinics,
                            });
                          }}
                        />

                        {/* {errors?.address && (
                          <p className="text-red-500 text-xs">
                            {errors?.address}
                          </p>
                        )} */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 group">
              <label
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
                htmlFor="about"
              >
                {/* <FileText className="w-4 h-4 text-red-600" /> */}
                About
              </label>
              <input
                id="about"
                name="about"
                type="text"
                value={formData?.about}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Tell us about yourself"
              />
              {errors?.about && (
                <p className="text-red-500 text-xs">{errors?.about}</p>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2 group">
                <label
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                  htmlFor="edu"
                >
                  {/* <FileText className="w-4 h-4 text-red-600" /> */}
                  Education
                </label>
                <input
                  id="edu"
                  type="text"
                  name="education"
                  value={formData?.education}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter Education"
                />
                {errors?.education && (
                  <p className="text-red-500 text-xs">{errors?.education}</p>
                )}
              </div>

              <div className="space-y-2 group">
                <label
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                  htmlFor="mci"
                >
                  {/* <FileText className="w-4 h-4 text-red-600" /> */}
                  MCI Registration Number
                </label>
                <input
                  id="mci"
                  name="mci"
                  type="number"
                  value={formData?.mci}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter MCI Number"
                />
                {errors?.mci && (
                  <p className="text-red-500 text-xs">{errors?.mci}</p>
                )}
              </div>
            </div>

            <div className="space-y-2 group">
              <p className="text-gray-700 font-medium font-semibold">
                Clinics Images
              </p>

              {/* Image container */}
              {formData?.documentImage?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData?.documentImage?.map((img, index) => (
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
                            documentImage: prev.documentImage.filter(
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
                  onChange={handleGalleryUpload}
                  className="hidden"
                />
                <span className="flex items-center gap-2">➕ Add Images</span>
              </label>
            </div>

            <div className="space-y-2 group">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                {/* <FileText className="w-4 h-4 text-red-600" /> */}
                Documents Number
              </label>
              <input
                name="documentNumber"
                type="number"
                value={formData?.documentNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter Document Number"
              />
              {errors?.documentNumber && (
                <p className="text-red-500 text-xs">{errors?.documentNumber}</p>
              )}
            </div>

            <div className="space-y-2 group">
              <p className="text-gray-700 font-semibold">Upload Documents</p>

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
              <label className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white text-sm rounded-md cursor-pointer hover:bg-green-700">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={uploadDocument}
                  className="hidden"
                />
                <span className="flex items-center gap-2">📄 Upload</span>
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
                {loading ? "Registering..." : "Register Doctors"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsRegistration;
