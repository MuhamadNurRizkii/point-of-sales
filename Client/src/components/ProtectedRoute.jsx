import React from "react";
import { Navigate } from "react-router";
import { getToken, parsingToken } from "../utils/token";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const token = getToken();
  const user = parsingToken(token);

  if (!token && user === null) {
    return <Navigate to={"/login"} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={"/dashboard"} replace />;
  }
  return children;
};

export default ProtectedRoute;
