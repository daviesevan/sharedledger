import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    navigate('/login');
  }, [navigate]);

  return <div>Logging out...</div>; // or you can return a loading spinner or some UI indicating logging out
};

export default Logout;
