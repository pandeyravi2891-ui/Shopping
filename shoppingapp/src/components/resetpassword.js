import React from "react";
import { useState } from "react";
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';


function ResetPassword(props) {

    let setislogged = props.setislogged;

    const navigate = useNavigate();

    const [data1, setData] = useState({
        otp: "",
        password: "",
        confirmpassword: ""
    })

    function changeHandler(event) {
        setData(prevData => ({
            ...prevData,
            [event.target.name]: [event.target.value]
        }));
    }

    const resethandler = async (event) => {
        event.preventDefault();
        const toastId = toast.loading("Reseting Password...");
        const baseurl = process.env.REACT_APP_API_URL;
        try {
            const response = await fetch(`${baseurl}/api/v1/resetpassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data1)
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || "Login failed", { id: toastId });
            } else {
                toast.success("Password Reset Successfull", { id: toastId });
                setislogged(true);
                navigate("/home");
            }
        } catch (err) {
            console.log(err);
            // Fallback demo login if backend server is not running
            toast.success(data1.message, { id: toastId });


        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">Forgot Password</h1>
            <p className="text-gray-600 mb-8">Please enter your new password to reset your password.</p>
            <form className="w-full max-w-sm">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        OTP
                    </label>
                    <input name="otp" value={data1.otp} onChange={changeHandler} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter OTP" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Password
                    </label>
                    <input name="password" value={data1.password} onChange={changeHandler} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="New Password" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Confirm Password
                    </label>
                    <input name="confirmpassword" value={data1.confirmpassword} onChange={changeHandler} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Confirm New Password" />
                </div>
                <div className="flex items-center justify-between">
                    <button onClick={resethandler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Reset Password
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ResetPassword;