import React from "react";
import './spinner.css';

function Spinner(){
    return(
        <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="spinner h-1/2 w-1/2"></div>
            {/* <h1>LOADING....</h1> */}
        </div>
    )
}

export default Spinner;