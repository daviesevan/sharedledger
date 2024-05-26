import React, { useState } from "react";
import api from "../../Api";
import depositmoneyicon from "../dashboard/assets/deposit_money.png";

const DepositForm = ({ isOpen, onClose, onDepositSuccess }) => {
  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDeposit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.post(`/savings/accounts/${accountId}/deposit`, {
        amount: parseFloat(amount),
      });
      onDepositSuccess();
      onClose();
    } catch (err) {
      setError("Failed to deposit money");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-lg sm:flex">
        <div
          className="m-2 w-full rounded-2xl bg-gray-400 bg-cover bg-center text-white sm:w-2/5"
          style={{ backgroundImage: `url(${depositmoneyicon})` }}
        ></div>
        <div className="w-full sm:w-3/5">
          <div className="p-8">
            <h1 className="text-3xl font-black text-slate-700">
              Deposit Money
            </h1>
            <p className="mt-2 mb-5 text-base leading-tight text-gray-600">
              Enter your account ID and the amount to deposit
            </p>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form className="mt-8" onSubmit={handleDeposit}>
              <div className="relative mt-2 w-full">
                <input
                  type="text"
                  id="account_id"
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                  className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label
                  htmlFor="account_id"
                  className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
                >
                  Enter Your Account ID
                </label>
              </div>
              <div className="relative mt-2 w-full">
                <input
                  type="number"
                  id="amount"
                  className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <label
                  htmlFor="amount"
                  className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
                >
                  Enter Your Amount
                </label>
              </div>
              <div className="flex justify-end mt-4 space-x-4">
                <button
                  type="button"
                  className="w-full cursor-pointer rounded-lg bg-gray-600 pt-3 pb-3 text-white shadow-lg hover:bg-gray-400"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-lg bg-blue-600 pt-3 pb-3 text-white shadow-lg hover:bg-blue-400"
                  disabled={loading}
                >
                  {loading ? "Depositing..." : "Deposit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositForm;
