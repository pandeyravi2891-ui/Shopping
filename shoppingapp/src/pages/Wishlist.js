import React from "react";
import Wishlistitem from '../components/Wishlistitem';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Wishlist() {
    const { wish } = useSelector((state) => state);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col justify-center items-center py-10 px-4 min-h-[calc(100vh-80px)]"
        >
            {wish?.length > 0 ? (
                <div className="w-full max-w-4xl flex flex-col items-center">
                    <h2 className="text-3xl font-extrabold text-slate-800 mb-8 text-center">My Wishlist ❤️</h2>
                    <AnimatePresence>
                        {wish?.map((item, index) => (
                            <Wishlistitem key={item.id} item={item} index={index} />
                        ))}
                    </AnimatePresence>
                </div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col justify-center items-center gap-6 text-center"
                >
                    <div className="w-24 h-24 bg-pink-100 rounded-full flex justify-center items-center text-4xl text-pink-500 shadow-inner">
                        ❤️
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-800">Your Wishlist is Empty</h1>
                    <p className="text-slate-500 text-sm max-w-sm">Save items you love to your wishlist and revisit them anytime.</p>
                    <NavLink to={'/home'}>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg px-8 py-3.5 rounded-2xl shadow-lg shadow-orange-500/30"
                        >
                            Make Your Wish
                        </motion.button>
                    </NavLink>
                </motion.div>
            )}
        </motion.div>
    );
}

export default Wishlist;