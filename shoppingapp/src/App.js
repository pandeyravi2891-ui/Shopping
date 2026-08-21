import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
  let Navigate = useNavigate();


  useEffect(() => {
    if (location.pathname === '/') {
      setislogged(false);
      setdata1("");
      setvalue("");
    }
  }, [location]);

  function data(formData) {
    setdata1(formData);
  }

  return (
    <div className='relative select-none min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 overflow-x-hidden'>
      <div className='border-b border-solid border-orange-200/50 backdrop-blur-md sticky top-0 z-50 bg-white/80 w-full flex items-center justify-center h-20 shadow-sm'>
        <Navbar islogged={islogged} setislogged={setislogged} data1={data1} value={value} setvalue={setvalue} />
      </div>

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
  );
}

export default App;

