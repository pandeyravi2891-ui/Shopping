import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { LiaOpencart } from "react-icons/lia";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { CiFaceSmile } from "react-icons/ci";
import { IoMdPerson } from "react-icons/io";
import { HiOutlineHeart } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingBag, FiUser, FiLogOut, FiHome } from "react-icons/fi";

import logoImg from "../assets/logo.jpg";

function Navbar(props) {
  let islogged = props.islogged;
  let setislogged = props.setislogged;
  let value = props.value;
  let setvalue = props.setvalue;

  const { cart } = useSelector((state) => state);
  const { wish } = useSelector((state) => state);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex items-center justify-between gap-4 w-full max-w-7xl px-4 sm:px-6 select-none">
      
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2.5"
      >
        <NavLink to='/' onClick={() => setislogged(false)} className="flex items-center gap-2.5">
          <div className="relative">
            <img
              className="h-9 sm:h-10 w-9 sm:w-10 object-cover rounded-xl shadow-md border border-orange-200/60"
              src={logoImg}
              alt="Ecomzy Logo"
            />
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-tr from-orange-500/30 to-amber-400/20 -z-10 blur-sm" />
          </div>
          <div className="font-black text-xl tracking-tight hidden sm:block">
            <span className="text-slate-800">ecom</span>
            <span className="text-gradient-orange">zy</span>
          </div>
        </NavLink>
      </motion.div>

      {/* Center Nav Links (logged in only) */}
      {islogged && (
        <nav className="hidden md:flex items-center gap-1">
          {[
            { to: '/home', label: 'Home', icon: FiHome },
            { to: '/cart', label: 'Cart', icon: FiShoppingBag },
            { to: '/wishlist', label: 'Wishlist', icon: HiOutlineHeart },
          ].map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <NavLink key={to} to={to}>
                <motion.div
                  whileHover={{ y: -1 }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-orange-500/10 text-orange-600'
                      : 'text-slate-600 hover:text-orange-500 hover:bg-orange-50'
                  }`}
                >
                  <Icon className="text-base" />
                  <span>{label}</span>
                  {label === 'Cart' && cart?.length > 0 && (
                    <span className="bg-orange-500 text-white text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                  {label === 'Wishlist' && wish?.length > 0 && (
                    <span className="bg-pink-500 text-white text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                      {wish.length}
                    </span>
                  )}
                </motion.div>
              </NavLink>
            );
          })}
        </nav>
      )}

      {/* Right side actions */}
      <div className="flex items-center gap-2 font-semibold">
        {!islogged ? (
          <div className="flex items-center gap-2">
            {/* Wishlist icon (always visible) */}
            <NavLink to='/wishlist'>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2.5 rounded-xl bg-pink-50 text-pink-500 hover:bg-pink-100 hover:shadow-md hover:shadow-pink-100 transition-all duration-200"
              >
                <HiOutlineHeart className="text-xl" />
                <AnimatePresence>
                  {wish?.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-black rounded-full w-4.5 h-4.5 w-5 h-5 flex items-center justify-center shadow border-2 border-white"
                    >
                      {wish.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </NavLink>

            <NavLink to='/login'>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setvalue("login")}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${value === "login"
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25"
                  : "text-orange-600 border border-orange-200 hover:bg-orange-50"
                  }`}
              >
                Log In
              </motion.button>
            </NavLink>

            <NavLink to='/signin' className="hidden sm:block">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setvalue("signin")}
                className="px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-200 btn-ripple"
              >
                Sign Up
              </motion.button>
            </NavLink>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {/* Wishlist icon (mobile) */}
            <NavLink to='/wishlist' className="md:hidden">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2.5 rounded-xl bg-pink-50 text-pink-500 hover:bg-pink-100 transition-all"
              >
                <HiOutlineHeart className="text-xl" />
                {wish?.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                    {wish.length}
                  </span>
                )}
              </motion.div>
            </NavLink>

            {/* Cart icon (mobile) */}
            <NavLink to='/cart' className="relative md:hidden">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2.5 rounded-xl bg-orange-50 text-orange-600 hover:bg-orange-100 transition-all"
              >
                <LiaOpencart className="text-2xl" />
                <AnimatePresence>
                  {cart?.length > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full text-[10px] font-extrabold w-5 h-5 flex justify-center items-center shadow border-2 border-white"
                    >
                      {cart.length}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </NavLink>

            {/* Profile */}
            <NavLink to='/profile'>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 rounded-xl bg-violet-50 text-violet-500 hover:bg-violet-100 hover:shadow-md transition-all duration-200"
              >
                <FiUser className="text-xl" />
              </motion.div>
            </NavLink>

            {/* Logout */}
            <NavLink to='/'>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 text-white hover:bg-slate-700 shadow-md transition-all duration-200"
                onClick={() => {
                  toast.success("Logged out successfully!");
                  setislogged(false);
                }}
              >
                <FiLogOut className="text-sm" />
                <span className="hidden sm:block">Log Out</span>
              </motion.button>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;