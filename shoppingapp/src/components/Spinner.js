import React from "react";

function Spinner() {
    return (
        <div className="flex flex-col items-center justify-center gap-5 min-h-[40vh] w-full">
            {/* Premium animated spinner */}
            <div className="relative w-20 h-20">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-4 border-orange-100" />
                {/* Spinning gradient arc */}
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 border-r-amber-400 animate-spin" />
                {/* Inner pulse */}
                <div className="absolute inset-3 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 opacity-20 animate-pulse" />
                {/* Center dot */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 shadow-md shadow-orange-500/30 animate-bounce" />
                </div>
            </div>

            {/* Loading text with dots */}
            <div className="flex flex-col items-center gap-1">
                <p className="font-black text-slate-700 text-sm tracking-wide">Loading Products</p>
                <div className="flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce"
                            style={{ animationDelay: `${i * 0.15}s` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Spinner;