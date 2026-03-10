import React, { useState } from "react";
import {
  Building2,
  Mail,
  Phone,
  Clock,
  MapPin,
  User,
  Upload,
} from "lucide-react";

const PharmacyProfile = () => {
  const [formData, setFormData] = useState({
    about: "",
    name: "",
    email: "",
    officialContact: "",
    hours: "",
    address: "",
    ownerContact: "",
    profilePic: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilePic: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Pharmacy profile saved", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-6 text-white">
          <h1 className="text-3xl font-bold">Edit Pharmacy Profile</h1>
          <p className="opacity-80">Update your pharmacy details below</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-teal-500 shadow-md">
              {formData.profilePic ? (
                <img
                  src={formData.profilePic}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                  <User size={40} />
                </div>
              )}
            </div>
            <label className="mt-4 flex items-center gap-2 cursor-pointer bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md transition">
              <Upload size={18} />
              Upload Profile Picture
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* About Section */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              About
            </label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              rows={3}
              placeholder="Write something about your pharmacy..."
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-teal-400 focus:outline-none"
            />
          </div>

          {/* Details in Grid */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Pharmacy Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <Building2 size={18} /> Pharmacy Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter pharmacy name"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <Mail size={18} /> Official Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <Phone size={18} /> Official Contact
                </label>
                <input
                  type="text"
                  name="officialContact"
                  value={formData.officialContact}
                  onChange={handleChange}
                  placeholder="Enter contact number"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <Clock size={18} /> Service Hours
                </label>
                <input
                  type="text"
                  name="hours"
                  value={formData.hours}
                  onChange={handleChange}
                  placeholder="e.g. 9:00 AM - 9:00 PM"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <MapPin size={18} /> Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Enter full address"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <User size={18} /> Owner Contact
                </label>
                <input
                  type="text"
                  name="ownerContact"
                  value={formData.ownerContact}
                  onChange={handleChange}
                  placeholder="Enter owner contact number"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-lg transition-transform transform hover:scale-[1.02]"
            >
              💾 Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PharmacyProfile;
