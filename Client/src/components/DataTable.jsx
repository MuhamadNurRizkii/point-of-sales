import React from "react";
import { formatDate, formatPrice } from "../utils/format";
import { Eye } from "lucide-react";

const DataTable = ({ data, show, setShow, setId }) => {
  return (
    <>
      {data.map((transaction) => (
        <tr
          key={transaction.id}
          className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
        >
          <td className="px-6 py-4 text-sm font-bold text-blue-600">
            TRX00{transaction.id}
          </td>
          <td className="px-6 py-4 text-sm text-gray-700">
            {formatDate(transaction.date.split("T"))}
          </td>
          <td className="px-6 py-4 text-sm text-gray-700">
            {transaction.nama_depan} {transaction.nama_belakang}
          </td>
          <td className="px-6 py-4 text-sm text-gray-700">
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
              {transaction.qty} item
            </span>
          </td>
          <td className="px-6 py-4 text-sm font-semibold text-gray-900">
            {formatPrice(transaction.total)}
          </td>
          <td className="px-6 py-4 text-sm text-gray-700">
            <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
              {transaction.payment_method.toUpperCase()}
            </span>
          </td>
          <td className="px-6 py-4 text-center">
            <button
              onClick={() => {
                setShow(!show);
                setId(transaction.id);
              }}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
            >
              <Eye size={16} />
              Lihat
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default DataTable;
