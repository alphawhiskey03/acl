import {createSlice} from "@reduxjs/toolkit";

export const permissionSlice=createSlice({
    name:"permission",
    initialState:{
        permission:null
    },
    reducers:{
        fill:(state,action)=>{
            state.permission=action.payload.data;
            // console.log(state.permission);
        },
        update:(state,action)=>{
            
            console.log("before " + state.permission[`${action.payload.sm_name}`][`${action.payload.sm_type}`])
            state.permission[`${action.payload.sm_name}`][`${action.payload.sm_type}`]=action.payload.answer==1?true:false;
            console.log("after " + state.permission[`${action.payload.sm_name}`][`${action.payload.sm_type}`])
            console.log(state.permission)


        }

    }
})

export const {fill,update}=permissionSlice.actions;
export const selectPermission=state=>state.permission.permission;
export default permissionSlice.reducer;