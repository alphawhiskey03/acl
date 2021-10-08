import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../features/userSlice"
import eventReducer from "../features/eventSlice";
import permissionReducer from "../features/permissionSlice";

export const store=configureStore({
    reducer:{
        user:userReducer,
        event:eventReducer,
        permission:permissionReducer
    }
})