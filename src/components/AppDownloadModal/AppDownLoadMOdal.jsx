import React from "react";
import { Dialog } from "@headlessui/react";

import DoctorAddaHero from "../../assets/dr-adda-logo.png";

const AppDownloadModal = ({
  open,
  onClose,
  onUploadPrescription,
  onSelectMedicine,
}) => {
  const handleDownload = () => {
    window.open(playStoreLink, "_blank");
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
        <Dialog.Panel className="relative bg-white rounded-2xl md:p-8 p-2 w-full max-w-4xl shadow-2xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl font-light"
          >
            ✕
          </button>

          <div className="flex flex-col items-center md:gap-12 gap-4 ">
            {/* Call to Action */}
            <p className="text-xs md:text-sm font-semibold text-gray-900 uppercase tracking-wide mb-6">
              Choose how you want to proceed
            </p>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Upload Prescription */}
              <button
                onClick={onUploadPrescription}
                className="flex flex-col items-center text-center p-5 border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-3">
                  📄
                </div>
                <h3 className="text-sm md:text-base font-semibold text-gray-900">
                  Upload Prescription
                </h3>
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  Upload doctor’s prescription and we’ll handle the rest
                </p>
              </button>

              {/* Select Medicine */}
              <button
                onClick={onSelectMedicine}
                className="flex flex-col items-center text-center p-5 border border-gray-200 rounded-xl hover:border-green-500 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-full mb-3">
                  💊
                </div>
                <h3 className="text-sm md:text-base font-semibold text-gray-900">
                  Select Medicine
                </h3>
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  Browse and add medicines manually
                </p>
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AppDownloadModal;
