import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";

const UrgentRequirementModal = ({ isOpen, onClose }) => {
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
        <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95 translate-y-4"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-4"
          >
            <Dialog.Panel
              className="w-full max-w-md sm:max-w-lg transform overflow-hidden 
                         rounded-2xl bg-white shadow-2xl transition-all 
                         max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b bg-gradient-to-r from-blue-600 to-blue-700">
                <Dialog.Title className="text-base  font-semibold text-white">
                  Urgent Doctor Requirement Post
                </Dialog.Title>
                <button
                  onClick={onClose}
                  className="text-white hover:text-gray-200"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Form */}
              <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Requirement Title
                  </label>
                  <input
                    type="text"
                    placeholder="Eg: Need a Cardiologist"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Select Required Specification
                  </label>
                  <select
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option>Select Options</option>
                    <option>Cardiologist</option>
                    <option>Neurologist</option>
                    <option>General Physician</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Requirement End Date
                  </label>
                  <input
                    type="date"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Select Time for Doctor Requirement
                  </label>
                  <input
                    type="time"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 
                                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="text"
                      placeholder="+91"
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 
                                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Job Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Need an experienced cardiologist"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  ></textarea>
                </div>

                {/* Submit */}
                <div className="pt-2 sm:pt-4">
                  <button
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
                               text-white py-3 rounded-xl font-semibold text-base sm:text-lg shadow-md hover:shadow-lg 
                               transition-transform transform hover:-translate-y-0.5"
                  >
                    Submit Request
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

export default UrgentRequirementModal;
