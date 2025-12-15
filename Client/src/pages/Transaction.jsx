import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  Eye,
  Download,
  Filter,
  Calendar,
} from "lucide-react";

const Transaction = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDateRange, setSelectedDateRange] = useState("all");

  const [transactions, setTransactions] = useState([
    {
      id: "TRX001",
      date: "2025-12-14",
      customer: "Budi Santoso",
      items: 3,
      amount: 3750000,
      status: "Completed",
      paymentMethod: "Cash",
    },
    {
      id: "TRX002",
      date: "2025-12-14",
      customer: "Siti Nurhaliza",
      items: 5,
      amount: 5200000,
      status: "Completed",
      paymentMethod: "Debit Card",
    },
    {
      id: "TRX003",
      date: "2025-12-13",
      customer: "Ahmad Wijaya",
      items: 2,
      amount: 2100000,
      status: "Pending",
      paymentMethod: "Credit Card",
    },
    {
      id: "TRX004",
      date: "2025-12-13",
      customer: "Dewi Lestari",
      items: 7,
      amount: 8900000,
      status: "Completed",
      paymentMethod: "E-Wallet",
    },
    {
      id: "TRX005",
      date: "2025-12-12",
      customer: "Raden Gunawan",
      items: 1,
      amount: 1250000,
      status: "Cancelled",
      paymentMethod: "Cash",
    },
    {
      id: "TRX006",
      date: "2025-12-12",
      customer: "Ani Kusuma",
      items: 4,
      amount: 4500000,
      status: "Completed",
      paymentMethod: "Debit Card",
    },
    {
      id: "TRX007",
      date: "2025-12-11",
      customer: "Hendra Pratama",
      items: 6,
      amount: 7200000,
      status: "Completed",
      paymentMethod: "E-Wallet",
    },
    {
      id: "TRX008",
      date: "2025-12-11",
      customer: "Lisa Amelia",
      items: 2,
      amount: 2800000,
      status: "Pending",
      paymentMethod: "Credit Card",
    },
  ]);

  const statuses = ["all", "Completed", "Pending", "Cancelled"];

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || transaction.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 border border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const totalRevenue = filteredTransactions.reduce(
    (sum, trx) => sum + trx.amount,
    0
  );
  const completedTransactions = filteredTransactions.filter(
    (trx) => trx.status === "Completed"
  ).length;

  return (
    <div className="w-full">
      {/* Header dengan Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
          <p className="text-gray-600 text-sm mb-2">Total Transaksi</p>
          <h3 className="text-3xl font-bold text-gray-800">
            {filteredTransactions.length}
          </h3>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
          <p className="text-gray-600 text-sm mb-2">Transaksi Selesai</p>
          <h3 className="text-3xl font-bold text-green-600">
            {completedTransactions}
          </h3>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
          <p className="text-gray-600 text-sm mb-2">Total Pendapatan</p>
          <h3 className="text-2xl font-bold text-transparent bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text">
            {formatPrice(totalRevenue)}
          </h3>
        </div>
      </div>

      {/* Header dengan Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Daftar Transaksi</h1>
          <p className="text-gray-600 mt-2">
            Kelola dan monitor semua transaksi penjualan
          </p>
        </div>
        <button className="flex items-center gap-2 bg-linear-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-medium">
          <Download size={20} />
          Export
        </button>
      </div>

      {/* Search dan Filter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Search Box */}
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Cari ID transaksi atau nama customer..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer bg-white transition-all"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status === "all" ? "Semua Status" : status}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-3.5 text-gray-400 pointer-events-none"
            size={20}
          />
        </div>
      </div>

      {/* Table */}
      {filteredTransactions.length > 0 ? (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    ID Transaksi
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Tanggal
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Items
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Jumlah
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Metode
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction, index) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 text-sm font-bold text-blue-600">
                      {transaction.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {transaction.customer}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {transaction.items} item
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {formatPrice(transaction.amount)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                        {transaction.paymentMethod}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg transition-all duration-200 font-medium">
                        <Eye size={16} />
                        Lihat
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
            <p className="text-sm text-gray-600">
              Menampilkan {filteredTransactions.length} dari{" "}
              {transactions.length} transaksi
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-100 transition-all font-medium">
                Sebelumnya
              </button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-100 transition-all font-medium">
                Berikutnya
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <Search className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Transaksi tidak ditemukan
          </h3>
          <p className="text-gray-500">
            Coba gunakan kata kunci atau filter yang berbeda
          </p>
        </div>
      )}
    </div>
  );
};

export default Transaction;
