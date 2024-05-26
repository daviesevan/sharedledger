import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Loading = ({ loading, size = 35 }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="flex flex-col items-center">
        <ClipLoader
          color="#60A5FA"
          loading={loading}
          size={size}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        {/* <p className="mt-4 text-gray-900 text-lg font-semibold">Loading...</p> */}
      </div>
    </div>
  );
};

export default Loading;