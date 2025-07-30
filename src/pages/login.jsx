import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import one from '../assets/images/one.jpg';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await api.post('/login', {
        email: formData.email,
        password: formData.password,
      });
      const { accountExists, isMatch, token } = response.data;
      if (!accountExists) {
        setError('There is no account, please register first.');
      } else if (!isMatch) {
        setError('Please enter correct credentials.');
      } else {
        localStorage.setItem('token', token);
        setSuccess('Login successful!');
        setTimeout(() => navigate('/'), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const handleOtpLogin = () => {
    setIsOtpModalOpen(true);
  };

  const sendOtp = async () => {
    try {
      await api.post('/send-otp', { email: otpEmail });
      setOtpSent(true);
      setTimer(60); // 1 minute
      setError('');
    } catch (err) {
      setError('Failed to send OTP. Please check your email or try again.');
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await api.post('/verify-otp', { otp, email: otpEmail });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token); // Assuming backend returns a token
        setSuccess('Login successful!');
        setIsOtpModalOpen(false);
        setOtpSent(false);
        setTimer(0);
        setTimeout(() => navigate('/'), 2000);
      } else {
        setError('Invalid or expired OTP. Please try again.');
      }
    } catch (err) {
      setError('OTP verification failed. Please try again.');
    }
  };

  // Timer effect
  React.useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && otpSent) {
      setOtpSent(false);
      setOtp('');
      setError('OTP has expired. Please request a new one.');
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const goToHomePage = () => {
    navigate('/');
  };

  const handleRegister = () => {
    navigate('/register');
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Login</h2>
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
              Login with Email/Password
            </button>
            <button
              type="button"
              onClick={handleOtpLogin}
              className="w-full py-2 rounded-md border-2 border-white text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            >
              Login with OTP
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
          
          {isOtpModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white/50 backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">OTP Login</h3>
                {!otpSent ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={otpEmail}
                        onChange={(e) => setOtpEmail(e.target.value)}
                        className="w-full p-3 rounded-md border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <button
                      onClick={sendOtp}
                      className="w-full py-2 mt-4 rounded-md border-2 border-white text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
                      disabled={!otpEmail}
                    >
                      Send OTP
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-gray-700 mb-4">Enter the OTP sent to {otpEmail}. Time remaining: {timer} seconds.</p>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full p-3 rounded-md border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter 6-digit OTP"
                      maxLength="6"
                      required
                    />
                    <button
                      onClick={verifyOtp}
                      className="w-full py-2 mt-4 rounded-md border-2 border-white text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
                      disabled={timer === 0 || !otp}
                    >
                      Verify OTP
                    </button>
                  </>
                )}
                <button
                  onClick={() => {
                    setIsOtpModalOpen(false);
                    setOtpSent(false);
                    setTimer(0);
                    setOtpEmail('');
                    setOtp('');
                    setError('');
                  }}
                  className="w-full py-2 mt-4 rounded-md border-2 border-white text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;