import React, { createContext, useState, useEffect } from 'react';
import { refreshApi } from "../Api";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    setIsRefreshing(true);
    try {
      const res = await refreshApi.post(
        "/api/refresh/token",
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      if (res.data.access_token) {
        localStorage.setItem("access_token", res.data.access_token);
        console.log("New Access Token:", res.data.access_token);
        // Delay setting isAuthenticated to true after a successful token refresh
        setTimeout(() => {
          setIsAuthenticated(true);
        }, 500); // Adjust the delay time as needed
      } else {
        setIsAuthenticated(false);
        console.log("Error fetching token: ", res.data);
      }
    } catch (error) {
      console.error("Error in refresh token request:", error);
      setIsAuthenticated(false);
    } finally {
      setIsRefreshing(false);
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
    if (!isRefreshing) {
      setTimeout(async () => {
        await refreshToken();
      }, timeout);
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;