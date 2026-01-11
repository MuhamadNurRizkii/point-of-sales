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
import CreateTransaction from "./pages/CreateTransaction";
import ProtectedRoute from "./components/ProtectedRoute";

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
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "cashier"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <ProtectedRoute allowedRoles={["admin", "cashier"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="products"
            element={
              <ProtectedRoute allowedRoles={["admin", "cashier"]}>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="products/edit/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <EditProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="products/add"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <CreateProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="transactions"
            element={
              <ProtectedRoute allowedRoles={["admin", "cashier"]}>
                <Transaction />
              </ProtectedRoute>
            }
          />
          <Route
            path="transactions/add"
            element={
              <ProtectedRoute allowedRoles={["admin", "cashier"]}>
                <CreateTransaction />
              </ProtectedRoute>
            }
          />
          <Route
            path="report"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Report />
              </ProtectedRoute>
            }
          />
          <Route />
        </Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
