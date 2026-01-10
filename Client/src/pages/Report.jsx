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
import { getToken } from "../utils/token.js";
import { getDataReport } from "../api/report";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { formatPrice } from "../utils/format.js";

const Report = () => {
  const token = getToken();

  const now = new Date();

  const currentYear = now.getFullYear();
  const currentMonth = String(now.getMonth() + 1).padStart(2, "0");

  const startDate = `${currentYear}-${currentMonth}`;

  const [reportData, setReportData] = useState({});

  const fetchDataReport = async () => {
    const response = await getDataReport(token);
    const responseBody = await response.json();
    console.log(responseBody.payload);

    if (responseBody.success) {
      setReportData(responseBody.payload);
    } else {
      toast.error(responseBody.message);
    }
  };

  const getMaxRevenue = () => {
    return Math.max(...currentData.dailyRevenue.map((d) => d.revenue));
  };

  useEffect(() => {
    fetchDataReport();
  }, []);

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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Pendapatan */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-linear-to-br from-green-50 to-green-100 p-3 rounded-lg">
              <TrendingUp className="text-green-600" size={24} />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-2">Total Pendapatan</p>
          <h3 className="text-3xl font-bold text-gray-900">
            {formatPrice(reportData.total_pendapatan)}
          </h3>
          <p className="text-xs text-gray-500 mt-3">Periode {startDate}</p>
        </div>

        {/* Total Transaksi */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 rounded-lg">
              <ShoppingCart className="text-blue-600" size={24} />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-2">Total Transaksi</p>
          <h3 className="text-3xl font-bold text-gray-900">
            {reportData.total_transaksi}
          </h3>
          <p className="text-xs text-gray-500 mt-3">Periode {startDate}</p>
        </div>

        {/* Total Produk Terjual */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-linear-to-br from-purple-50 to-purple-100 p-3 rounded-lg">
              <BarChart3 className="text-purple-600" size={24} />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-2">Produk Terjual</p>
          <h3 className="text-3xl font-bold text-gray-900">
            {reportData.total_produk}
          </h3>
          <p className="text-xs text-gray-500 mt-3">Total unit terjual</p>
        </div>

        {/* Rata-rata Transaksi */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-linear-to-br from-orange-50 to-orange-100 p-3 rounded-lg">
              <Users className="text-orange-600" size={24} />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-2">Rata-rata Transaksi</p>
          <h3 className="text-3xl font-bold text-gray-900">
            {formatPrice(reportData.avg_transaksi)}
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
            {/* {currentData.dailyRevenue.map((item, index) => (
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
            ))} */}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">
            Produk Terlaris
          </h3>
          <div className="space-y-4">
            {/* {currentData.topProducts.slice(0, 5).map((product, index) => (
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
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
