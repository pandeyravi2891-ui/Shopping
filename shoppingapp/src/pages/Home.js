import React, { useEffect, useState } from "react";
import Product from '../components/Product';
import Spinner from '../components/Spinner';
import { useSelector } from 'react-redux';
import Toggle from '../components/Toggle';
import { NavLink } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { IoApps } from "react-icons/io5";
import { FaUserTie, FaStar, FaFire } from "react-icons/fa";
import { GiDress } from "react-icons/gi";
import { MdOutlineDevices, MdTrendingUp } from "react-icons/md";
import { BsGem } from "react-icons/bs";
import { FiSearch, FiX, FiSliders, FiGrid, FiList } from "react-icons/fi";
import { HiLightningBolt, HiSparkles } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

function Home(props) {
    let islogged = props.islogged;
    let totalAmount = props.totalAmount;
    let settotalAmount = props.settotalAmount;

    const [loading, setloading] = useState(false);
    const [posts, setposts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("default");
    const [viewMode, setViewMode] = useState("grid");

    const API_URL = "https://fakestoreapi.com/products";
    const { cart } = useSelector((state) => state);

    const categories = [
        { id: "all", label: "All", icon: IoApps, color: "from-slate-500 to-slate-700" },
        { id: "men's clothing", label: "Men's", icon: FaUserTie, color: "from-slate-600 to-slate-800" },
        { id: "women's clothing", label: "Women's", icon: GiDress, color: "from-pink-500 to-rose-600" },
        { id: "electronics", label: "Electronics", icon: MdOutlineDevices, color: "from-blue-500 to-indigo-600" },
        { id: "jewelery", label: "Jewelry", icon: BsGem, color: "from-purple-500 to-violet-600" },
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

    const filteredPosts = posts
        .filter((post) => {
            const matchesCategory = selectedCategory === "all" || post.category?.toLowerCase() === selectedCategory.toLowerCase();
            const matchesSearch = post.title?.toLowerCase().includes(searchTerm.toLowerCase()) || post.description?.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        })
        .sort((a, b) => {
            if (sortBy === "price-asc") return a.price - b.price;
            if (sortBy === "price-desc") return b.price - a.price;
            if (sortBy === "name") return a.title.localeCompare(b.title);
            if (sortBy === "rating") return (b.rating?.rate || 0) - (a.rating?.rate || 0);
            return 0;
        });

    const getCategoryCount = (catId) => {
        if (catId === "all") return posts.length;
        return posts.filter((p) => p.category?.toLowerCase() === catId.toLowerCase()).length;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
    };

    const heroData = [
        { title: "Summer Collection", sub: "Up to 60% OFF on clothing", emoji: "👗", color: "from-pink-500 to-rose-500" },
        { title: "Tech Deals", sub: "Best prices on electronics", emoji: "💻", color: "from-blue-500 to-indigo-600" },
        { title: "Jewelry Sale", sub: "Exclusive fine pieces", emoji: "💎", color: "from-purple-500 to-violet-600" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center w-full"
        >
            {/* ===== HERO MINI BANNERS ===== */}
            <div className="w-full max-w-7xl mx-auto px-4 pt-6 pb-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {heroData.map((h, i) => (
                        <motion.div
                            key={h.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            whileHover={{ y: -4, scale: 1.02 }}
                            className={`relative bg-gradient-to-r ${h.color} rounded-2xl p-5 flex items-center gap-4 shadow-lg cursor-pointer overflow-hidden group`}
                        >
                            {/* Shimmer */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            <span className="text-4xl flex-shrink-0">{h.emoji}</span>
                            <div>
                                <p className="text-white font-black text-base leading-tight">{h.title}</p>
                                <p className="text-white/80 text-xs mt-0.5">{h.sub}</p>
                            </div>
                            <IoIosArrowForward className="text-white/70 ml-auto text-xl flex-shrink-0" />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ===== MAIN CONTENT ===== */}
            <div className="w-full max-w-7xl mx-auto px-4 py-8">
                
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <HiSparkles className="text-orange-500 text-lg" />
                            <span className="text-orange-500 font-bold text-xs uppercase tracking-widest">Discover</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            All <span className="text-gradient-orange">Products</span>
                        </h1>
                    </div>

                    {/* Search + Controls */}
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                            <input
                                type="text"
                                id="product-search"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-9 py-2.5 rounded-xl bg-white border border-slate-200 shadow-sm text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all w-48 sm:w-56"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    <FiX className="text-sm" />
                                </button>
                            )}
                        </div>

                        {/* Sort */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="py-2.5 px-3 rounded-xl bg-white border border-slate-200 shadow-sm text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer font-medium"
                        >
                            <option value="default">Sort by</option>
                            <option value="price-asc">Price: Low → High</option>
                            <option value="price-desc">Price: High → Low</option>
                            <option value="name">Name: A-Z</option>
                        </select>

                        {/* Grid/List toggle */}
                        <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm gap-1">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-orange-500 text-white" : "text-slate-400 hover:text-slate-600"}`}
                            >
                                <FiGrid className="text-base" />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-orange-500 text-white" : "text-slate-400 hover:text-slate-600"}`}
                            >
                                <FiList className="text-base" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Categories Tabs */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        const isSelected = selectedCategory === cat.id;
                        const count = getCategoryCount(cat.id);
                        return (
                            <motion.button
                                key={cat.id}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                                    isSelected
                                        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25"
                                        : "bg-white text-slate-600 hover:text-orange-600 border border-slate-200 hover:border-orange-300 hover:shadow-md shadow-sm"
                                }`}
                            >
                                <Icon className={`text-base ${isSelected ? "text-white" : "text-orange-500"}`} />
                                <span>{cat.label}</span>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                                    isSelected ? "bg-white/20 text-white" : "bg-orange-100 text-orange-700"
                                }`}>
                                    {count}
                                </span>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Active filter summary */}
                <AnimatePresence>
                    {(selectedCategory !== "all" || searchTerm) && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, y: -5 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -5 }}
                            className="mb-5 flex items-center gap-2 text-xs font-semibold text-slate-600 bg-orange-50 border border-orange-200/60 px-4 py-2.5 rounded-xl w-fit"
                        >
                            <FiSliders className="text-orange-500" />
                            <span>
                                Showing <strong>{filteredPosts.length}</strong> results
                                {selectedCategory !== "all" && ` in ${categories.find(c => c.id === selectedCategory)?.label}`}
                                {searchTerm && ` for "${searchTerm}"`}
                            </span>
                            <button
                                onClick={() => { setSelectedCategory("all"); setSearchTerm(""); }}
                                className="ml-2 text-orange-600 font-bold hover:text-orange-700 hover:underline"
                            >
                                Clear
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Products */}
                {loading ? (
                    <div className="flex justify-center items-center min-h-[50vh]">
                        <Spinner />
                    </div>
                ) : filteredPosts.length > 0 ? (
                    <motion.div
                        key={selectedCategory + searchTerm + sortBy + viewMode}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className={`w-full ${
                            viewMode === "grid"
                                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
                                : "flex flex-col gap-4"
                        }`}
                    >
                        {filteredPosts.map((post) => (
                            viewMode === "grid" ? (
                                <Product key={post.id} post={post} islogged={islogged} />
                            ) : (
                                /* List view */
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-white/90 border border-slate-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex gap-5 p-4 items-center group"
                                >
                                    <div className="w-24 h-24 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                                        <img src={post.image} alt={post.title} className="h-20 w-20 object-contain group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full w-fit mb-1">{post.category}</p>
                                        <h3 className="font-bold text-slate-800 text-sm line-clamp-1">{post.title}</h3>
                                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{post.description}</p>
                                    </div>
                                    <div className="flex items-center gap-4 flex-shrink-0">
                                        <span className="text-xl font-black text-slate-900">${post.price}</span>
                                    </div>
                                </motion.div>
                            )
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col justify-center items-center min-h-[40vh] gap-4 text-center"
                    >
                        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-4xl shadow-inner">
                            🔍
                        </div>
                        <p className="text-xl font-black text-slate-700">No products found</p>
                        <p className="text-sm text-slate-400 max-w-sm">Try a different category or clear your search term.</p>
                        <button
                            onClick={() => { setSelectedCategory("all"); setSearchTerm(""); }}
                            className="mt-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all"
                        >
                            Show All Products
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Floating Cart Button */}
            <NavLink to='/cart'>
                {cart?.length > 0 && (
                    <motion.div
                        initial={{ scale: 0, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        whileHover={{ scale: 1.06, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-2xl shadow-orange-500/40 px-5 py-3.5 rounded-2xl flex items-center gap-3 cursor-pointer border border-orange-300 animate-pulse-glow"
                    >
                        <div className="flex items-center gap-2">
                            <div className="bg-white/20 rounded-full px-2 py-0.5 text-xs font-black">
                                {cart.length}
                            </div>
                            <div className="max-w-[80px] flex items-center overflow-hidden">
                                {cart.slice(0, 3).map((item) => (
                                    <Toggle key={item.id} item={item} />
                                ))}
                            </div>
                        </div>

                        <div className="h-6 w-px bg-white/30" />

                        <div className="flex items-center gap-2">
                            <div className="flex flex-col items-start">
                                <span className="text-[10px] font-semibold text-orange-100 uppercase tracking-wider">View Cart</span>
                                <span className="font-black text-sm">${totalAmount.toFixed(2)}</span>
                            </div>
                            <div className="bg-white/20 w-7 h-7 rounded-xl flex items-center justify-center">
                                <IoIosArrowForward className="text-white text-sm" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </NavLink>
        </motion.div>
    );
}

export default Home;