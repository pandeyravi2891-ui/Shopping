import {createSlice} from "@reduxjs/toolkit"

export const cartSlice = createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        
        adder: (state ,action )=>{
            state.push(action.payload)
        },
        remove: (state , action)=>{
            return state.filter(item => item.id !==action.payload)
        },
    }
});

export const {adder,remove} = cartSlice.actions;
export default cartSlice.reducer;