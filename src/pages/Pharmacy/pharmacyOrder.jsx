/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Upload, Zap, Check, Plus, ShoppingCart } from "lucide-react";
import CartModal from "../../components/CartModal";

const PharmacyOrder = ({ onUploadSubmit, onCartSubmit }) => {
  const [mode, setMode] = useState("upload"); // "upload" or "select"
  const [prescription, setPrescription] = useState(null);
  const [description, setDescription] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [medicineList, setMedicineList] = useState([
    { name: "Paracetamol", details: "500mg" },
    { name: "Cilacar 10", details: "10mg" },
    { name: "Disprin", details: "Headache" },
    { name: "Olsar", details: "20 mg" },
    { name: "Vff", details: "Xdff" },
  ]);
  const [cart, setCart] = useState([]);

  // const handleAddToCart = (med) => {
  //   if (!cart.includes(med)) {
  //     setCart([...cart, med]);
  //   }
  // };

  // handle prescription upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setPrescription(file);
    } else {
      alert("File must be less than 5MB (JPG, PNG, PDF)");
    }
  };

  // handle medicine add
  const handleAddMedicine = () => {
    if (searchTerm.trim() === "") return;
    setMedicineList([...medicineList, searchTerm]);
    setSearchTerm("");
  };

  const handleRemoveMedicine = (index) => {
    setMedicineList(medicineList.filter((_, i) => i !== index));
  };

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add medicine to cart
  const handleAddToCart = (medicine) => {
     if (!cart.includes(medicine)) {
      setCart([...cart, medicine]);
    }
    setCartItems((prev) => {
      const exists = prev.find((item) => item.name === medicine.name);
      if (exists) {
        return prev.map((item) =>
          item.name === medicine.name ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...medicine, qty: 1 }];
    });
  };

  // Update quantity
  const handleUpdateQty = (item, newQty) => {
    if (newQty <= 0) {
      handleRemove(item);
    } else {
      setCartItems((prev) =>
        prev.map((cartItem) =>
          cartItem.name === item.name ? { ...cartItem, qty: newQty } : cartItem
        )
      );
    }
  };

  // Remove item
  const handleRemove = (item) => {
    setCartItems((prev) => prev.filter((cartItem) => cartItem.name !== item.name));
  };

  // Checkout
  const handleCheckout = () => {
    alert("Proceeding to checkout 🚀");
    setIsCartOpen(false);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Zap className="w-6 h-6 text-blue-600" />
        Order Medicines
      </h3>

      {/* Mode Switch */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            mode === "upload"
              ? "bg-blue-600 text-white"
              : "bg-white border border-gray-300 text-gray-700"
          }`}
          onClick={() => setMode("upload")}
        >
          Upload Prescription
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            mode === "select"
              ? "bg-blue-600 text-white"
              : "bg-white border border-gray-300 text-gray-700"
          }`}
          onClick={() => setMode("select")}
        >
          Select Medicines
        </button>
      </div>

      {/* Upload Flow */}
      {mode === "upload" && (
        <div>
          <label className="block mb-3 font-medium text-gray-700">
            Upload Your Prescription
          </label>
          <div className="relative group">
            <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-300">
              <input
                type="file"
                className="hidden"
                id="prescription"
                onChange={handleFileChange}
              />
              <label
                htmlFor="prescription"
                className="flex flex-col items-center cursor-pointer"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                  <Upload className="w-8 h-8 text-blue-600" />
                </div>
                <span className="font-medium text-gray-700 mb-1">
                  Click to Upload Prescription
                </span>
                <span className="text-sm text-gray-500">
                  JPG, PNG, PDF (Max 5MB)
                </span>
              </label>
            </div>
            {prescription && (
              <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-700">
                    Uploaded: {prescription.name}
                  </span>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => onUploadSubmit(prescription)}
            disabled={!prescription}
            className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            Continue with Prescription
          </button>
        </div>
      )}

      {/* Select Medicines Flow */}
      {mode === "select" && (
        <div className="relative  flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 sticky top-0 z-20   border-b">
            {/* Header + Search */}
            <h2 className="text-xl font-bold text-gray-900">
              Search Medicines
            </h2>
            <div className="relative mt-3">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="🔍 Type to search medicines..."
                className="w-full border border-gray-300 bg-white rounded-2xl pl-4 pr-12 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Medicine List */}
          <div className="flex-1 px-6 py-4 space-y-4 ">
            {medicineList
              .filter((med) =>
                med.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((med, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200"
                >
                  {/* Medicine Info */}
                  <div>
                    <p className="text-gray-900 font-semibold text-base">
                      {med.name}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">{med.details}</p>
                  </div>

                  {/* Add Button */}
                  <button
                    onClick={() => handleAddToCart(med)}
                    className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 hover:scale-105 transition-transform duration-150"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              ))}
          </div>

          {/* View Cart Button */}
          {cart.length > 0 && (
            <div className="sticky bottom-0 w-full p-4">
              <button
                  onClick={() => setIsCartOpen(true)}
                className="w-full  bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center gap-2 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                View Cart ({cart.length})
              </button>
            </div>
          )}
        </div>
      )}
       {/* Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemove}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default PharmacyOrder;
