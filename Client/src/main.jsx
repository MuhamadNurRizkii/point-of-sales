import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import DashboardLayout from "./Layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import EditProduct from "./pages/EditProduct";
import Transaction from "./pages/Transaction";
import Report from "./pages/Report";
import { Toaster } from "react-hot-toast";
import CreateProducts from "./pages/CreateProducts";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster />
      <Routes>
        {/* Auth */}
        <Route>
          <Route path="/" element={<Navigate to={"/login"} replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Dashboar Layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="products/add" element={<CreateProducts />} />
          <Route path="transactions" element={<Transaction />} />
          <Route path="report" element={<Report />} />
          <Route />
        </Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
