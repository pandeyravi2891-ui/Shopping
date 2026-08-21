import React from "react";
import { useDispatch } from "react-redux";
import { toast } from 'react-hot-toast';
import { TbHttpDelete } from "react-icons/tb";
import { unlike } from "../redux/Slices/wishlistslice";
import { motion } from "framer-motion";

function Wishlistitem({ item, index }) {
    const Dispatch = useDispatch();

    const removeHandler = () => {
        Dispatch(unlike(item.id));
        toast.error("ITEM REMOVED FROM WISHLIST.");
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex justify-center items-center w-full my-3"
        >
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-orange-100 shadow-lg w-full max-w-3xl">
                <div className="w-32 h-32 flex justify-center items-center p-3 bg-white rounded-2xl shadow-inner shrink-0">
                    <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
                </div>

                <div className="flex flex-col justify-center items-start gap-3 flex-1">
                    <h3 className="text-slate-800 font-bold text-lg line-clamp-1">
                        {item.title}
                    </h3>

                    <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                        {item.description}
                    </p>

                    <div className="flex items-center justify-between w-full mt-2">
                        <span className="text-xl font-black text-emerald-600">${item.price}</span>
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

export default Wishlistitem;