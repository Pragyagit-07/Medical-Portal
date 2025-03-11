 import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./user/userSlice";

//configureStore allow us to configure the store by combining the reducers in the reducer key.reducer are
 //functions reponsible for managing and updating the state in a react  application. We can add more reducer
 //if we have any 

export const store=configureStore({
    reducer: {
        user: userReducer,
    },

//To avoid serializing error
    middleware: (getDefaultMiddleware) => 
   getDefaultMiddleware({ serializableCheck: false }),
    

 });
 