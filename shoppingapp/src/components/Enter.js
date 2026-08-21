import React from "react";
import { ReactTyped } from 'react-typed';
import { NavLink } from "react-router-dom";
import { FaArrowRight, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { GrTwitter, GrSend } from "react-icons/gr";
import { MdLocalShipping } from "react-icons/md";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { VscVerified } from "react-icons/vsc";
import { motion } from "framer-motion";
import logoImg from "../assets/logo.jpg";
import './wave.css';

function Enter(props) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col justify-center items-center overflow-hidden select-none relative min-h-screen"
        >
            {/* Hero Section */}
            <div className="w-full flex justify-center items-center py-20 px-6">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl items-center gap-12"
                >
                    <div className="flex flex-col items-start justify-center gap-8 w-full">
                        <motion.div variants={itemVariants} className="text-4xl sm:text-6xl font-extrabold text-slate-800 tracking-tight">
                            FILL YOUR CART WITH :
                        </motion.div>
                        
                        <motion.div variants={itemVariants} className="text-4xl sm:text-6xl font-extrabold h-20">
                            <ReactTyped 
                                className="tracking-wider bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 bg-clip-text text-transparent"
                                strings={[
                                    "CLOTHES",
                                    "GROCERY",
                                    "COSMETIC",
                                    "HARDWARE",
                                    "UTENSILS",
                                ]}
                                typeSpeed={90}
                                backSpeed={50}
                                loop
                            />
                        </motion.div>
                        
                        <motion.p variants={itemVariants} className="text-slate-600 text-lg max-w-lg leading-relaxed">
                            Discover thousands of premium items at unbeatable prices. Fast shipping, guaranteed quality, and seamless checkout.
                        </motion.p>

                        <motion.div variants={itemVariants} className="w-full flex justify-start items-center">
                            <NavLink to="/home">
                                <motion.div 
                                    whileHover={{ scale: 1.06, y: -4 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="shadow-xl shadow-orange-500/25 text-white bg-gradient-to-r from-orange-500 to-amber-500 h-14 flex justify-center items-center px-8 gap-4 rounded-full tracking-widest font-bold text-lg border border-orange-300"
                                >
                                    <span>SHOP NOW</span>
                                    <FaArrowRight />
                                </motion.div>
                            </NavLink>
                        </motion.div>
                    </div>

                    <motion.div 
                        variants={itemVariants} 
                        className="flex justify-center items-center relative"
                    >
                        <motion.div 
                            animate={{ y: [0, -12, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-tr from-orange-400 via-amber-300 to-orange-200 p-1 shadow-2xl"
                        >
                            <img 
                                src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80" 
                                alt="Shopping Banner" 
                                className="w-full h-full object-cover rounded-[22px] shadow-inner"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-orange-100 flex items-center gap-4">
                                <div className="p-3 bg-orange-500 text-white rounded-full text-2xl">⚡</div>
                                <div>
                                    <p className="font-bold text-slate-800 text-sm">Flash Sale Live</p>
                                    <p className="text-xs text-slate-500">Up to 70% Discount</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Feature Banner */}
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full bg-white/80 backdrop-blur-md border-y border-orange-200/60 py-12 px-6 my-8"
            >
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <motion.div whileHover={{ y: -4 }} className="flex items-center gap-4 p-4 rounded-2xl bg-orange-50/60 border border-orange-100">
                        <div className="p-3 bg-orange-500 text-white rounded-full text-2xl"><MdLocalShipping /></div>
                        <div>
                            <p className="font-bold text-slate-800">Free Shipping</p>
                            <p className="text-xs text-slate-500">On orders above $999</p>
                        </div>
                    </motion.div>

                    <motion.div whileHover={{ y: -4 }} className="flex items-center gap-4 p-4 rounded-2xl bg-orange-50/60 border border-orange-100">
                        <div className="p-3 bg-orange-500 text-white rounded-full text-2xl"><AiOutlineSafetyCertificate /></div>
                        <div>
                            <p className="font-bold text-slate-800">Secure Payment</p>
                            <p className="text-xs text-slate-500">100% encrypted & safe</p>
                        </div>
                    </motion.div>

                    <motion.div whileHover={{ y: -4 }} className="flex items-center gap-4 p-4 rounded-2xl bg-orange-50/60 border border-orange-100">
                        <div className="p-3 bg-orange-500 text-white rounded-full text-2xl"><TfiHeadphoneAlt /></div>
                        <div>
                            <p className="font-bold text-slate-800">24/7 Support</p>
                            <p className="text-xs text-slate-500">Instant dedicated assistance</p>
                        </div>
                    </motion.div>

                    <motion.div whileHover={{ y: -4 }} className="flex items-center gap-4 p-4 rounded-2xl bg-orange-50/60 border border-orange-100">
                        <div className="p-3 bg-orange-500 text-white rounded-full text-2xl"><VscVerified /></div>
                        <div>
                            <p className="font-bold text-slate-800">Best Quality</p>
                            <p className="text-xs text-slate-500">Handpicked premium products</p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Footer Section */}
            <footer className="w-full bg-slate-900 text-white py-16 px-6 mt-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
                    <div className="md:col-span-2 flex flex-col items-start gap-4">
                        <div className="flex items-center gap-3 text-3xl font-extrabold tracking-tight">
                            <img src={logoImg} alt="Ecomzy Logo" className="h-9 rounded-lg shadow-sm border border-slate-700 object-contain" />
                            <div>
                                <span className="text-white">ecom</span>
                                <span className="text-orange-400">zy</span>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                            Shop smart, save more, and live better with Ecomzy — your ultimate destination for fashion, electronics, and home essentials.
                        </p>
                        <div className="flex gap-4 mt-2">
                            <motion.div whileHover={{ scale: 1.2 }} className="bg-slate-800 p-2.5 rounded-full cursor-pointer hover:text-orange-400"><FaFacebookF /></motion.div>
                            <motion.div whileHover={{ scale: 1.2 }} className="bg-slate-800 p-2.5 rounded-full cursor-pointer hover:text-orange-400"><FaInstagram /></motion.div>
                            <motion.div whileHover={{ scale: 1.2 }} className="bg-slate-800 p-2.5 rounded-full cursor-pointer hover:text-orange-400"><GrTwitter /></motion.div>
                            <motion.div whileHover={{ scale: 1.2 }} className="bg-slate-800 p-2.5 rounded-full cursor-pointer hover:text-orange-400"><FaYoutube /></motion.div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 text-slate-300 text-sm">
                        <p className="font-bold text-white uppercase text-xs tracking-wider mb-1">SHOP</p>
                        <p className="hover:text-orange-400 cursor-pointer">All Categories</p>
                        <p className="hover:text-orange-400 cursor-pointer">Best Sellers</p>
                        <p className="hover:text-orange-400 cursor-pointer">New Arrivals</p>
                        <p className="hover:text-orange-400 cursor-pointer">Top Deals</p>
                    </div>

                    <div className="flex flex-col gap-3 text-slate-300 text-sm">
                        <p className="font-bold text-white uppercase text-xs tracking-wider mb-1">CUSTOMER CARE</p>
                        <p className="hover:text-orange-400 cursor-pointer">My Orders</p>
                        <p className="hover:text-orange-400 cursor-pointer">Returns & Refunds</p>
                        <p className="hover:text-orange-400 cursor-pointer">Shipping Info</p>
                        <p className="hover:text-orange-400 cursor-pointer">FAQs</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <p className="font-bold text-white uppercase text-xs tracking-wider">NEWSLETTER</p>
                        <p className="text-slate-400 text-xs leading-relaxed">Subscribe to get updates on new arrivals & exclusive offers.</p>
                        <div className="relative flex items-center">
                            <input 
                                type="email"  
                                placeholder="Enter email" 
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 text-sm text-white placeholder-slate-500 outline-none border border-slate-700 focus:border-orange-500"
                            />
                            <button className="bg-orange-500 hover:bg-orange-600 p-2 rounded-lg absolute right-1 text-white">
                                <GrSend />
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </motion.div>
    );
}

export default Enter;

