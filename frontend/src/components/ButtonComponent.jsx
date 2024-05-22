import React, { useState } from "react";
import { css } from "@emotion/react";
import { BarLoader } from "react-spinners";

const ButtonComponent = ({ onClick, text, loading }) => {
  const [buttonLoading, setButtonLoading] = useState(loading);
  const handleClick = () => {
    setButtonLoading(true);
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      disabled={buttonLoading}
      className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none"
    >
      {loading ? (
        <>
          {buttonLoading && (
            <BarLoader
              color={"#fff"}
              loading={buttonLoading}
              css={css`
                position: absolute;
                padding: 10px 12px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              `}
              size={20}
            />
          )}
        </>
      ) : (
        <>
          <svg
            className="h-3.5 w-3.5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            />
          </svg>
          {text}
        </>
      )}
    </button>
  );
};

export default ButtonComponent;
