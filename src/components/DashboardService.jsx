import React, { useState, useEffect } from "react";
import { Plus, X, Settings, CreditCard, Truck, Save } from "lucide-react";

const DashboardService = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const [services, setServices] = useState([{ name: "" }]);
  const [codEnabled, setCodEnabled] = useState(true);
  const [onlinePaymentEnabled, setOnlinePaymentEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateServiceName = (index, value) => {
    setServices((prev) =>
      prev.map((s, i) => (i === index ? { ...s, name: value } : s))
    );
  };

  const addService = () => {
    setServices((prev) => [...prev, { name: "" }]);
  };

  const removeService = (index) => {
    if (services.length > 1) {
      setServices((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="md:w-[90%] mx-auto py-8  px-4 sm:px-6 lg:px-2">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Services & Preferences
            </h1>
          </div>
          <p className="text-gray-600">
            Configure your service offerings and payment preferences
          </p>
        </div>

        <div className="space-y-8">
          {/* Services Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
              <h2 className="text-base md:text-xl font-semibold text-gray-800 flex items-center gap-2">
                <div className="p-1 bg-blue-100 rounded">
                  <Plus className="h-4 w-4 text-blue-600" />
                </div>
                Services Offered
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Add and manage your service offerings
              </p>
            </div>

            <div className="md:p-6">
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="group relative">
                    <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-4 border-2 border-transparent hover:border-blue-200 transition-all duration-200">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Service {index + 1}
                          </label>
                          <input
                            value={service.name}
                            onChange={(e) =>
                              updateServiceName(index, e.target.value)
                            }
                            placeholder="Enter service name (e.g., Home Cleaning, Web Development)"
                            className="w-full bg-white text-sm px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-800 placeholder-gray-400"
                          />
                        </div>
                        {services.length > 1 && (
                          <button
                            onClick={() => removeService(index)}
                            className="mt-8 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={addService}
                className="mt-6 flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 text-sm md:text-base font-semibold rounded-lg hover:bg-blue-50 transition-all duration-200"
              >
                <Plus className="h-4 w-4" />
                Add Another Service
              </button>
            </div>
          </div>

          {/* Payment Preferences */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* COD Preference */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-4 border-b border-gray-100">
                <h3 className="md:text-lg text-base font-semibold text-gray-800 flex items-center gap-2">
                  <div className="p-1 bg-orange-100 rounded">
                    <Truck className="h-4 w-4 text-orange-600" />
                  </div>
                  Cash on Delivery
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Accept COD payments
                </p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    className={`md:py-3 md:px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      codEnabled
                        ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-green-200"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200"
                    }`}
                    onClick={() => setCodEnabled(true)}
                  >
                    Yes
                  </button>
                  <button
                    className={`md:py-3 md:px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      !codEnabled
                        ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-200"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200"
                    }`}
                    onClick={() => setCodEnabled(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>

            {/* Online Payment */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
                <h3 className="md:text-lg text-base font-semibold text-gray-800 flex items-center gap-2">
                  <div className="p-1 bg-purple-100 rounded">
                    <CreditCard className="h-4 w-4 text-purple-600" />
                  </div>
                  Online Payment
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Accept digital payments
                </p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    className={`md:py-3 md:px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      onlinePaymentEnabled
                        ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-green-200"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200"
                    }`}
                    onClick={() => setOnlinePaymentEnabled(true)}
                  >
                    Yes
                  </button>
                  <button
                    className={`md:py-3 md:px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      !onlinePaymentEnabled
                        ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-200"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200"
                    }`}
                    onClick={() => setOnlinePaymentEnabled(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <button
              onClick={handleSave}
              disabled={isLoading} 
              className="w-full md:py-4 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-teal-500  to-teal-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardService;
