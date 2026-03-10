import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Edit, Trash2, Plus } from "lucide-react";
import AddPetModal from "./AddPetModal";

const ManagePetsModal = ({ isOpen, onClose }) => {
  const [pets, setPets] = useState([
    { id: 1, name: "Bella", age: 3, type: "Dog", gender: "Female" },
    { id: 2, name: "Milo", age: 2, type: "Cat", gender: "Male" },
  ]);
  const [isAddPetOpen, setIsAddPetOpen] = useState(false);

  const handleAddPet = (newPet) => {
    setPets((prev) => [...prev, { id: Date.now(), ...newPet }]);
    setIsAddPetOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
            <Dialog.Title className="text-xl font-bold mb-4">
              Manage Pets
            </Dialog.Title>

            {/* Pet List */}
            <div className="space-y-3">
              {pets.map((pet) => (
                <div
                  key={pet.id}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{pet.name}</p>
                    <p className="text-sm text-gray-600">
                      {pet.age} years • {pet.type} • {pet.gender}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                      <Edit size={16} />
                    </button>
                    <button
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                      onClick={() =>
                        setPets((prev) => prev.filter((p) => p.id !== pet.id))
                      }
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Pet Button */}
            <button
              onClick={() => setIsAddPetOpen(true)}
              className="mt-4 flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700"
            >
              <Plus size={16} /> Add Pet
            </button>

            {/* Close */}
            <div className="mt-4 text-right">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Add Pet Modal */}
      <AddPetModal
        isOpen={isAddPetOpen}
        onClose={() => setIsAddPetOpen(false)}
        onAddPet={handleAddPet}
      />
    </>
  );
};

export default ManagePetsModal;
