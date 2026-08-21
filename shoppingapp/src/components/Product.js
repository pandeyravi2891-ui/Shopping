import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { adder, remove } from "../redux/Slices/cartSlice.js";
import { like, unlike } from '../redux/Slices/wishlistslice.js';
import toast from "react-hot-toast";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { motion } from "framer-motion";

function Product(props) {
    const post = props.post;
    const { cart } = useSelector((state) => state);
    const { wish } = useSelector((state) => state);
    const Dispatch = useDispatch();

    const addHandler = (e) => {
        e.stopPropagation();
        Dispatch(adder(post));
        toast.success("ITEM ADDED TO CART.");
    };

    const removeHandler = (e) => {
        e.stopPropagation();
        Dispatch(remove(post.id));
        toast.error("ITEM REMOVED FROM CART.");
    };

    const likeHandler = (e) => {
        e.stopPropagation();
        Dispatch(like(post));
        toast.success("ITEM ADDED TO WISHLIST.");
    };

    const unlikeHandler = (e) => {
        e.stopPropagation();
        Dispatch(unlike(post.id));
        toast.error("ITEM REMOVED FROM WISHLIST.");
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    const isInCart = cart?.some((p) => p.id === post.id);
    const isLiked = wish?.some((p) => p.id === post.id);

    return (
        <motion.div 
            variants={cardVariants}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col items-center justify-between p-5 bg-white/80 backdrop-blur-xl border border-orange-100/80 rounded-3xl shadow-xl shadow-orange-500/5 hover:shadow-2xl hover:shadow-orange-500/15 transition-all duration-300 relative group overflow-hidden"
        >
            {/* Top Badge & Heart Wishlist Button */}
            <div className="w-full flex justify-between items-center mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-100/80 px-2.5 py-1 rounded-full">
                    {post.category || "Featured"}
                </span>

                <motion.button 
                    whileTap={{ scale: 0.8 }}
                    className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-orange-50 transition" 
                    onClick={isLiked ? unlikeHandler : likeHandler}
                >
                    {isLiked ? (
                        <FcLike className="text-xl" />
                    ) : (
                        <FcLikePlaceholder className="text-xl text-slate-400" />
                    )}
                </motion.button>
            </div>

            {/* Product Image */}
            <div className="w-full h-44 flex justify-center items-center p-2 my-2 overflow-hidden">
                <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    src={post.image} 
                    alt={post.title} 
                    className="h-full max-h-40 object-contain drop-shadow-md"
                />
            </div>

            {/* Title & Description */}
            <div className="w-full text-center mt-3 mb-2">
                <h3 className="font-bold text-slate-800 text-base truncate px-1">
                    {post.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 px-1 leading-relaxed">
                    {post.description}
                </p>
            </div>

            {/* Price & Action Button */}
            <div className="flex items-center justify-between w-full mt-4 pt-3 border-t border-slate-100">
                <div className="text-lg font-extrabold text-emerald-600">
                    ${post.price}
                </div>

                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={isInCart ? removeHandler : addHandler}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition duration-200 shadow-md ${
                        isInCart 
                            ? "bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-600 border border-slate-200" 
                            : "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-orange-500/20"
                    }`}
                >
                    {isInCart ? "REMOVE ITEM" : "ADD TO CART"}
                </motion.button>
            </div>
        </motion.div>
    );
}

export default Product;