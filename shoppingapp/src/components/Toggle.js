import React from "react";

function Toggle({ item }) {
    return (
        <div>
            <div>
                <div className="bg-white w-10 h-10 rounded-full flex justify-center items-center overflow-hidden border border-orange-200">
                    <img src={item.image} alt={item.title || "Cart item"} className="w-10 h-10 object-contain p-1 rounded-full" />
                </div>
            </div>
        </div>
    );
}

export default Toggle;

