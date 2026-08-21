import {createSlice} from "@reduxjs/toolkit"

export const wishSlice = createSlice({
    name:"wish",
    initialState:[],
    reducers:{
        
        like: (state ,action )=>{
            state.push(action.payload)
        },
        unlike: (state , action)=>{
            return state.filter(item => item.id !==action.payload)
        },
    }
});

export const {like,unlike} = wishSlice.actions;
export default wishSlice.reducer;