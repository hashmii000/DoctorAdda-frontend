/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import SidebarNav from "./SidebarNav";
import { Plus, User, Edit3, Trash2, X, LogIn, Edit } from "lucide-react";
import { useSelector } from "react-redux";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "../Helpers";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { getCookieItem } from "../Hooks/cookie";

const ManagePatients = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { userProfileData, isLoggedIn } = useSelector((state) => state.user);
  // const UserId = userProfileData?._id;
  const UserId = getCookieItem("UserId");
  console.log("UserId", UserId);

  const [patients, setPatients] = useState([]);
  const [activeTab, setActiveTab] = useState("patients");

  const [showAddModal, setShowAddModal] = useState(false);
  console.log("showAddModal", showAddModal);

  const [showEditModal, setShowEditModal] = useState(false);
  console.log("showEditModal", showEditModal);

  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    email: "",
    gender: "",
    oderingFor: "",
  });
  console.log("newPatient", newPatient);

  const [editPatient, setEditPatient] = useState(null);

  console.log("editPatient", editPatient);

  //Fetch Patients API
  const fetchPatients = async () => {
    try {
      const res = await getRequest(`auth/getMembers/${UserId}`);
      console.log("Fetch PAtients", res?.data?.data || []);

      setPatients(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [UserId]);

  //add api
  const handleAddPatient = async () => {
    if (
      !newPatient.name ||
      !newPatient.age ||
      !newPatient.email ||
      !newPatient.gender ||
      !newPatient.oderingFor
    ) {
      alert("Please fill all fields");
      return;
    }
    try {
      const response = await postRequest({
        url: `auth/addMember/${UserId}`,
        cred: newPatient,
      });

      console.log("✅ Patient added successfully:", response?.data?.data);

      await fetchPatients(); // ✅ Refresh from API
      setShowAddModal(false);
      setNewPatient({
        name: "",
        age: "",
        email: "",
        gender: "",
        oderingFor: "",
      });
      toast.success("Patient added successfully!");
    } catch (error) {
      console.error("Error adding patient:", error);
      toast.error(" Failed to add patient");
    }
  };

  //edit api
  const handleUpdatePatient = async () => {
    if (
      !editPatient?.name ||
      !editPatient.age ||
      !editPatient.email ||
      !editPatient.gender ||
      !editPatient.oderingFor
    ) {
      alert("Please fill all fields");
      return;
    }
    try {
      const res = await patchRequest({
        url: `auth/updateMember/${UserId}/${editPatient._id}`,
        cred: editPatient,
      });
      console.log("✅ Patient added successfully:", res?.data?.data);

      await fetchPatients();
      setShowEditModal(false);
      setEditPatient(null);
      toast.success("Patient updated successfully!");
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };

  //delete api
  const handleDeletePatient = async (patientId) => {
    console.log("patientId", patientId);

    Swal.fire({
      title: "Are you sure?",
      text: "This patient will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteRequest(
            `auth/deleteMember/${UserId}/${patientId}`
          );
          console.log("✅ Patient deleted successfully:", res?.data?.data);

          await fetchPatients();

          Swal.fire({
            title: "Deleted!",
            text: "The patient has been deleted.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (error) {
          console.error("Error deleting patient:", error);
          Swal.fire("Error", "Something went wrong while deleting!", "error");
        }
      }
    });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-sans">
      <div className="max-w-7xl mx-auto p-6 md:pt-42">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <SidebarNav activeTab="patients" formData={userProfileData} />

          {/* Patients Section */}
          <div className="flex-1 bg-white rounded-3xl shadow-lg md:p-8 p-4 pt-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="md:text-2xl  text-xl font-bold  text-gray-800 flex items-center gap-3">
                <User size={28} className="text-[#006ca7]" /> Manage Patients
              </h2>
              <button
                className="inline-flex items-center md:gap-2 md:px-6 md:py-3 px-4 py-2 bg-[#006ca7] text-white rounded-full shadow-lg hover:bg-[#005b8d] transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#004a70]"
                onClick={() => setShowAddModal(true)}
                aria-label="Add Patient"
              >
                <Plus size={20} /> Add Patient
              </button>
            </div>

            {/* Patients List */}
            <div className="space-y-5">
              {patients?.length === 0 ? (
                <p className="text-gray-400 text-center py-8 text-lg font-medium">
                  No patients found.
                </p>
              ) : (
                patients?.map((patient) => (
                  <div
                    key={patient._id}
                    className="flex  items-center justify-between md:p-5 p-2 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 transform hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shadow-inner">
                        <User size={24} className="text-[#006ca7]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-base md:text-lg">
                          {patient?.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {patient?.age} | {patient?.gender}
                        </p>
                        <p className="text-sm text-gray-600 mt-0.5">
                          {patient?.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex  flex-col md:flex-row gap-4">
                      <button
                        onClick={() => {
                          console.log("Editing patient:", patient); // 🔍 check current data
                          setEditPatient(patient);
                          setShowEditModal(true);
                        }}
                        className="flex items-center gap-1 text-[#006ca7] font-semibold  text-sm md:text-base hover:text-[#004a70] transition-colors"
                        aria-label={`Edit ${patient?.name}`}
                      >
                        <Edit3 size={18} /> Edit
                      </button>

                      <button
                        onClick={() => handleDeletePatient(patient._id)}
                        className="flex items-center gap-1 text-red-600 font-semibold text-sm md:text-base hover:text-red-700 transition-colors"
                        aria-label={`Remove ${patient?.name}`}
                      >
                        <Trash2 size={18} /> Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Add Patient Modal */}
          {showAddModal && (
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50"
              aria-modal="true"
              role="dialog"
              aria-labelledby="add-patient-title"
              onClick={() => setShowAddModal(false)}
            >
              <div
                className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl transform transition-all scale-95 hover:scale-100"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-3">
                  <div className="bg-[#E6F3FA] p-3 rounded-full">
                    <User size={24} className="text-[#006ca7]" />
                  </div>
                  <h3
                    className="text-2xl font-bold text-gray-900"
                    id="add-patient-title"
                  >
                    Add New Patient
                  </h3>
                </div>

                {/* Form Fields */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddPatient();
                  }}
                  className="space-y-5"
                >
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newPatient?.name}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, name: e.target.value })
                    }
                    className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#006ca7] focus:outline-none transition"
                    required
                    autoFocus
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    value={newPatient?.age}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, age: e.target.value })
                    }
                    className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#006ca7] focus:outline-none transition"
                    required
                    min={0}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={newPatient?.email}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, email: e.target.value })
                    }
                    className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#006ca7] focus:outline-none transition"
                    required
                  />
                  <select
                    value={newPatient?.gender}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, gender: e.target.value })
                    }
                    className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#006ca7] focus:outline-none transition bg-white"
                    required
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>

                  {/* Radio buttons */}
                  <fieldset className="bg-gray-50 p-4 rounded-xl">
                    <legend className="text-sm font-semibold text-gray-700 mb-3">
                      Who are you ordering for?
                    </legend>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="oderingFor"
                          value="forMe"
                          checked={newPatient?.oderingFor === "forMe"}
                          onChange={(e) =>
                            setNewPatient({
                              ...newPatient,
                              oderingFor: e.target.value,
                            })
                          }
                          className="accent-[#006ca7] w-5 h-5"
                          required
                        />
                        <span className="text-gray-800 font-medium">
                          Myself
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="oderingFor"
                          value="forSomeoneElse"
                          checked={newPatient?.oderingFor === "forSomeoneElse"}
                          onChange={(e) =>
                            setNewPatient({
                              ...newPatient,
                              oderingFor: e.target.value,
                            })
                          }
                          className="accent-[#006ca7] w-5 h-5"
                        />
                        <span className="text-gray-800 font-medium">
                          Someone else
                        </span>
                      </label>
                    </div>
                  </fieldset>

                  {/* Footer Buttons */}
                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      type="button"
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition font-semibold"
                      onClick={() => setShowAddModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#006ca7] text-white rounded-xl hover:bg-[#005b8d] shadow-lg transition font-semibold"
                    >
                      Add Patient
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Edit Patient Modal */}
          {showEditModal && editPatient && (
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50"
              aria-modal="true"
              role="dialog"
              aria-labelledby="edit-patient-title"
              onClick={() => setShowEditModal(false)}
            >
              <div
                className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl transform transition-all scale-95 hover:scale-100"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-3">
                  <div className="bg-[#E6F3FA] p-3 rounded-full">
                    <Edit size={24} className="text-[#006ca7]" />
                  </div>
                  <h3
                    className="text-2xl font-bold text-gray-900"
                    id="edit-patient-title"
                  >
                    Edit Patient
                  </h3>
                </div>

                {/* Form Fields */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdatePatient();
                  }}
                  className="space-y-5"
                >
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={editPatient?.name}
                    onChange={(e) =>
                      setEditPatient({ ...editPatient, name: e.target.value })
                    }
                    className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-4 focus:ring-[#006ca7] outline-none transition"
                    required
                    autoFocus
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    value={editPatient?.age}
                    onChange={(e) =>
                      setEditPatient({ ...editPatient, age: e.target.value })
                    }
                    className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-4 focus:ring-[#006ca7] outline-none transition"
                    required
                    min={0}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={editPatient?.email}
                    onChange={(e) =>
                      setEditPatient({ ...editPatient, email: e.target.value })
                    }
                    className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-4 focus:ring-[#006ca7] outline-none transition"
                    required
                  />
                  <select
                    value={editPatient?.gender}
                    onChange={(e) =>
                      setEditPatient({ ...editPatient, gender: e.target.value })
                    }
                    className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-4 focus:ring-[#006ca7] outline-none transition bg-white"
                    required
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>

                  {/* Radio buttons */}
                  <fieldset className="bg-gray-50 p-4 rounded-xl">
                    <legend className="text-sm font-semibold text-gray-700 mb-3">
                      Who are you ordering for?
                    </legend>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="oderingFor"
                          value="forMe"
                          checked={editPatient?.oderingFor === "forMe"}
                          onChange={(e) =>
                            setEditPatient({
                              ...editPatient,
                              oderingFor: e.target.value,
                            })
                          }
                          className="accent-[#006ca7] w-5 h-5"
                          required
                        />
                        <span className="text-gray-800 font-medium">
                          Myself
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="oderingFor"
                          value="forSomeoneElse"
                          checked={editPatient?.oderingFor === "forSomeoneElse"}
                          onChange={(e) =>
                            setEditPatient({
                              ...editPatient,
                              oderingFor: e.target.value,
                            })
                          }
                          className="accent-[#006ca7] w-5 h-5"
                        />
                        <span className="text-gray-800 font-medium">
                          Someone else
                        </span>
                      </label>
                    </div>
                  </fieldset>

                  {/* Footer Buttons */}
                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      type="button"
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition font-semibold"
                      onClick={() => setShowEditModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#006ca7] text-white rounded-xl hover:bg-[#005b8d] shadow-lg transition font-semibold"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagePatients;
