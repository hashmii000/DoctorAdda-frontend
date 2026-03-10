import { Dialog } from "@headlessui/react";
import React, { useEffect, useMemo, useState } from "react";
import { getRequest } from "../../Helpers";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const renderAge = (age) => {
  if (!age) return "";

  // If age is already a string or number
  if (typeof age === "string" || typeof age === "number") {
    return `${age}`;
  }

  // If age is an object like { month, year }
  if (typeof age === "object") {
    const years = age.year ? `${age.year} yr` : "";
    const months = age.month ? `${age.month} mo` : "";
    return [years, months].filter(Boolean).join(" ");
  }

  return "";
};

const SelectMedicineModal = ({
  open,
  onClose,
  onPlaceOrder,
  medicines = [],
  savedAddresses = [],
}) => {
  const userData = useSelector((state) => state?.user?.userData?.userData);
  const navigate = useNavigate();
  console.log("medicines", medicines);

  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});
  const [fetchedMedicines, setFetchedMedicines] = useState([]);
  const [deliveryMode, setDeliveryMode] = useState("home");
  const [orderFor, setOrderFor] = useState("self");
  const [otherPersonName, setOtherPersonName] = useState("");
  const [otherPersonDetails, setOtherPersonDetails] = useState({
    name: "",
    age: "",
    gender: "",
    number: "",
    weight: "",
  });
  const [step, setStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [pets, setPets] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedOther, setSelectedOther] = useState(null);
  
  // Add these new states for order submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [newAddress, setNewAddress] = useState({
    label: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const getMedicineList = async () => {
    try {
      const response = await getRequest("/medicine");
      console.log("bulk medicines", response);

      setFetchedMedicines(response?.data?.data?.medicines || []);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };
  
  const getAddressList = async () => {
    try {
      const response = await getRequest(
        `/auth/getorderAddress/${userData?._id}`
      );
      console.log(" addresses", response);

      setAddresses(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };
  
  const getMembersList = async () => {
    try {
      const response = await getRequest(`/auth/getMembers/${userData?._id}`);
      console.log(" memebers", response);

      setMembers(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };
  
  const getPetsList = async () => {
    try {
      const response = await getRequest(`/auth/getpets/${userData?._id}`);
      console.log(" pets", response);

      setPets(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  useEffect(() => {
    if (open) {
      getMedicineList();
      getAddressList();
      getMembersList();
      getPetsList();
      setStep(1);
      setCart({});
      setDeliveryMode("home");
      setOrderFor("self");
      setOtherPersonDetails({
        name: "",
        age: "",
        gender: "",
        number: "",
        weight: "",
      });
      setSelectedAddress(savedAddresses[0] || null);
      setShowAddressForm(false);
      setOrderSuccess(false);
      setIsSubmitting(false);
    }
  }, [open]);
  
  const combinedMedicines = useMemo(() => {
    const api1 = medicines.map((m) => ({
      _id: m._id,
      name: m.medicineName,
      price: m.price,
      description: m.discription || "",
    }));
    const api2 = fetchedMedicines.map((m) => ({
      _id: m._id,
      name: m.name,
      price: m.price,
      description: m.description || "",
    }));
    const map = new Map();
    [...api1, ...api2].forEach((m) => {
      if (!map.has(m.name)) map.set(m.name, m);
    });
    return Array.from(map.values());
  }, [medicines, fetchedMedicines]);

  const filteredMedicines = combinedMedicines.filter((med) =>
    med.name.toLowerCase().includes(search.toLowerCase())
  );

  const addMedicine = (medicine) => {
    setCart((prev) => ({
      ...prev,
      [medicine._id]: {
        ...medicine,
        qty: (prev[medicine._id]?.qty || 0) + 1,
      },
    }));
  };

  const removeMedicine = (medicineId) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[medicineId].qty > 1) {
        updated[medicineId].qty -= 1;
      } else {
        delete updated[medicineId];
      }
      return updated;
    });
  };
  
  console.log("Combined medicines", combinedMedicines, members, pets);

  const handleContinue = () => {
    if (Object.keys(cart).length === 0) {
      alert("Please select at least one medicine");
      return;
    }
    setStep(2);
  };
  
  const otherOptions = useMemo(() => {
    const memberList = members.map((m) => ({
      ...m,
      type: "member",
    }));

    return [...memberList];
  }, [members, pets]);

  const handleAddAddress = () => {
    if (!newAddress.street || !newAddress.city || !newAddress.pincode) {
      alert("Please fill in all required address fields");
      return;
    }
    const addressToAdd = { ...newAddress, _id: Date.now().toString() };
    setSelectedAddress(addressToAdd);
    setShowAddressForm(false);
    setNewAddress({
      label: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
    });
  };

  const handleOrder = async () => {
    if (deliveryMode === "home" && !selectedAddress) {
      alert("Please select or add a delivery address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare medicine array for API
      const medicineArray = Object.values(cart).map((item) => ({
        medicineName: item.name,
        discription: item.description || "",
        amount: (item.price * item.qty).toString(),
        qyt: item.qty.toString(),
      }));

      // Calculate total amount
      const totalAmount = Object.values(cart).reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );

      // Prepare address string
      const addressString = selectedAddress
        ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.pincode}`
        : "";

      // Build payload according to API structure
      const payload = {
        medicine: medicineArray,
        amount: totalAmount,
        deliveryMode: deliveryMode === "home" ? "home" : "pickup",
        userAddress:
          deliveryMode === "home" ? addressString : "Pickup at Counter",
      };

      // Add otherPatientDetails only if ordering for someone else
      if (orderFor === "other") {
        payload.otherPatientDetails = {
          id: selectedOther._id,
          name: selectedOther.name,
          category: selectedOther.type, // "member" | "pet"
          age: selectedOther.age || "",
          gender: selectedOther.gender || "",
        };
      }

      payload.userAddress = selectedAddress
        ? `${selectedAddress.address}, ${selectedAddress.area}, ${selectedAddress.city} - ${selectedAddress.pincode}`
        : "";

      console.log("payload", payload);

      // Call the API
      await onPlaceOrder(payload);
      
      // Show success state
      setOrderSuccess(true);
      
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalItems = Object.values(cart).reduce(
    (sum, item) => sum + item.qty,
    0
  );
  
  const totalPrice = Math.round(
    Object.values(cart).reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    )
  );

  if (!open) return null;

  // Success State Screen
  if (orderSuccess) {
    const handleViewOrders = () => {
      navigate('/orders');
      onClose();
    };

    return (
      <Dialog
        open={open}
        onClose={() => {}}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Order Placed Successfully!
            </h2>
            <p className="text-gray-600 mb-2">
              Your pharmacy order has been confirmed.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              You will receive updates about your order status.
            </p>
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Total Items:</span> {totalItems}
              </p>
              <p className="text-sm text-gray-700 mt-1">
                <span className="font-semibold">Total Amount:</span> ₹{totalPrice.toLocaleString()}
              </p>
            </div>
            <button
              onClick={handleViewOrders}
              className="w-full text-white py-3 rounded-xl hover:opacity-90 transition-colors font-semibold cursor-pointer"
              style={{
                background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)"
              }}
            >
              View My Orders
            </button>
          </div>
        </div>
      </Dialog>
    );
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="relative bg-white rounded-2xl w-full max-w-6xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div 
          className="px-6 py-4 text-white relative flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 50%, rgb(0, 101, 157) 100%)"
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl font-light transition-colors"
          >
            ×
          </button>
          <h2 className="text-2xl font-semibold">
            {step === 1 ? "Select Medicines" : "Review Order"}
          </h2>
          <p className="text-blue-100 text-sm mt-1">
            {step === 1
              ? "Search and add medicines to your order"
              : "Confirm your order and delivery details"}
          </p>
        </div>

        <div className="flex items-center justify-center px-6 py-4 bg-gray-50 border-b flex-shrink-0">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step >= 1
                  ? "text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
              style={step >= 1 ? {
                background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)"
              } : {}}
            >
              1
            </div>
            <div className="w-16 h-1 bg-gray-300 rounded">
              <div
                className={`h-full rounded transition-all duration-300 ${
                  step >= 2 ? "w-full" : "w-0"
                }`}
                style={step >= 2 ? {
                  background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)"
                } : {}}
              />
            </div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step >= 2
                  ? "text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
              style={step >= 2 ? {
                background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)"
              } : {}}
            >
              2
            </div>
          </div>
        </div>

        <div className="flex overflow-hidden flex-1">
          {/* Main Content - Left Side */}
          <div className="flex-1 p-6 overflow-y-auto">
            {step === 1 ? (
              <>
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Order For
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setOrderFor("self")}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        orderFor === "self"
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            orderFor === "self"
                              ? "border-blue-600 bg-blue-600"
                              : "border-gray-300"
                          }`}
                        >
                          {orderFor === "self" && (
                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                          )}
                        </div>
                        <span className="font-medium text-gray-800">
                          For Myself
                        </span>
                      </div>
                    </button>
                    <button
                      onClick={() => setOrderFor("other")}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        orderFor === "other"
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            orderFor === "other"
                              ? "border-blue-600 bg-blue-600"
                              : "border-gray-300"
                          }`}
                        >
                          {orderFor === "other" && (
                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                          )}
                        </div>
                        <span className="font-medium text-gray-800">
                          For Someone Else
                        </span>
                      </div>
                    </button>
                  </div>
                  {orderFor === "other" && (
                    <div className="mt-3 bg-gray-50 rounded-xl p-4 space-y-3">
                      {otherOptions.length === 0 ? (
                        <p className="text-sm text-gray-500 text-center">
                          No members 
                        </p>
                      ) : (
                        otherOptions.map((item) => (
                          <div
                            key={item._id}
                            onClick={() => setSelectedOther(item)}
                            className={`p-4 rounded-lg border cursor-pointer transition
            ${
              selectedOther?._id === item._id
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 bg-white hover:border-blue-400"
            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-semibold text-sm text-gray-800">
                                  {item.name}
                                </p>

                                {item.type === "member" ? (
                                  <p className="text-xs text-gray-500">
                                    {item.type === "member" ? "👤" : "🐾"}{" "}
                                    {item.gender} {renderAge(item.age)}
                                  </p>
                                ) : (
                                  <p className="text-xs text-gray-500">
                                    {item.type === "member" ? "👤" : "🐾"}{" "}
                                    {item.gender} {renderAge(item.age)}
                                  </p>
                                )}
                              </div>

                              {selectedOther?._id === item._id && (
                                <span className="text-blue-600 text-xs font-semibold">
                                  Selected
                                </span>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>

                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Search medicine by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 pl-11 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <svg
                    className="w-5 h-5 text-gray-400 absolute left-3 top-3.5 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                <div className="space-y-3 pr-2">
                  {filteredMedicines.length === 0 ? (
                    <div className="text-center py-12">
                      <svg
                        className="w-16 h-16 text-gray-300 mx-auto mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-gray-500 text-sm">No medicines found</p>
                    </div>
                  ) : (
                    filteredMedicines.map((med) => (
                      <div
                        key={med._id}
                        className="flex justify-between items-start border border-gray-200 p-4 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">
                            {med.name}
                          </p>
                          {med.description && (
                            <p className="text-xs text-gray-500 mt-1">
                              {med.description}
                            </p>
                          )}
                          <p className="text-blue-600 font-semibold mt-2">
                            ₹{med.price}
                          </p>
                        </div>
                        <button
                          onClick={() => addMedicine(med)}
                          className="ml-4 text-white w-10 h-10 rounded-lg hover:opacity-90 transition-colors font-semibold text-lg flex items-center justify-center shadow-sm"
                          style={{
                            background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)"
                          }}
                        >
                          +
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <Step2Content
                cart={cart}
                orderFor={orderFor}
                selectedOther={selectedOther}
                deliveryMode={deliveryMode}
                setDeliveryMode={setDeliveryMode}
                addresses={addresses}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
                handleOrder={handleOrder}
                setStep={setStep}
                totalPrice={totalPrice}
                removeMedicine={removeMedicine}
                isSubmitting={isSubmitting}
                navigate={navigate}
              />
            )}
          </div>

          {/* Cart Summary - Right Side */}
          {Object.keys(cart).length > 0 && (
            <div className="w-80 bg-gray-50 border-l border-gray-200 flex flex-col overflow-hidden">
              {/* Cart Header - Fixed */}
              <div className="px-6 pt-6 pb-4 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 text-lg">Cart Summary</h3>
                  <span className="text-sm bg-blue-600 text-white px-2 py-1 rounded-full">
                    {totalItems} item{totalItems !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Cart Items - Scrollable */}
              <div className="flex-1 overflow-y-auto px-6">
                <div className="space-y-3">
                  {Object.values(cart).map((item) => (
                    <div
                      key={item._id}
                      className="bg-white rounded-lg p-3 border border-gray-200"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium text-gray-800 text-sm flex-1 pr-2">
                          {item.name}
                        </p>
                        <button
                          onClick={() => removeMedicine(item._id)}
                          className="text-red-500 hover:text-red-700 text-lg font-semibold leading-none cursor-pointer"
                        >
                          ×
                        </button>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">
                          ₹{item.price} × {item.qty}
                        </span>
                        <span className="font-semibold text-gray-800">
                          ₹{(item.price * item.qty).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total and Button - Fixed at Bottom */}
              <div className="px-6 py-4 border-t border-gray-300 bg-gray-50 flex-shrink-0">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-gray-800">Total Amount</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>

                {step === 1 && (
                  <button
                    onClick={handleContinue}
                    className="w-full text-white py-3 rounded-xl hover:opacity-90 transition-colors font-semibold shadow-md cursor-pointer"
                    style={{
                      background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)"
                    }}
                  >
                    Continue to Delivery →
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
};

const Step2Content = ({
  cart,
  orderFor,
  selectedOther,
  deliveryMode,
  setDeliveryMode,
  addresses,
  selectedAddress,
  setSelectedAddress,
  handleOrder,
  setStep,
  totalPrice,
  removeMedicine,
  isSubmitting,
  navigate
}) => (
  <div className="space-y-6">
    <div>
      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        Order Information
      </h3>
      {orderFor === "other" && selectedOther && (
        <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
          Ordering for: <span className="font-semibold">{selectedOther.name}</span> • {renderAge(selectedOther.age)} • {selectedOther.gender}
        </p>
      )}
    </div>

    <div>
      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
          />
        </svg>
        Delivery Method
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setDeliveryMode("home")}
          disabled={isSubmitting}
          className={`p-4 rounded-xl border-2 transition-all text-left ${
            deliveryMode === "home"
              ? "border-blue-600 bg-blue-50"
              : "border-gray-200 hover:border-gray-300"
          } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                deliveryMode === "home"
                  ? "border-blue-600 bg-blue-600"
                  : "border-gray-300"
              }`}
            >
              {deliveryMode === "home" && (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
            <svg
              className={`w-6 h-6 ${
                deliveryMode === "home" ? "text-blue-600" : "text-gray-400"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
          <p className="font-semibold text-gray-800">Home Delivery</p>
          <p className="text-xs text-gray-500 mt-1">
            Delivered to your doorstep
          </p>
        </button>
        <button
          onClick={() => setDeliveryMode("pickup")}
          disabled={isSubmitting}
          className={`p-4 rounded-xl border-2 transition-all text-left ${
            deliveryMode === "pickup"
              ? "border-blue-600 bg-blue-50"
              : "border-gray-200 hover:border-gray-300"
          } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                deliveryMode === "pickup"
                  ? "border-blue-600 bg-blue-600"
                  : "border-gray-300"
              }`}
            >
              {deliveryMode === "pickup" && (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
            <svg
              className={`w-6 h-6 ${
                deliveryMode === "pickup" ? "text-blue-600" : "text-gray-400"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <p className="font-semibold text-gray-800">Pickup at Counter</p>
          <p className="text-xs text-gray-500 mt-1">
            Collect from our pharmacy
          </p>
        </button>
      </div>
    </div>

    {deliveryMode === "home" && (
      <div>
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Delivery Address
        </h3>
        <div className="space-y-3">
          {addresses?.length > 0 ? (
            addresses.map((a) => (
              <div
                key={a._id}
                onClick={() => !isSubmitting && setSelectedAddress(a)}
                className={`p-4 border-2 rounded-xl transition-all ${
                  selectedAddress?._id === a._id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                } ${isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                      selectedAddress?._id === a._id
                        ? "border-blue-600 bg-blue-600"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedAddress?._id === a._id && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{a.address}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {a.area}, {a.city} - {a.pincode}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <svg
                className="w-12 h-12 text-gray-400 mx-auto mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="text-sm text-gray-500 mb-4">
                No saved addresses found
              </p>
              <button
                onClick={() => navigate('/manageAddresses')}
                className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors font-semibold cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)"
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Address
              </button>
            </div>
          )}
        </div>
      </div>
    )}

    <div className="flex gap-3 pt-4">
      <button
        onClick={() => setStep(1)}
        disabled={isSubmitting}
        className={`flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors font-semibold ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        ← Back
      </button>
      <button
        onClick={handleOrder}
        disabled={isSubmitting}
        className={`flex-1 text-white py-3 rounded-xl hover:opacity-90 transition-colors font-semibold shadow-md flex items-center justify-center gap-2 ${
          isSubmitting ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
        }`}
        style={{
          background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)"
        }}
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Placing Order...
          </>
        ) : (
          "Place Order"
        )}
      </button>
    </div>
  </div>
);

export default SelectMedicineModal;