import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Footer({ setShowSellerPopup, isLoggedIn }) {
  const navigate = useNavigate();

  const handleBecomeSellerClick = () => {
    if (isLoggedIn) {
      setShowSellerPopup(true); // Show popup if logged in
    } else {
      navigate('/seller/register'); // Redirect to seller registration if not logged in
    }
  };

  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Elegance Essence</h3>
            <p className="text-sm text-gray-300">
              Your one-stop shop for fashion and style.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-300 hover:text-white transition duration-200">
                  Cart
                </Link>
              </li>
              <li>
                <button
                  onClick={handleBecomeSellerClick}
                  className="text-gray-300 hover:text-white transition duration-200"
                >
                  Become a Seller
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="text-sm text-gray-300">Email: support@eleganceessence.com</p>
            <p className="text-sm text-gray-300">Phone: +91 1234567890</p>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Elegance Essence. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;