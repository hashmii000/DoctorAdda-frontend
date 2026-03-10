import React, { useState } from "react";
import LocationSearchInput from "../../LocationSearchInput";

const AmbulanceRegistrationForm = ({
  renderInput,
  formData,
  setFormData,
  errors = {},
  clearError,
}) => {
  const [drivers, setDrivers] = useState([
    { name: "", phone: "", licenseNumber: "" },
  ]);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (value) clearError(name);
  };

  const handleDriverChange = (index, field, value) => {
    const updated = [...drivers];
    updated[index][field] = value;
    setDrivers(updated);
    setFormData((prev) => ({ ...prev, drivers: updated })); // sync to formData

    if (value) clearError(`drivers.${index}.${field}`);
  };

  const addDriver = () => {
    const updated = [...drivers, { name: "", phone: "", licenseNumber: "" }];
    setDrivers(updated);
    setFormData((prev) => ({ ...prev, drivers: updated }));
  };

  const removeDriver = (index) => {
    if (drivers.length > 1) {
      const updated = drivers.filter((_, i) => i !== index);
      setDrivers(updated);
      setFormData((prev) => ({ ...prev, drivers: updated }));
    }
  };

  return (
    <>
      <h3 className="text-xl font-semibold text-[#005b8e] mb-6">
        Ambulance Service Registration
      </h3>

      {/* Grid wrapper for two-column layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Row 1: Name + Email */}
        {renderInput("Service Name", "text", "name", "Enter service name")}
        {renderInput("Email", "email", "email", "Enter email address")}

        {/* Row 2: Phone + Address */}
        {renderInput("Phone", "tel", "phone", "Enter phone number")}
        {/* GPS Tracking (full row) */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GPS Tracking
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gpsTracking"
                value="true"
                checked={formData.gpsTracking === true}
                disabled
              />
              Yes
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gpsTracking"
                value="false"
                checked={
                  formData.gpsTracking === false ||
                  formData.gpsTracking === undefined
                }
                disabled
              />
              No
            </label>
          </div>
        </div>
        {/* Row 3: Description + Operating Hours */}

        <div className="space-y-2 group">
          <label className="text-sm font-medium text-gray-700">
            Operating Hours
          </label>
          <input
            type="text"
            value={formData?.operatingHours}
            onChange={(e) =>
              handleInputChange("operatingHours", e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Operating Hours of ambulance service"
          />
          {errors.operatingHours && (
            <p className="text-red-500 text-sm">{errors.operatingHours}</p>
          )}
        </div>

        {/* Row 4: Ambulance Type + Number of Ambulance */}
        <div className="space-y-2 group">
          <label className="text-sm font-medium text-gray-700">
            Ambulance Type
          </label>
          <select
            value={formData?.ambulanceType}
            onChange={(e) => handleInputChange("ambulanceType", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select Options</option>
            <option value="BLS - Basic Life Support">
              BLS - Basic Life Support
            </option>
            <option value="ICU - Intensive Care Unit">
              ICU - Intensive Care Unit
            </option>
            <option value="Dead Body Carrier">Dead Body Carrier</option>
          </select>
          {errors.ambulanceType && (
            <p className="text-red-500 text-sm">{errors.ambulanceType}</p>
          )}
        </div>

        <div className="space-y-2 group">
          <label className="text-sm font-medium text-gray-700">
            Number of Ambulance
          </label>
          <select
            value={formData?.ambulanceNumber}
            onChange={(e) =>
              handleInputChange("ambulanceNumber", e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select Options</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4+">4+</option>
          </select>
          {errors.ambulanceNumber && (
            <p className="text-red-500 text-sm">{errors.ambulanceNumber}</p>
          )}
        </div>

        {/* Row 5: Availability Status + Capacity */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Availability Status
          </label>
          <select
            name="availabilityStatus"
            value={formData.availabilityStatus || ""}
            onChange={(e) =>
              handleInputChange("availabilityStatus", e.target.value)
            }
            className="w-full border border-gray-300 rounded-md p-3 focus:ring focus:ring-blue-200 focus:outline-none"
          >
            <option value="">Select Status</option>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
            <option value="In Transit">In Transit</option>
          </select>
        </div>
        {renderInput(
          "Capacity",
          "number",
          "capacity",
          "Number of patients ambulance can carry"
        )}

        {/* Row 6: Emergency Contact + Price */}
        {renderInput(
          "Emergency Contact",
          "tel",
          "emergencyContact",
          "Enter emergency contact"
        )}
        {renderInput("Price", "number", "price", "Enter service charge")}
      </div>
      {renderInput(
        "Description",
        "textarea",
        "description",
        "Enter description"
      )}
      {renderInput("Address", "textarea", "address", "Enter full address")}

      {/* Driver Info (full row) */}
      <div className="space-y-4 mt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">
            Driver Information
          </h3>
          <button
            type="button"
            onClick={addDriver}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#007BBD] to-[#005A8C] text-white rounded-lg hover:from-blue-700 hover:to-green-700"
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
                <label className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Driver name"
                  value={driver?.name}
                  onChange={(e) =>
                    handleDriverChange(index, "name", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  placeholder="Phone number"
                  value={driver.phone}
                  maxLength={10}
                  onChange={(e) => {
                    e.target.value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);
                    handleDriverChange(index, "phone", e.target.value);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* License Number */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  License Number
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="License number"
                    value={driver.licenseNumber}
                    onChange={(e) =>
                      handleDriverChange(index, "licenseNumber", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AmbulanceRegistrationForm;
