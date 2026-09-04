import React from "react";
import { ReactTyped } from 'react-typed';
import { NavLink } from "react-router-dom";
import { FaArrowRight, FaFacebookF, FaInstagram, FaYoutube, FaStar } from "react-icons/fa";
import { GrTwitter, GrSend } from "react-icons/gr";
import { MdLocalShipping, MdVerified } from "react-icons/md";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { VscVerified } from "react-icons/vsc";
import { HiLightningBolt } from "react-icons/hi";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import logoImg from "../assets/logo.jpg";

const categories = [
  { name: "Electronics", emoji: "💻", color: "from-blue-500 to-indigo-600", count: "2.4K+" },
  { name: "Fashion", emoji: "👗", color: "from-pink-500 to-rose-600", count: "8.1K+" },
  { name: "Jewelry", emoji: "💎", color: "from-purple-500 to-violet-600", count: "1.2K+" },
  { name: "Men's Wear", emoji: "👔", color: "from-slate-600 to-slate-800", count: "3.5K+" },
];

const testimonials = [
  { name: "Riya S.", text: "Best shopping experience ever! Super fast delivery.", rating: 5, avatar: "R" },
  { name: "Priya M.", text: "Love the quality of products. Highly recommend!", rating: 5, avatar: "P" },
  { name: "Arjun K.", text: "The deals are unbeatable. I shop here every week.", rating: 5, avatar: "A" },
];

const statsData = [
  { value: "50K+", label: "Happy Customers" },
  { value: "12K+", label: "Products" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Customer Support" },
];

function Enter() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col justify-center items-center overflow-hidden select-none relative"
    >
      {/* ========== HERO SECTION ========== */}
      <section className="w-full relative py-16 sm:py-24 px-6 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-72 h-72 blob-orange opacity-50 animate-blob" />
          <div className="absolute bottom-10 left-10 w-56 h-56 blob-amber opacity-40 animate-blob" style={{ animationDelay: '4s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 blob-orange opacity-20 animate-blob" style={{ animationDelay: '2s' }} />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 grid grid-cols-1 lg:grid-cols-2 w-full max-w-7xl mx-auto items-center gap-16"
        >
          {/* Left Column */}
          <div className="flex flex-col items-start justify-center gap-7">

            {/* Flash Sale Badge */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2.5 bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-200 px-4 py-2 rounded-full"
            >
              <span className="animate-pulse-glow bg-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                🔥 Live
              </span>
              <span className="text-orange-700 text-xs font-semibold">Flash Sale — Up to 70% OFF!</span>
              <FiArrowRight className="text-orange-500 text-sm" />
            </motion.div>

            {/* Heading */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tight leading-none">
                Fill Your Cart
              </h1>
              <h2 className="text-5xl sm:text-7xl font-black tracking-tight leading-none">
                <span className="text-gradient-orange">With&nbsp;</span>
                <ReactTyped
                  className="text-gradient-premium"
                  strings={["Clothes ✨", "Gadgets 🔌", "Cosmetics 💄", "Jewelry 💎", "Style 🌟"]}
                  typeSpeed={80}
                  backSpeed={45}
                  loop
                />
              </h2>
            </motion.div>

            <motion.p variants={itemVariants} className="text-slate-500 text-lg max-w-md leading-relaxed font-medium">
              Discover thousands of premium items at unbeatable prices. Fast shipping, guaranteed quality, and a seamless checkout experience.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
              <NavLink to="/home">
                <motion.button
                  whileHover={{ scale: 1.06, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white font-black text-base px-8 py-4 rounded-2xl shadow-xl shadow-orange-500/30 flex items-center gap-3 overflow-hidden group btn-ripple"
                >
                  <span>Shop Now</span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <FaArrowRight />
                  </motion.div>
                </motion.button>
              </NavLink>

              <motion.div
                whileHover={{ scale: 1.04 }}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-slate-200 bg-white/60 backdrop-blur text-slate-700 font-semibold cursor-pointer hover:border-orange-300 hover:shadow-md transition-all"
              >
                <div className="flex -space-x-2">
                  {['R', 'A', 'S', 'K'].map((l, i) => (
                    <div key={i} className={`w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black text-white ${['bg-orange-500', 'bg-pink-500', 'bg-blue-500', 'bg-emerald-500'][i]}`}>
                      {l}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-black text-slate-800">50K+ Shoppers</p>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => <FaStar key={i} className="text-amber-400 text-[10px]" />)}
                    <span className="text-[10px] text-slate-500 ml-1">4.9/5</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column — Hero Visual */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center relative"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="relative w-full max-w-lg"
            >
              {/* Main image card */}
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-orange-200/50 border border-white/80">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-400/20 via-transparent to-amber-300/20 z-10" />
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80"
                  alt="Shopping Banner"
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-xl px-5 py-4 rounded-2xl shadow-2xl border border-orange-100 flex items-center gap-3.5 z-20"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-orange-500/30 flex-shrink-0">
                  ⚡
                </div>
                <div>
                  <p className="font-black text-slate-800 text-sm leading-tight">Flash Sale Live!</p>
                  <p className="text-xs text-slate-500">Up to 70% Discount</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: 1.5 }}
                className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-2xl border border-orange-100 flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-xl flex items-center justify-center text-lg shadow-md">
                  🚀
                </div>
                <div>
                  <p className="font-black text-slate-800 text-xs">Free Delivery</p>
                  <p className="text-[10px] text-emerald-600 font-semibold">On all orders!</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ x: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: 0.8 }}
                className="absolute top-1/3 -right-8 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-2xl shadow-xl shadow-orange-500/30 flex items-center gap-2 z-20"
              >
                <FaStar className="text-white text-sm" />
                <span className="text-sm font-black">4.9 Rated</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ========== STATS MARQUEE BANNER ========== */}
      <div className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 py-4 overflow-hidden">
        <div className="flex items-center animate-marquee whitespace-nowrap gap-16">
          {[...statsData, ...statsData, ...statsData, ...statsData].map((stat, i) => (
            <div key={i} className="flex items-center gap-3 mx-8 flex-shrink-0">
              <HiLightningBolt className="text-white/80 text-lg" />
              <span className="text-white font-black text-lg">{stat.value}</span>
              <span className="text-orange-100 font-medium text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ========== CATEGORIES SECTION ========== */}
      <section className="w-full py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-3">Browse</p>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Top <span className="text-gradient-orange">Categories</span>
            </h2>
            <p className="text-slate-500 mt-4 text-lg max-w-xl mx-auto">Explore our carefully curated product categories — from tech to fashion.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative rounded-3xl overflow-hidden shadow-xl cursor-pointer group card-shine"
              >
                <NavLink to="/home">
                  <div className={`bg-gradient-to-br ${cat.color} p-7 flex flex-col items-center gap-3 h-full text-center`}>
                    <span className="text-5xl">{cat.emoji}</span>
                    <h3 className="font-black text-white text-lg">{cat.name}</h3>
                    <span className="text-white/70 text-xs font-semibold">{cat.count} Items</span>
                    <div className="mt-2 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition">
                      <FiArrowRight className="text-white text-sm" />
                    </div>
                  </div>
                </NavLink>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full bg-white/60 backdrop-blur-xl border-y border-orange-100/80 py-16 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <MdLocalShipping />, title: "Free Shipping", sub: "On orders above $999", color: "from-blue-500 to-indigo-600" },
              { icon: <AiOutlineSafetyCertificate />, title: "Secure Payment", sub: "100% encrypted & safe", color: "from-emerald-500 to-teal-600" },
              { icon: <TfiHeadphoneAlt />, title: "24/7 Support", sub: "Instant dedicated assistance", color: "from-purple-500 to-violet-600" },
              { icon: <VscVerified />, title: "Best Quality", sub: "Handpicked premium products", color: "from-orange-500 to-amber-500" },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="flex items-center gap-4 p-5 rounded-2xl bg-white/80 border border-slate-100 shadow-lg hover:shadow-xl hover:shadow-orange-100 transition-all duration-300"
              >
                <div className={`p-3 bg-gradient-to-br ${f.color} text-white rounded-xl text-2xl shadow-md flex-shrink-0`}>
                  {f.icon}
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{f.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{f.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ========== SPECIAL DEAL BANNER ========== */}
      <section className="w-full py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[3rem] overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-12 md:p-16 text-center shadow-2xl"
          >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-amber-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center gap-6">
              <span className="text-orange-400 font-black text-sm uppercase tracking-widest bg-orange-500/10 border border-orange-500/30 px-4 py-1.5 rounded-full">
                🔥 Limited Time Offer
              </span>
              <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                Up to <span className="text-gradient-orange">70% OFF</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-lg">Don't miss out — our biggest sale of the year is live right now. Shop thousands of items at record low prices.</p>
              <NavLink to="/home">
                <motion.button
                  whileHover={{ scale: 1.06, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black px-10 py-4 rounded-2xl shadow-2xl shadow-orange-500/30 flex items-center gap-3 text-lg btn-ripple"
                >
                  <span>Shop the Sale</span>
                  <FaArrowRight />
                </motion.button>
              </NavLink>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== TESTIMONIALS SECTION ========== */}
      <section className="w-full py-20 px-6 bg-white/40 backdrop-blur-sm border-y border-orange-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-3">Testimonials</p>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900">
              What Our <span className="text-gradient-orange">Customers</span> Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white/90 backdrop-blur-lg border border-slate-100 rounded-3xl p-7 shadow-xl hover:shadow-2xl hover:shadow-orange-100/50 transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <FaStar key={j} className="text-amber-400 text-sm" />
                  ))}
                </div>
                <p className="text-slate-600 leading-relaxed text-sm mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 text-white font-black text-sm rounded-full flex items-center justify-center shadow-md">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <MdVerified className="text-orange-500" /> Verified Buyer
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="w-full bg-slate-900 text-white pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
            {/* Brand Column */}
            <div className="md:col-span-2 flex flex-col items-start gap-5">
              <div className="flex items-center gap-3">
                <img src={logoImg} alt="Ecomzy Logo" className="h-10 w-10 rounded-xl object-cover border border-slate-700" />
                <div className="text-2xl font-black tracking-tight">
                  <span className="text-white">ecom</span>
                  <span className="text-orange-400">zy</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                Shop smart, save more, and live better with Ecomzy — your ultimate destination for fashion, electronics, and home essentials.
              </p>
              <div className="flex gap-3 mt-1">
                {[
                  { icon: <FaFacebookF />, color: "hover:bg-blue-600" },
                  { icon: <FaInstagram />, color: "hover:bg-pink-600" },
                  { icon: <GrTwitter />, color: "hover:bg-sky-500" },
                  { icon: <FaYoutube />, color: "hover:bg-red-600" },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.15, y: -2 }}
                    className={`bg-slate-800 ${s.color} p-2.5 rounded-xl cursor-pointer transition-all duration-200 text-slate-300 hover:text-white`}
                  >
                    {s.icon}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-3">
              <p className="font-black text-white text-xs uppercase tracking-widest mb-1">Shop</p>
              {["All Categories", "Best Sellers", "New Arrivals", "Top Deals", "Flash Sale"].map(l => (
                <p key={l} className="text-slate-400 text-sm hover:text-orange-400 cursor-pointer transition-colors font-medium">{l}</p>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <p className="font-black text-white text-xs uppercase tracking-widest mb-1">Customer Care</p>
              {["My Orders", "Returns & Refunds", "Shipping Info", "FAQs", "Track Order"].map(l => (
                <p key={l} className="text-slate-400 text-sm hover:text-orange-400 cursor-pointer transition-colors font-medium">{l}</p>
              ))}
            </div>

            {/* Newsletter */}
            <div className="flex flex-col gap-4">
              <p className="font-black text-white text-xs uppercase tracking-widest">Newsletter</p>
              <p className="text-slate-400 text-xs leading-relaxed">Subscribe for exclusive offers and new arrivals.</p>
              <div className="relative flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Your email..."
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-800 text-sm text-white placeholder-slate-500 outline-none border border-slate-700 focus:border-orange-500 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 p-3 rounded-xl text-white shadow-lg shadow-orange-500/20 flex-shrink-0"
                >
                  <GrSend />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
            <p>© 2026 Ecomzy. All rights reserved. Built with ❤️</p>
            <div className="flex items-center gap-4">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(p => (
                <span key={p} className="hover:text-orange-400 cursor-pointer transition-colors">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

export default Enter;
