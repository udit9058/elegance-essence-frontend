import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ProcessDone = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    const { state } = location;
    if (state) {
      setPaymentDetails({
        amount: state.total,
        buyerName: state.user.name || 'Mr. UDIT SHYAM SHARMA',
        address: state.address,
        date: new Date().toLocaleDateString(),
      });
    } else {
      navigate('/cart');
    }
  }, [location, navigate]);

  const downloadBill = () => {
    if (!paymentDetails) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Payment Receipt', 20, 20);

    doc.setFontSize(12);
    doc.text(`Buyer Name: ${paymentDetails.buyerName}`, 20, 30);
    doc.text(`Amount: ₹${paymentDetails.amount}`, 20, 40);
    doc.text(`Address: ${paymentDetails.address.address}, ${paymentDetails.address.city}, ${paymentDetails.address.state} - ${paymentDetails.address.pincode}`, 20, 50);
    doc.text(`Date: ${paymentDetails.date}`, 20, 60);

    doc.save('shopping_bill.pdf');
  };

  if (!paymentDetails) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
      <p>Thank you for your purchase. Transaction completed for ₹{paymentDetails.amount}.</p>
      <div className="mt-4 space-x-4">
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Return to Home
        </button>
        <button
          onClick={downloadBill}
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
        >
          Download Bill
        </button>
      </div>
    </div>
  );
};

export default ProcessDone;