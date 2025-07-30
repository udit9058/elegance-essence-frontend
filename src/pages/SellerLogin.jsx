import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import one from '../assets/images/one.jpg';

function SellerLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await api.post('/seller/login', {
        email: formData.email,
        password: formData.password,
      });
      const { accountExists, isMatch, token } = response.data;
      if (!accountExists) {
        setError('There is no account, please register first.');
      } else if (!isMatch) {
        setError('Please enter correct credentials.');
      } else {
        localStorage.setItem('seller_token', token);
        setSuccess('Login successful!');
        setTimeout(() => navigate('/seller/dashboard'), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const goToHomePage = () => {
    navigate('/');
  };

  const handleRegister = () => {
    navigate('/seller/register');
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
        <div className="bg-white/50 backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Seller Login</h2>
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
          {success && <p className="text-sm text-green-600 mt-2">{success}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full p-3 rounded-md border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-md border-2 border-white text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            >
              Login
            </button>
          </form>
          <button
            type="button"
            onClick={handleRegister}
            className="w-full py-2 mt-2 rounded-md border-2 border-white text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
          >
            Register
          </button>
          <button
            type="button"
            onClick={goToHomePage}
            className="w-full py-2 mt-4 rounded-md border-2 border-white text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
          >
            Back To Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default SellerLogin;