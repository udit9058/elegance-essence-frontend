import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  // Clear cart on component mount when payment is successful
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const paymentId = urlParams.get('paymentId');
    if (paymentId) {
      // Clear cart from localStorage
      localStorage.removeItem('cart');
      // Optionally sync with any global state if using context or Redux
    }
  }, [location.search]);

  const urlParams = new URLSearchParams(location.search);
  const paymentId = urlParams.get('paymentId');
  const pdfUrl = urlParams.get('pdfUrl');

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-4">Thank you for your purchase. Your order is being processed.</p>
        {paymentId && <p className="text-gray-600 mb-4">Payment ID: {paymentId}</p>}
        {pdfUrl && (
          <a
            href={decodeURIComponent(pdfUrl)}
            download="order-slip.pdf"
            className="bg-green-600 text-white px-4 py-2 rounded-md mb-4 inline-block mr-10"
          >
            Download Order Slip
          </a>
        )}
        <button
          onClick={() => navigate('/')} // Navigate to home route
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;