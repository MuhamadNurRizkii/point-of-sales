import React from "react";
import { ShoppingBag, TrendingUp, Package, DollarSign } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Transaksi",
      value: "1,234",
      icon: TrendingUp,
      color: "bg-green-500",
      lightColor: "bg-green-50",
      textColor: "text-green-600",
      change: "+8% dari bulan lalu",
    },
    {
      title: "Produk Terjual",
      value: "5,678",
      icon: Package,
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
      textColor: "text-purple-600",
      change: "+15% dari bulan lalu",
    },
    {
      title: "Pendapatan",
      value: "Rp 125.5M",
      icon: DollarSign,
      color: "bg-orange-500",
      lightColor: "bg-orange-50",
      textColor: "text-orange-600",
      change: "+20% dari bulan lalu",
    },
  ];

  return (
    <div className="p-8 w-full min-h-screen bg-linear-to-br from-gray-50 to-gray-100 overflow-hidden">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Selamat datang kembali! Berikut adalah ringkasan penjualan Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
            >
              {/* Header dengan Icon */}
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.lightColor} p-3 rounded-lg`}>
                  <IconComponent className={`${stat.textColor} w-6 h-6`} />
                </div>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  ↑ Naik
                </span>
              </div>

              {/* Title */}
              <h3 className="text-gray-600 text-sm font-medium mb-2">
                {stat.title}
              </h3>

              {/* Value */}
              <p className="text-3xl font-bold text-gray-900 mb-3">
                {stat.value}
              </p>

              {/* Change Info */}
              <p className="text-xs text-gray-500">{stat.change}</p>

              {/* Progress Bar */}
              <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
                <div
                  className={`${stat.color} h-1 rounded-full`}
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Penjualan Terbaru
          </h2>
          <div className="text-gray-500 text-center py-8">
            <p>Data penjualan terbaru akan ditampilkan di sini</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Produk Populer
          </h2>
          <div className="text-gray-500 text-center py-8">
            <p>Produk terpopuler akan ditampilkan di sini</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
