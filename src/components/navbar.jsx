import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

function Navbar({ entranceDone }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
      if (window.innerWidth > 640) setIsMenuOpen(false); // Close menu on desktop
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLoginClick = () => {
    setIsMenuOpen(false);
    navigate('/login');
  };

  const handleProfileClick = () => {
    setIsMenuOpen(false);
    navigate('/profile');
  };

  const handleLogout = async () => {
    try {
      await api.post('/logout', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setUser(null);
      setIsMenuOpen(false);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
      {/* Logo */}
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

      {isMobile ? (
        // Mobile View
        <>
          {/* Hamburger Button */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="z-[70] p-2 focus:outline-none"
          >
            <div className="w-6 h-4 flex flex-col justify-between">
              <span
                className={`block h-0.5 rounded-full transition-transform duration-300 ${
                  entranceDone ? 'bg-black' : 'bg-white'
                } ${isMenuOpen ? 'transform rotate-45 translate-y-1.5' : ''}`}
              ></span>
              <span
                className={`block h-0.5 rounded-full transition-opacity duration-300 ${
                  entranceDone ? 'bg-black' : 'bg-white'
                } ${isMenuOpen ? 'opacity-0' : ''}`}
              ></span>
              <span
                className={`block h-0.5 rounded-full transition-transform duration-300 ${
                  entranceDone ? 'bg-black' : 'bg-white'
                } ${isMenuOpen ? 'transform -rotate-45 -translate-y-1.5' : ''}`}
              ></span>
            </div>
          </button>

          {/* Mobile Menu */}
          <motion.div
            className="fixed top-0 right-0 w-4/5 max-w-xs h-full z-[60] flex flex-col items-start p-6 shadow-lg"
            style={{
              backgroundColor: entranceDone ? '#ffffff' : '#000000',
              color: entranceDone ? '#000000' : '#ffffff',
            }}
            initial={{ x: '100%' }}
            animate={{ x: isMenuOpen ? 0 : '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Navigation Links */}
            <div className="flex flex-col space-y-4 mt-4 w-full">
              {['About Us', 'Contact Us', 'Shop' , 'Vitual Mall'].map((link) => (
                <motion.div
                  key={link}
                  className={`text-base font-medium transition duration-300 cursor-pointer ${
                    entranceDone ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-300'
                  }`}
                  style={{ fontFamily: "'Brush Script MT', cursive" }}
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '-')}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link}
                  </Link>
                </motion.div>
              ))}
              {isLoggedIn ? (
                <div className="flex flex-col space-y-4">
                  <motion.div
                    className="flex items-center space-x-2"
                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={
                        user?.profile_image
                          ? `http://localhost:8000/storage/${user.profile_image}`
                          : 'default-avatar.png'
                      }
                      alt="User Profile"
                      className="w-8 h-8 rounded-full object-cover cursor-pointer border-2 border-gray-300"
                      onClick={handleProfileClick}
                    />
                    <span
                      className="text-base font-medium"
                      style={{ fontFamily: "'Brush Script MT', cursive" }}
                      onClick={handleProfileClick}
                    >
                      Profile
                    </span>
                  </motion.div>
                  <motion.button
                    className="text-base font-medium text-left transition duration-300"
                    style={{ fontFamily: "'Brush Script MT', cursive" }}
                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                  >
                    Logout
                  </motion.button>
                </div>
              ) : (
                <motion.div
                  className="text-base font-medium transition duration-300 cursor-pointer"
                  style={{
                    fontFamily: "'Brush Script MT', cursive",
                    background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    padding: '6px 12px',
                    borderRadius: '16px',
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
          </motion.div>
        </>
      ) : (
        // Desktop View (Original)
        <div className="flex justify-end items-center space-x-3 sm:space-x-4">
          {['About Us', 'Contact Us', 'Shop' , 'Virtual Mall'].map((link) => (
            <motion.div
              key={link}
              className={`text-sm sm:text-base font-medium transition duration-300 cursor-pointer ${
                entranceDone ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-300'
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
                src={
                  user?.profile_image
                    ? `http://localhost:8000/storage/${user.profile_image}`
                    : 'default-avatar.png'
                }
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
      )}
    </motion.nav>
  );
}

export default Navbar;