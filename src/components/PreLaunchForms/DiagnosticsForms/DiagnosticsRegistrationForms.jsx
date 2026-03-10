/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Plus } from "lucide-react";

const DiagnosticsRegistrationForms = ({
  renderInput,
  formData,
  setFormData,
  errors = {},
  setErrors, // ✅ need setter for errors
  // clearError
}) => {
  const [packages, setPackages] = useState([
    { name: "", price: "", details: "" },
  ]);
  const [services, setservices] = useState([{ name: "" }]);

  // ------------------ Clear Error ------------------
  const clearError = (field, index, subField) => {
    if (!setErrors) return; // safeguard

    setErrors((prev) => {
      const updated = { ...prev };

      // Handle array-based fields like services[index].name
      if (Array.isArray(updated[field])) {
        const newArray = [...updated[field]];
        if (newArray[index]) {
          newArray[index] = { ...newArray[index], [subField]: "" };
        }
        updated[field] = newArray;
      } else {
        updated[field] = "";
      }

      return updated;
    });
  };

  // ------------------ Services ------------------
  const handleServicesChange = (index, field, value) => {
    const updated = [...services];
    updated[index][field] = value;
    setservices(updated);
    setFormData((prev) => ({ ...prev, services: updated }));

    clearError("services", index, field); // ✅ clear error
  };

  const addServices = () => {
    const updated = [...services, { name: "" }];
    setservices(updated);
    setFormData((prev) => ({ ...prev, services: updated }));
  };

  const removeServices = (index) => {
    if (services.length > 1) {
      const updated = services.filter((_, i) => i !== index);
      setservices(updated);
      setFormData((prev) => ({ ...prev, services: updated }));
    }
  };

  // ------------------ Packages ------------------
  const handlePackageChange = (index, field, value) => {
    const updated = [...packages];
    updated[index][field] = value;
    setPackages(updated);
    setFormData((prev) => ({ ...prev, packages: updated }));

    clearError("packages", index, field); // ✅ clear error
  };

  const addPackage = () => {
    const updated = [...packages, { name: "", price: "", details: "" }];
    setPackages(updated);
    setFormData((prev) => ({ ...prev, packages: updated }));
  };

  const removePackage = (index) => {
    if (packages.length > 1) {
      const updated = packages.filter((_, i) => i !== index);
      setPackages(updated);
      setFormData((prev) => ({ ...prev, packages: updated }));
    }
  };

  // ------------------ Input Change ------------------
  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearError(name); // ✅ clear field-level error
  };

  return (
    <>
      <h3 className="text-xl font-semibold text-[#005b8e] mb-4">
        Diagnostics Registration
      </h3>

      {/* 2 Column Grid Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Diagnostic Center Name */}
        {renderInput(
          "Diagnostic Center Name",
          "text",
          "name",
          "Enter diagnostic center name",
          handleInputChange, // pass with clearError
          errors.name
        )}

        {/* Email */}
        {renderInput(
          "Email",
          "email",
          "email",
          "Enter email address",
          handleInputChange,
          errors.email
        )}

        {/* Phone */}
        {renderInput(
          "Phone Number",
          "tel",
          "phone",
          "Phone Number",
          handleInputChange,
          errors.phone
        )}
      </div>

      {/* Blood Bank & Home Collection Checkboxes */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* Is Blood Bank */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="isBloodBank"
            checked={formData?.isBloodBank || false}
            onChange={(e) => {
              handleInputChange("isBloodBank", e.target.checked);
            }}
            className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:outline-none"
          />
          <label
            htmlFor="isBloodBank"
            className="text-sm font-medium text-gray-700"
          >
            Blood Bank Available
          </label>
        </div>

        {/* Home Collection */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="homeCollection"
            checked={formData?.homeCollection || false}
            onChange={(e) => {
              handleInputChange("homeCollection", e.target.checked);
            }}
            className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:outline-none"
          />
          <label
            htmlFor="homeCollection"
            className="text-sm font-medium text-gray-700"
          >
            Home Collection Service
          </label>
        </div>
      </div>
      {/* Description - 2 Column */}
      <div className="grid md:grid-cols gap-6">
        {renderInput(
          "Description",
          "textarea",
          "description",
          "Enter description",
          handleInputChange,
          errors.description
        )}
      </div>
      {/* Address - Full Width */}
      {renderInput("Address", "textarea", "address", "Enter full address")}

      {/* Services Section */}
      <div className="space-y-4 mt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">Services</h3>
          <button
            type="button"
            onClick={addServices}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#007BBD] to-[#005A8C] text-white rounded-lg hover:from-blue-700 hover:to-green-700"
          >
            <Plus className="w-4 h-4" />
            Add Services
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-2">
          {services.map((service, index) => (
            <div key={index} className="relative bg-gray-50 rounded-xl">
              {/* Input */}
              <input
                type="text"
                placeholder="Service name (e.g., ICU, X-Ray)"
                value={service?.name}
                onChange={(e) => {
                  handleServicesChange(index, "name", e.target.value);
                  if (e.target.value.trim())
                    clearError("services", index, "name"); // <-- FIX
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

              {/* Error message */}
              {errors.services?.[index]?.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.services[index].name}
                </p>
              )}

              {/* Remove button (top-right corner) */}
              {services.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeServices(index)}
                  className="absolute top-0 right-0 text-red-600 hover:text-red-800 text-lg "
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Packages Section */}
      <div className="space-y-4 mt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Packages</h3>
          <button
            type="button"
            onClick={addPackage}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#007BBD] to-[#005A8C] text-white rounded-lg hover:from-blue-700 hover:to-green-700"
          >
            <Plus className="w-4 h-4" />
            Add Package
          </button>
        </div>

        <div className="space-y-3">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="grid md:grid-cols-3 gap-4 bg-gray-50 rounded-xl"
            >
              {/* Name */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Package name"
                  value={pkg?.name}
                  onChange={(e) => {
                    handlePackageChange(index, "name", e.target.value);
                    if (e.target.value.trim())
                      clearError("packages", index, "name"); // <-- FIX
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {errors.packages?.[index]?.name && (
                  <p className="text-red-500 text-xs">
                    {errors.packages[index].name}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  placeholder="Price"
                  value={pkg?.price}
                  onChange={(e) => {
                    handlePackageChange(index, "price", e.target.value);
                    if (e.target.value.trim())
                      clearError("packages", index, "price");
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {errors.packages?.[index]?.price && (
                  <p className="text-red-500 text-xs">
                    {errors.packages[index].price}
                  </p>
                )}
              </div>

              {/* Details + Remove */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Details
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Details"
                    value={pkg?.details}
                    onChange={(e) => {
                      handlePackageChange(index, "details", e.target.value);
                      if (e.target.value.trim())
                        clearError("packages", index, "details");
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                {errors.packages?.[index]?.details && (
                  <p className="text-red-500 text-xs">
                    {errors.packages[index].details}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Store Timings */}
      <div className="space-y-2 mt-6">
        <label className="text-sm font-medium text-gray-700">
          Diagnostics Opening Hours
        </label>
        <div className="grid grid-cols-2 gap-6">
          {/* Start Time */}
          <div>
            <input
              type="time"
              value={formData?.startTime}
              onChange={(e) => {
                handleInputChange("startTime", e.target.value);
                if (e.target.value) clearError("startTime"); // <-- FIX
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.startTime && (
              <p className="text-red-500 text-xs">{errors.startTime}</p>
            )}
          </div>

          {/* End Time */}
          <div>
            <input
              type="time"
              value={formData?.endTime}
              onChange={(e) => {
                handleInputChange("endTime", e.target.value);
                if (e.target.value) clearError("endTime"); // <-- FIX
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.endTime && (
              <p className="text-red-500 text-xs">{errors.endTime}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DiagnosticsRegistrationForms;
