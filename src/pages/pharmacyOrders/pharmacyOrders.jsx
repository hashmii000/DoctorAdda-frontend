import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Phone,
  Mail,
  Package,
  CreditCard,
  X,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Filter,
} from "lucide-react";
import { useSelector } from "react-redux";

const PharmacyOrders = () => {
  const userData = useSelector((state) => state?.user?.userData?.userData);

  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    status: "all",
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [appointments, filters]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://doctors-adda-back.onrender.com/api/pharmacyBooking/getAll?userId=${userData._id}`
      );
      const data = await response.json();

      if (data.statusCode === 200) {
        setAppointments(data.data.appointments);
      } else {
        setError("Failed to fetch appointments");
      }
    } catch (err) {
      setError("Error loading appointments");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...appointments];

    // Filter by date range
    if (filters.fromDate) {
      const fromDate = new Date(filters.fromDate);
      fromDate.setHours(0, 0, 0, 0);
      filtered = filtered.filter((app) => {
        const appDate = new Date(app.createdAt);
        appDate.setHours(0, 0, 0, 0);
        return appDate >= fromDate;
      });
    }

    if (filters.toDate) {
      const toDate = new Date(filters.toDate);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter((app) => {
        const appDate = new Date(app.createdAt);
        return appDate <= toDate;
      });
    }

    // Filter by status
    if (filters.status !== "all") {
      if (filters.status === "pending") {
        filtered = filtered.filter((app) => app.status === "Pending");
      } else if (filters.status === "accepted") {
        filtered = filtered.filter((app) => app.status === "Accepted");
      } else if (filters.status === "confirmed") {
        // Confirmed includes Rejected, Completed, and any other status except Pending and Accepted
        filtered = filtered.filter(
          (app) => app.status !== "Pending" && app.status !== "Accepted"
        );
      }
    }

    setFilteredAppointments(filtered);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      fromDate: "",
      toDate: "",
      status: "all",
    });
  };

  const calculateTotal = (medicines) => {
    return medicines
      .reduce((sum, med) => sum + parseFloat(med.amount) * parseInt(med.qyt), 0)
      .toFixed(2);
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Accepted: "bg-green-100 text-green-800 border-green-200",
      Rejected: "bg-red-100 text-red-800 border-red-200",
      Completed: "bg-blue-100 text-blue-800 border-blue-200",
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-4 h-4" />;
      case "Accepted":
        return <CheckCircle className="w-4 h-4" />;
      case "Rejected":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const handlePayment = async (orderId) => {
    setActionLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      alert(`Payment processed for order ${orderId}`);
      setActionLoading(false);
      setSelectedOrder(null);
      fetchAppointments();
    }, 1500);
  };

  const handleReject = async (orderId) => {
    setActionLoading(true);
    // Simulate rejection
    setTimeout(() => {
      alert(`Order ${orderId} rejected`);
      setActionLoading(false);
      setSelectedOrder(null);
      fetchAppointments();
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (selectedOrder) {
    const total = calculateTotal(selectedOrder.medicine);
    const isAccepted = selectedOrder.status === "Accepted";

    return (
      <div className="min-h-screen bg-gray-50 p-4 pt-17">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedOrder(null)}
            className="mb-4 flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ChevronRight className="w-5 h-5 rotate-180 mr-1" />
            Back to Orders
          </button>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Order Details</h1>
                  <p className="text-blue-100">
                    Order ID: {selectedOrder.appointmentId}
                  </p>
                </div>
                <div
                  className={`px-4 py-2 rounded-full border flex items-center gap-2 ${getStatusColor(
                    selectedOrder.status
                  )}`}
                >
                  {getStatusIcon(selectedOrder.status)}
                  <span className="font-semibold">{selectedOrder.status}</span>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Pharmacy Info */}
              <div className="border-b pb-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Pharmacy Information
                </h2>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-start">
                    <Package className="w-5 h-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {selectedOrder.pharmacy.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-gray-600">
                      {selectedOrder.pharmacy.address}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
                    <p className="text-gray-600">
                      {selectedOrder.pharmacy.phone}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
                    <p className="text-gray-600">
                      {selectedOrder.pharmacy.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="border-b pb-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Delivery Address
                </h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-gray-600">{selectedOrder.userAddress}</p>
                  </div>
                </div>
              </div>

              {/* Medicines */}
              <div className="border-b pb-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Ordered Medicines
                </h2>
                <div className="space-y-3">
                  {selectedOrder.medicine.map((med) => (
                    <div
                      key={med._id}
                      className="bg-gray-50 rounded-lg p-4 flex justify-between items-start"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {med.medicineName}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {med.discription}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                          Quantity: {med.qyt}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">
                          ₹{med.amount}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total - Only show for Accepted orders */}
              {isAccepted && selectedOrder.payableAmount && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">
                      Payable Amount
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      ₹{selectedOrder.payableAmount}
                    </span>
                  </div>
                </div>
              )}

              {/* Payment Status */}
              {isAccepted && (
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                  <span className="text-gray-600">Payment Status:</span>
                  <span
                    className={`font-semibold ${
                      selectedOrder.paymentStatus === "Pending"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {selectedOrder.paymentStatus}
                  </span>
                </div>
              )}

              {/* Pending Status Message */}
              {selectedOrder.status === "Pending" && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                  <Clock className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-yellow-800 mb-1">
                      Order Pending
                    </p>
                    <p className="text-sm text-yellow-700">
                      Your order is being reviewed by the pharmacy. The final
                      amount will be confirmed once they accept your order.
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons - Only for Accepted orders */}
              {isAccepted && selectedOrder.paymentStatus === "Pending" && (
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => handlePayment(selectedOrder.appointmentId)}
                    disabled={actionLoading}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <CreditCard className="w-5 h-5" />
                    {actionLoading ? "Processing..." : "Proceed to Payment"}
                  </button>
                  <button
                    onClick={() => handleReject(selectedOrder.appointmentId)}
                    disabled={actionLoading}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <X className="w-5 h-5" />
                    {actionLoading ? "Processing..." : "Reject Order"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 pt-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            My Pharmacy Orders
          </h1>
          <p className="text-gray-600">View and manage your medicine orders</p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              {showFilters ? "Hide" : "Show"} Filters
            </button>
          </div>

          {showFilters && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* From Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From Date
                  </label>
                  <input
                    type="date"
                    value={filters.fromDate}
                    onChange={(e) =>
                      handleFilterChange("fromDate", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* To Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To Date
                  </label>
                  <input
                    type="date"
                    value={filters.toDate}
                    onChange={(e) =>
                      handleFilterChange("toDate", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="confirmed">
                      Confirmed (Completed/Rejected)
                    </option>
                  </select>
                </div>
              </div>

              {/* Clear Filters Button */}
              {(filters.fromDate ||
                filters.toDate ||
                filters.status !== "all") && (
                <div className="flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredAppointments.length} of {appointments.length} orders
        </div>

        {filteredAppointments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              No orders found
            </h2>
            <p className="text-gray-500">
              {appointments.length === 0
                ? "You haven't placed any pharmacy orders yet."
                : "No orders match your current filters. Try adjusting your search criteria."}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAppointments.map((appointment) => {
              const total = calculateTotal(appointment.medicine);
              const orderDate = new Date(appointment.createdAt);

              return (
                <div
                  key={appointment._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                  onClick={() => setSelectedOrder(appointment)}
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Order ID</p>
                        <p className="font-semibold text-gray-800">
                          {appointment.appointmentId}
                        </p>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {getStatusIcon(appointment.status)}
                        {appointment.status}
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Package className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="truncate">
                          {appointment.pharmacy.name}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{orderDate.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Package className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{appointment.medicine.length} item(s)</span>
                      </div>
                    </div>

                    <div className="border-t pt-4 flex justify-between items-center">
                      {appointment?.PaybleAmount  ? <div>
                        <p className="text-xs text-gray-500 mb-1">
                          Total Amount
                        </p>
                        <p className="text-lg font-bold text-blue-600">
                          ₹{total}
                        </p>
                      </div>: <></>}
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PharmacyOrders;
