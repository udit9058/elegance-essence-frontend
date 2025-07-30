import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

function Navbar({ entranceDone }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await api.get('/check-auth', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setIsLoggedIn(response.data.isLoggedIn);
        if (response.data.isLoggedIn) {
          setUser(response.data.user);
        }
      } catch (err) {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('token');
      }
    };
    checkAuthStatus();

    const handleStorageChange = () => checkAuthStatus();
    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLoginClick = () => navigate('/login');
  const handleProfileClick = () => navigate('/profile');
  const handleLogout = async () => {
    try {
      await api.post('/logout', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setUser(null);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[60] flex justify-between items-center px-4 sm:px-6 py-4"
      style={{
        backgroundColor: entranceDone ? '#ffffff' : '#000000',
        color: entranceDone ? '#000000' : '#ffffff',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: 'easeOut', delay: 2.7 }}
    >
      {/* Title: Elegance Essence */}
      <Link to="/" className="text-xl sm:text-2xl font-bold">
        <div className="text-2xl sm:text-3xl font-extrabold tracking-wide">
          <span
            style={{
              fontFamily: "'Brush Script MT', cursive",
              background: 'linear-gradient(45deg, #3a3a3aff, #FFC3AA, #ffa7a7ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Elegance Essence
          </span>
        </div>
      </Link>
      {/* Navigation Links */}
      <div className="flex justify-end items-center space-x-3 sm:space-x-4">
        {['About Us', 'Contact Us', 'Shop'].map((link) => (
          <motion.div
            key={link}
            className={`text-sm sm:text-base font-medium transition duration-300 cursor-pointer ${entranceDone
              ? 'text-black hover:text-gray-600'
              : 'text-white hover:text-gray-300'
              }`}
            style={{ fontFamily: "'Brush Script MT', cursive", WebkitBackgroundClip: 'text' }}
            whileHover={{
              rotateY: 15,
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to={link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '-')}`}>
              {link}
            </Link>
          </motion.div>
        ))}
        {isLoggedIn ? (
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={user?.profile_image ? `http://localhost:8000/storage/${user.profile_image}` : 'default-avatar.png'}
              alt="User Profile"
              className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-gray-300"
              onClick={handleProfileClick}
            />
            <motion.div
              className="absolute right-0 mt-2 w-24 bg-gray-800 text-white text-xs rounded-md shadow-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: isLoggedIn ? 0 : 1, y: isLoggedIn ? -10 : 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md"
              >
                Logout
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            className="text-sm sm:text-base font-medium transition duration-300 cursor-pointer"
            style={{
              fontFamily: "'Brush Script MT', cursive",
              WebkitBackgroundClip: 'text',
              background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
              padding: '8px 16px',
              borderRadius: '20px',
              color: entranceDone ? '#ffffff' : '#000000',
            }}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLoginClick}
          >
            Login
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

export default Navbar;