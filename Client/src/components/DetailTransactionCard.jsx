import React, { useEffect } from "react";
import { useState } from "react";
import { createTrasactionAPI } from "../api/transaction";
import { getToken } from "../utils/token";
import { toast } from "react-hot-toast";
import { alertError } from "../utils/alert";

const DetailTransactionCard = ({
  totalPrice,
  show,
  setShow,
  data,
  fetchData,
  setTransaction,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [payment, setPayment] = useState(0);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = getToken();

  const formatRupiah = (value) => {
    return value ? `Rp. ${Number(value).toLocaleString("id-ID")}` : "Rp. 0";
  };

  const parseNumber = (value) => {
    return value.replace(/[^0-9]/g, "");
  };

  const result = Number(payment || 0) - totalPrice;
  const isNegative = result < 0;

  const dataTransaction = {
    payment_method: paymentMethod,
    data,
  };

  const handleClick = async () => {
    try {
      setLoading(true);

      if (payment < totalPrice) {
        await alertError("Uang tidak cukup!");
        return;
      }

      const response = await createTrasactionAPI(dataTransaction, token);
      const responseBody = await response.json();

      console.log(responseBody);

      if (responseBody.success) {
        toast.success(responseBody.message);
        setShow(!show);
        setPayment(0);
        fetchData();
        setTransaction([]);
      } else {
        toast.error(responseBody.message);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${
        show ? "hidden" : "fixed"
      } inset-0 bg-black/40 flex items-center justify-center z-50`}
    >
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h1 className="font-bold text-lg text-gray-800 text-center">
            Konfirmasi Pembayaran
          </h1>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-6">
          {/* Total */}
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Pembayaran</p>
            <p className="text-xl font-bold text-blue-600">
              Rp {totalPrice?.toLocaleString("id-ID") || 0}
            </p>
          </div>

          {/* Metode Pembayaran */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Metode Pembayaran
            </p>

            <div className="flex gap-4">
              {["cash", "qris"].map((method) => (
                <label
                  key={method}
                  className={`flex-1 flex items-center justify-center py-3 rounded-lg border cursor-pointer
                transition font-semibold uppercase
                ${
                  paymentMethod === method
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={() => {
                      setPayment(method === "qris" ? totalPrice : 0);
                      setPaymentMethod(method);
                    }}
                    className="hidden"
                  />
                  {method}
                </label>
              ))}
            </div>
            {/* input pembayaran user */}
            <div className="mt-3 bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Jumlah Pembayaran{" "}
              </p>
              {!active ? (
                <p
                  onClick={() => setActive(!active)}
                  className="text-xl font-bold text-blue-600 text-right"
                >
                  {formatRupiah(payment)}
                </p>
              ) : (
                <input
                  className="w-full p-2 focus:outline-0 border border-blue-600 rounded-md"
                  type="number"
                  autoFocus
                  placeholder="Rp. 0"
                  value={payment}
                  onChange={(e) => setPayment(parseNumber(e.target.value))}
                  onBlur={() => setActive(!active)}
                />
              )}

              <div className="mt-3 flex justify-between">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Kembalian
                </p>
                <p
                  className={`text-xl font-bold ${
                    isNegative ? "text-red-600" : "text-blue-600"
                  } text-right`}
                >
                  Rp. {result.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex gap-3">
          <button
            onClick={() => setShow(!show)}
            className="flex-1 py-3 rounded-lg border text-gray-600 hover:bg-gray-50"
          >
            Batal
          </button>

          <button
            onClick={() => handleClick()}
            className="flex-1 py-3 rounded-lg bg-green-500 text-white font-bold
                   hover:bg-green-600 transition"
          >
            Bayar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailTransactionCard;
