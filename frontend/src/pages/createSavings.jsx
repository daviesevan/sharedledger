import React, { useState } from "react";
import axios from "axios";
import api from "../Api";

const CreateSavings = () => {
  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [goalDate, setGoalDate] = useState("");
  const [accountId, setAccountId] = useState("");
  const [coOwnerEmail, setCoOwnerEmail] = useState("");

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/savings/accounts/create", {
        account_name: accountName,
        account_type: accountType,
        goal_amount: goalAmount,
        goal_date: goalDate,
      });
      setAccountId(response.data.account_id);
      alert("Savings account created successfully");
    } catch (error) {
      console.error(error);
      alert("Error creating savings account");
    }
  };

  const handleAddCoOwner = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/savings/accounts/${accountId}/co-owners`, {
        co_owner_email: coOwnerEmail,
      });
      alert("Co-owner added successfully");
    } catch (error) {
      console.error(error);
      alert("Error adding co-owner");
    }
  };

  return (
    <div>
      <h2>Create Savings Account</h2>
      <form onSubmit={handleCreateAccount}>
        <div>
          <label>Account Name:</label>
          <input
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Account Type:</label>
          <input
            type="text"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Goal Amount (in cents):</label>
          <input
            type="number"
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Goal Date:</label>
          <input
            type="date"
            value={goalDate}
            onChange={(e) => setGoalDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Account</button>
      </form>

      <h2>Add Co-owner</h2>
      <form onSubmit={handleAddCoOwner}>
        <div>
          <label>Account ID:</label>
          <input
            type="text"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Co-owner Username:</label>
          <input
            type="text"
            value={coOwnerEmail}
            onChange={(e) => setCoOwnerEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Co-owner</button>
      </form>
    </div>
  );
};

export default CreateSavings;
