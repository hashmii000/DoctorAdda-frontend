import React, { useState } from "react";
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
const PharmacyRegistrationForms = ({
  renderInput,
  formData,
  setFormData,
  errors = {},
  clearError,
}) => {
  const [services, setservices] = useState([{ name: "", discription: "" }]);

  const handleServiceChange = (index, field, value) => {
    const updated = [...services];
    updated[index][field] = value;
    setservices(updated);
    setFormData((prev) => ({ ...prev, services: updated })); // ✅ sync
    if (value.trim()) {
      clearError("services", index, field); // ✅ clears service errors
    }
  };

  const addService = () => {
    const updated = [...services, { name: "", description: "" }];
    setservices(updated);
    setFormData((prev) => ({ ...prev, services: updated })); // ✅ sync
  };

  const removeService = (index) => {
    if (services.length > 1) {
      const updated = services.filter((_, i) => i !== index);
      setservices(updated);
      setFormData((prev) => ({ ...prev, services: updated })); // ✅ sync
    }
  };

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log("Pharmacy formdata", formData);
    if (value?.toString().trim()) {
      clearError(name); // ✅ clears simple field errors
    }
  };
  return (
    <>
      <h3 className="text-xl font-semibold text-[#005b8e] mb-4">
        Pharmacy Registration
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Hospital Name */}
        {renderInput("Pharmacy Name", "text", "name", "Enter Pharmacy name")}

        {/* Email */}
        {renderInput("Official Email", "email", "email", "Enter email address")}

        {/* Phone */}
        {renderInput("Contact Number", "tel", "phone", "Enter contact number")}

        {/* Address*/}

        {/* Store Timings */}
        <div className="space-y-2 group">
          <label className="text-sm font-medium text-gray-700">
            Store Timings
          </label>
          <input
            type="text"
            value={formData?.storeTiming}
            onChange={(e) => {
              handleInputChange("storeTiming", e.target.value);
              if (e.target.value.trim()) clearError("storeTiming"); // ✅
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ex: 9:00 AM - 9:00 PM"
          />
          {errors.storeTiming && (
            <p className="text-red-500 text-sm">{errors.storeTiming}</p>
          )}
        </div>
      </div>
      {/* Description */}
      {renderInput(
        "Description",
        "textarea",
        "description",
        "Enter description"
      )}

      {renderInput("Address", "textarea", "address", "Enter full address")}

      {/* services Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            Services Offered
          </h3>
          <button
            type="button"
            onClick={addService}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#007BBD] to-[#005A8C] text-white rounded-lg hover:from-blue-700 hover:to-green-700"
          >
            <Plus className="w-4 h-4" />
            Add More
          </button>
        </div>

        <div className="space-y-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl"
            >
              <div className="space-y-1">
                <input
                  type="text"
                  placeholder="Service Name"
                  value={service?.name}
                  onChange={(e) =>
                    handleServiceChange(index, "name", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
                />
                {errors[`serviceName_${index}`] && (
                  <p className="text-red-500 text-sm">
                    {errors[`serviceName_${index}`]}
                  </p>
                )}
              </div>

              <div className="flex gap-2 w-full">
                <div className="flex-1 space-y-1">
                  <input
                    type="text"
                    placeholder="Service Description"
                    value={service?.discription}
                    onChange={(e) =>
                      handleServiceChange(index, "discription", e.target.value)
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
                  />
                  {errors[`serviceDescription_${index}`] && (
                    <p className="text-red-500 text-sm">
                      {errors[`serviceDescription_${index}`]}
                    </p>
                  )}
                </div>

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
        {errors.services && (
          <p className="text-red-500 text-sm">{errors.services}</p>
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Owner Name */}
        {renderInput("Owner Name", "text", "ownerName", "Enter owner name")}

        {/* GST Number */}
        {renderInput("GST Number", "text", "gstNumber", "Enter GST number")}

        {/* Verification Phone */}
        {renderInput(
          "Verification Phone",
          "tel",
          "phoneNumber",
          "Enter verification phone"
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {/* COD Preference */}
        <div className="space-y-2 group">
          <label className="text-sm font-medium text-gray-700">
            COD Preference
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => {
                handleInputChange("cod", "true");
                clearError("cod"); // ✅ clear error when selecting
              }}
              className={`w-full px-4 py-3 border border-gray-300 rounded-xl font-medium transition-all duration-200
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
              onClick={() => {
                handleInputChange("cod", "false");
                clearError("cod"); // ✅ clear error when selecting
              }}
              className={`w-full px-4 py-3 border border-gray-300 rounded-xl font-medium transition-all duration-200
              ${
                formData?.cod === "false"
                  ? "bg-red-500 text-white border-red-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-red-50"
              }`}
            >
              No
            </button>
          </div>
          {errors.cod && <p className="text-red-500 text-sm">{errors.cod}</p>}
        </div>

        {/* Online Payment */}
        <div className="space-y-2 group">
          <label className="text-sm font-medium text-gray-700">
            Online Payment
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => {
                handleInputChange("onlinePayment", "true");
                clearError("onlinePayment"); // ✅ clear error
              }}
              className={`flex-1 px-4 py-3 border border-gray-300 rounded-xl font-medium transition-all duration-200
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
              onClick={() => {
                handleInputChange("onlinePayment", "false");
                clearError("onlinePayment"); // ✅ clear error
              }}
              className={`flex-1 px-4 py-3 border border-gray-300 rounded-xl font-medium transition-all duration-200
              ${
                formData?.onlinePayment === "false"
                  ? "bg-red-500 text-white border-red-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-red-50"
              }`}
            >
              No
            </button>
          </div>
          {errors.onlinePayment && (
            <p className="text-red-500 text-sm">{errors.onlinePayment}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default PharmacyRegistrationForms;
