import React, { useEffect, useState } from "react";
import {
  Search,
  ChevronDown,
  Eye,
  Download,
  Filter,
  Calendar,
  Plus,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";
import { getTransactionsAPI } from "../api/transaction";
import { getToken } from "../utils/token";
import { formatPrice } from "../utils/format";
import DataTable from "../components/DataTable";
import DetailTransactionItem from "../components/DetailTransactionItem";

const Transaction = () => {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [report, setReport] = useState([]);
  const [show, setShow] = useState(false);

  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  const limit = 6;
  const token = getToken();
  const [id, setId] = useState(null);

  const statuses = ["all", "Cash", "Qris"];

  const filteredData = transactions.filter((item) => {
    const keyword = search.toLowerCase();
    const fullName = `${item.nama_depan} ${item.nama_belakang}`.toLowerCase();

    return (
      fullName.includes(keyword) ||
      item.payment_method.toLowerCase().includes(keyword)
    );
  });

  const goToPage = (pageNumber) => {
    setSearchParams({ page: pageNumber });
  };

  const fetchTransactions = async () => {
    try {
      const response = await getTransactionsAPI(page, limit, token);
      const responseBody = await response.json();

      if (responseBody.success) {
        setTransactions(responseBody.payload.dataTransaction);
        setReport(responseBody.payload.reportTransaction[0]);
        setTotalPages(responseBody.payload.pagination.total_page || 1);
      } else {
        console.log(responseBody.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(show);

  useEffect(() => {
    fetchTransactions();
  }, [page]);

  return (
    <div className="w-full">
      {/* Header dengan Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
          <p className="text-gray-600 text-sm mb-2">Total Transaksi</p>
          <h3 className="text-3xl font-bold text-gray-800">
            {report.total_transaksi}
          </h3>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
          <p className="text-gray-600 text-sm mb-2">Total Pendapatan</p>
          <h3 className="text-2xl font-bold text-transparent bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text">
            {report.total_pendapatan === null
              ? formatPrice(0)
              : formatPrice(report.total_pendapatan)}
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
        <button
          onClick={() => navigate("/dashboard/transactions/add")}
          className="flex items-center gap-2 bg-linear-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
        >
          <Plus size={20} />
          Tambah Transaksi
        </button>
      </div>
      {/* Search dan Filter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Search Box */}
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari ID transaksi atau nama kasir..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer bg-white transition-all">
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
                  Kasir
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

                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {search === "" ? (
                <DataTable
                  data={transactions}
                  show={show}
                  setShow={setShow}
                  setId={setId}
                />
              ) : (
                <DataTable
                  data={filteredData}
                  show={show}
                  setShow={setShow}
                  setId={setId}
                />
              )}
            </tbody>
          </table>
          {show && (
            <DetailTransactionItem
              id={id}
              token={token}
              show={show}
              setShow={setShow}
            />
          )}
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => goToPage(page - 1)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-100 transition-all font-medium"
            >
              Sebelumnya
            </button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i + 1)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-100 transition-all font-medium"
              disabled={page === totalPages}
              onClick={() => goToPage(page + 1)}
            >
              Berikutnya
            </button>
          </div>
        </div>
      </div>

      {/* <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
        <Search className="mx-auto text-gray-400 mb-4" size={48} />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Transaksi tidak ditemukan
        </h3>
        <p className="text-gray-500">
          Coba gunakan kata kunci atau filter yang berbeda
        </p>
      </div> */}
    </div>
  );
};

export default Transaction;
