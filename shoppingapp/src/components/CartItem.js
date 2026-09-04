import React from "react";
import { TbTrash } from "react-icons/tb";
// import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/cartSlice";
import { toast } from 'react-hot-toast';
import { motion } from "framer-motion";

function CartItem({ item, index }) {
    const Dispatch = useDispatch();

    function removeHandler() {
        Dispatch(remove(item.id));
        toast.error("Item removed from cart.");
    }

    const categoryColors = {
        "men's clothing": "bg-slate-100 text-slate-700",
        "women's clothing": "bg-pink-50 text-pink-700",
        "electronics": "bg-blue-50 text-blue-700",
        "jewelery": "bg-purple-50 text-purple-700",
    };
    const badgeColor = categoryColors[item.category?.toLowerCase()] || "bg-orange-50 text-orange-700";

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30, scale: 0.95 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            layout
            className="group bg-white/90 backdrop-blur-lg border border-slate-100 rounded-2xl shadow-md hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 overflow-hidden"
        >
            <div className="flex flex-col sm:flex-row items-center gap-5 p-5">
                {/* Image */}
                <div className="relative w-28 h-28 bg-gradient-to-b from-slate-50 to-white rounded-xl flex items-center justify-center p-3 shadow-inner border border-slate-100 flex-shrink-0 overflow-hidden">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center gap-2 flex-1 min-w-0 text-left sm:text-left w-full">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${badgeColor} px-2.5 py-1 rounded-full w-fit`}>
                        {item.category}
                    </span>
                    <h3 className="text-slate-800 font-bold text-base line-clamp-1">
                        {item.title}
                    </h3>
                    <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                        {item.description}
                    </p>

                    <div className="flex items-center justify-between gap-4 mt-2">
                        <span className="text-2xl font-black text-slate-900">${item.price}</span>

                        <div className="flex items-center gap-3">
                            <motion.button
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.85 }}
                                onClick={removeHandler}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white text-xs font-bold border border-red-100 hover:border-red-500 transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-red-500/20"
                            >
                                <TbTrash className="text-base" />
                                <span>Remove</span>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default CartItem;