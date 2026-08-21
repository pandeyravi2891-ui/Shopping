import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import CartItem from '../components/CartItem';
import { motion, AnimatePresence } from "framer-motion";

function Cart(props) {
    let totalAmount = props.totalAmount;
    let settotalAmount = props.settotalAmount;
    
    const { cart } = useSelector((state) => state);

    useEffect(() => {
        settotalAmount(cart?.reduce((acc, curr) => acc + curr.price, 0)); 
    }, [cart, settotalAmount]);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center items-center py-10 px-4 min-h-[calc(100vh-80px)]"
        >
            {cart?.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-full max-w-6xl items-start">
                    
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Shopping Cart ({cart.length} items)</h2>
                        <AnimatePresence>
                            {cart?.map((item, index) => (
                                <CartItem key={item.id} item={item} index={index} />
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Summary Panel */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-orange-100 shadow-2xl flex flex-col justify-between sticky top-28"
                    >
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-orange-500 bg-orange-100 px-3 py-1 rounded-full">
                                Summary
                            </span>
                            <h3 className="text-3xl font-black text-slate-800 mt-4">Order Details</h3>
                            
                            <div className="flex justify-between items-center my-6 py-4 border-y border-slate-100 text-slate-600 font-semibold">
                                <span>Total Items:</span>
                                <span className="text-slate-800 font-bold text-lg">{cart?.length}</span>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-slate-500 font-medium">Total Amount:</span>
                                <span className="text-3xl font-black text-emerald-600">${totalAmount.toFixed(2)}</span>
                            </div>

                            <motion.button 
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full h-14 rounded-2xl text-lg font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg shadow-orange-500/30 transition duration-200"
                            >
                                Checkout Now
                            </motion.button>
                        </div>
                    </motion.div>   
                </div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col justify-center items-center gap-6 text-center"
                >
                    <div className="w-24 h-24 bg-orange-100 rounded-full flex justify-center items-center text-4xl text-orange-500 shadow-inner">
                        🛒
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-800">Your Cart is Empty</h1>
                    <p className="text-slate-500 text-sm max-w-sm">Looks like you haven't added anything to your cart yet.</p>
                    <NavLink to={'/home'}>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg px-8 py-3.5 rounded-2xl shadow-lg shadow-orange-500/30"
                        >
                            Shop Now
                        </motion.button>
                    </NavLink>
                </motion.div>
            )}
        </motion.div>
    );
}

export default Cart;