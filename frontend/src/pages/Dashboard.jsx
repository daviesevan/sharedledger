import React, { useState, useEffect } from "react";
import Navbar from "../components/dashboard/Navbar";
import api from "../Api";
import Loading from "../components/Loading";
import Widget from "../components/dashboard/Widget";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState({
    total_savings: 0,
    total_interest_earned: 0,
    goal_progress: [],
  });

  const getUser = async () => {
    try {
      const res = await api.get("/api/u/user");
      setUser(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch user data");
      setLoading(false);
    }
  };

  const getSummary = async () => {
    try {
      setLoading(true);
      const res = await api.get("/reports/summary");
      setSummary(res.data);
    } catch (error) {
      setError("Failed to fetch summary data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
    getSummary();
  }, []);

  const handleDepositSuccess = () => {
    getSummary();
  };

  if (loading) {
    return <Loading loading={loading} />;
  }

  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {user && <Navbar name={user.username} email={user.email} onDepositSuccess={handleDepositSuccess} />}
      <div className="flex flex-1 flex-col overflow-y-auto p-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <Widget
            title="Total Savings"
            value={`Kes. ${numberWithCommas(summary.total_savings)}`}
            description="Your total savings across all accounts"
            className="bg-green-100 text-green-800"
          />
          <Widget
            title="Total Interest Earned"
            value={`Kes. ${summary.total_interest_earned.toFixed(2)}`}
            description="Interest earned on your savings"
            className="bg-blue-100 text-blue-800"
          />
          <div className="h-64 w-full rounded-lg border bg-white p-4">
            Widget 3
          </div>
        </div>
        <div className="mt-4 flex space-x-4">
          <div className="h-64 w-1/2 rounded-lg border bg-white p-4">
            Widget 4
          </div>
          <div className="h-64 w-1/2 rounded-lg border bg-white p-4">
            Widget 5
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
