import React,{useState} from "react";

import {ReactTyped} from 'react-typed';
import { NavLink } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function Enter(props){
    


    return(
        <div className="flex  justify-center items-center  bg-cover bg-center overflow-hidden relative select-none "  style={{ backgroundImage: "url('/enter.jpeg')" }}>
        
            <div className="grid md:grid-cols-1 lg:grid-cols-2 w-4/5  gap">
                <div className=" flex flex-col  items-start justify-start my-32 gap-10 w-full">
                    <div className="text-[clamp(19px,2.25vw,2.25rem)] font-bold text-orange-500 w-full  ">
                        FILL YOUR CART WITH :
                    </div>
                    
                    <div className="text-[clamp(1.875rem,3vw,2.25rem)] font-bold text-[#65DCD5] w-full">
                        <ReactTyped className="tracking-widest bg-gradient-to-r from-yellow-500 to-pink-500 bg-clip-text text-transparent"
                        strings={["CLOTHES",
                            "GROCERY",
                            "COSMETIC",
                            "HARDWARE",
                            "UTENSILS",
                        ]}
                        typeSpeed={100}
                        backSpeed={50}
                        loop/>
                    </div>
                    <br></br>

                    <div className="w-full flex justify-center items-center bg-transparent rounded-xl">
                        <NavLink to="/home">
                            <div  className=" bg-orange-400 h-14 flex justify-center items-center w-[15rem] gap-5 rounded-[40px] px-5 tracking-widest text-lg font-medium hover:scale-110 hover:shadow-lg hover:shadow-yellow-300 transition duration-200">
                                    SHOP NOW
                                    <FaArrowRight/>
                            </div>

                        </NavLink>
                        
                    </div>
                </div>

            </div>

           
        </div>
    )
}

export default Enter;