import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function BecomeSeller() {
  const context = useContext(AuthContext);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  // Handle case where context is undefined
  if (!context) {
    console.error('AuthContext is undefined. Ensure BecomeSeller is wrapped in AuthProvider.');
    navigate('/seller/login'); // Redirect to login as a fallback
    return null;
  }

  const { isLoggedIn, userType, logout } = context;

  const handleBecomeSellerClick = () => {
    if (isLoggedIn && userType === 'customer') {
      setShowLogoutModal(true); // Show logout prompt for customers
    } else if (isLoggedIn && userType === 'seller') {
      navigate('/seller/dashboard'); // Redirect sellers to dashboard
    } else {
      navigate('/seller/login'); // Redirect non-logged-in users to seller login
    }
  };

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate('/seller/login');
  };

  return (
    <div>
      {/* Button in footer */}
      <button
        onClick={handleBecomeSellerClick}
        className="text-blue-600 hover:underline"
      >
        Become a Seller
      </button>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Logout Required</h2>
            <p className="mb-4">Please log out as a customer to apply as a seller.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BecomeSeller;