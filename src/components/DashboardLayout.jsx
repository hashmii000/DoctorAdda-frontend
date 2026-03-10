import React from "react";
import SidebarNav from "./SidebarNav";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <SidebarNav />

      {/* Main content */}
      <div className="flex-1 p-6">
        <Outlet /> {/* This renders the nested page content */}
      </div>
    </div>
  );
};

export default DashboardLayout;
