import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api.js';
import Navbar from '../components/navbar.jsx';


function AddressPage() {
  const [user, setUser] = useState({});
  const [address, setAddress] = useState({
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [useRegisteredAddress, setUseRegisteredAddress] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const cart = location.state?.cart || [];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/check-auth', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (response.data.isLoggedIn) {
          setUser(response.data.user);
          if (response.data.user.address) {
            setAddress({
              address: response.data.user.address,
              city: response.data.user.city,
              state: response.data.user.state,
              pincode: response.data.user.pincode,
            });
          }
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveAddress = () => {
    // Save address to localStorage or API if needed
    navigate('/payment', { state: { cart, address } }); // Proceed to payment page
  };

  return (
    <div className="bg-black min-h-screen text-white antialiased dark:bg-black md:py-16">
      <Navbar />
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 mt-6">
        <h2 className="text-xl font-semibold text-white sm:text-2xl">Enter Shipping Address</h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              <div className="rounded-lg border border-gray-700 bg-gray-900 p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="useRegisteredAddress"
                    checked={useRegisteredAddress}
                    onChange={(e) => {
                      setUseRegisteredAddress(e.target.checked);
                      if (e.target.checked && user.address) {
                        setAddress({
                          address: user.address,
                          city: user.city,
                          state: user.state,
                          pincode: user.pincode,
                        });
                      }
                    }}
                    className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="useRegisteredAddress" className="ml-2 text-sm font-medium text-gray-400">
                    Same as registered address
                  </label>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-400">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={address.address}
                      onChange={handleInputChange}
                      disabled={useRegisteredAddress}
                      className="mt-1 p-2 border border-gray-600 rounded-md bg-gray-800 text-white w-full h-10"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-400">City</label>
                    <input
                      type="text"
                      name="city"
                      value={address.city}
                      onChange={handleInputChange}
                      disabled={useRegisteredAddress}
                      className="mt-1 p-2 border border-gray-600 rounded-md bg-gray-800 text-white w-full h-10"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-400">State</label>
                    <input
                      type="text"
                      name="state"
                      value={address.state}
                      onChange={handleInputChange}
                      disabled={useRegisteredAddress}
                      className="mt-1 p-2 border border-gray-600 rounded-md bg-gray-800 text-white w-full h-10"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-400">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={address.pincode}
                      onChange={handleInputChange}
                      disabled={useRegisteredAddress}
                      className="mt-1 p-2 border border-gray-600 rounded-md bg-gray-800 text-white w-full h-10"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSaveAddress}
                  className="mt-6 flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-base font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressPage;