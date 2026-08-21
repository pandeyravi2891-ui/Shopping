import React, { useEffect, useState } from "react";
import Product from '../components/Product';
import Spinner from '../components/Spinner';
import { useSelector } from 'react-redux';
import Toggle from '../components/Toggle';
import { NavLink } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { IoApps } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";
import { GiDress } from "react-icons/gi";
import { MdOutlineDevices } from "react-icons/md";
import { BsGem } from "react-icons/bs";
import { FiSearch, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

function Home(props) {
    let islogged = props.islogged;
    let totalAmount = props.totalAmount;
    let settotalAmount = props.settotalAmount;

    const [loading, setloading] = useState(false);
    const [posts, setposts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    const API_URL = "https://fakestoreapi.com/products";

    const { cart } = useSelector((state) => state);

    const categories = [
        { id: "all", label: "All Products", icon: IoApps },
        { id: "men's clothing", label: "Men's Clothing", icon: FaUserTie },
        { id: "women's clothing", label: "Women's Clothing", icon: GiDress },
        { id: "electronics", label: "Electronics", icon: MdOutlineDevices },
        { id: "jewelery", label: "Jewelery", icon: BsGem },
    ];

    useEffect(() => {
        settotalAmount(cart?.reduce((acc, curr) => acc + curr.price, 0));
    }, [cart, settotalAmount]);

    async function fetchdata() {
        setloading(true);
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setposts(data);
        } catch (error) {
            console.log("Error fetching products:", error);
            setposts([]);
        }
        setloading(false);
    }

    useEffect(() => {
        fetchdata();
    }, []);

    const filteredPosts = posts.filter((post) => {
        const matchesCategory =
            selectedCategory === "all" ||
            post.category?.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch =
            post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.description?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const getCategoryCount = (catId) => {
        if (catId === "all") return posts.length;
        return posts.filter(
            (p) => p.category?.toLowerCase() === catId.toLowerCase()
        ).length;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.06
            }
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="relative flex flex-col justify-center items-center py-6 min-h-[calc(100vh-80px)] w-full max-w-7xl mx-auto px-4"
        >
            {/* Search & Category Filter Header Section */}
            <div className="w-full mb-8 flex flex-col items-center gap-6">
                
                {/* Search Bar */}
                <div className="relative w-full max-w-md">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                    <input
                        type="text"
                        placeholder="Search products by title or keywords..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-10 py-3 rounded-full bg-white/90 backdrop-blur-md border border-orange-100 shadow-md text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                        >
                            <FiX />
                        </button>
                    )}
                </div>

                {/* Categories Tabs */}
                <div className="w-full flex items-center justify-center">
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-full">
                        {categories.map((cat) => {
                            const Icon = cat.icon;
                            const isSelected = selectedCategory === cat.id;
                            const count = getCategoryCount(cat.id);

                            return (
                                <motion.button
                                    key={cat.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 shadow-sm ${
                                        isSelected
                                            ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30 scale-105"
                                            : "bg-white/80 text-slate-700 hover:bg-orange-50 hover:text-orange-600 border border-orange-100"
                                    }`}
                                >
                                    <Icon className={`text-base ${isSelected ? "text-white" : "text-orange-500"}`} />
                                    <span>{cat.label}</span>
                                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                                        isSelected ? "bg-white/20 text-white" : "bg-orange-100 text-orange-700"
                                    }`}>
                                        {count}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Filter info summary */}
                {(selectedCategory !== "all" || searchTerm) && (
                    <motion.div 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-orange-50/80 border border-orange-200/60 px-4 py-1.5 rounded-full"
                    >
                        <span>
                            Showing {filteredPosts.length} results
                            {selectedCategory !== "all" && ` in ${categories.find(c => c.id === selectedCategory)?.label}`}
                            {searchTerm && ` for "${searchTerm}"`}
                        </span>
                        <button 
                            onClick={() => {
                                setSelectedCategory("all");
                                setSearchTerm("");
                            }}
                            className="ml-2 text-orange-600 font-bold hover:underline"
                        >
                            Reset filters
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Product Display Grid */}
            {loading ? (
                <Spinner />
            ) : filteredPosts.length > 0 ? (
                <motion.div 
                    key={selectedCategory + searchTerm}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-2"
                >
                    {filteredPosts.map((post) => (
                        <Product key={post.id} post={post} islogged={islogged} />
                    ))}
                </motion.div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col justify-center items-center min-h-[40vh] gap-3 text-center"
                >
                    <p className="text-xl font-bold text-slate-600">No products found</p>
                    <p className="text-sm text-slate-400 max-w-sm">
                        Try selecting another category or clearing your search filter.
                    </p>
                    <button
                        onClick={() => {
                            setSelectedCategory("all");
                            setSearchTerm("");
                        }}
                        className="mt-2 px-5 py-2 rounded-full bg-orange-500 text-white font-bold text-xs shadow-md hover:bg-orange-600 transition"
                    >
                        Show All Products
                    </button>
                </motion.div>
            )}

            {/* Floating View Cart Pill */}
            <NavLink to='/cart'>
                {cart?.length > 0 && (
                    <motion.div 
                        initial={{ scale: 0, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-2xl shadow-orange-500/40 p-4 rounded-full flex items-center justify-between gap-4 cursor-pointer border border-orange-300 backdrop-blur-md"
                    >
                        <div  className="max-w-[100px] flex items-center overflow-hidden">
                            {cart.map((item) => (
                                <Toggle key={item.id} item={item} />
                            ))}
                        </div>

                        <div className="flex items-center gap-2 pr-2">
                            <div className="flex flex-col items-end">
                                <span className="text-xs font-semibold uppercase tracking-wider text-orange-100">View Cart</span>
                                <span className="font-extrabold text-sm">${totalAmount.toFixed(2)}</span>
                            </div>
                            <div className="bg-white/20 p-2 rounded-full text-white text-lg">
                                <IoIosArrowForward />
                            </div>
                        </div>
                    </motion.div>
                )}
            </NavLink>
        </motion.div>
    );
}

export default Home;