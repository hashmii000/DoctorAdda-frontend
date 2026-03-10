import React, { useState, useEffect } from "react";
import SidebarNav from "./SidebarNav";
import { Plus, PawPrint, Edit, Trash2, X } from "lucide-react";
import { useSelector } from "react-redux";
import {
  getRequest,
  postRequest,
  patchRequest,
  deleteRequest,
} from "../Helpers";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { getCookieItem } from "../Hooks/cookie";

const ManagePets = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [pets, setPets] = useState([
    { id: 1, name: "Max", type: "Dog", age: 3, breed: "Labrador" },
    { id: 2, name: "Whiskers", type: "Cat", age: 2, breed: "Persian" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const { userProfileData } = useSelector((state) => state.user);
  const UserId = getCookieItem("UserId");

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    age: "",
    weight: "",
  });

  // Fetch pets from API
  const fetchPets = async () => {
    try {
      const res = await getRequest(`auth/getpets/${UserId}`);
      console.log("Fetch Pets ===", res?.data?.data);
      setPets(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  useEffect(() => {
    if (UserId) fetchPets();
  }, [UserId]);

  // Open modal for add/edit
  const openModal = (pet = null) => {
    if (pet) {
      setEditingPet(pet);
      let ageObj = { year: 0, month: 0 };
      if (typeof pet.age === "number") {
        ageObj.year = pet.age;
      } else if (typeof pet.age === "string") {
        ageObj.year = parseInt(pet.age) || 0;
      } else if (typeof pet.age === "object") {
        ageObj = {
          year: pet.age?.year || 0,
          month: pet.age?.month || 0,
        };
      }
      setFormData({
        name: pet.name || "",
        type: pet.type || "",
        age: ageObj,
        weight: pet.weight || "",
      });
    } else {
      setEditingPet(null);
      setFormData({
        name: "",
        type: "",
        age: { year: 0, month: 0 },
        weight: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // Add pet API
  const addPet = async () => {
    if (!formData?.name?.trim() || !formData?.type?.trim()) {
      alert("Please fill all required fields.");
      return;
    }
    try {
      const res = await postRequest({
        url: `auth/addpets/${UserId}`,
        cred: {
          ...formData,
          age: {
            year: formData.age.year || 0,
            month: formData.age.month || 0,
          },
        },
      });
      console.log("Pet add:", res?.data?.data);
      toast.success("Pet added successfully!");

      // Refresh pets list
      await fetchPets();
      closeModal();
    } catch (error) {
      console.error("Error adding pet:", error);
      toast.error(" Failed to add pet");
    }
  };

  // Update pet API
  const updatePet = async () => {
    if (!formData?.name?.trim() || !formData?.type?.trim()) {
      alert("Please fill all required fields.");
      return;
    }
    try {
      const res = await patchRequest({
        url: `auth/updatepets/${UserId}/${editingPet?._id}`,
        cred: {
          ...formData,
          age: {
            year: formData.age.year || 0,
            month: formData.age.month || 0,
          },
        },
      });
      console.log("Pet updated:", res?.data?.data);
      toast.success("Pet updated successfully!");

      // Refresh pets list
      await fetchPets();
      closeModal();
    } catch (error) {
      console.error("Error updating pet:", error);
      toast.error("Failed to update pet");
    }
  };

  // Delete pet API

  const handleDelete = async (petId) => {
    console.log("petId", petId);

    Swal.fire({
      title: "Are you sure?",
      text: "This pet will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteRequest(`auth/deletepets/${UserId}/${petId}`);
          console.log("✅ Patient deleted successfully:", res?.data?.data);

          await fetchPets();

          Swal.fire({
            title: "Deleted!",
            text: "The pet has been deleted.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (error) {
          console.error("Error deleting pet:", error);
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
          <SidebarNav activeTab="pets" formData={userProfileData} />

          {/* Main Content */}
          <main className="flex-1 p-8 bg-white rounded-3xl shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="md:text-2xl text-xl font-bold text-gray-800 flex items-center gap-3">
                <PawPrint size={30} className="text-[#006ca7]" />
                Manage Pets
              </h2>
              <button
                onClick={() => openModal()}
                className="inline-flex items-center gap-2 md:px-6 md:py-3 px-4 py-2 bg-[#006ca7] text-white rounded-full shadow-lg hover:bg-[#005a8c] transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#004a70]"
                aria-label="Add Pet"
              >
                <Plus size={20} />
                Add Pet
              </button>
            </div>

            {/* Pets List */}
            {pets.length === 0 ? (
              <p className="text-gray-400 text-center py-12 text-lg font-medium">
                No pets added yet.
              </p>
            ) : (
              <div className="space-y-6">
                {pets.map((pet) => (
                  <article
                    key={pet._id}
                    className="flex items-center  justify-between md:p-6 p-2 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
                  >
                    {/* Left: Icon + Info */}
                    <div className="flex items-center gap-2 md:gap-6">
                      <div className="md:w-16 md:h-16 h-14 w-14 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center rounded-full shadow-inner">
                        <PawPrint size={30} className="text-[#006ca7]" />
                      </div>
                      <div>
                        <h2 className="text-base md:text-lg font-semibold text-gray-800">
                          {pet.name}
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                          Age:{" "}
                          <span className="font-medium">
                            {pet.age?.year} yrs {pet.age?.month} months
                          </span>{" "}
                          | <span className="font-medium">{pet?.type}</span>
                        </p>

                        <p className="text-sm text-gray-600 mt-0.5">
                          Weight:{" "}
                          <span className="font-medium">{pet?.weight}</span>
                        </p>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex  flex-col md:flex-row gap-5">
                      <button
                        onClick={() => openModal(pet)}
                        className="flex items-center gap-2 text-[#006ca7] font-semibold text-sm md:text-base hover:text-[#004a70] transition-colors"
                        aria-label={`Edit ${pet.name}`}
                      >
                        <Edit size={18} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(pet._id)}
                        className="flex items-center gap-2 text-red-600 font-semibold text-sm md:text-base hover:text-red-700 transition-colors"
                        aria-label={`Remove ${pet.name}`}
                      >
                        <Trash2 size={18} />
                        Remove
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </main>

          {/* Modal */}
          {isModalOpen && (
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 px-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              onClick={closeModal}
            >
              <div
                className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 relative animate-fadeIn scale-95 hover:scale-100 transition-transform"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 focus:outline-none"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>

                <h2
                  id="modal-title"
                  className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3"
                >
                  {editingPet ? "Edit Pet" : "Add Pet"}
                </h2>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    editingPet ? updatePet() : addPet();
                  }}
                  className="space-y-6"
                >
                  <input
                    type="text"
                    placeholder="Pet Name *"
                    value={formData?.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#006ca7] focus:outline-none transition"
                    autoFocus
                    required
                  />
                  <input
                    type="text"
                    placeholder="Pet Type (e.g., Dog, Cat) *"
                    value={formData?.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#006ca7] focus:outline-none transition"
                    required
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min={0}
                      placeholder="Years"
                      value={formData?.age?.year || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          age: {
                            ...formData.age,
                            year:
                              e.target.value === ""
                                ? 0
                                : parseInt(e.target.value, 10),
                          },
                        })
                      }
                      className="w-1/2 p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#006ca7] focus:outline-none transition"
                      required
                    />
                    <input
                      type="number"
                      min={0}
                      placeholder="Months"
                      value={formData?.age?.month || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          age: {
                            ...formData.age,
                            month:
                              e.target.value === ""
                                ? 0
                                : parseInt(e.target.value, 10),
                          },
                        })
                      }
                      className="w-1/2 p-4 border border-gray-300 rounded-xl shadow-smfocus:ring-2 focus:ring-[#006ca7] focus:outline-none transition"
                      required
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Weight"
                    value={formData?.weight}
                    onChange={(e) =>
                      setFormData({ ...formData, weight: e.target.value })
                    }
                    className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#006ca7] focus:outline-none transition"
                  />

                  <div className="flex justify-end gap-4 mt-8">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#006ca7] text-white rounded-xl hover:bg-[#005a8c] shadow-lg transition font-semibold"
                    >
                      {editingPet ? "Update" : "Save"}
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

export default ManagePets;
