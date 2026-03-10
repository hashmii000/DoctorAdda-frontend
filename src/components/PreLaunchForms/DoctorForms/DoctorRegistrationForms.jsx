import React, { useEffect, useState } from "react";
import { Plus, MapPin, User } from "lucide-react";
import LocationSearchInput from "../../LocationSearchInput";
import { getRequest } from "../../../Helpers";
import { useSelector } from "react-redux";
import { Select } from "antd";

const DoctorRegistrationForm = ({
  renderInput,
  formData,
  setFormData,
  errors = {},
  clearError,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [category, setCategory] = useState([]);
  const [hospital, setHospital] = useState([]);
  // const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [docIndex, setDocIndex] = useState(0);
  const [selectedHospital, setSelectedHospital] = useState("");
  const { userProfileData, isLoggedIn } = useSelector((state) => state.user);
  const userId = userProfileData?._id;

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

    console.log("Doctor formdata", formData);
    if (value) clearError(name);
  };

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

  useEffect(() => {
    if (!formData.clinics || formData.clinics.length === 0) {
      setFormData((prev) => ({
        ...prev,
        clinics: [
          {
            clinicName: "",
            clinicAddress: "",
            consultationFee: "",
            startTime: "",
            endTime: "",
            duration: "",
            videoStartTime: "",
            videoEndTime: "",
            videoDuration: "",
            location: { type: "Point", coordinates: [0, 0] },
          },
        ],
      }));
    }
  }, [formData.clinics, setFormData]);

  return (
    <>
      <h3 className="text-xl font-semibold text-[#005b8e] mb-4">
        Doctor Registration
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        {renderInput("Full Name", "text", "name", "Enter full name")}
        {renderInput("Email", "email", "email", "Enter email address")}
        {renderInput("Phone", "tel", "phone", "Enter phone number")}

        {/* DOB */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Birth Date
          </label>
          <input
            type="date"
            name="dob"
            value={formData?.dob}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500"
          />
          {errors?.dob && <p className="text-red-500 text-xs">{errors?.dob}</p>}
        </div>
        {/* Gender */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <User className="w-4 h-4 text-red-600" /> Gender
          </label>
          <select
            value={formData?.gender}
            name="gender"
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500"
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
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Select Hospital
          </label>
          <select
            name="hospital"
            value={formData.hospital || ""}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Hospital</option>
            {hospitalOption}
            <option value="Other">Other</option>
          </select>
        </div>

        {renderInput(
          "Medical Qualification",
          "text",
          "education",
          "Enter qualification"
        )}
        {renderInput(
          "Years of Experience",
          "number",
          "experience",
          "Enter experience"
        )}

        {/* Category */}
        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Select Your Specialization
          </label>
          <select
            name="category"
            value={formData?.category || ""} // 👈 ensures default empty
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select Your Specialization
            </option>
            {category.map((item, idx) => (
              <option key={idx} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
          {errors?.category && (
            <p className="text-red-500 text-xs">{errors?.category}</p>
          )}
        </div>

        {/* Service type */}
        {/* Service type */}
        <div className="col-md-6 space-y-2">
          <label className="form-label">Service Type</label>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            defaultValue={[]}
            onChange={(value) => {
              if (categoryName === "Veterinary") {
                selectData1(value);
                if (value.length > 0) clearError("veterinaryserviceType"); // ✅ clear error
              } else {
                selectData2(value);
                if (value.length > 0) clearError("serviceType"); // ✅ clear error
              }
            }}
            options={
              categoryName === "Veterinary"
                ? veterinaryserviceType
                : serviceType
            }
            size="large"
            value={
              categoryName === "Veterinary"
                ? formData?.veterinaryserviceType
                : formData?.serviceType
            }
          />
          {categoryName === "Veterinary"
            ? errors?.veterinaryserviceType && (
                <p className="text-red-500 text-xs">
                  {errors?.veterinaryserviceType}
                </p>
              )
            : errors?.serviceType && (
                <p className="text-red-500 text-xs">{errors?.serviceType}</p>
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
              style={{ width: "100%" }}
              placeholder="Select Services"
              defaultValue={[]}
              onChange={(value) => {
                selectData(value);
                if (value.length > 0) clearError("veterinaryDoctorType"); // ✅ clear error
              }}
              size="large"
              options={serviceProvideOption}
              value={formData?.veterinaryDoctorType}
            />
            {errors?.veterinaryDoctorType && (
              <p className="text-red-500 text-xs">
                {errors?.veterinaryDoctorType}
              </p>
            )}
          </div>
        ) : (
          ""
        )}

        {/* Animals Treated - Only for Veterinary */}
        {/* {categoryName === "Veterinary" && ( */}
        {/* Animals Treated - Only for Veterinary */}
        {categoryName === "Veterinary" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Animals Treated
            </label>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Select animals"
              value={formData.animalTreated || []}
              onChange={(values) =>
                setFormData((prev) => ({
                  ...prev,
                  animalTreated: values,
                }))
              }
              size="large"
            >
              <Option value="Dog">Dog</Option>
              <Option value="Cat">Cat</Option>
              <Option value="Bird">Bird</Option>
              <Option value="Rabbit">Rabbit</Option>
              <Option value="Horse">Horse</Option>
              <Option value="Cow">Cow</Option>
              <Option value="Goat">Goat</Option>
              <Option value="Sheep">Sheep</Option>
              <Option value="Other">Other</Option>
            </Select>

            {/* Show second dropdown if "Other" is selected */}
            {formData.animalTreated?.includes("Other") && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Other Animal
                </label>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Left Column - Dropdown */}
                  <div>
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Select other animal"
                      value={formData.otherAnimal || undefined}
                      onChange={(value) => {
                        setFormData((prev) => {
                          let updatedAnimals = [...(prev.animalTreated || [])];

                          // remove any previously selected otherAnimal/customAnimal before adding new one
                          updatedAnimals = updatedAnimals.filter(
                            (a) =>
                              ![
                                "Elephant",
                                "Camel",
                                "Donkey",
                                "Pig",
                                prev.customAnimal,
                              ].includes(a)
                          );

                          if (value && value !== "OtherCustom") {
                            updatedAnimals.push(value);
                          }

                          return {
                            ...prev,
                            otherAnimal: value,
                            animalTreated: updatedAnimals,
                          };
                        });
                      }}
                      size="large"
                    >
                      <Option value="Elephant">Elephant</Option>
                      <Option value="Camel">Camel</Option>
                      <Option value="Donkey">Donkey</Option>
                      <Option value="Pig">Pig</Option>
                      <Option value="OtherCustom">Other (Custom)</Option>
                    </Select>
                  </div>

                  {/* Right Column - Textbox */}
                  <div>
                    {formData.otherAnimal === "OtherCustom" ? (
                      <input
                        type="text"
                        name="customAnimal"
                        value={formData.customAnimal || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => {
                            let updatedAnimals = [
                              ...(prev.animalTreated || []),
                            ];

                            // remove old custom animal before adding new one
                            updatedAnimals = updatedAnimals.filter(
                              (a) => a !== prev.customAnimal
                            );

                            if (val.trim()) {
                              updatedAnimals.push(val.trim());
                            }

                            return {
                              ...prev,
                              customAnimal: val,
                              animalTreated: updatedAnimals,
                            };
                          });
                        }}
                        placeholder="Please specify"
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 focus:outline-none"
                      />
                    ) : (
                      <div className="h-10" /> // keeps space
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {renderInput(
        "About",
        "textarea",
        "about",
        "Enter description for yourself"
      )}

      {/* Clinics */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Clinics</h3>
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                clinics: [
                  ...(prev.clinics || []),
                  {
                    clinicName: "",
                    clinicAddress: "",
                    consultationFee: "",
                    startTime: "",
                    endTime: "",
                    duration: "",
                    videoStartTime: "",
                    videoEndTime: "",
                    videoDuration: "",
                    location: { type: "Point", coordinates: [0, 0] },
                  },
                ],
              }))
            }
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#007BBD] to-[#005A8C] text-white rounded-lg hover:from-blue-700 hover:to-green-700"
          >
            <Plus className="w-4 h-4" />
            Add Clinics
          </button>
        </div>

        {errors?.clinics && (
          <p className="text-red-500 text-xs">{errors?.clinics}</p>
        )}

        <div className="space-y-3">
          {formData?.clinics?.map((clinic, index) => (
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
              {/* Clinic Name + Fee */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Clinic Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Clinic Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Clinic Name"
                    value={clinic?.clinicName}
                    onChange={(e) => {
                      const newClinics = [...formData.clinics];
                      newClinics[index].clinicName = e.target.value;
                      setFormData({ ...formData, clinics: newClinics });

                      if (e.target.value.trim())
                        clearError(`clinicName_${index}`);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  {errors[`clinicName_${index}`] && (
                    <p className="text-red-500 text-xs">
                      {errors[`clinicName_${index}`]}
                    </p>
                  )}
                </div>

                {/* Consultation Fee */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Consultation Fee
                  </label>
                  <input
                    type="number"
                    placeholder="₹ Fee"
                    value={clinic?.consultationFee}
                    onChange={(e) => {
                      const newClinics = [...formData.clinics];
                      newClinics[index].consultationFee = e.target.value;
                      setFormData({ ...formData, clinics: newClinics });
                      if (e.target.value.trim())
                        clearError(`consultationFee_${index}`);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                  {errors[`consultationFee_${index}`] && (
                    <p className="text-red-500 text-xs">
                      {errors[`consultationFee_${index}`]}
                    </p>
                  )}
                </div>
              </div>

              {/* Clinic Availability */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Clinic Availability
                </label>
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Start Time */}
                  <div className="space-y-2">
                    <input
                      type="time"
                      value={clinic?.startTime}
                      onChange={(e) => {
                        const newClinics = [...formData.clinics];
                        newClinics[index].startTime = e.target.value;
                        setFormData({ ...formData, clinics: newClinics });
                        if (e.target.value) clearError(`startTime_${index}`);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500"
                    />
                    {errors[`startTime_${index}`] && (
                      <p className="text-red-500 text-xs">
                        {errors[`startTime_${index}`]}
                      </p>
                    )}
                  </div>

                  {/* End Time */}
                  <div className="space-y-2">
                    <input
                      type="time"
                      value={clinic?.endTime}
                      onChange={(e) => {
                        const newClinics = [...formData.clinics];
                        newClinics[index].endTime = e.target.value;
                        setFormData({ ...formData, clinics: newClinics });
                        if (e.target.value) clearError(`endTime_${index}`);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500"
                    />
                    {errors[`endTime_${index}`] && (
                      <p className="text-red-500 text-xs">
                        {errors[`endTime_${index}`]}
                      </p>
                    )}
                  </div>

                  {/* Duration */}
                  <div className="space-y-2">
                    <select
                      value={clinic?.duration}
                      onChange={(e) => {
                        const newClinics = [...formData.clinics];
                        newClinics[index].duration = e.target.value;
                        setFormData({ ...formData, clinics: newClinics });
                        if (e.target.value) clearError(`duration_${index}`);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Duration Per Patient</option>
                      <option value="15">15 min</option>
                      <option value="30">30 min</option>
                      <option value="45">45 min</option>
                      <option value="60">60 min</option>
                      <option value="90">90 min</option>
                      <option value="120">120 min</option>
                    </select>
                    {errors[`duration_${index}`] && (
                      <p className="text-red-500 text-xs">
                        {errors[`duration_${index}`]}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Video Consulting */}
              {formData?.serviceType?.includes("Video Consultation") && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Video Consulting Availability
                  </label>
                  <div className="grid md:grid-cols-3 gap-4">
                    {/* Video Start */}
                    <div className="space-y-2">
                      <input
                        type="time"
                        value={clinic?.videoStartTime}
                        onChange={(e) => {
                          const newClinics = [...formData.clinics];
                          newClinics[index].videoStartTime = e.target.value;
                          setFormData({ ...formData, clinics: newClinics });
                          if (e.target.value)
                            clearError(`videoStartTime_${index}`);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                      {errors[`videoStartTime_${index}`] && (
                        <p className="text-red-500 text-xs">
                          {errors[`videoStartTime_${index}`]}
                        </p>
                      )}
                    </div>

                    {/* Video End */}
                    <div className="space-y-2">
                      <input
                        type="time"
                        value={clinic?.videoEndTime}
                        onChange={(e) => {
                          const newClinics = [...formData.clinics];
                          newClinics[index].videoEndTime = e.target.value;
                          setFormData({ ...formData, clinics: newClinics });
                          if (e.target.value)
                            clearError(`videoEndTime_${index}`);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      {errors[`videoEndTime_${index}`] && (
                        <p className="text-red-500 text-xs">
                          {errors[`videoEndTime_${index}`]}
                        </p>
                      )}
                    </div>

                    {/* Video Duration */}
                    <div className="space-y-2">
                      <select
                        value={clinic?.videoDuration}
                        onChange={(e) => {
                          const newClinics = [...formData.clinics];
                          newClinics[index].videoDuration = e.target.value;
                          setFormData({ ...formData, clinics: newClinics });
                          if (e.target.value)
                            clearError(`videoDuration_${index}`);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="">Duration Per Patient</option>
                        <option value="15">15 min</option>
                        <option value="30">30 min</option>
                        <option value="45">45 min</option>
                        <option value="60">60 min</option>
                        <option value="90">90 min</option>
                        <option value="120">120 min</option>
                      </select>
                      {errors[`videoDuration_${index}`] && (
                        <p className="text-red-500 text-xs">
                          {errors[`videoDuration_${index}`]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Address */}
              <div className="grid md:grid-cols-1 gap-4">
                <div className="space-y-2 group">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <MapPin className="w-4 h-4 text-red-600" />
                    Search Address
                  </label>
                  <LocationSearchInput
                    value={clinic.clinicAddress}
                    onSelect={(place) => {
                      const updatedClinics = [...formData.clinics];
                      updatedClinics[index].clinicAddress = place.address;
                      updatedClinics[index].location = place.location;
                      setFormData({ ...formData, clinics: updatedClinics });
                      clearError(`clinicAddress_${index}`);
                    }}
                  />
                  {errors[`clinicAddress_${index}`] && (
                    <p className="text-red-500 text-xs">
                      {errors[`clinicAddress_${index}`]}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Is Surgeon */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Is Surgeon
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="isSurgeon"
                  value="true"
                  checked={formData.isSurgeon === true}
                  onChange={() =>
                    setFormData((prev) => ({ ...prev, isSurgeon: true }))
                  }
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="isSurgeon"
                  value="false"
                  checked={formData.isSurgeon === false}
                  onChange={() =>
                    setFormData((prev) => ({ ...prev, isSurgeon: false }))
                  }
                />
                No
              </label>
            </div>
          </div>

          {/* Online Booking */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Online Booking
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="onlineBooking"
                  value="true"
                  checked={formData.onlineBooking === true}
                  onChange={() =>
                    setFormData((prev) => ({ ...prev, onlineBooking: true }))
                  }
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="onlineBooking"
                  value="false"
                  checked={formData.onlineBooking === false}
                  onChange={() =>
                    setFormData((prev) => ({ ...prev, onlineBooking: false }))
                  }
                />
                No
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorRegistrationForm;
