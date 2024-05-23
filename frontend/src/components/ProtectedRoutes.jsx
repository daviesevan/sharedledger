import React, { useEffect, useState } from "react";
import api from "../Api";
import { useLocation, Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; 
import Loading from "./Loading";

const ProtectedRoutes = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const refreshToken = async () => {
    const token = localStorage.getItem("refresh_token");
    console.log("Found the refresh token: ", token);
    try {
      const res = await api.post(
        "/api/refresh/token",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.access_token) {
        localStorage.setItem("access_token", res.data.access_token);
        console.log("New Access Token:", res.data.access_token);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        console.log("Error fetching token: ", res.data);
      }
    } catch (error) {
      console.error("Error in refresh token request:", error);
      setIsAuthenticated(false);
    }
  };

  const authenticate = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      console.log("Decoded Token:", decoded);
      const tokenExpiration = decoded.exp;
      const now = Date.now() / 1000;

      if (tokenExpiration < now) {
        await refreshToken();
      } else {
        setIsAuthenticated(true);
        scheduleTokenRefresh((tokenExpiration - now - 60) * 1000);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const scheduleTokenRefresh = (timeout) => {
    setTimeout(async () => {
      await refreshToken();
    }, timeout);
  };

  useEffect(() => {
    authenticate();
  }, []);

  if (loading) {
    return <Loading loading={loading} />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoutes;
