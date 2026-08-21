import React from "react";
import { TbHttpDelete } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/cartSlice";
import { toast } from 'react-hot-toast';
import { motion } from "framer-motion";

function CartItem({ item, index }) {
    const Dispatch = useDispatch();

    function removeHandler() {
        Dispatch(remove(item.id));
        toast.error("ITEM REMOVED FROM CART.");
    }

    return (
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex flex-col justify-center items-center w-full"
        >
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 p-6 bg-white/70 backdrop-blur-md rounded-3xl border border-orange-100 shadow-md w-full my-3">
                <div className="w-28 h-28 flex justify-center items-center p-2 bg-white rounded-2xl shadow-inner shrink-0">
                    <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
                </div>

                <div className="flex flex-col justify-center items-start gap-2 flex-1">
                    <h3 className="text-slate-800 font-bold text-base sm:text-lg line-clamp-1">
                        {item.title}
                    </h3>

                    <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                        {item.description}
                    </p>

                    <div className="flex items-center justify-between gap-5 w-full mt-3">
                        <p className="text-lg font-extrabold text-emerald-600">${item.price}</p>
                        
                        <motion.button 
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={removeHandler} 
                            className="p-2.5 rounded-full bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition duration-200 shadow-sm"
                        >
                            <TbHttpDelete className="text-xl" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default CartItem;