import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";

const AddDoctorModal = ({ isOpen, onClose }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Background */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        {/* Modal */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95 translate-y-4"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-4"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-teal-600 to-teal-700">
                <Dialog.Title className="text-lg font-semibold text-white">
                  Add Doctor Details
                </Dialog.Title>
                <button
                  onClick={onClose}
                  className="text-white hover:text-gray-200"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Form */}
              <div className="px-6 py-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 
                               focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Specialization</label>
                  <input
                    type="text"
                    placeholder="Enter Specialization"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 
                               focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Experience</label>
                  <input
                    type="text"
                    placeholder="Enter Experience"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 
                               focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Fee</label>
                  <input
                    type="number"
                    placeholder="Enter Fee"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 
                               focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Time</label>
                  <input
                    type="text"
                    placeholder="Enter Time"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 
                               focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  />
                </div>

                {/* Save Button */}
                <div className="pt-4">
                  <button
                    className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 
                               text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg 
                               transition-transform transform hover:-translate-y-0.5"
                  >
                    Save Doctor
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddDoctorModal;
