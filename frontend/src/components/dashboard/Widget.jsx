import React from 'react'

const Widget = ({ title, value, description, className}) => {
  return (
    <div
      className={`rounded-lg border bg-white p-4 shadow-md ${className}`}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  )
}

export default Widget