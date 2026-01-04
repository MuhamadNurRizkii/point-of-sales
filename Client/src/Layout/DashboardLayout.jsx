import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";

import {
  Home,
  Package,
  Receipt,
  BarChart3,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { getToken, parsingToken } from "../utils/token";

const DashboardLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const token = getToken();
  const decoded = parsingToken(token);

  const menuItems = [
    {
      label: "Dashboard",
      to: "/dashboard",
      icon: Home,
    },
    {
      label: "Products",
      to: "/dashboard/products",
      icon: Package,
    },
    {
      label: "Transaction",
      to: "/dashboard/transactions",
      icon: Receipt,
    },
    {
      label: "Report",
      to: "/dashboard/report",
      icon: BarChart3,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } fixed left-0 top-0 h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 text-white transition-all duration-300 ease-in-out shadow-xl overflow-y-auto`}
      >
        {/* Header Sidebar */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700 overflow-hidden">
          {sidebarOpen && (
            <div>
              <h1 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                POS
              </h1>
              <p className="text-xs text-slate-400 mt-1">Point of Sales</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-2 p-4 mt-4">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.to;

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-linear-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <IconComponent size={20} className="shrink-0" />
                {sidebarOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Sidebar */}
        <div className="relative bottom-0 left-0 right-0 p-4 ">
          <button className="flex items-center gap-4 px-4 py-3 w-full rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-200">
            <LogOut size={20} className="shrink-0" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main
        className={`${
          sidebarOpen ? "ml-64" : "ml-20"
        } flex-1 overflow-auto transition-all duration-300 ease-in-out`}
      >
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {menuItems.find((item) => item.to === location.pathname)
                  ?.label || "Dashboard"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Manage your sales and inventory
              </p>
            </div>
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-gray-800">
                Hello, {decoded.username}
              </h2>
              <div className="w-10 h-10 bg-linear-to-br from-blue-400 to-purple-400 rounded-full cursor-pointer hover:shadow-lg transition-shadow"></div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
