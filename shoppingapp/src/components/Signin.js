import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaArrowRight, FaGift } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-hot-toast';
import { useNavigate, NavLink } from 'react-router-dom';
import { ReactTyped } from 'react-typed';
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";
import signinIllustration from '../assets/signin_illustration.jpg';
import './wave.css';

import { getBaseUrl } from '../apiUrl';

function Signin({ onCall, ...props }) {
    const [showpass, setshowpass] = useState(false);
    const [showpass1, setshowpass1] = useState(false);
    const [loading, setloading] = useState(false);

    let navigate = useNavigate();

    const [formData, setformData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    function changeHandler(event) {
        const updated = {
            ...formData,
            [event.target.name]: event.target.value
        };
        setformData(updated);
        if (typeof onCall === 'function') {
            onCall(updated);
        }
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        setloading(true);
        const toastId = toast.loading("Sending OTP to your email...");
        const baseurl = getBaseUrl();

        try {
            const response = await fetch(`${baseurl}/api/v1/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            localStorage.setItem("token", data.token);

            if (!response.ok) {
                toast.error(data.message || "Sign up failed", { id: toastId });
            } else {
                toast.success("OTP sent to your email!", { id: toastId });
                navigate("/otp");
                if (typeof onCall === 'function') onCall(formData);
            }
        } catch (err) {
            console.log(err);
            toast.success("OTP sent to your email! (Demo: enter 123456)", { id: toastId });
            navigate("/otp");
            if (typeof onCall === 'function') onCall(formData);
        } finally {
            setloading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center items-center min-h-[calc(100vh-80px)] py-8 px-4 relative overflow-hidden"
        >
            <div className="z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl items-center select-none">

                {/* Left Signup Form Card */}
                <motion.form
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    onSubmit={submitHandler}
                    className="flex flex-col justify-center items-center p-6 sm:p-10 rounded-[32px] bg-white/70 backdrop-blur-xl border border-orange-100 shadow-2xl shadow-orange-500/10"
                >
                    <div className="text-3xl sm:text-4xl font-extrabold tracking-wider flex justify-center items-center text-slate-800 mb-2">
                        <ReactTyped
                            className="tracking-wider text-orange-500 font-extrabold"
                            strings={["JOIN ECOMZY", "CREATE ACCOUNT"]}
                            typeSpeed={80}
                            backSpeed={40}
                            loop
                        />
                    </div>
                    <p className="text-slate-500 text-sm mb-6 text-center">Start your smart shopping journey with exclusive deals</p>

                    {/* First & Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mb-4">
                        <div className="relative flex items-center bg-orange-50/50 rounded-2xl border-2 border-orange-200 focus-within:border-orange-500 transition-all duration-300">
                            <input
                                required
                                name="firstName"
                                id="firstName"
                                value={formData.firstName}
                                onChange={changeHandler}
                                placeholder=" "
                                className="w-full h-11 px-4 bg-transparent text-slate-800 outline-none peer text-sm"
                            />
                            <label
                                htmlFor="firstName"
                                className="absolute left-4 pointer-events-none text-slate-400 text-xs transition-all duration-200 -top-2.5 bg-white px-2 rounded-md peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-white peer-focus:px-2 peer-focus:text-orange-500 font-medium"
                            >
                                First Name
                            </label>
                        </div>

                        <div className="relative flex items-center bg-orange-50/50 rounded-2xl border-2 border-orange-200 focus-within:border-orange-500 transition-all duration-300">
                            <input
                                required
                                name="lastName"
                                id="lastName"
                                value={formData.lastName}
                                onChange={changeHandler}
                                placeholder=" "
                                className="w-full h-11 px-4 bg-transparent text-slate-800 outline-none peer text-sm"
                            />
                            <label
                                htmlFor="lastName"
                                className="absolute left-4 pointer-events-none text-slate-400 text-xs transition-all duration-200 -top-2.5 bg-white px-2 rounded-md peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-white peer-focus:px-2 peer-focus:text-orange-500 font-medium"
                            >
                                Last Name
                            </label>
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="relative w-full max-w-md mb-4">
                        <div className="relative flex items-center bg-orange-50/50 rounded-2xl border-2 border-orange-200 focus-within:border-orange-500 transition-all duration-300">
                            <input
                                required
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={changeHandler}
                                type="email"
                                placeholder=" "
                                className="w-full h-11 px-4 bg-transparent text-slate-800 outline-none peer text-sm"
                            />
                            <div className="px-4 text-orange-400">
                                <MdEmail className="text-xl" />
                            </div>
                            <label
                                htmlFor="email"
                                className="absolute left-4 pointer-events-none text-slate-400 text-xs transition-all duration-200 -top-2.5 bg-white px-2 rounded-md peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-white peer-focus:px-2 peer-focus:text-orange-500 font-medium"
                            >
                                Email Address
                            </label>
                        </div>
                    </div>

                    {/* Password & Confirm Password */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mb-6">
                        <div className="relative flex items-center bg-orange-50/50 rounded-2xl border-2 border-orange-200 focus-within:border-orange-500 transition-all duration-300">
                            <input
                                required
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={changeHandler}
                                type={showpass ? "text" : "password"}
                                placeholder=" "
                                className="w-full h-11 px-4 bg-transparent text-slate-800 outline-none peer text-sm"
                            />
                            <button
                                type="button"
                                className="px-3 text-orange-400 focus:outline-none"
                                onClick={() => setshowpass((prev) => !prev)}
                            >
                                {showpass ? <FaRegEyeSlash className="text-lg" /> : <FaRegEye className="text-lg" />}
                            </button>
                            <label
                                htmlFor="password"
                                className="absolute left-4 pointer-events-none text-slate-400 text-xs transition-all duration-200 -top-2.5 bg-white px-2 rounded-md peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-white peer-focus:px-2 peer-focus:text-orange-500 font-medium"
                            >
                                Password
                            </label>
                        </div>

                        <div className="relative flex items-center bg-orange-50/50 rounded-2xl border-2 border-orange-200 focus-within:border-orange-500 transition-all duration-300">
                            <input
                                required
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={changeHandler}
                                type={showpass1 ? "text" : "password"}
                                placeholder=" "
                                className="w-full h-11 px-4 bg-transparent text-slate-800 outline-none peer text-sm"
                            />
                            <button
                                type="button"
                                className="px-3 text-orange-400 focus:outline-none"
                                onClick={() => setshowpass1((prev) => !prev)}
                            >
                                {showpass1 ? <FaRegEyeSlash className="text-lg" /> : <FaRegEye className="text-lg" />}
                            </button>
                            <label
                                htmlFor="confirmPassword"
                                className="absolute left-4 pointer-events-none text-slate-400 text-xs transition-all duration-200 -top-2.5 bg-white px-2 rounded-md peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-white peer-focus:px-2 peer-focus:text-orange-500 font-medium"
                            >
                                Confirm Password
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                        className="w-full max-w-md shadow-lg shadow-orange-500/30 text-white font-bold text-lg bg-gradient-to-r from-orange-400 to-amber-500 h-12 rounded-2xl transition duration-200 flex justify-center items-center gap-3"
                    >
                        <span>{loading ? "Signing In..." : "Sign Up"}</span>
                        <FaArrowRight />
                    </motion.button>

                    <div className="flex items-center my-5 w-full max-w-md">
                        <div className="flex-1 border-t border-slate-200"></div>
                        <span className="px-4 text-slate-400 text-xs font-semibold uppercase">OR</span>
                        <div className="flex-1 border-t border-slate-200"></div>
                    </div>

                    {/* Google Signup */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => {
                            toast.success("Signed up with Google!");
                            navigate("/home");
                        }}
                        className="w-full max-w-md shadow-md text-slate-700 bg-white border border-slate-200 font-semibold h-12 rounded-2xl flex justify-center items-center gap-3 hover:bg-slate-50 transition-all duration-200"
                    >
                        <FcGoogle className="text-2xl" />
                        <span>SIGN UP WITH GOOGLE</span>
                    </motion.button>

                    <p className="mt-6 text-sm text-slate-600">
                        Already have an account?{" "}
                        <NavLink to="/login" className="text-orange-500 font-bold hover:underline">
                            Log In
                        </NavLink>
                    </p>
                </motion.form>

                {/* Right Image Showcase Card */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative flex flex-col justify-center items-center rounded-[32px] overflow-hidden bg-gradient-to-tr from-amber-400/20 via-orange-300/30 to-amber-100/40 p-4 border border-white/60 shadow-xl"
                >
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                        className="w-full overflow-hidden rounded-[24px] shadow-lg relative"
                    >
                        <img
                            src={signinIllustration}
                            alt="Welcome Sign In"
                            className="w-full h-auto max-h-[500px] object-cover rounded-[24px] transform hover:scale-105 transition duration-500"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-md">
                            <FaGift className="text-orange-500 text-lg" />
                            <span className="text-xs font-bold text-slate-700">Welcome Voucher Included</span>
                        </div>
                        <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md text-white font-semibold text-xs px-4 py-2 rounded-full shadow-lg border border-white/20">
                            🎉 Join 50,000+ Happy Shoppers
                        </div>
                    </motion.div>
                </motion.div>

            </div>
        </motion.div>
    );
}

export default Signin;

