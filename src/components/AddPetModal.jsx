import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const AddPetModal = ({ isOpen, onClose, onAddPet }) => {
   const { userProfileData, isLoggedIn } = useSelector((state) => state.user);
  const UserId = userProfileData?._id;
   const [form, setForm] = useState({
    image: "",
    name: "",
    type: "",
    gender: "",
    age: "",
    weight: "",
  });

  const handleSubmit = () => {
    if (!form.name || !form.type) return; // basic validation
    onAddPet(form);
    setForm({ image: "", name: "", type: "", gender: "", age: "", weight: "" });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" aria-hidden="true" />

      {/* Modal container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative animate-fadeIn">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X size={20} className="text-gray-500" />
          </button>

          {/* Title */}
          <Dialog.Title className="text-2xl font-bold mb-6 text-center text-gray-800">
            🐾 Add Nekldlrgery
          </Dialog.Title>

          {/* Image Preview */}
          {form.image && (
            <div className="flex justify-center mb-4">
              <img
                src={form.image}
                alt="Pet Preview"
                className="w-24 h-24 object-cover rounded-full border-4 border-blue-100 shadow-md"
              />
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-4">
            <input
              type="file"
              className="w-full border border-gray-300 p-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) =>
                setForm({
                  ...form,
                  image: URL.createObjectURL(e.target.files[0]),
                })
              }
            />
            <input
              type="text"
              placeholder="Pet Name"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Type (Dog/Cat)"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            />
           
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Age"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
              />
              <input
                type="number"
                placeholder="Weight (kg)"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={form.weight}
                onChange={(e) => setForm({ ...form, weight: e.target.value })}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-md hover:from-orange-600 hover:to-red-600 transition"
            >
              Add Pet
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddPetModal;
