import React from "react";
import { useDispatch } from "react-redux";
import { toast } from 'react-hot-toast';
import { TbTrash } from "react-icons/tb";
import { FiShoppingCart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { unlike } from "../redux/Slices/wishlistslice";
import { adder } from "../redux/Slices/cartSlice";
import { motion } from "framer-motion";

function Wishlistitem({ item, index }) {
    const Dispatch = useDispatch();

    const removeHandler = () => {
        Dispatch(unlike(item.id));
        toast.error("Removed from wishlist.");
    };

    const moveToCart = () => {
        Dispatch(adder(item));
        Dispatch(unlike(item.id));
        toast.success("Moved to cart! 🛒");
    };

    const rating = (3.5 + (item.id % 15) * 0.1).toFixed(1);
    const discount = 10 + (item.id % 5) * 10;
    const originalPrice = (item.price * (100 / (100 - discount))).toFixed(2);

    const categoryColors = {
        "men's clothing": "bg-slate-100 text-slate-700",
        "women's clothing": "bg-pink-50 text-pink-700",
        "electronics": "bg-blue-50 text-blue-700",
        "jewelery": "bg-purple-50 text-purple-700",
    };
    const badgeColor = categoryColors[item.category?.toLowerCase()] || "bg-orange-50 text-orange-700";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
            layout
            whileHover={{ y: -3 }}
            className="bg-white/90 backdrop-blur-lg border border-slate-100 rounded-2xl shadow-md hover:shadow-xl hover:shadow-pink-100/50 transition-all duration-300 overflow-hidden w-full group"
        >
            <div className="flex flex-col sm:flex-row items-center gap-5 p-5">
                {/* Image */}
                <div className="relative w-32 h-32 bg-gradient-to-b from-slate-50 to-white rounded-xl flex items-center justify-center p-3 shadow-inner border border-slate-100 flex-shrink-0 overflow-hidden">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Discount badge */}
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-rose-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                        -{discount}%
                    </div>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-2 flex-1 min-w-0 w-full text-left">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${badgeColor} px-2.5 py-1 rounded-full w-fit`}>
                        {item.category}
                    </span>
                    <h3 className="font-bold text-slate-800 text-base line-clamp-1">{item.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{item.description}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={`text-xs ${i < Math.floor(parseFloat(rating)) ? "text-amber-400" : "text-slate-200"}`} />
                            ))}
                        </div>
                        <span className="text-xs text-slate-400">({rating})</span>
                    </div>

                    {/* Price + Actions */}
                    <div className="flex items-center justify-between gap-4 mt-1 flex-wrap">
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-400 line-through">${originalPrice}</span>
                            <span className="text-2xl font-black text-slate-900">${item.price}</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <motion.button
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={moveToCart}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold shadow-md shadow-orange-500/20 hover:shadow-orange-500/40 transition-all btn-ripple"
                            >
                                <FiShoppingCart className="text-sm" />
                                Move to Cart
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.85 }}
                                onClick={removeHandler}
                                className="w-9 h-9 rounded-xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200 flex items-center justify-center border border-red-100 hover:border-red-500 shadow-sm"
                            >
                                <TbTrash className="text-base" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default Wishlistitem;