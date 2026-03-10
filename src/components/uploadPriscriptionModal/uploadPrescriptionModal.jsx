import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

const UploadPrescriptionModal = ({ open, onClose, onSubmit }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!file) return alert("Please upload a prescription");
    onSubmit(file);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl relative">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 text-xl"
          >
            ✕
          </button>

          <Dialog.Title className="text-xl font-semibold mb-4">
            Upload Prescription
          </Dialog.Title>

          <p className="text-sm text-gray-600 mb-4">
            Upload a valid prescription (JPG, PNG or PDF)
          </p>

          {/* Upload Box */}
          <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center cursor-pointer hover:border-blue-500 transition">
            <span className="text-3xl mb-2">📄</span>
            <span className="text-sm text-gray-600">
              {file ? file.name : "Click to upload prescription"}
            </span>
            <input
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Place Order
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default UploadPrescriptionModal;
