/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { getRequest } from "../Helpers";

const DashboardButton = ({ userDetails }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const getUpgraded = async () => {
    try {
      setLoading(true);

      // ✅ Single generic API call with await
      const response = await getRequest(
        `${
          userDetails?.upgradeAccountType == "Diagnostic"
            ? "Diagnostics"
            : userDetails?.upgradeAccountType
        }/${userDetails?.upgradeAccountId}`
      );

      const profileData = response?.data?.data;
      console.log("profileData", profileData);

      if (profileData?.isApprove === "NotApprove") {
        navigate("/verification");
      } else if (profileData?.isApprove === "Approved") {
        // ✅ Routing map
        const routes = {
          Doctor: "/doctor-dashboard",
          Ambulance: "/ambulance-dashboard",
          Hospital: "/hospital-dashboard",
          Pharmacy: "/pharmacy-dashboard",
          Diagnostic: "/diagnostic-dashboard",
        };

        navigate(routes[profileData?.accountType] || "/dashboard");
      }
    } catch (error) {
      console.error("Dashboard navigation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={getUpgraded}
      disabled={loading}
      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
    >
      <User className="w-4 h-4" />
      {loading ? "Loading..." : "Dashboard"}
    </button>
  );
};

export default DashboardButton;
