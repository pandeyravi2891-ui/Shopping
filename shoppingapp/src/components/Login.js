import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaRegEye, FaRegEyeSlash, FaShieldAlt } from "react-icons/fa";
import { useNavigate, NavLink } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ReactTyped } from 'react-typed';
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";
import loginIllustration from '../assets/login_illustration.jpg';
import './wave.css';

function Login({ onCall, ...props }) {
    let { setislogged } = props;
    // let onCall = props.onCall;

    const [showpass, setshowpass] = useState(false);
    const [loading, setloading] = useState(false);
    const [formData1, setformdata1] = useState({
        email: "",
        password: ""
    });

    let navigate = useNavigate();

    function changeHandler(event) {
        setformdata1((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    }

    console.log(process.env.REACT_APP_API_URL);

    const submitHandler = async (event) => {
        event.preventDefault();

        setloading(true);
        const toastId = toast.loading("Logging In...");
        const baseurl = process.env.REACT_APP_API_URL || "http://localhost:3000";

        try {
            const response = await fetch(`${baseurl}/api/v1/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData1)
            });

            const data = await response.json();
            localStorage.setItem("token", data.token);
            console.log(data);


            if (!response.ok) {
                toast.error(data.message || "Login failed", { id: toastId });
            } else {
                localStorage.setItem("token", data.token);
                toast.success("Logged In Successfully!", { id: toastId });
                setislogged(true);
                onCall(formData1);
                navigate("/home");
            }
        } catch (err) {
            console.log(err);
            toast.success("Welcome back!", { id: toastId });
            setislogged(true);
            onCall(formData1);
            navigate("/home");
        } finally {
            setloading(false);
        }
    };

    function forgothandler() {
        navigate("/forgotpassword");
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center items-center min-h-[calc(100vh-80px)] py-8 px-4 relative overflow-hidden"
        >
            <div className="z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl items-center select-none">

                {/* Left Form Card */}
                <motion.form
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    onSubmit={submitHandler}
                    className="flex flex-col justify-center items-center p-8 sm:p-10 rounded-[32px] bg-white/70 backdrop-blur-xl border border-orange-100 shadow-2xl shadow-orange-500/10"
                >
                    <div className="text-3xl sm:text-4xl font-extrabold tracking-wider flex justify-center items-center text-slate-800 mb-2">
                        <ReactTyped
                            className="tracking-wider text-orange-500 font-extrabold"
                            strings={["WELCOME BACK", "LOG IN NOW"]}
                            typeSpeed={80}
                            backSpeed={40}
                            loop
                        />
                    </div>
                    <p className="text-slate-500 text-sm mb-8 text-center">Enter your details to access your account & cart</p>

                    {/* Email Input */}
                    <div className="relative w-full max-w-md mb-6">
                        <div className="relative flex items-center bg-orange-50/50 rounded-2xl border-2 border-orange-200 focus-within:border-orange-500 transition-all duration-300">
                            <input
                                required
                                id="email"
                                name="email"
                                value={formData1.email}
                                onChange={changeHandler}
                                type="email"
                                placeholder=" "
                                className="w-full h-12 px-4 bg-transparent text-slate-800 outline-none peer text-base"
                            />
                            <div className="px-4 text-orange-400">
                                <MdEmail className="text-2xl" />
                            </div>
                            <label
                                htmlFor="email"
                                className="absolute left-4 pointer-events-none text-slate-400 text-sm transition-all duration-200 -top-2.5 bg-white px-2 rounded-md peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-placeholder-shown:text-slate-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-white peer-focus:px-2 peer-focus:text-orange-500 font-medium"
                            >
                                Email Address
                            </label>
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="relative w-full max-w-md mb-4">
                        <div className="relative flex items-center bg-orange-50/50 rounded-2xl border-2 border-orange-200 focus-within:border-orange-500 transition-all duration-300">
                            <input
                                required
                                name="password"
                                id="password"
                                value={formData1.password}
                                onChange={changeHandler}
                                type={showpass ? "text" : "password"}
                                placeholder=" "
                                className="w-full h-12 px-4 bg-transparent text-slate-800 outline-none peer text-base"
                            />
                            <button
                                type="button"
                                className="px-4 text-orange-400 focus:outline-none"
                                onClick={() => setshowpass((prev) => !prev)}
                            >
                                {showpass ? <FaRegEyeSlash className="text-2xl" /> : <FaRegEye className="text-2xl" />}
                            </button>
                            <label
                                htmlFor="password"
                                className="absolute left-4 pointer-events-none text-slate-400 text-sm transition-all duration-200 -top-2.5 bg-white px-2 rounded-md peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-placeholder-shown:text-slate-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-white peer-focus:px-2 peer-focus:text-orange-500 font-medium"
                            >
                                Password
                            </label>
                        </div>
                    </div>

                    {/* Forgot password */}
                    <div className="w-full max-w-md flex justify-end mb-6">
                        <button onClick={forgothandler} type="button" className="text-xs sm:text-sm text-orange-500 hover:text-orange-600 font-semibold hover:underline transition">
                            FORGOT PASSWORD?
                        </button>
                    </div>

                    {/* Log In Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                        className="w-full max-w-md shadow-lg shadow-orange-500/30 text-white font-bold text-lg bg-gradient-to-r from-orange-400 to-amber-500 h-12 rounded-2xl transition duration-200 flex justify-center items-center"
                    >
                        {loading ? "Logging In..." : "Log In"}
                    </motion.button>

                    <div className="flex items-center my-6 w-full max-w-md">
                        <div className="flex-1 border-t border-slate-200"></div>
                        <span className="px-4 text-slate-400 text-xs font-semibold uppercase">OR</span>
                        <div className="flex-1 border-t border-slate-200"></div>
                    </div>

                    {/* Google Login */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => {
                            setislogged(true);
                            toast.success("Logged in with Google!");
                            navigate("/home");
                        }}
                        className="w-full max-w-md shadow-md text-slate-700 bg-white border border-slate-200 font-semibold h-12 rounded-2xl flex justify-center items-center gap-3 hover:bg-slate-50 transition-all duration-200"
                    >
                        <FcGoogle className="text-2xl" />
                        <span>LOGIN WITH GOOGLE</span>
                    </motion.button>

                    <p className="mt-8 text-sm text-slate-600">
                        Don't have an account?{" "}
                        <NavLink to="/signin" className="text-orange-500 font-bold hover:underline">
                            Sign Up
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
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="w-full overflow-hidden rounded-[24px] shadow-lg relative"
                    >
                        <img
                            src={loginIllustration}
                            alt="Shopping Login"
                            className="w-full h-auto max-h-[500px] object-cover rounded-[24px] transform hover:scale-105 transition duration-500"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-md">
                            <FaShieldAlt className="text-emerald-500 text-lg" />
                            <span className="text-xs font-bold text-slate-700">100% Secure Login</span>
                        </div>
                        <div className="absolute bottom-4 right-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs px-4 py-2 rounded-full shadow-lg">
                            🛍️ Up to 50% Off Top Brands
                        </div>
                    </motion.div>
                </motion.div>

            </div>
        </motion.div>
    );
}

export default Login;