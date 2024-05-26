import React, { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import Loading from "./Loading";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading loading={loading} />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoutes;
