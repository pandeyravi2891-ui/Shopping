import { configureStore } from "@reduxjs/toolkit";

import  {cartSlice}  from "./Slices/cartSlice";
import { wishSlice } from "./Slices/wishlistslice";

export const store = configureStore({
    reducer:{
        cart: cartSlice.reducer,
        wish: wishSlice.reducer,
    }
   
})