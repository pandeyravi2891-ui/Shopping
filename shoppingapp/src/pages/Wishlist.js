import React from "react";
import Wishlistitem from '../components/Wishlistitem';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineHeart, HiSparkles } from "react-icons/hi";
import { FiShoppingBag } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

function Wishlist() {
    const { wish } = useSelector((state) => state);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="min-h-[calc(100vh-72px)] py-8 px-4"
        >
            <div className="max-w-4xl mx-auto">
                {wish?.length > 0 ? (
                    <div className="flex flex-col gap-6">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <HiSparkles className="text-pink-500" />
                                    <span className="text-pink-500 text-xs font-bold uppercase tracking-widest">Your</span>
                                </div>
                                <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                                    Wishlist
                                    <FaHeart className="text-pink-500 text-2xl" />
                                    <span className="text-lg font-bold text-slate-400">({wish.length} items)</span>
                                </h1>
                            </div>

                            <NavLink to="/home">
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 text-sm font-semibold shadow-sm hover:border-pink-300 hover:text-pink-600 transition-all"
                                >
                                    <FiShoppingBag />
                                    Keep Shopping
                                </motion.button>
                            </NavLink>
                        </div>

                        {/* Info Banner */}
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200/60"
                        >
                            <div className="w-9 h-9 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-pink-500/20">
                                <FaHeart className="text-sm" />
                            </div>
                            <p className="text-sm text-slate-600">
                                <span className="font-bold text-pink-600">Tip:</span> Use the "Move to Cart" button to instantly add items to your cart and remove from wishlist.
                            </p>
                        </motion.div>

                        {/* Items */}
                        <AnimatePresence>
                            {wish?.map((item, index) => (
                                <Wishlistitem key={item.id} item={item} index={index} />
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    /* Empty Wishlist State */
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col justify-center items-center gap-6 text-center min-h-[60vh]"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                            className="w-32 h-32 bg-gradient-to-br from-pink-100 to-rose-100 rounded-3xl flex justify-center items-center shadow-xl shadow-pink-100"
                        >
                            <HiOutlineHeart className="text-pink-400 text-6xl" />
                        </motion.div>
                        <div>
                            <h1 className="text-4xl font-black text-slate-800 mb-2">Nothing Here Yet</h1>
                            <p className="text-slate-500 max-w-sm mx-auto text-sm leading-relaxed">
                                Save items you love to your wishlist by tapping the heart icon on any product.
                            </p>
                        </div>
                        <NavLink to='/home'>
                            <motion.button
                                whileHover={{ scale: 1.06, y: -3 }}
                                whileTap={{ scale: 0.96 }}
                                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black text-base px-10 py-4 rounded-2xl shadow-2xl shadow-pink-500/30 flex items-center gap-3 btn-ripple"
                            >
                                <FaHeart />
                                Discover Products
                            </motion.button>
                        </NavLink>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}

export default Wishlist;