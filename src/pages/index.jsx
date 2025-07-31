// LandingPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Navbar from '../components/navbar.jsx';
import Carousel from '../components/carousel.jsx';
import Footer from '../components/footer.jsx';

function LandingPage() {
  const [entranceDone, setEntranceDone] = useState(false);
  const [showWhiteSlide, setShowWhiteSlide] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState(() =>
    ['Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5'].reduce(
      (acc, alt) => ({ ...acc, [alt]: 1 }),
      {}
    )
  );
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSellerPopup, setShowSellerPopup] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cartRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Existing useEffect for entrance animation
    const hasVisited = sessionStorage.getItem('hasVisitedLanding');
    if (!hasVisited) {
      setShowWhiteSlide(true);
      const entranceTimer = setTimeout(() => {
        setEntranceDone(true);
      }, 3000);
      const slideHideTimer = setTimeout(() => {
        setShowWhiteSlide(false);
        sessionStorage.setItem('hasVisitedLanding', 'true');
      }, 3700);
      return () => {
        clearTimeout(entranceTimer);
        clearTimeout(slideHideTimer);
      };
    } else {
      setEntranceDone(true);
      setShowWhiteSlide(false);
    }
  }, []);

  useEffect(() => {
    // Existing useEffect for auth check
    const checkAuthStatus = async () => {
      try {
        const response = await api.get('/check-auth', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (err) {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
      }
    };
    checkAuthStatus();
    const handleStorageChange = () => {
      checkAuthStatus();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleCartClick = () => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
    } else {
      navigate('/cart');
    }
  };

  const handleLoginFromPopup = () => {
    setShowLoginPopup(false);
    navigate('/login');
  };

  const handleLogoutFromPopup = async (isSellerPopup = false) => {
    try {
      await api.post('/logout', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setShowLoginPopup(false);
      setShowSellerPopup(false);
      if (isSellerPopup) {
        navigate('/seller/register'); // Redirect to seller registration after logout
      }
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const newArrivalsVariants = {
    hidden: { y: -200, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 2, ease: 'easeOut' } },
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <Navbar />
      <motion.div
        className="relative min-h-screen overflow-x-hidden"
        style={{
          backgroundColor: entranceDone ? '#ffffff' : '#000000',
          color: entranceDone ? '#000000' : '#ffffff',
        }}
      >
        <div className="fixed top-4 right-4 z-50">
          <div
            ref={cartRef}
            onClick={handleCartClick}
            className="relative w-12 h-12 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition duration-100 mt-15 cursor-pointer"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </div>
        </div>
        <AnimatePresence>
          {showLoginPopup && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              onClick={(e) => {
                if (e.target === e.currentTarget) setShowLoginPopup(false);
              }}
            >
              <motion.div
                className="bg-white p-6 rounded-lg shadow-lg text-black max-w-md w-full relative"
                initial={{ scale: 0.7 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.7 }}
              >
                <h3 className="text-lg font-semibold mb-4">Authentication</h3>
                <button
                  onClick={() => setShowLoginPopup(false)}
                  className="absolute top-2 right-2 text-gray-500 cursor-pointer focus:outline-none"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Close"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                {isLoggedIn ? (
                  <>
                    <p className="mb-4">You are logged in. Do you want to log out?</p>
                    <button
                      onClick={() => handleLogoutFromPopup()}
                      className="w-full py-2 rounded-md border-2 border-black text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black mr-2"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <p className="mb-4">Please log in to view your cart.</p>
                    <button
                      onClick={handleLoginFromPopup}
                      className="w-full py-2 rounded-md border-2 border-black text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      Login
                    </button>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
          {showSellerPopup && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              onClick={(e) => {
                if (e.target === e.currentTarget) setShowSellerPopup(false);
              }}
            >
              <motion.div
                className="bg-white p-6 rounded-lg shadow-lg text-black max-w-md w-full relative"
                initial={{ scale: 0.7 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.7 }}
              >
                <h3 className="text-lg font-semibold mb-4">Become a Seller</h3>
                <button
                  onClick={() => setShowSellerPopup(false)}
                  className="absolute top-2 right-2 text-gray-500 cursor-pointer focus:outline-none"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Close"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <p className="mb-4">
                  You are currently logged in as a customer. Please log out to register or log in as a seller.
                </p>
                <button
                  onClick={() => handleLogoutFromPopup(true)}
                  className="w-full py-2 rounded-md border-2 border-black text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black mr-2"
                >
                  Logout and Proceed
                </button>
              </motion.div>
            </motion.div>
          )}
          {showWhiteSlide && (
            <motion.div
              key="whiteSlide"
              className="fixed inset-0 bg-white z-50 pointer-events-none"
              initial={{ y: '100%' }}
              animate={{ y: '-100%' }}
              exit={{ y: '-100%' }}
              transition={{ delay: 2.7, duration: 1, ease: 'easeInOut' }}
            />
          )}
        </AnimatePresence>
        <motion.main
          className="flex flex-col items-center pt-[100px] min-h-screen relative select-none"
          animate={{
            y: entranceDone ? -90 : 0,
            transition: { duration: 1.5, ease: 'easeInOut' },
          }}
        >
          <motion.h2
            className="text-3xl font-extrabold mb-8 z-10 relative tracking-wide text-gray-900 dark:text-black pt-[70px]"
            style={{
              fontFamily: "'Brush Script MT', cursive",
              background: 'linear-gradient(45deg, #000000ff, #FFC3AA, #000000ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            variants={{
              hidden: { y: -200, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 2, ease: 'easeOut' } },
            }}
            initial="hidden"
            animate={entranceDone ? 'visible' : 'hidden'}
          >
          </motion.h2>
          <Carousel
            cartItems={cartItems}
            setCartItems={setCartItems}
            quantities={quantities}
            setQuantities={setQuantities}
            cartRef={cartRef}
            isLoggedIn={isLoggedIn}
            setShowLoginPopup={setShowLoginPopup}
            showEntranceAnimation={!entranceDone}
          />
        </motion.main>
      </motion.div>
      <Footer setShowSellerPopup={setShowSellerPopup} isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default LandingPage;