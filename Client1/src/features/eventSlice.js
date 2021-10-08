import {createSlice} from "@reduxjs/toolkit";

const events={};

export const eventSlice=createSlice({
    name:"events",
    initialState:{
        events:events
    },
    reducers:{
        addEvents:(state,action)=>{
            state.events=action.payload;
        },
        removeAll:(state)=>{
            state.events=null
        }
    }
})

export const {addEvents,removeAll}=eventSlice.actions;
export const selectEvents=(state)=>state.event.events;
export default eventSlice.reducer;