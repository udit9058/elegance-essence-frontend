import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import one from '../assets/images/one.jpg';

function SellerRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact_number: '',
    profile_image: null,
    business_name: '',
    business_address: '',
    city: '',
    state: '',
    pincode: '',
    plan_duration: '1',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, profile_image: e.target.files[0] }));
  };

  const handlePlanChange = (e) => {
    setFormData((prev) => ({ ...prev, plan_duration: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('contact_number', formData.contact_number);
    data.append('business_name', formData.business_name);
    data.append('business_address', formData.business_address);
    data.append('city', formData.city);
    data.append('state', formData.state);
    data.append('pincode', formData.pincode);
    if (formData.profile_image) {
      data.append('profile_image', formData.profile_image);
    }
    data.append('plan_type', 'basic');
    data.append('plan_duration', formData.plan_duration);
    data.append('plan_price', formData.plan_duration === '1' ? '500' : formData.plan_duration === '3' ? '1200' : '2000');

    try {
      const response = await api.post('/seller/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      localStorage.setItem('seller_token', response.data.token);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/seller/login'), 1000);
    } catch (err) {
      if (err.response?.status === 422 && err.response?.data?.errors) {
        const errors = Object.values(err.response.data.errors).flat().join(' ');
        setError(errors);
      } else {
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
      }
    }
  };

  const goToHomePage = () => {
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/seller/login');
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${one})`,
        backgroundColor: '#000',
      }}
    >
      <div className="min-h-screen bg-black/50 backdrop-blur-md flex items-center justify-center">
        <div className="bg-white/50 backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Seller Registration</h2>
          {error && <p className="text-sm text-red-600 mb-4 text-center">{error}</p>}
          {success && <p className="text-sm text-green-600 mb-4 text-center">{success}</p>}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/30 backdrop-blur-md p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-700 mb-4 text-center">Business Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md border border-black-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md border border-black-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md border border-black-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                  <input
                    type="text"
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md border border-black-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                  <input
                    type="text"
                    name="business_name"
                    value={formData.business_name}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md border border-black-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                  <input
                    type="file"
                    name="profile_image"
                    onChange={handleFileChange}
                    className="w-full p-2 rounded-md border border-black-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="bg-white/30 backdrop-blur-md p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-700 mb-4 text-center">Location & Plan Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Address</label>
                  <textarea
                    name="business_address"
                    value={formData.business_address}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md border border-black-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md border border-black-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md border border-black-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md border border-black-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subscription Plan (5 Products)</label>
                  <select
                    name="plan_duration"
                    value={formData.plan_duration}
                    onChange={handlePlanChange}
                    className="w-full p-2 rounded-md border border-black-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="1">1 Minute - ₹500</option>
                    <option value="3">3 Minutes - ₹1200</option>
                    <option value="5">5 Minutes - ₹2000</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-span-1 md:col-span-2 flex justify-center space-x-4">
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-2 rounded-md border-2 border-white text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
              >
                Register
              </button>
              <button
                type="button"
                onClick={handleLogin}
                className="w-full md:w-auto px-6 py-2 rounded-md border-2 border-white text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
              >
                Login
              </button>
            </div>
          </form>
          <button
            type="button"
            onClick={goToHomePage}
            className="w-full md:w-auto px-6 py-2 mt-4 rounded-md border-2 border-white text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
          >
            Back To Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default SellerRegister;