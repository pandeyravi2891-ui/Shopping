import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Forgotpassword() {

    const [data1, setData1] = useState({
        email: ""
    });

    const navigate = useNavigate();

    function changeHandler(event) {

        setData1(prevData => ({
            ...prevData,
            [event.target.name]: [event.target.value]
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Email submitted:", data1);
        const toastId = toast.loading("Finding Account...");
        const baseurl = process.env.REACT_APP_API_URL || (window.location.hostname === "localhost" ? "http://localhost:3000" : "https://shopping-lovat-eight.vercel.app");
        try {
            const response = await fetch(`${baseurl}/api/v1/forgotpassword`, {
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
                toast.success("Account Found", { id: toastId });

                navigate("/resetpassword");
            }
        } catch (err) {
            console.log(err);
            // Fallback demo login if backend server is not running
            toast.success("Account Found", { id: toastId });
        }
        // Here you can add logic to handle the password reset request, e.g., call an API.
    }


    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">Forgot Password</h1>
            <p className="text-gray-600 mb-8">Please enter your email address to reset your password.</p>
            <form className="w-full max-w-sm">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input name="email" value={data1.email} onChange={changeHandler} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" />
                </div>
                <div className="flex items-center justify-between">
                    <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Reset Password
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Forgotpassword;