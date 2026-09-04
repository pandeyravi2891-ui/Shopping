import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes, useLocation, Navigate ,useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Enter from './components/Enter';
import Login from './components/Login';
import Signin from './components/Signin';
import Wishlist from './pages/Wishlist';
import Otp from './components/Otp';
import ForgotPassword from './components/forgotpassword';
import ResetPassword from './components/resetpassword';
import Profile from './components/Profile';
import { useState, useEffect } from 'react';

function App() {
  const [islogged, setislogged] = useState(false);
  const [data1, setdata1] = useState("");
  const [value, setvalue] = useState("");
  const [totalAmount, settotalAmount] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      setislogged(false);
      setdata1("");
      setvalue("");
    }
    
  }, [location]);

  useEffect(() => {
    navigate("/");
}, []);

  function data(formData) {
    setdata1(formData);
  }

  return (
    <div className='relative select-none min-h-screen bg-hero overflow-x-hidden'>
      {/* Ambient background blobs */}
      <div className='fixed inset-0 pointer-events-none overflow-hidden z-0'>
        <div className='blob-orange absolute -top-32 -right-32 w-96 h-96 animate-blob opacity-60' />
        <div className='blob-amber absolute top-1/2 -left-40 w-80 h-80 animate-blob opacity-50' style={{ animationDelay: '3s' }} />
        <div className='blob-orange absolute -bottom-20 right-1/3 w-72 h-72 animate-blob opacity-40' style={{ animationDelay: '6s' }} />
      </div>

      {/* Premium Navbar */}
      <div className='border-b border-orange-100/60 backdrop-blur-2xl sticky top-0 z-50 bg-white/80 w-full flex items-center justify-center h-[72px] shadow-sm shadow-orange-100/50'>
        <Navbar islogged={islogged} setislogged={setislogged} data1={data1} value={value} setvalue={setvalue} />
      </div>

      <div className='relative z-10'>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path='/signin' element={<Signin onCall={data} value={value} setvalue={setvalue} />} />
            <Route path='/login' element={<Login islogged={islogged} setislogged={setislogged} onCall={data} />} />
            <Route path='/' element={<Enter />} />
            <Route path='/home' element={<Home islogged={islogged} totalAmount={totalAmount} settotalAmount={settotalAmount} />} />
            <Route path='/cart' element={<Cart totalAmount={totalAmount} settotalAmount={settotalAmount} />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/otp' element={<Otp islogged={islogged} setislogged={setislogged} data1={data1} />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
            <Route path='/resetpassword' element={<ResetPassword setislogged={setislogged} />} />
            <Route path='/profile' element={<Profile islogged={islogged} setislogged={setislogged} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
