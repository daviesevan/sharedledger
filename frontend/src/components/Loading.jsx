// Loading.jsx
import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Loading = ({ loading, size = 35 }) => {
    return (
        <div className="flex justify-center items-center h-full">
            <ClipLoader color="#123abc" loading={loading} size={size} />
        </div>
    );
};

export default Loading;
