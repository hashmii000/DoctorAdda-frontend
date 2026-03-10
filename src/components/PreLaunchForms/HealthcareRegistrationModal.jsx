/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-keys */
import React, { useEffect, useState } from "react";
import { Truck, Building, User, Activity, Plus, MapPin, X } from "lucide-react";
import logo from "../../assets/dr-adda-logo.png";
import { postRequest } from "../../Helpers";
import LocationSearchInput from "../LocationSearchInput";
import DoctorsRegistration from "../DoctorsRegistration";
import DoctorRegistrationForm from "./DoctorForms/DoctorRegistrationForms";
import HospitalRegistrationForm from "./HospitalForms/HospitalregistrationForms";
import AmbulanceRegistrationForm from "./AmbulanceForms/AmbulanceRegistrationForms";
import DiagnosticsRegistrationForms from "./DiagnosticsForms/DiagnosticsRegistrationForms";
import PharmacyRegistrationForms from "./PharmacyForms/PharmacyRegistrationForms";
import { setCookieItem } from "../../Hooks/cookie";
import DocumentsUpload from "./documentsUpload/documentsUpload";
import toast from "react-hot-toast";

const HealthcareRegistrationModal = ({ setOpen, onSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedCard, setSelectedCard] = useState("");
  const [formData, setFormData] = useState({});
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [profilePreview, setProfilePreview] = useState(null);
  const [profileFile, setProfileFile] = useState(null);

  const [imagesPreview, setImagesPreview] = useState([]);
  const [imagesFiles, setImagesFiles] = useState([]);

  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [submitting, setSubmitting] = useState(false); // ✅ Loader state for button
  const [errors, setErrors] = useState({});

  const cardTypes = [
    {
      id: "ambulance",
      title: "Ambulance Service",
      icon: <Truck className="w-10 h-10" />,
      gradient: "from-[#005b8e] to-[#005A8C]",
      description: "Register your ambulance service",
    },
    {
      id: "hospital",
      title: "Hospital",
      icon: <Building className="w-10 h-10" />,
      gradient: "from-[#005b8e] to-[#005A8C]",
      description: "Register your hospital facility",
    },
    {
      id: "doctor",
      title: "Doctor",
      icon: <User className="w-10 h-10" />,
      gradient: "from-[#005b8e] to-[#005A8C]",
      description: "Register as a medical practitioner",
    },
    {
      id: "diagnostic",
      title: "Diagnostic Center",
      icon: <Activity className="w-10 h-10" />,
      gradient: "from-[#005b8e] to-[#005A8C]",
      description: "Register your diagnostic services",
    },
    {
      id: "pharmacy",
      title: "Pharmacy  ",
      icon: <Activity className="w-10 h-10" />,
      gradient: "from-[#005b8e] to-[#005A8C]",
      description: "Register your pharmacy services",
    },
  ];

  const documentsOptionsMap = {
    doctor: [
      "Aadhar Card",
      "PAN Card",
      "Medical License",
      "Registration Number & Counsil Name",
      "Degree Certificate",
      "Specialization Certificate",
    ],
    hospital: [
      "Hospital Registration Certificate",
      "PAN Card",
      "GST Certificate",
      "Fire Safety Certificate",
      "Aadhar Card (Owner)",
    ],
    pharmacy: [
      "Pharmacist Certificate",
      "Drug License (PDF)",
      "GST Certificate",
      "Shop Front Photo",
      "Aadhar/PAN Card of the Owner",
    ],
    diagnostic: [
      "Pathalogy License",
      "NABL Accreditation",
      "Aadhar/PAN Card of the Owner",
      "Lab Photo(Exterior + Lab tables)",
    ],
    ambulance: [
      "Vehicle RC",
      "Driver License",
      "Ambulance Photo",
      "Aadhaar of Owner",
    ],
  };

  const handleProfileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfileFile(file);
    setProfilePreview(URL.createObjectURL(file));
    setErrors((prev) => ({ ...prev, profileImage: "" }));

    await handleUploadProfile(file); // auto upload after select
  };

  const handleUploadProfile = async (file) => {
    if (!file) return;
    setUploadingProfile(true);
    try {
      const formDataData = new FormData();
      formDataData.append("file", file);
      const response = await postRequest({
        url: `upload/uploadImage`,
        cred: formDataData,
      });
      const uploadedUrl = response?.data?.data?.imageUrl;
      setFormData((prev) => ({ ...prev, profileImage: uploadedUrl }));
      // Clear error if previously set
      console.log("Profile uploaded:", uploadedUrl);
    } catch (err) {
      console.error("Error uploading profile image:", err);
    } finally {
      setUploadingProfile(false);
    }
  };

  const handleImagesSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Append instead of replace
    setImagesFiles((prev) => [...prev, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagesPreview((prev) => [...prev, ...previews]);

    // Clear error if previously set
    setErrors((prev) => ({ ...prev, profileImages: "" }));

    // Upload newly selected files only
    await handleUploadImages(files);

    // Reset file input so the same file can be uploaded again if needed
    e.target.value = "";
  };

  const handleUploadImages = async (files) => {
    setUploadingImages(true);
    try {
      const uploadedUrls = [];
      for (const file of files) {
        const formDataData = new FormData();
        formDataData.append("file", file);
        const response = await postRequest({
          url: `upload/uploadImage`,
          cred: formDataData,
        });
        uploadedUrls.push(response?.data?.data?.imageUrl);
      }

      setFormData((prev) => ({
        ...prev,
        profileImages: [...(prev.profileImages || []), ...uploadedUrls],
      }));

      console.log("Images uploaded:", uploadedUrls);
    } catch (err) {
      console.error("Error uploading images:", err);
    } finally {
      setUploadingImages(false);
    }
  };

  // Remove a gallery image
  const handleRemoveImage = (index) => {
    setImagesPreview((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      profileImages: prev.profileImages?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleInputChange = (field, value) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);

    // validate this field
    const errorMsg = validateField(field, value);

    setErrors((prev) => {
      const newErrors = { ...prev };
      if (errorMsg) {
        newErrors[field] = errorMsg; // keep error if invalid
      } else {
        delete newErrors[field]; // clear error if valid
      }
      return newErrors;
    });

    // re-check completeness
    const requiredFields = getRequiredFields(selectedCard);
    const isComplete = requiredFields.every((f) => {
      const val = newFormData[f];
      if (Array.isArray(val)) {
        return (
          val.length > 0 &&
          val.every((obj) =>
            Object.values(obj).every((v) => v && v.toString().trim() !== "")
          )
        );
      }
      if (typeof val === "object" && val !== null) {
        return Object.values(val).every((v) => v && v.toString().trim() !== "");
      }
      return val && val.toString().trim() !== "" && !validateField(f, val);
    });
    setIsFormComplete(isComplete);
  };

  // utils/getRequiredFields.js

  const getRequiredFields = (type) => {
    switch (type) {
      case "doctor":
        return [
          "name",
          "email",
          "phone",
          "gender",
          "dob",
          "category",
          "clinics", // must have at least 1
          "about",
          "experience",
          "education",
          "profileImage", // ✅ added
          "profileImages", // ✅ added
          "documents",
        ];

      case "hospital":
        return [
          "name",
          "email",
          "phone",
          "address",
          "description",
          "location",
          "categories",
          "healthCard",
          "facilities",
          "profileImage", // ✅ added
          "profileImages", // ✅ added
          "documents",
        ];

      case "pharmacy":
        return [
          "name",
          "email",
          "phone",
          "address",
          "description",
          "cod",
          "onlinePayment",
          "services",
          "storeTiming",
          "ownerName", // ✅ add
          "gstNumber", // ✅ add
          "phoneNumber", // ✅ add
          "profileImage", // ✅ added
          "profileImages", // ✅ added
          "documents",
        ];

      case "ambulance":
        return [
          "name",
          "email",
          "phone",
          "address",
          "description",
          "operatingHours",
          "ambulanceType",
          "ambulanceNumber",
          "availabilityStatus",
          "emergencyContact",
          "price",
          "capacity",
          "drivers", // must have at least 1
          "profileImage", // ✅ added
          "profileImages", // ✅ added
          "documents",
        ];
      case "diagnostic":
        return [
          "name",
          "email",
          "phone",
          "address",
          "description",
          "startTime",
          "endTime",
          "packages",
          "services",
          "profileImage", // ✅ added
          "profileImages", // ✅ added
          "documents",
        ];

      default:
        return [];
    }
  };

  const validateField = (field, value) => {
    let error = "";

    if (!value || (typeof value === "string" && !value.trim())) {
      return `${field} is required`;
    } else {
      if (field === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          error = "Invalid email format";
        }
      }
      if (field === "phone") {
        const phoneRegex = /^[0-9]{10}$/; // 10 digits only
        if (!phoneRegex.test(value)) {
          error = "Invalid phone number";
        }
      }
      if (field === "dob") {
        const dobDate = new Date(value);
        const today = new Date();
        if (dobDate > today) {
          errors.dob = "Date of Birth cannot be in the future.";
        } else {
          const ageDiff = today.getFullYear() - dobDate.getFullYear();
          const monthDiff = today.getMonth() - dobDate.getMonth();
          const dayDiff = today.getDate() - dobDate.getDate();
          const isUnder18 =
            ageDiff < 18 ||
            (ageDiff === 18 &&
              (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)));

          if (isUnder18) {
            errors.dob = "You must be at least 18 years old.";
          }
        }
      }
    }

    return error;
  };

  const clearError = (field) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const renderInput = (label, type, field, placeholder, rows) => (
    <div className="space-y-1 relative">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {type === "textarea" && field !== "address" ? (
        <textarea
          placeholder={placeholder}
          rows={rows || 3}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
          onChange={(e) => handleInputChange(field, e.target.value)}
        />
      ) : field === "address" ? (
        <LocationSearchInput
          value={formData[field] || ""}
          onSelect={(locData) => {
            // locData contains address, latitude, longitude, location
            setFormData((prev) => ({
              ...prev,
              address: locData.address,
              latitude: locData.latitude,
              longitude: locData.longitude,
              location: locData.location,
            }));

            clearError("address");

            // Check if form is complete
            const requiredFields = getRequiredFields(selectedCard);
            const isComplete = requiredFields.every(
              (f) => formData[f] && formData[f].trim() !== ""
            );
            setIsFormComplete(isComplete);
          }}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
          onChange={(e) => {
            // If phone, allow only digits and max 10 characters
            if (type === "tel") {
              e.target.value = e.target.value.replace(/\D/g, ""); // keep only numbers
              if (e.target.value.length > 10)
                e.target.value = e.target.value.slice(0, 10);
            }
            if (field === "yearOfEstablish") {
              e.target.value = e.target.value.replace(/\D/g, "");
            }
            if (field === "experience") {
              e.target.value = e.target.value.replace(/\D/g, ""); // numbers only
              if (e.target.value.length > 2)
                e.target.value = e.target.value.slice(0, 2);
            }
            handleInputChange(field, e.target.value);
          }}
          maxLength={
            type === "tel" || type === "tel"
              ? 10
              : field === "yearOfEstablish"
              ? 4
              : field === "experience"
              ? 4
              : undefined
          }
          max={
            field === "dob" ? new Date().toISOString().split("T")[0] : undefined
          }
        />
      )}
      {errors[field] && (
        <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
      )}
    </div>
  );

  const renderForm = () => {
    switch (selectedCard) {
      case "ambulance":
        return (
          <AmbulanceRegistrationForm
            renderInput={renderInput}
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            clearError={clearError}
          />
        );
      case "hospital":
        return (
          <HospitalRegistrationForm
            renderInput={renderInput}
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            clearError={clearError}
          />
        );
      case "doctor":
        return (
          <DoctorRegistrationForm
            renderInput={renderInput}
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            clearError={clearError}
          />
        );
      case "diagnostic":
        return (
          <DiagnosticsRegistrationForms
            renderInput={renderInput}
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            clearError={clearError}
          />
        );
      case "pharmacy":
        return (
          <PharmacyRegistrationForms
            renderInput={renderInput}
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            clearError={clearError}
          />
        );
      default:
        return null;
    }
  };

  if (!isModalOpen) return null;

  const validateForm = () => {
    const requiredFields = getRequiredFields(selectedCard);
    let newErrors = {};
    let isValid = true;

    // 1. Check required fields with validateField
    requiredFields.forEach((field) => {
      const errorMsg = validateField(field, formData[field]);
      if (errorMsg) {
        newErrors[field] = errorMsg;
        isValid = false;
      }
    });

    if (formData.documents?.length > 0) {
      formData.documents.forEach((doc, index) => {
        if (!doc.name?.trim()) {
          newErrors[`documentName_${index}`] = "Document name is required";
          isValid = false;
        }
        if (!doc.number?.trim()) {
          newErrors[`documentNumber_${index}`] = "Document number is required";
          isValid = false;
        }
        if (!doc.image?.trim()) {
          newErrors[`documentImage_${index}`] = "Document file is required";
          isValid = false;
        }
      });
    } else {
      newErrors.documents = "Minimum one document is required"; // ✅ fixed
      isValid = false;
    }

    if (formData?.profileImages?.length === 0) {
      newErrors.profileImages = "Uploade at least one gallery Images";
      isValid = false;
    }

    // 2. Schema-specific deep validation
    switch (selectedCard) {
      case "doctor":
        if (!formData.clinics || formData.clinics.length === 0) {
          newErrors.clinics = "At least one clinic is required";
          isValid = false;
        } else {
          formData.clinics.forEach((clinic, index) => {
            if (!clinic.clinicName?.trim()) {
              newErrors[`clinicName_${index}`] = "Clinic name is required";
              isValid = false;
            }
            if (!clinic.clinicAddress?.trim()) {
              newErrors[`clinicAddress_${index}`] =
                "Clinic address is required";
              isValid = false;
            }
            if (!clinic.consultationFee?.toString().trim()) {
              newErrors[`consultationFee_${index}`] =
                "Consultation fee is required";
              isValid = false;
            }
            if (!clinic.startTime?.trim()) {
              newErrors[`startTime_${index}`] = "Start time is required";
              isValid = false;
            }
            if (!clinic.endTime?.trim()) {
              newErrors[`endTime_${index}`] = "End time is required";
              isValid = false;
            }
            if (!clinic.duration?.trim()) {
              newErrors[`duration_${index}`] = "Duration is required";
              isValid = false;
            }

            // Optional: if video consultation is enabled, validate those too
            if (clinic.videoAvailability) {
              if (!clinic.videoStartTime?.trim()) {
                newErrors[`videoStartTime_${index}`] =
                  "Video start time is required";
                isValid = false;
              }
              if (!clinic.videoEndTime?.trim()) {
                newErrors[`videoEndTime_${index}`] =
                  "Video end time is required";
                isValid = false;
              }
              if (!clinic.videoDuration?.trim()) {
                newErrors[`videoDuration_${index}`] =
                  "Video duration is required";
                isValid = false;
              }
            }
          });
        }
        break;

      case "hospital":
        if (!formData.categories || formData.categories.length === 0) {
          newErrors.categories = "At least one department/category is required";
          isValid = false;
        }

        if (!formData.ownerName?.trim()) {
          newErrors.ownerName = "Owner name is required";
          isValid = false;
        }

        if (!formData.gstNumber?.trim()) {
          newErrors.gstNumber = "GST number is required";
          isValid = false;
        }

        if (!formData.phoneNumber?.trim()) {
          newErrors.phoneNumber = "Verification phone is required";
          isValid = false;
        } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
          newErrors.phoneNumber = "Verification phone must be 10 digits";
          isValid = false;
        }

        if (!formData.facilities || formData.facilities.length === 0) {
          newErrors.facilities = "At least one facility is required";
          isValid = false;
        } else {
          formData.facilities.forEach((facility, index) => {
            if (!facility.name?.trim()) {
              newErrors[`facilityName_${index}`] = "Facility name is required";
              isValid = false;
            }
            if (!facility.discription?.trim()) {
              newErrors[`facilityDescription_${index}`] =
                "Facility description is required";
              isValid = false;
            }
          });
        }

        break;

      case "ambulance":
        if (!formData.drivers || formData.drivers.length === 0) {
          newErrors.drivers = "At least one driver is required";
          isValid = false;
        }
        break;

      case "diagnostic":
        // services
        if (!formData.services || formData.services.length === 0) {
          newErrors.services = [{ name: "At least one service is required" }];
          isValid = false;
        } else {
          newErrors.services = formData.services.map((s) => {
            let err = {};
            if (!s.name?.trim()) {
              err.name = "Service name is required";
              isValid = false;
            }
            return err;
          });
        }

        // packages
        if (!formData.packages || formData.packages.length === 0) {
          newErrors.packages = [
            {
              name: "Package name is required",
              price: "Valid price is required",
              details: "Details are required",
            },
          ];
          isValid = false;
        } else {
          newErrors.packages = formData.packages.map((p) => {
            let err = {};
            if (!p.name?.trim()) {
              err.name = "Package name is required";
              isValid = false;
            }
            if (!p.price || isNaN(p.price) || Number(p.price) <= 0) {
              err.price = "Valid price is required";
              isValid = false;
            }
            if (!p.details?.trim()) {
              err.details = "Details are required";
              isValid = false;
            }
            return err;
          });
        }
        break;

        // services
        if (!formData.services || formData.services.length === 0) {
          newErrors.services = "At least one service is required";
          isValid = false;
        } else {
          newErrors.services = formData.services.map((s, i) => {
            let err = {};
            if (!s.name || s.name.trim() === "") {
              err.name = "Service name is required";
              isValid = false;
            }
            return err;
          });
        }

        // packages
        if (!formData.packages || formData.packages.length === 0) {
          newErrors.packages = "At least one package is required";
          isValid = false;
        } else {
          newErrors.packages = formData.packages.map((p, i) => {
            let err = {};
            if (!p.name || p.name.trim() === "") {
              err.name = "Package name is required";
              isValid = false;
            }
            if (!p.price || isNaN(p.price) || Number(p.price) <= 0) {
              err.price = "Valid price is required";
              isValid = false;
            }
            if (!p.details || p.details.trim() === "") {
              err.details = "Details are required";
              isValid = false;
            }
            return err;
          });
        }
        break;

      case "pharmacy":
        // Owner name
        if (!formData.ownerName?.trim()) {
          newErrors.ownerName = "Owner name is required";
          isValid = false;
        }

        // GST number
        if (!formData.gstNumber?.trim()) {
          newErrors.gstNumber = "GST number is required";
          isValid = false;
        }

        // Verification phone
        if (!formData.phoneNumber?.trim()) {
          newErrors.phoneNumber = "Verification phone is required";
          isValid = false;
        } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
          newErrors.phoneNumber = "Verification phone must be 10 digits";
          isValid = false;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    setIsFormComplete(isValid);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validate before building payload
    const isValid = validateForm();
    if (!isValid) {
      toast.error("Please fill out all the highlighted fields");
      return;
    }
    setSubmitting(true);
    try {
      let payload = {};

      switch (selectedCard) {
        case "doctor":
          payload = {
            schemaType: "Doctor",
            phone: formData?.phone || null,
            fullName: formData?.name || null,
            gender: formData?.gender || null,
            dob: formData?.dob || null,
            email: formData?.email || null,
            profilepic: formData?.profileImage || null,
            experience: formData?.experience || null,
            serviceType: formData?.serviceType || null,
            about: formData?.about || null,
            education: formData?.education || null,
            category: formData?.category || null,
            hospital: formData?.hospital || null,
            profileImages: formData?.profileImages || [], // ✅ unified gallery
            documents: formData?.documents || [],
            clinics: formData?.clinics || [],
            animalTreated: formData?.animalTreated || [],
            onlineBooking: formData?.onlineBooking,
            isSurgeon: formData?.isSurgeon,
            latitude: formData?.clinics[0]?.location?.coordinates[0],
            longitude: formData?.clinics[0]?.location?.coordinates[1],
          };
          break;

        case "hospital":
          payload = {
            schemaType: "Hospital",
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            latitude: formData.latitude,
            longitude: formData.longitude,
            address: formData.address,
            profileImage: formData.profileImage,
            description: formData.description,
            doctors: formData.doctors || [],
            categories: formData.categories || [],
            healthCard: formData.healthCard || [],
            facilities: [{ name: "", discription: "" }],
            ownerDetails: formData.ownerDetails || {},
            profileImages: formData.profileImages || [],
            documents: formData?.documents || [],
            yearOfEstablish: formData?.yearOfEstablish || "",
            registrationNo: formData?.registrationNo || "",
          };
          break;

        case "ambulance":
          payload = {
            schemaType: "Ambulance",
            name: formData?.name,
            email: formData?.email,
            phone: formData?.phone,
            address: formData?.address || "1090 chauraha",
            latitude: formData?.latitude || "26.8469242",
            longitude: formData?.longitude || "80.9659187",
            description: formData?.description,
            operatingHours: formData?.operatingHours,
            ambulanceType: formData?.ambulanceType,
            ambulanceNumber: formData?.ambulanceNumber,
            capacity: formData?.capacity,
            price: formData?.price,
            emergencyContact: formData?.emergencyContact,
            availabilityStatus: formData?.availabilityStatus,
            profilepic: formData?.profileImage,
            profileImages: formData?.profileImages || [],
            drivers: formData?.drivers || [],
            ownerDetails: formData?.ownerDetails || [],
            documents: formData?.documents || [],
            gpsTraking: formData?.gpsTraking || false,
          };
          break;

        case "diagnostic":
          payload = {
            schemaType: "Diagnostic",
            name: formData?.name, // ✅ not centerName
            email: formData?.email,
            phone: formData?.phone,
            latitude: formData?.latitude,
            longitude: formData?.longitude,
            address: formData?.address,
            description: formData?.description,
            services: formData?.services || [],
            packages: formData?.packages || [],
            storeTiming: formData?.storeTiming,
            startTime: formData?.startTime,
            endTime: formData?.endTime,
            profileImage: formData?.profileImage,
            profileImages: formData?.profileImages || [], // ✅ not images
            documents: formData?.documents || [],
            isBloodBank: formData?.isBloodBank,
            homeCollection: formData?.homeCollection,
          };
          break;

        case "pharmacy":
          payload = {
            schemaType: "Pharmacy",
            name: formData?.name, // ✅ not pharmacyName
            email: formData?.email,
            phone: formData?.phone,
            latitude: formData?.latitude,
            longitude: formData?.longitude,
            address: formData?.address,
            storeTiming: formData?.storeTiming,
            services: formData?.services || [], // ✅ synced from form state
            ownerDetails: {
              ownerName: formData?.ownerName,
              gstNumber: formData?.gstNumber,
              phoneNumber: formData?.phoneNumber,
            },
            profileImage: formData?.profileImage,
            profileImages: formData?.profileImages || [], // ✅ consistent
            onlinePayment: formData?.onlinePayment === "true", // ✅ from form
            cod: formData?.cod === "true", // ✅ from form
            documents: formData?.documents || [],
          };
          break;

        default:
          break;
      }
      console.log("Payload prelaunch", payload);

      // Send API request
      const response = await postRequest({
        url: "preLaunch",
        cred: payload,
      });
      console.log(response);

      if (response?.data?.success) {
        console.log("response", response?.data?.data?.token);

        toast.success(
          response?.data?.message || "Ambulance registered successfully!"
        );
        setCookieItem("Token", response?.data?.data?.token, 30);
        setCookieItem("UserId", response?.data?.data?.savedEntity?.userId, 30);
        setCookieItem("loginTime", new Date().toISOString(), 30);
        onSuccess();
        setIsModalOpen(false);
      } else {
        toast.error(
          response?.data?.message || "Failed to submit registration."
        );
      }
    } catch (error) {
      console.error("Error submitting registration:", error);
      const apiMessage =
        error?.response?.data?.data?.message ||
        error?.message ||
        "Something went wrong!";
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong!"
      );
    } finally {
      setSubmitting(false);
    }
  }; //8707767805

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#007BBD] to-[#005A8C] p-6 rounded-t-2xl text-center">
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute top-3 right-3 bg-white/30 hover:bg-white/50 text-white rounded-full p-2 shadow-md transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Logo */}
          <img src={logo} alt="Logo" className="h-14 mx-auto mb-3" />

          {/* Title */}
          <h2 className="text-xl md:text-3xl font-bold text-white">
            Registration for Pre-Launch
          </h2>

          {/* Subtitle */}
          <p className="text-indigo-100 mt-2 text-sm md:text-base">
            Join our healthcare network early and get exclusive benefits
          </p>
        </div>

        {/* Content */}
        <div className="py-6 px-8">
          {!selectedCard ? (
            <>
              <h3 className="text-lg md:text-2xl font-semibold text-gray-800 mb-6 text-center">
                Choose Your Registration Type
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cardTypes.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => {
                      setSelectedCard(card.id);
                      // reset profile + gallery images
                      setProfilePreview(null);
                      setProfileFile(null);
                      setImagesPreview([]);
                      setImagesFiles([]);
                      setFormData((prev) => ({
                        ...prev,
                        profileImage: null,
                        profileImages: [],
                      }));
                    }}
                    className={`bg-gradient-to-br ${card.gradient} p-6 rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl text-white`}
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="bg-[#007abb] bg-opacity-20 p-4 rounded-full shadow-md">
                        {card.icon}
                      </div>
                      <h4 className="text-lg font-semibold">{card.title}</h4>
                      <p className="text-sm opacity-90">{card.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div>
              <button
                onClick={() => {
                  setSelectedCard("");
                  setFormData({});
                  setErrors({});
                  setProfilePreview(null);
                  setProfileFile(null);
                  setImagesPreview([]);
                  setImagesFiles([]);
                }}
                className="text-[#005b8e] hover:text-indigo-800 font-medium mb-6 flex items-center gap-2"
              >
                <img
                  width="28"
                  height="28"
                  src="https://img.icons8.com/fluency/48/circled-left-2--v1.png"
                  alt="Back"
                />
                Back to selection
              </button>

              <form onSubmit={handleSubmit} className="space-y-5">
                {renderForm()}
                {/* Profile + Gallery Upload in Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Profile Image Upload */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Profile Image
                    </label>

                    <label
                      htmlFor="profile-upload"
                      className="cursor-pointer inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#007BBD] to-[#005A8C] text-white text-sm font-medium rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M16.88 9.94A1.5 1.5 0 0015.5 9h-2.793l1.147-1.146a.5.5 0 10-.708-.708L12 8.293V5.5a.5.5 0 00-1 0v2.793L9.854 7.146a.5.5 0 00-.708.708L10.293 9H7.5a1.5 1.5 0 000 3h8a1.5 1.5 0 001.38-2.06z" />
                      </svg>
                      Upload Profile Image
                    </label>
                    <input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleProfileSelect}
                      className="hidden"
                    />

                    {errors.profileImage && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.profileImage}
                      </p>
                    )}

                    {profilePreview && (
                      <div className="mt-2 relative w-20 h-20">
                        <img
                          src={profilePreview}
                          alt="Profile Preview"
                          className="w-20 h-20 object-cover rounded-md border border-gray-300"
                        />
                        {uploadingProfile && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-md">
                            <span className="loader border-t-2 border-indigo-600 w-6 h-6 rounded-full animate-spin"></span>
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setProfilePreview(null);
                            setProfileFile(null);
                            setFormData((prev) => ({
                              ...prev,
                              profileImage: null,
                            }));
                          }}
                          className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Gallery Images Upload */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Gallery Images
                    </label>

                    <label
                      htmlFor="gallery-upload"
                      className="cursor-pointer inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Upload Gallery Images
                    </label>
                    <input
                      id="gallery-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImagesSelect}
                      className="hidden"
                    />

                    {errors.profileImages && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.profileImages}
                      </p>
                    )}

                    {imagesPreview.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {imagesPreview.map((src, idx) => (
                          <div key={idx} className="relative w-20 h-20">
                            <img
                              src={src}
                              alt={`preview-${idx}`}
                              className="w-20 h-20 object-cover rounded-md border border-gray-300 shadow"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                        {uploadingImages && (
                          <div className="flex items-center justify-center w-20 h-20 border rounded-md shadow">
                            <span className="loader border-t-2 border-indigo-600 w-6 h-6 rounded-full animate-spin"></span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <DocumentsUpload
                  formData={formData}
                  setFormData={setFormData}
                  documentOptions={documentsOptionsMap[selectedCard] || []}
                  errors={errors}
                  clearError={clearError}
                />
                {errors?.documents && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.documents}
                  </p>
                )}

                <div className="mt-6 flex justify-center">
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
                      submitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-[#007BBD] to-[#005A8C] hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <span className="loader border-t-2 border-white w-5 h-5 rounded-full animate-spin"></span>
                        Submitting...
                      </span>
                    ) : (
                      "Complete Registration"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-4 rounded-b-2xl text-center text-sm text-gray-600">
          Registration is required to access our platform. All information is
          secure and confidential.
        </div>
      </div>
    </div>
  );
};

export default HealthcareRegistrationModal;
