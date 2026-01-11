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
import { getChartReport, getDataReport } from "../api/report";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { formatPrice } from "../utils/format.js";
import { Chart } from "../components/chart.jsx";

const Report = () => {
  const token = getToken();

  const now = new Date();

  const currentYear = now.getFullYear();
  const currentMonth = String(now.getMonth() + 1).padStart(2, "0");

  const startDate = `${currentYear}-${currentMonth}`;

  const [reportData, setReportData] = useState({});
  const [chartData, setChartData] = useState([]);

  const fetchDataReport = async () => {
    const response = await getDataReport(token);
    const responseBody = await response.json();

    if (responseBody.success) {
      setReportData(responseBody.payload);
    } else {
      toast.error(responseBody.message);
    }
  };

  const fetchChartReport = async () => {
    const response = await getChartReport(token);
    const responseBody = await response.json();

    if (responseBody.success) {
      setChartData(responseBody.payload);
    } else {
      toast.error(responseBody.message);
    }
  };

  const stats = chartData.reduce(
    (acc, item) => {
      const value = Number(item.total_pendapatan);

      if (!acc.max || value > acc.max.value) {
        acc.max = { value, tanggal: item.tanggal };
      }

      if (!acc.min || value < acc.min.value) {
        acc.min = { value, tanggal: item.tanggal };
      }

      acc.sum += value;
      return acc;
    },
    { max: null, min: null, sum: 0 }
  );

  const avg = chartData.length ? Math.round(stats.sum / chartData.length) : 0;

  useEffect(() => {
    fetchDataReport();
    fetchChartReport();
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
          {chartData.length > 0 ? (
            <div className="space-y-4">
              <Chart dataChart={chartData} />
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center text-gray-400">
              <p>Tidak ada data tersedia</p>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">
            Ringkasan Periode
          </h3>
          {chartData.length > 0 ? (
            <div className="space-y-4">
              {/* Tertinggi */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <span className="text-gray-600">
                  Hari dengan Pendapatan Tertinggi
                </span>
                <div className="text-right">
                  <p className="font-bold text-blue-600 text-lg">
                    {formatPrice(stats.max?.value || 0)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {stats.max &&
                      new Date(stats.max.tanggal).toLocaleDateString("id-ID", {
                        timeZone: "UTC",
                      })}
                  </p>
                </div>
              </div>

              {/* Terendah */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <span className="text-gray-600">
                  Hari dengan Pendapatan Terendah
                </span>
                <div className="text-right">
                  <p className="font-bold text-orange-600 text-lg">
                    {formatPrice(stats.min?.value || 0)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {stats.min &&
                      new Date(stats.min.tanggal).toLocaleDateString("id-ID", {
                        timeZone: "UTC",
                      })}
                  </p>
                </div>
              </div>

              {/* Rata-rata */}
              <div className="flex items-center justify-between">
                <span className="text-gray-600">
                  Rata-rata Pendapatan Harian
                </span>
                <p className="font-bold text-green-600 text-lg">
                  {formatPrice(avg)}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-40 flex items-center justify-center text-gray-400">
              <p>Tidak ada data tersedia</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;
