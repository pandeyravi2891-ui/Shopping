import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import CartItem from '../components/CartItem';
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingCart, FiTag, FiArrowLeft, FiTruck, FiLock } from "react-icons/fi";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";
// import { MdLocalShipping, MdVerified } from "react-icons/md";
import { AiOutlineSafetyCertificate } from "react-icons/ai";

function Cart(props) {
    let totalAmount = props.totalAmount;
    let settotalAmount = props.settotalAmount;

    const { cart } = useSelector((state) => state);
    const [coupon, setCoupon] = useState("");
    const [couponApplied, setCouponApplied] = useState(false);
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        settotalAmount(cart?.reduce((acc, curr) => acc + curr.price, 0));
    }, [cart, settotalAmount]);

    const handleCoupon = () => {
        if (coupon.toUpperCase() === "ECOMZY10") {
            setCouponApplied(true);
            setDiscount(totalAmount * 0.1);
        } else {
            setCouponApplied(false);
            setDiscount(0);
        }
    };

    const finalAmount = totalAmount - discount;
    const savings = discount + (totalAmount * 0.05); // shipping savings

    const securityFeatures = [
        { icon: <FiLock className="text-emerald-500" />, text: "SSL Secured Checkout" },
        { icon: <AiOutlineSafetyCertificate className="text-blue-500" />, text: "Money-Back Guarantee" },
        { icon: <FiTruck className="text-orange-500" />, text: "Free Shipping Included" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="min-h-[calc(100vh-72px)] py-8 px-4"
        >
            <div className="max-w-7xl mx-auto">
                {cart?.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                        {/* ===== Left: Cart Items ===== */}
                        <div className="lg:col-span-2 flex flex-col gap-4">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <HiSparkles className="text-orange-500" />
                                        <span className="text-orange-500 text-xs font-bold uppercase tracking-widest">Review Your</span>
                                    </div>
                                    <h1 className="text-3xl font-black text-slate-900">
                                        Shopping Cart
                                        <span className="ml-3 text-lg font-bold text-slate-400">({cart.length} items)</span>
                                    </h1>
                                </div>
                                <NavLink to="/home">
                                    <motion.button
                                        whileHover={{ scale: 1.04, x: -2 }}
                                        whileTap={{ scale: 0.96 }}
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 text-sm font-semibold shadow-sm hover:border-orange-300 hover:text-orange-600 transition-all"
                                    >
                                        <FiArrowLeft />
                                        Continue Shopping
                                    </motion.button>
                                </NavLink>
                            </div>

                            {/* Items */}
                            <AnimatePresence>
                                {cart?.map((item, index) => (
                                    <CartItem key={item.id} item={item} index={index} />
                                ))}
                            </AnimatePresence>

                            {/* Promo Banner */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-200/60"
                            >
                                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0 shadow-md shadow-orange-500/20">
                                    🎉
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800 text-sm">You're doing great!</p>
                                    <p className="text-xs text-slate-500">Use code <span className="font-black text-orange-600">ECOMZY10</span> for 10% off your order.</p>
                                </div>
                                <HiLightningBolt className="text-orange-400 text-xl ml-auto flex-shrink-0" />
                            </motion.div>
                        </div>

                        {/* ===== Right: Order Summary ===== */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-col gap-4 sticky top-24"
                        >
                            {/* Summary Card */}
                            <div className="bg-white/90 backdrop-blur-xl p-7 rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/50">
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="text-xs font-black uppercase tracking-widest text-orange-500 bg-orange-100 px-3 py-1.5 rounded-full">
                                        📋 Summary
                                    </span>
                                </div>
                                <h2 className="text-2xl font-black text-slate-900 mb-5">Order Details</h2>

                                {/* Line Items */}
                                <div className="flex flex-col gap-3 mb-5">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500">Subtotal ({cart.length} items)</span>
                                        <span className="font-bold text-slate-800">${totalAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 flex items-center gap-1.5">
                                            <FiTruck className="text-orange-500" /> Shipping
                                        </span>
                                        <span className="font-bold text-emerald-600">FREE</span>
                                    </div>
                                    {couponApplied && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="flex justify-between items-center text-sm"
                                        >
                                            <span className="text-slate-500 flex items-center gap-1.5">
                                                <FiTag className="text-purple-500" /> Coupon (ECOMZY10)
                                            </span>
                                            <span className="font-bold text-emerald-600">-${discount.toFixed(2)}</span>
                                        </motion.div>
                                    )}
                                </div>

                                <div className="border-t border-dashed border-slate-200 pt-4 mb-6">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-slate-700">Total</span>
                                        <span className="text-3xl font-black text-slate-900">${finalAmount.toFixed(2)}</span>
                                    </div>
                                    {couponApplied && (
                                        <p className="text-xs text-emerald-600 font-semibold mt-1 text-right">
                                            🎉 You're saving ${savings.toFixed(2)}!
                                        </p>
                                    )}
                                </div>

                                {/* Coupon Input */}
                                <div className="mb-6">
                                    <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2.5">Promo Code</p>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={coupon}
                                            onChange={(e) => setCoupon(e.target.value)}
                                            placeholder="Enter coupon code"
                                            className={`flex-1 px-4 py-2.5 rounded-xl text-sm border-2 outline-none transition-all ${couponApplied ? "border-emerald-400 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-slate-50 focus:border-orange-400"
                                                }`}
                                        />
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleCoupon}
                                            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all ${couponApplied
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : "bg-slate-800 text-white hover:bg-slate-700"
                                                }`}
                                        >
                                            {couponApplied ? "✓ Applied" : "Apply"}
                                        </motion.button>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <motion.button
                                    whileHover={{ scale: 1.03, y: -2 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="w-full h-14 rounded-2xl text-base font-black text-white bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 shadow-2xl shadow-orange-500/30 flex items-center justify-center gap-3 btn-ripple hover:shadow-orange-500/40 transition-shadow"
                                >
                                    <span>Checkout Now</span>
                                    <span className="bg-white/20 px-2 py-0.5 rounded-lg text-sm">${finalAmount.toFixed(2)}</span>
                                </motion.button>
                            </div>

                            {/* Security badges */}
                            <div className="bg-white/80 backdrop-blur rounded-2xl border border-slate-100 p-5 shadow-md">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 text-center">100% Secure Checkout</p>
                                <div className="flex flex-col gap-2.5">
                                    {securityFeatures.map((f, i) => (
                                        <div key={i} className="flex items-center gap-2.5 text-xs text-slate-600 font-medium">
                                            <span className="text-base">{f.icon}</span>
                                            {f.text}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ) : (
                    /* Empty Cart State */
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col justify-center items-center gap-6 text-center min-h-[60vh]"
                    >
                        <motion.div
                            animate={{ y: [0, -12, 0] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                            className="w-32 h-32 bg-gradient-to-br from-orange-100 to-amber-100 rounded-3xl flex justify-center items-center text-5xl shadow-xl shadow-orange-100"
                        >
                            🛒
                        </motion.div>
                        <div>
                            <h1 className="text-4xl font-black text-slate-800 mb-2">Your Cart is Empty</h1>
                            <p className="text-slate-500 max-w-sm mx-auto text-sm leading-relaxed">
                                Looks like you haven't added anything to your cart yet. Start exploring our amazing products!
                            </p>
                        </div>
                        <NavLink to='/home'>
                            <motion.button
                                whileHover={{ scale: 1.06, y: -3 }}
                                whileTap={{ scale: 0.96 }}
                                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-base px-10 py-4 rounded-2xl shadow-2xl shadow-orange-500/30 flex items-center gap-3 btn-ripple"
                            >
                                <FiShoppingCart className="text-lg" />
                                Start Shopping
                            </motion.button>
                        </NavLink>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}

export default Cart;