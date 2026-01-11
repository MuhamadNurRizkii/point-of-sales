import React from "react";
import { useNavigate } from "react-router";
import Button from "../components/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="inline-block relative">
            <div className="text-9xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
              404
            </div>
            <div className="absolute inset-0 blur-lg bg-linear-to-r from-blue-600 to-indigo-600 opacity-20 rounded-full"></div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan. Silakan
          kembali ke halaman utama.
        </p>

        {/* Illustration */}
        <div className="mb-8">
          <svg
            className="w-48 h-48 mx-auto"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="100" cy="100" r="90" stroke="#E5E7EB" strokeWidth="2" />
            <path
              d="M70 80C70 70 80 60 90 60C100 60 110 70 110 80"
              stroke="#3B82F6"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="80" cy="85" r="4" fill="#3B82F6" />
            <circle cx="100" cy="85" r="4" fill="#3B82F6" />
            <path
              d="M75 110C80 115 90 115 95 110"
              stroke="#3B82F6"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M105 110C110 115 120 115 125 110"
              stroke="#3B82F6"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Kembali ke Beranda
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
