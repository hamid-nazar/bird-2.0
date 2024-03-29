import { configureStore } from "@reduxjs/toolkit";

import registerReducer from "./Slices/RegisterSlice";
import userReducer from "./Slices/UserSlice";
import postReducer from "./Slices/PostSlice";




export const store = configureStore({
    
    reducer: { 
        register: registerReducer,
        user: userReducer,
        post: postReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

