import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';


function Shop() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState('default');
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [entranceDone, setEntranceDone] = useState(false);
  const [error, setError] = useState('');
  const cartRef = useRef(null);
  const navigate = useNavigate();

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setEntranceDone(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/product');
        console.log('Fetched products:', response.data);
        setProducts(response.data);
        setFilteredProducts(response.data);
        // Initialize quantities
        const initialQuantities = response.data.reduce(
          (acc, product) => ({ ...acc, [product.id]: 1 }),
          {}
        );
        setQuantities(initialQuantities);
        setError('');
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
      }
    };
    fetchProducts();
  }, []);

  // Check authentication status
  useEffect(() => {
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
    const handleStorageChange = () => checkAuthStatus();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Sort products based on filter
  useEffect(() => {
    let sorted = [...products];
    if (sortOption === 'price-low-high') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high-low') {
      sorted.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(sorted);
  }, [sortOption, products]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleQuantityChange = (productId, value) => {
    const maxQuantity = products.find((p) => p.id === productId)?.stock || 10;
    const newValue = Math.max(1, Math.min(value, maxQuantity));
    setQuantities((prev) => ({ ...prev, [productId]: newValue }));
  };

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }
    const quantity = quantities[product.id] || 1;
    const cartItem = { id: product.id, name: product.name, price: product.price, image: product.image, quantity };
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      let updatedCart;
      if (existingItem) {
        updatedCart = prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        updatedCart = [...prev, cartItem];
      }
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

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

  const handleLogoutFromPopup = async () => {
    try {
      await api.post('/logout', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setShowLoginPopup(false);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <motion.div
      className="relative min-h-screen bg-black text-white"
      style={{
        backgroundColor: entranceDone ? '#ffffff' : '#000000',
        color: entranceDone ? '#000000' : '#ffffff',
      }}>
      <Navbar entranceDone={entranceDone} />
      <div className="fixed top-5 right-5 z-50">
        <div
          ref={cartRef}
          onClick={handleCartClick}
          className="relative w-12 h-12 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition duration-100 cursor-pointer mt-20"
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
                    onClick={handleLogoutFromPopup}
                    className="w-full py-2 rounded-md border-2 border-black text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <p className="mb-4">Please log in to add items to your cart.</p>
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
      </AnimatePresence>
      <main className="flex pt-20 px-4 sm:px-6 min-h-screen">
        {/* Left Filter Sidebar */}
        <aside className="w-64 pr-6 hidden md:block">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Sort by Price</label>
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="w-full p-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="default">Default</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
            </select>
          </div>
        </aside>
        {/* Product Grid */}
        <div className="flex-1">
          <h1
            className="text-3xl sm:text-4xl font-extrabold text-center tracking-wide mb-8"
            style={{
              fontFamily: "'Brush Script MT', cursive",
              background: 'linear-gradient(45deg, #3a3a3aff, #FFC3AA, #ffa7a7ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Shop
          </h1>
          {error && <p className="text-center text-red-600 mb-8">{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={product.image ? `http://localhost:8000/storage/${product.image}` : 'https://via.placeholder.com/300'}
                  alt={product.name}
                  className="w-full h-auto max-h-[300px] object-contain"
                  onError={(e) => {
                    console.error(`Failed to load image for ${product.name}: ${product.image}`);
                    console.log(`Attempted URL: http://localhost:8000/storage/${product.image}`);
                    e.target.src = 'https://via.placeholder.com/300';
                  }}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-black">{product.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{product.description || 'No description available'}</p>
                  <p className="text-gray-800 font-medium mt-2">₹{product.price}</p>
                  <p className="text-gray-600 text-sm mt-1">In Stock: {product.stock}</p>
                  <div className="mt-4 flex items-center">
                    <label className="mr-2 text-sm text-black">Qty:</label>
                    <input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantities[product.id] || 1}
                      onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                      className="w-16 p-1 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="ml-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
                      disabled={product.stock === 0}
                    >
                      {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {filteredProducts.length === 0 && !error && (
            <p className="text-center text-gray-600 mt-8">No products available.</p>
          )}
        </div>
      </main>
      <Footer></Footer>
    </motion.div>
    
  );
}

export default Shop;