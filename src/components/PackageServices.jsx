import React, { useState } from "react";
import { ArrowLeft, Plus, ServerIcon, Trash2 } from "lucide-react";

const PackageServices = () => {
  const [packages, setPackages] = useState([
    { id: 1, name: ".net", desc: "Shhshshs no", price: 80000 },
  ]);

  const [services, setServices] = useState([
    { id: 1, name: "Website", price: 0 },
  ]);

  const handleDeletePackage = (id) => {
    setPackages(packages.filter((pkg) => pkg.id !== id));
  };

  const handleDeleteService = (id) => {
    setServices(services.filter((srv) => srv.id !== id));
  };

  return (
    <div className="md:p-4 p-2 md:w-[90%] mx-auto">
      {/* Header */}
      <div className="flex items-center mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-green-400 rounded-xl flex items-center justify-center shadow-lg">
          <ServerIcon className="w-5 h-5 text-white" />
        </div>
        <h2 className="ml-4 md:text-xl text-lg font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
          Packages And Services  
        </h2>
      </div>

      {/* Packages Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-800">
            Packages ({packages.length})
          </h2>
          <button className="p-2 border rounded-full text-cyan-600 hover:bg-cyan-50 transition">
            <Plus size={20} />
          </button>
        </div>

        <div className="space-y-3">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-gray-50 rounded-xl px-4 py-3 flex justify-between items-center shadow-sm"
            >
              <div>
                <p className="font-medium text-gray-800">{pkg.name}</p>
                {pkg.desc && (
                  <p className="text-sm text-gray-500">{pkg.desc}</p>
                )}
                <p className="text-cyan-600 font-semibold">
                  ₹{pkg.price.toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleDeletePackage(pkg.id)}
                className="p-2 rounded-full bg-red-50 hover:bg-red-100 transition"
              >
                <Trash2 className="text-red-500" size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-800">
            Services ({services.length})
          </h2>
          <button className="p-2 border rounded-full text-cyan-600 hover:bg-cyan-50 transition">
            <Plus size={20} />
          </button>
        </div>

        <div className="space-y-3">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="bg-gray-50 rounded-xl px-4 py-3 flex justify-between items-center shadow-sm"
            >
              <div>
                <p className="font-medium text-gray-800">{srv.name}</p>
                <p className="text-cyan-600 font-semibold">
                  ₹{srv.price.toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleDeleteService(srv.id)}
                className="p-2 rounded-full bg-red-50 hover:bg-red-100 transition"
              >
                <Trash2 className="text-red-500" size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageServices;
