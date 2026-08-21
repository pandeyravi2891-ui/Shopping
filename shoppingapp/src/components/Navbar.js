import React from "react";
import toast from "react-hot-toast";
import { LiaOpencart } from "react-icons/lia";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { CiFaceSmile } from "react-icons/ci";
import { IoMdPerson } from "react-icons/io";
import { motion } from "framer-motion";

import logoImg from "../assets/logo.jpg";

function Navbar(props) {
  let islogged = props.islogged;
  let setislogged = props.setislogged;
  let value = props.value;
  let setvalue = props.setvalue;

  const { cart } = useSelector((state) => state);

  return (
    <div className="flex items-center justify-between gap-4 w-full max-w-6xl px-4 select-none">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="h-10 sm:h-12 flex items-center"
      >
        <NavLink to='/' onClick={() => setislogged(false)}>
          <img
            className="h-10 sm:h-12 object-contain rounded-xl shadow-md border border-orange-200/40 hover:shadow-orange-500/20 transition-all duration-300"
            src={logoImg}
            alt="Ecomzy Logo"
          />
        </NavLink>
      </motion.div>

      <div className="flex items-center gap-3 font-semibold">
        {!islogged ? (
          <div className="flex items-center gap-3">
            <NavLink to='/login'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setvalue("login")}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${value === "login"
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30"
                  : "bg-orange-50 text-orange-600 hover:bg-orange-100"
                  }`}
              >
                LOG IN
              </motion.button>
            </NavLink>

            <NavLink to='/signin'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setvalue("signin")}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${value === "signin"
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                  }`}
              >
                SIGN IN
              </motion.button>
            </NavLink>

            <NavLink to='/wishlist'>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 rounded-full bg-pink-50 text-pink-500 hover:bg-pink-100 transition"
              >
                <CiFaceSmile className="text-2xl" />
              </motion.div>
            </NavLink>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <NavLink to='/wishlist'>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 rounded-full bg-pink-50 text-pink-500 hover:bg-pink-100 transition"
              >
                <CiFaceSmile className="text-2xl" />
              </motion.div>
            </NavLink>

            <NavLink to='/cart' className="relative">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 rounded-full bg-orange-50 text-orange-600 hover:bg-orange-100 transition relative"
              >
                <LiaOpencart className="text-2xl" />
                {cart?.length > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-emerald-500 text-white rounded-full text-[10px] font-extrabold w-5 h-5 absolute -top-1 -right-1 flex justify-center items-center shadow-md border-2 border-white"
                  >
                    {cart.length}
                  </motion.div>
                )}
              </motion.div>
            </NavLink>

            <NavLink to='/'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 rounded-full text-xs font-extrabold tracking-wider bg-slate-800 text-white hover:bg-slate-900 shadow-md transition"
                onClick={() => {
                  toast.success("LOGGED OUT.");
                  setislogged(false);
                }}
              >
                LOG OUT
              </motion.button>
            </NavLink>

            <NavLink to='/profile'>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 rounded-full bg-pink-50 text-pink-500 hover:bg-pink-100 transition"
              >
                <IoMdPerson className="text-2xl" />
              </motion.div>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;