import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { loginAPI } from "../api/public";
import toast from "react-hot-toast";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Demo credentials
  const demoData = {
    username: "rizuka",
    password: "admin123",
  };

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

    if (!formData.username.trim()) {
      newErrors.username = "Username harus diisi";
    }
    if (!formData.password) {
      newErrors.password = "Password harus diisi";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await loginAPI(formData.username, formData.password);
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      setIsLoading(true);
      toast.success(responseBody.message);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        navigate("/dashboard");
      }, 1000);
    } else {
      toast.error(responseBody.message);
    }
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
            Selamat Datang Kembali
          </h1>
          <p className="text-gray-600 text-sm">
            Masuk ke akun Anda untuk melanjutkan
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
        >
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
                placeholder="Masukkan username Anda"
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.username ? "border-red-500" : "border-gray-200"
                }`}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
            </div>
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
                placeholder="Masukkan password Anda"
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
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {isLoading ? "Sedang masuk..." : "Masuk"}
            {!isLoading && <ArrowRight size={20} />}
          </button>

          {/* Register Link */}
          <p className="text-center text-gray-600 text-sm">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="text-blue-500 font-semibold hover:text-blue-700 transition-colors"
            >
              Daftar di sini
            </Link>
          </p>
        </form>

        {/* Demo Info */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-700 font-semibold mb-2">
            Demo Credentials:
          </p>
          <p className="text-xs text-blue-600">
            Username: <span className="font-mono">rizuka</span>
          </p>
          <p className="text-xs text-blue-600">
            Password: <span className="font-mono">admin123</span>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-6">
          Dengan masuk, Anda setuju dengan Syarat & Ketentuan kami
        </p>
      </div>
    </div>
  );
}

export default Login;
