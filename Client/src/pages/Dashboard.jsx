import React from "react";
import { ShoppingBag, TrendingUp, Package, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { getToken } from "../utils/token";
import { getDatadashboard } from "../api/dashboard";
import { formatPrice } from "../utils/format";
import DataTable from "../components/DataTable";

const Dashboard = () => {
  const [data, setData] = useState({
    produk_terjual: 0,
    total_transaksi: 0,
    pendapatan: 0,
  });
  const [dataTransaction, setDataTransaction] = useState([]);
  const [productPopuler, setProductPopuler] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = getToken();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getDatadashboard(token);
      const responseBody = await response.json();

      if (responseBody.success) {
        setData(responseBody.payload);
        setDataTransaction(responseBody.dataTransaction);
        setProductPopuler(responseBody.productPopuler);
      } else {
        toast.error(responseBody.message);
      }
    } catch (error) {
      toast.error("Gagal memuat data dashboard");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stats = [
    {
      title: "Total Transaksi",
      value: data.total_transaksi || 0,
      icon: TrendingUp,
      color: "bg-green-500",
      lightColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Produk Terjual",
      value: data.produk_terjual || 0,
      icon: Package,
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "Pendapatan",
      value: formatPrice(data.pendapatan || 0),
      icon: DollarSign,
      color: "bg-orange-500",
      lightColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  return (
    <div className="p-8 w-full min-h-screen bg-linear-to-br from-gray-50 to-gray-100 overflow-hidden">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Selamat datang kembali! Berikut adalah ringkasan penjualan bulan ini.
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
              </div>
              {/* Title */}
              <h3 className="text-gray-600 text-sm font-medium mb-2">
                {stat.title}
              </h3>
              {/* Value */}
              <p className="text-3xl font-bold text-gray-900 mb-3">
                {stat.value}
              </p>

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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Penjualan Terbaru
            </h2>
            <span className="text-sm text-gray-500">
              {dataTransaction.length} transaksi
            </span>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <p className="text-gray-500 mt-2">Memuat data...</p>
            </div>
          ) : dataTransaction.length > 0 ? (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-linear-to-r from-blue-50 via-blue-50 to-blue-50 border-b-2 border-blue-200">
                    <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">
                      ID Transaksi
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">
                      Tanggal
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">
                      Kasir
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-blue-900">
                      Jumlah
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">
                      Metode
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dataTransaction.map((transaction, index) => (
                    <tr
                      key={index}
                      className="hover:bg-blue-50 transition-all duration-200 hover:shadow-sm"
                    >
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded text-xs font-bold">
                          TRX00{transaction.id || "-"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <span className="font-medium">
                          {transaction.date
                            ? new Date(transaction.date).toLocaleDateString(
                                "id-ID"
                              )
                            : "-"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <span className="font-medium">
                          {transaction.nama_depan +
                            " " +
                            transaction.nama_belakang || "-"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm font-bold text-gray-900 text-right">
                        <span className="text-green-600">
                          {formatPrice(transaction.total || 0)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-block ${
                            transaction.payment_method === "Tunai"
                              ? "bg-emerald-100 text-emerald-700"
                              : transaction.payment_method === "Transfer"
                              ? "bg-cyan-100 text-cyan-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {transaction.payment_method || "-"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Belum ada transaksi</p>
            </div>
          )}
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Produk Populer</h2>
            <span className="text-sm text-gray-500">
              {productPopuler.length} produk
            </span>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <p className="text-gray-500 mt-2">Memuat data...</p>
            </div>
          ) : productPopuler.length > 0 ? (
            <div className="space-y-3">
              {productPopuler.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-linear-to-r from-blue-50 to-transparent rounded-lg hover:shadow-md transition-all duration-200 border border-blue-100"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {product.total_terjual} unit terjual
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                      #{index + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Belum ada data produk populer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
