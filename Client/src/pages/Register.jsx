import React, { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff, User, Mail, Lock, ArrowRight } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Nama depan harus diisi";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Nama belakang harus diisi";
    }
    if (!formData.username.trim()) {
      newErrors.username = "Username harus diisi";
    }
    if (formData.username.length < 3) {
      newErrors.username = "Username minimal 3 karakter";
    }
    if (!formData.password) {
      newErrors.password = "Password harus diisi";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password harus diisi";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit form
    console.log("Form submitted:", formData);
    // Add your registration logic here
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">POS</span>
            </div>
            <span className="font-bold text-gray-800 text-lg">
              Point of Sales
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Buat Akun Baru
          </h1>
          <p className="text-gray-600 text-sm">
            Daftar untuk memulai mengelola penjualan Anda
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
        >
          {/* Nama Depan */}
          <div className="mb-5">
            <label
              htmlFor="firstName"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Nama Depan
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-3.5 text-gray-400"
                size={20}
              />
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Masukkan nama depan"
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.firstName ? "border-red-500" : "border-gray-200"
                }`}
              />
            </div>
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1.5">{errors.firstName}</p>
            )}
          </div>

          {/* Nama Belakang */}
          <div className="mb-5">
            <label
              htmlFor="lastName"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Nama Belakang
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-3.5 text-gray-400"
                size={20}
              />
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Masukkan nama belakang"
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.lastName ? "border-red-500" : "border-gray-200"
                }`}
              />
            </div>
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1.5">{errors.lastName}</p>
            )}
          </div>

          {/* Username */}
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Username
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-3.5 text-gray-400"
                size={20}
              />
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Masukkan username"
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.username ? "border-red-500" : "border-gray-200"
                }`}
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-xs mt-1.5">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-3.5 text-gray-400"
                size={20}
              />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan password"
                className={`w-full pl-10 pr-10 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.password ? "border-red-500" : "border-gray-200"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Konfirmasi Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-3.5 text-gray-400"
                size={20}
              />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Masukkan ulang password"
                className={`w-full pl-10 pr-10 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-200"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1.5">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 mb-4"
          >
            Buat Akun
            <ArrowRight size={20} />
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-600 text-sm">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="text-blue-500 font-semibold hover:text-blue-700 transition-colors"
            >
              Masuk di sini
            </Link>
          </p>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-6">
          Dengan mendaftar, Anda setuju dengan Syarat & Ketentuan kami
        </p>
      </div>
    </div>
  );
};

export default Register;
