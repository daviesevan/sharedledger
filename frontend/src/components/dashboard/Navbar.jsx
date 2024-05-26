import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../dashboard/assets/default.png";
import DepositForm from "../dashboard/DepositForm";

const Navbar = ({ name, email, onDepositSuccess }) => {
  const [isChecked, setIsChecked] = useState(true);
  const [isDepositFormOpen, setIsDepositFormOpen] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const openDepositForm = () => {
    setIsDepositFormOpen(true);
  };

  const closeDepositForm = () => {
    setIsDepositFormOpen(false);
  };

  return (
    <div className="bg-gray-100 h-screen w-64">
      <div className="h-full flex flex-col overflow-y-auto bg-white shadow-md">
        <div className="flex mt-10 items-center px-4">
          <img
            className="h-12 w-auto max-w-full align-middle"
            src={logo}
            alt=""
          />
          <div className="flex ml-3 flex-col">
            <h3 className="font-medium">{name}</h3>
            <p className="text-xs text-gray-500">{email}</p>
          </div>
        </div>

        <span className="ml-3 mt-10 mb-2 block text-xs font-semibold text-gray-500">
          Analytics
        </span>

        <div className="flex mt-3 flex-1 flex-col">
          <nav className="flex-1">
            <a
              href="#"
              className="flex cursor-pointer items-center border-l-4 border-l-blue-600 py-2 px-4 text-sm font-medium text-blue-600 outline-none transition-all duration-100 ease-in-out focus:border-l-4"
            >
              <svg
                className="mr-4 h-5 w-5 align-middle"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Dashboard
            </a>

            <a
              href="#"
              className="flex cursor-pointer items-center border-l-blue-600 py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-blue-600 hover:text-blue-600 focus:border-l-4"
            >
              <svg
                className="mr-4 h-5 w-5 align-middle"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              Messages
              <span className="ml-auto rounded-full bg-blue-600 px-2 text-xs text-white">
                6
              </span>
            </a>

            <div className="relative transition">
              <input
                className="peer hidden"
                type="checkbox"
                id="menu-1"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <button className="flex peer relative w-full items-center border-l-blue-600 py-3 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:text-blue-600 focus:border-l-4">
                <span className="flex mr-5 w-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </span>
                Analytics
                <label
                  htmlFor="menu-1"
                  className="absolute inset-0 h-full w-full cursor-pointer"
                ></label>
              </button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-600 transition peer-checked:rotate-180 peer-hover:text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              <ul className="duration-400 flex m-2 max-h-0 flex-col overflow-hidden rounded-xl bg-gray-100 font-medium transition-all duration-300 peer-checked:max-h-96">
                <li className="flex m-2 cursor-pointer border-l-blue-600 py-3 pl-5 text-sm text-gray-600 transition-all duration-100 ease-in-out hover:border-l-4 hover:text-blue-600">
                  <span className="mr-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </span>
                  Revenue
                </li>
                <li className="flex m-2 cursor-pointer border-l-blue-600 py-3 pl-5 text-sm text-gray-600 transition-all duration-100 ease-in-out hover:border-l-4 hover:text-blue-600">
                  <span className="mr-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </span>
                  Engagement
                </li>
                <li className="flex m-2 cursor-pointer border-l-blue-600 py-3 pl-5 text-sm text-gray-600 transition-all duration-100 ease-in-out hover:border-l-4 hover:text-blue-600">
                  <span className="mr-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 17l-4-4m0 0l4-4m-4 4h12"
                      />
                    </svg>
                  </span>
                  Conversion
                </li>
              </ul>
            </div>

            <a
              href="#"
              className="flex cursor-pointer items-center border-l-blue-600 py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-blue-600 hover:text-blue-600 focus:border-l-4"
            >
              <svg
                className="mr-4 h-5 w-5 align-middle"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              Deposit
            </a>

            <a
              href="#"
              className="flex cursor-pointer items-center border-l-blue-600 py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-blue-600 hover:text-blue-600 focus:border-l-4"
            >
              <svg
                className="mr-4 h-5 w-5 align-middle"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18"
                />
              </svg>
              Subscription
            </a>

            <Link
              to="/logout"
              className="flex cursor-pointer items-center border-l-blue-600 py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-blue-600 hover:text-blue-600 focus:border-l-4"
            >
              <svg
                className="mr-4 h-5 w-5 align-middle"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 12h6m-6 4h6m2 4H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-2h6l2 2h4a2 2 0 012 2v11a2 2 0 01-2 2z"
                />
              </svg>
              Logout
            </Link>
          </nav>

          <div className="p-6">
            <button
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
              onClick={openDepositForm}
            >
              Deposit Money
            </button>
          </div>
        </div>
      </div>

      <DepositForm
        isOpen={isDepositFormOpen}
        onClose={closeDepositForm}
        onDepositSuccess={onDepositSuccess}
      />
    </div>
  );
};

export default Navbar;
