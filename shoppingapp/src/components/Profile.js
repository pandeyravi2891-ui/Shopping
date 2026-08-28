import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getBaseUrl } from '../apiUrl';


function Profile(props) {
    const { setislogged } = props;
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    console.log(token);
    const [user, setUser] = useState(null);
    const [additionaldetail, setAdditionaldetail] = useState({
        phone: "",
        gender: "",
        dob: "",
        address: "",
    });

    const handleSave = async () => {
        toast.loading("Saving details...");
        const token = localStorage.getItem("token");
        const baseurl = getBaseUrl();

        const response = await fetch(`${baseurl}/api/v1/additionaldetail`, {
            method: "POST",
            headers: {
                token: token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(additionaldetail),
        });

        const data = await response.json();
        toast.dismiss();
        toast.success(data.message);
        navigate("/profile");
    }

    useEffect(() => {
        if (!token) {
            toast.error("Please sign in to access your profile");
            navigate("/signin");
        }

        const getProfile = async () => {
            const token = localStorage.getItem("token");
            const baseurl = getBaseUrl();

            const response = await fetch(`${baseurl}/api/v1/profile`, {
                method: "GET",
                headers: {
                    token: token,
                },
            });

            const data = await response.json();

            setUser(data);
        };

        getProfile();
    }, [navigate, token]);

    console.log(user);


    return (
        <div className="min-h-screen bg-gray-50 px-5 py-8 text-gray-800">
            <div className="mx-auto max-w-[1320px]">

                {/* Breadcrumb */}
                <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
                    <span>⌂</span>
                    <span>Home</span>
                    <span>›</span>
                    <span className="font-medium text-gray-800">My Profile</span>
                </div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[270px_1fr]">

                    {/* ================= SIDEBAR ================= */}
                    <aside className="space-y-5">

                        {/* Menu */}
                        <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm">

                            <div className="mb-1 flex cursor-pointer items-center gap-3 rounded-lg bg-orange-50 px-3 py-3.5 font-semibold text-orange-500">
                                <span className="text-lg">♙</span>
                                <span>My Profile</span>
                            </div>

                            <div onClick={() => { navigate("/cart"); }} className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3.5 text-sm hover:bg-orange-50 hover:text-orange-500">
                                <span className="text-lg">▣</span>
                                <span>Orders</span>
                            </div>

                            <div onClick={() => { navigate("/wishlist"); }} className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3.5 text-sm hover:bg-orange-50 hover:text-orange-500">
                                <span className="text-lg">♡</span>
                                <span>Wishlist</span>
                            </div>

                            <div className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3.5 text-sm hover:bg-orange-50 hover:text-orange-500">
                                <span className="text-lg">⌖</span>
                                <span>Addresses</span>
                            </div>

                            <div className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3.5 text-sm hover:bg-orange-50 hover:text-orange-500">
                                <span className="text-lg">▭</span>
                                <span>Payment Methods</span>
                            </div>

                            <div className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3.5 text-sm hover:bg-orange-50 hover:text-orange-500">
                                <span className="text-lg">♢</span>
                                <span>Coupons</span>
                            </div>

                            <div className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3.5 text-sm hover:bg-orange-50 hover:text-orange-500">
                                <span className="text-lg">♧</span>
                                <span>Notifications</span>
                            </div>

                            <div className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3.5 text-sm hover:bg-orange-50 hover:text-orange-500">
                                <span className="text-lg">⚙</span>
                                <span>Settings</span>
                            </div>

                            <div onClick={() => {
                                toast.success("LOGGED OUT.");
                                setislogged(false);
                                navigate("/");
                            }} className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3.5 text-sm hover:bg-orange-50 hover:text-orange-500">
                                <span className="text-lg">⇥</span>
                                <span>Logout</span>
                            </div>

                        </div>

                        {/* Special Offer */}
                        <div className="relative min-h-[155px] overflow-hidden rounded-xl border border-orange-100 bg-gradient-to-br from-orange-50 to-orange-100 p-6">

                            <h3 className="mb-2 text-sm font-bold">
                                Special Offer!
                            </h3>

                            <p className="w-36 text-sm leading-6 text-gray-600">
                                Get 10% off on your next order
                            </p>

                            <button className="mt-3 rounded-md bg-orange-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-orange-600">
                                Shop Now
                            </button>

                            <div className="absolute bottom-2 right-4 text-6xl">
                                🛍️
                            </div>

                        </div>

                    </aside>

                    {/* ================= MAIN CONTENT ================= */}
                    <main className="space-y-4">

                        {/* Profile Header */}
                        <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">

                            <div className="mb-8">
                                <h1 className="text-xl font-bold text-gray-900">
                                    My Profile
                                </h1>

                                <p className="mt-1 text-sm text-gray-500">
                                    Manage your personal information and account details
                                </p>
                            </div>

                            <div className="flex flex-col items-start gap-7 md:flex-row md:items-center">

                                {/* Avatar */}
                                <div className="relative">
                                    <div className="flex h-36 w-36 items-center justify-center rounded-full bg-orange-50 text-7xl text-orange-500">
                                        <img src={`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&size=128`} className=' rounded-full ' alt="Profile" />
                                    </div>

                                    <button className="absolute bottom-1 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm shadow-md">
                                        ✎
                                    </button>
                                </div>

                                {/* User Details */}
                                <div className="flex-1">

                                    <h2 className="mb-4 text-2xl font-bold text-gray-900">
                                        {user?.firstName} {user?.lastName}
                                    </h2>

                                    <div className="my-2 flex items-center gap-3 text-sm text-gray-500">
                                        <span>✉</span>
                                        <span>{user?.email}</span>
                                    </div>

                                    <div className="my-2 flex items-center gap-3 text-sm text-gray-500">
                                        <span>⌕</span>
                                        <span>{user?.phone}</span>
                                    </div>

                                    <div className="my-2 flex items-center gap-3 text-sm text-gray-500">
                                        <span>▣</span>
                                        <span>Joined on {new Date(user?.joinedDate).toDateString()}</span>
                                    </div>

                                    {user && (
                                        <>
                                            <div className="my-2 flex items-center gap-3 text-sm text-gray-500">
                                                <span>▣</span>
                                                <span>{user.gender}</span>
                                            </div>

                                            <div className="my-2 flex items-center gap-3 text-sm text-gray-500">
                                                <span>⌕</span>
                                                <span>{user.dob}</span>
                                            </div>

                                            <div className="my-2 flex items-center gap-3 text-sm text-gray-500">
                                                <span>⌕</span>
                                                <span>{user.address}</span>
                                            </div>
                                        </>
                                    )}

                                </div>

                                <button className="rounded-md border border-orange-500 bg-white px-5 py-2.5 text-sm font-semibold text-orange-500 transition hover:bg-orange-500 hover:text-white">
                                    Edit Profile
                                </button>

                            </div>

                        </section>

                        {/* Personal Information */}
                        <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">

                            <h2 className="mb-6 text-lg font-bold text-gray-900">
                                Personal Information
                            </h2>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                {/* Full Name */}
                                <div>
                                    <label className="mb-2 block text-xs font-semibold text-gray-700">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        value={user?.firstName + " " + user?.lastName}
                                        className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                    />
                                </div>

                                {/* DOB */}
                                <div>
                                    <label className="mb-2 block text-xs font-semibold text-gray-700">
                                        Date of Birth
                                    </label>

                                    <input
                                        type="date"
                                        value={additionaldetail.dob}
                                        onChange={(e) => setAdditionaldetail({ ...additionaldetail, dob: e.target.value })}
                                        className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="mb-2 block text-xs font-semibold text-gray-700">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        value={user?.email}
                                        className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                    />
                                </div>

                                {/* Gender */}
                                <div>
                                    <label className="mb-2 block text-xs font-semibold text-gray-700">
                                        Gender
                                    </label>

                                    <select
                                        value={additionaldetail.gender}
                                        onChange={(e) => setAdditionaldetail({ ...additionaldetail, gender: e.target.value })}
                                        className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                    >
                                        <option>Gender</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="mb-2 block text-xs font-semibold text-gray-700">
                                        Phone Number
                                    </label>

                                    <input
                                        onChange={(e) => setAdditionaldetail({ ...additionaldetail, phone: e.target.value })}
                                        type="tel"
                                        value={user?.additionaldetails?.phone}
                                        className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                    />
                                </div>

                                {/* Language */}
                                <div>
                                    <label className="mb-2 block text-xs font-semibold text-gray-700">
                                        Preferred Language
                                    </label>

                                    <select
                                        defaultValue="English"
                                        className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                    >
                                        <option>English</option>
                                        <option>Hindi</option>
                                    </select>
                                </div>

                            </div>

                            <div className="mt-5 flex justify-end">
                                <button onClick={handleSave} className="rounded-md bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600">
                                    Save Changes
                                </button>
                            </div>

                        </section>

                        {/* Bottom Cards */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                            {/* Default Address */}
                            <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

                                <div className="mb-5 flex items-center justify-between">

                                    <h2 className="text-base font-bold text-gray-900">
                                        ⌖ Default Address
                                    </h2>

                                    <button className="rounded-md border border-orange-500 px-4 py-2 text-sm font-semibold text-orange-500 hover:bg-orange-500 hover:text-white">
                                        Add New
                                    </button>

                                </div>

                                <div className="rounded-lg border border-gray-200 p-4">

                                    <div className="mb-3 flex items-center gap-2">
                                        <strong className="text-sm">Home</strong>

                                        <span className="rounded-full bg-green-100 px-2 py-1 text-[11px] font-semibold text-green-600">
                                            Default
                                        </span>
                                    </div>

                                    <p className="text-sm leading-6 text-gray-500">
                                        123, MG Road
                                        <br />
                                        Bangalore, Karnataka 560001
                                        <br />
                                        India
                                        <br />
                                        Phone: {user?.phone}
                                    </p>

                                    <div className="mt-4 flex justify-end gap-2">

                                        <button className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm hover:bg-gray-50">
                                            Edit
                                        </button>

                                        <button className="rounded-md border border-orange-500 bg-white px-4 py-2 text-sm text-orange-500 hover:bg-orange-500 hover:text-white">
                                            Remove
                                        </button>

                                    </div>

                                </div>

                            </section>

                            {/* Account Security */}
                            <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

                                <div className="mb-5">
                                    <h2 className="text-base font-bold text-gray-900">
                                        ♢ Account Security
                                    </h2>
                                </div>

                                {/* Password */}
                                <div className="mb-3 flex items-center justify-between rounded-lg border border-gray-200 p-4">

                                    <div className="flex items-center gap-4">

                                        <span className="text-xl">
                                            🔐
                                        </span>

                                        <div>
                                            <strong className="block text-sm">
                                                Password
                                            </strong>

                                            <span className="text-xs text-gray-500">
                                                Last changed 2 months ago
                                            </span>
                                        </div>

                                    </div>

                                    <button className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50">
                                        Change
                                    </button>

                                </div>

                                {/* 2FA */}
                                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">

                                    <div className="flex items-center gap-4">

                                        <span className="text-xl">
                                            🔒
                                        </span>

                                        <div>
                                            <strong className="block text-sm">
                                                Two-Factor Authentication
                                            </strong>

                                            <span className="text-xs text-gray-500">
                                                Add an extra layer of security
                                            </span>
                                        </div>

                                    </div>

                                    <button className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50">
                                        Enable
                                    </button>

                                </div>

                            </section>

                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
}

export default Profile