import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adder, remove } from "../redux/Slices/cartSlice.js";
import { like, unlike } from '../redux/Slices/wishlistslice.js';
import toast from "react-hot-toast";
import { FcLike } from "react-icons/fc";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { FiShoppingCart, FiCheck, FiEye } from "react-icons/fi";
import { HiOutlineHeart } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const categoryColors = {
  "men's clothing": { bg: "from-slate-700 to-slate-800", text: "text-slate-700", badge: "bg-slate-100 text-slate-700" },
  "women's clothing": { bg: "from-pink-500 to-rose-600", text: "text-pink-700", badge: "bg-pink-50 text-pink-700" },
  "electronics": { bg: "from-blue-500 to-indigo-600", text: "text-blue-700", badge: "bg-blue-50 text-blue-700" },
  "jewelery": { bg: "from-purple-500 to-violet-600", text: "text-purple-700", badge: "bg-purple-50 text-purple-700" },
};

function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={i} className="text-amber-400 text-xs" />
      ))}
      {hasHalf && <FaStarHalf className="text-amber-400 text-xs" />}
      {[...Array(5 - fullStars - (hasHalf ? 1 : 0))].map((_, i) => (
        <FaStar key={i + fullStars} className="text-slate-200 text-xs" />
      ))}
    </div>
  );
}

function Product(props) {
  const post = props.post;
  const { cart } = useSelector((state) => state);
  const { wish } = useSelector((state) => state);
  const Dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  // const [justAdded, setJustAdded] = useState(false);

  const isInCart = cart?.some((p) => p.id === post.id);
  const isLiked = wish?.some((p) => p.id === post.id);
  const catColors = categoryColors[post.category?.toLowerCase()] || { badge: "bg-orange-50 text-orange-700" };

  const addHandler = (e) => {
    e.stopPropagation();
    Dispatch(adder(post));
    toast.success("Added to cart! 🛒");
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const removeHandler = (e) => {
    e.stopPropagation();
    Dispatch(remove(post.id));
    toast.error("Removed from cart.");
  };

  const likeHandler = (e) => {
    e.stopPropagation();
    Dispatch(like(post));
    toast.success("Added to wishlist! ❤️");
  };

  const unlikeHandler = (e) => {
    e.stopPropagation();
    Dispatch(unlike(post.id));
    toast.error("Removed from wishlist.");
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
  };

  // Generate a pseudo-random rating and review count
  const rating = (3.5 + (post.id % 15) * 0.1).toFixed(1);
  const reviews = 45 + (post.id * 17) % 200;
  // Discount percentage
  const discount = 10 + (post.id % 5) * 10;
  const originalPrice = (post.price * (100 / (100 - discount))).toFixed(2);

  return (
    <motion.div
      variants={cardVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 250, damping: 22 }}
      className="flex flex-col bg-white/90 backdrop-blur-xl border border-slate-100 rounded-3xl shadow-lg shadow-slate-200/60 hover:shadow-2xl hover:shadow-orange-200/40 transition-shadow duration-300 relative overflow-hidden group card-shine"
    >
      {/* Discount badge */}
      <div className="absolute top-3.5 left-3.5 z-20">
        <span className="bg-gradient-to-r from-red-500 to-rose-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md shadow-red-300/40">
          -{discount}% OFF
        </span>
      </div>

      {/* Wishlist button */}
      <motion.button
        whileTap={{ scale: 0.8 }}
        className="absolute top-3.5 right-3.5 z-20 w-9 h-9 bg-white shadow-lg rounded-full flex items-center justify-center hover:scale-110 transition-transform border border-slate-100"
        onClick={isLiked ? unlikeHandler : likeHandler}
      >
        {isLiked ? (
          <FcLike className="text-lg" />
        ) : (
          <HiOutlineHeart className="text-slate-400 text-lg group-hover:text-pink-400 transition-colors" />
        )}
      </motion.button>

      {/* Product Image */}
      <div className="w-full h-52 flex justify-center items-center p-6 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.05)_0%,transparent_70%)]" />

        <motion.img
          animate={{ scale: isHovered ? 1.12 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          src={post.image}
          alt={post.title}
          className="h-40 max-w-full object-contain relative z-10 drop-shadow-xl"
        />

        {/* Quick view overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[11px] font-bold text-slate-600 flex items-center gap-1.5 shadow-lg border border-slate-100 z-20 whitespace-nowrap"
            >
              <FiEye className="text-orange-500 text-sm" />
              Quick View
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        {/* Category badge + rating */}
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-bold uppercase tracking-wider ${catColors.badge} px-2.5 py-1 rounded-full`}>
            {post.category}
          </span>
          <div className="flex items-center gap-1">
            <StarRating rating={parseFloat(rating)} />
            <span className="text-[10px] text-slate-400 font-medium">({reviews})</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-slate-800 text-sm leading-snug line-clamp-2 min-h-[2.5rem]">
          {post.title}
        </h3>

        {/* Description */}
        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed hidden">
          {post.description}
        </p>

        {/* Price Row + Add to Cart */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 line-through">${originalPrice}</span>
            <span className="text-xl font-black text-slate-900">${post.price}</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={isInCart ? removeHandler : addHandler}
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 btn-ripple overflow-hidden ${isInCart
                ? "bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200"
                : "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
              }`}
          >
            <AnimatePresence mode="wait">
              {isInCart ? (
                <motion.div
                  key="incart"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1.5"
                >
                  <FiCheck className="text-sm" />
                  <span>In Cart</span>
                </motion.div>
              ) : (
                <motion.div
                  key="addcart"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1.5"
                >
                  <FiShoppingCart className="text-sm" />
                  <span>Add to Cart</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default Product;