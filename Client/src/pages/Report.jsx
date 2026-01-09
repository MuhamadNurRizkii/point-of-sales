import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  ShoppingCart,
  Calendar,
  Download,
  Filter,
  ChevronDown,
} from "lucide-react";

const Report = () => {
  const [selectedMonth, setSelectedMonth] = useState("2025-12");
  const [selectedMetric, setSelectedMetric] = useState("all");

  const monthOptions = [
    { value: "2025-10", label: "Oktober 2025" },
    { value: "2025-11", label: "November 2025" },
    { value: "2025-12", label: "Desember 2025" },
  ];

  const metrics = ["all", "revenue", "transactions", "products"];

  const reportData = {
    "2025-12": {
      totalRevenue: 125500000,
      totalTransactions: 1234,
      productsCount: 5678,
      averageTransaction: 101822,
      topProducts: [
        { name: "Laptop Gaming", quantity: 45, revenue: 562500000 },
        { name: "Monitor 27 Inch", quantity: 32, revenue: 102400000 },
        { name: "Mechanical Keyboard", quantity: 89, revenue: 133500000 },
        { name: "Wireless Mouse", quantity: 156, revenue: 39000000 },
        { name: "USB-C Cable", quantity: 342, revenue: 25650000 },
      ],
      dailyRevenue: [
        { date: "1", revenue: 4200000 },
        { date: "2", revenue: 5100000 },
        { date: "3", revenue: 3800000 },
        { date: "4", revenue: 6200000 },
        { date: "5", revenue: 4900000 },
        { date: "6", revenue: 5600000 },
        { date: "7", revenue: 6800000 },
        { date: "8", revenue: 5400000 },
        { date: "9", revenue: 7100000 },
        { date: "10", revenue: 6300000 },
        { date: "11", revenue: 7900000 },
        { date: "12", revenue: 8400000 },
        { date: "13", revenue: 6700000 },
        { date: "14", revenue: 7200000 },
      ],
      transactionTrend: [
        { date: "Dec 1", count: 45 },
        { date: "Dec 4", count: 58 },
        { date: "Dec 7", count: 62 },
        { date: "Dec 10", count: 71 },
        { date: "Dec 13", count: 89 },
      ],
      categoryBreakdown: [
        { name: "Electronics", percentage: 65, revenue: 81575000 },
        { name: "Accessories", percentage: 35, revenue: 43925000 },
      ],
    },
  };

  const currentData = reportData[selectedMonth];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getMaxRevenue = () => {
    return Math.max(...currentData.dailyRevenue.map((d) => d.revenue));
  };

  return (
    <div className="w-full">
      {/* Header dengan Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Laporan Penjualan
          </h1>
          <p className="text-gray-600 mt-2">
            Analisis mendalam tentang penjualan dan performa
          </p>
        </div>
        <button className="flex items-center gap-2 bg-linear-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-medium">
          <Download size={20} />
          Download Report
        </button>
      </div>

      {/* Filter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="relative">
          <Calendar
            className="absolute left-3 top-3.5 text-gray-400"
            size={20}
          />
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer transition-all"
          >
            {monthOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-3.5 text-gray-400 pointer-events-none"
            size={20}
          />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Pendapatan */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-linear-to-br from-green-50 to-green-100 p-3 rounded-lg">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
              ↑ 15%
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-2">Total Pendapatan</p>
          <h3 className="text-3xl font-bold text-gray-900">
            {formatPrice(currentData.totalRevenue)}
          </h3>
          <p className="text-xs text-gray-500 mt-3">Periode {selectedMonth}</p>
        </div>

        {/* Total Transaksi */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 rounded-lg">
              <ShoppingCart className="text-blue-600" size={24} />
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              ↑ 8%
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-2">Total Transaksi</p>
          <h3 className="text-3xl font-bold text-gray-900">
            {currentData.totalTransactions.toLocaleString("id-ID")}
          </h3>
          <p className="text-xs text-gray-500 mt-3">Periode {selectedMonth}</p>
        </div>

        {/* Total Produk Terjual */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-linear-to-br from-purple-50 to-purple-100 p-3 rounded-lg">
              <BarChart3 className="text-purple-600" size={24} />
            </div>
            <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
              ↑ 12%
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-2">Produk Terjual</p>
          <h3 className="text-3xl font-bold text-gray-900">
            {currentData.productsCount.toLocaleString("id-ID")}
          </h3>
          <p className="text-xs text-gray-500 mt-3">Total unit terjual</p>
        </div>

        {/* Rata-rata Transaksi */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-linear-to-br from-orange-50 to-orange-100 p-3 rounded-lg">
              <Users className="text-orange-600" size={24} />
            </div>
            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
              →
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-2">Rata-rata Transaksi</p>
          <h3 className="text-3xl font-bold text-gray-900">
            {formatPrice(currentData.averageTransaction)}
          </h3>
          <p className="text-xs text-gray-500 mt-3">Per transaksi</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Daily Revenue Chart */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">
            Pendapatan Harian
          </h3>
          <div className="flex items-end justify-between h-64 gap-2">
            {currentData.dailyRevenue.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="relative h-full w-full flex items-end justify-center">
                  <div
                    className="w-full bg-linear-to-t from-blue-500 to-blue-400 rounded-t transition-all hover:shadow-lg rounded-sm"
                    style={{
                      height: `${(item.revenue / getMaxRevenue()) * 100}%`,
                      minHeight: "4px",
                    }}
                  >
                    <div className="opacity-0 hover:opacity-100 text-xs font-bold text-white text-center -mt-6 transition-opacity">
                      {Math.round((item.revenue / 1000000) * 10) / 10}M
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">{item.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">
            Produk Terlaris
          </h3>
          <div className="space-y-4">
            {currentData.topProducts.slice(0, 5).map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="font-semibold text-gray-800">{product.name}</p>
                  <p className="text-sm text-gray-500">
                    {product.quantity} unit terjual
                  </p>
                </div>
                <p className="font-bold text-transparent bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text">
                  {formatPrice(product.revenue)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
