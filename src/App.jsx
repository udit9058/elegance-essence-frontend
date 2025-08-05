import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/index';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Shop from './pages/Shop';
import Login from './pages/login';
import Register from './pages/register';
import CartPage from './components/cart';
import PaymentSuccess from './pages/paymentSuccess';
import ProfilePage from './pages/ProfilePage';
import AddressPage from './pages/AddressPage';
import ProcessDone from './pages/ProcessDone';
import SellerDashboard from './seller/SellerDashboard';
import BecomeSeller from './components/BecomeSeller';
import SellerLogin from './pages/SellerLogin';
import SellerRegister from './pages/SellerRegister';
import VirtualMall from './VirtualMall/VirtualMall';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>  
          <Route path="/" element={<LandingPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/address" element={<AddressPage />} />
          <Route path="/process-done" element={<ProcessDone />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/become-seller" element={<BecomeSeller />} />
          <Route path="/seller/login" element={<SellerLogin />} />
          <Route path="/seller/register" element={<SellerRegister />} />


          <Route path="/virtual-mall" element={<VirtualMall/>}></Route>
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
export default App; 