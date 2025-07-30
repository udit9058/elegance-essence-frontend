// src/pages/order-success.jsx
import React from 'react';

const OrderSuccess = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-green-600">🎉 Order Placed Successfully!</h1>
      <p className="mt-4 text-lg">Your payment has been completed.</p>

      <button
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded"
        onClick={() => window.print()}
      >
        🧾 Download Bill
      </button>

      <br />
      <button
        className="mt-4 px-6 py-2 bg-gray-800 text-white rounded"
        onClick={() => (window.location.href = '/')}
      >
        🔙 Back to Home
      </button>
    </div>
  );
};

export default OrderSuccess;
