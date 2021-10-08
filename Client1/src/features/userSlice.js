import {createSlice} from "@reduxjs/toolkit";

let user = JSON.parse(localStorage.getItem('user'));

export const userSlice= createSlice({
    name:"user",
    initialState:{
        user:user?user:null
    },
    reducers:{
        login:(state,action)=>{
            localStorage.setItem("user",JSON.stringify(action.payload));
            state.user=action.payload;
        },
        logout:(state)=>{
            localStorage.removeItem("user");
            state.user=null;
        }
    }
})

export const {login ,logout }=userSlice.actions;
export const selectUser =(state)=>state.user.user;
export default userSlice.reducer;