import React, { useEffect, useState } from "react";
import { X, Printer } from "lucide-react";
import { getDetailTransactionAPI } from "../api/transaction";
import { formatPrice, formatDate } from "../utils/format";

const DetailTransactionItem = ({ id, token, show, setShow }) => {
  const [data, setData] = useState([]);

  const fetchDetailTransactionItem = async () => {
    const response = await getDetailTransactionAPI(id, token);
    const responseBody = await response.json();

    console.log(responseBody);

    if (responseBody.success) {
      setData(responseBody.payload);
    }
  };

  console.log(data);

  useEffect(() => {
    if (id && token) {
      fetchDetailTransactionItem();
    }
  }, [id, token]);

  // Hitung total dari data
  const totalKeseluruhan = data.length > 0 ? data[0].total_amount : 0;
  const totalQty = data.reduce((sum, item) => sum + item.qty, 0);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setShow(false);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="sticky top-0 bg-linear-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Struk Transaksi</h2>
            <p className="text-blue-100 text-sm">TRX00{id}</p>
          </div>
          <button
            onClick={() => setShow(false)}
            className="p-2 
            rounded-lg 
            transition-all 
            duration-200 
            ease-in-out
            hover:bg-slate-100 
            hover:scale-105
            active:scale-95
            text-slate-200
            hover:text-red-500"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {data && data.length > 0 ? (
            <div className="space-y-6">
              {/* Info Transaksi */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Tanggal:</span>
                  <span className="font-semibold text-gray-900">
                    {formatDate(data[0].date.split("T"))}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Metode:</span>
                  <span className="inline-flex items-center bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {data[0].payment_method.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Daftar Item */}
              <div className="space-y-3">
                <h3 className="font-bold text-gray-900 mb-3">Item Transaksi</h3>
                {data.map((item, index) => (
                  <div key={index} className="border-b border-gray-100 pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-gray-800">
                        {item.produk}
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold">
                        x{item.qty}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span>Harga Satuan:</span>
                        <span className="text-gray-900">
                          {formatPrice(item.harga_satuan)}
                        </span>
                      </div>
                      <div className="flex justify-between font-semibold text-gray-900">
                        <span>Subtotal:</span>
                        <span>{formatPrice(item.subtotal)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 border border-gray-200">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Total Item:</span>
                  <span className="font-semibold text-gray-900">
                    {totalQty}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {formatPrice(totalKeseluruhan)}
                  </span>
                </div>
              </div>

              {/* Button Print */}
              <button className="w-full bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer">
                <Printer size={20} />
                Cetak Struk
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Memuat data...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailTransactionItem;
