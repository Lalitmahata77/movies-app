import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import {setupListeners} from "@reduxjs/toolkit/query/react"
import authReducer from "./features/auth/authSlice"
import moviesReducer from "./features/movie/movieSlice"
const store = configureStore({
    reducer : {
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth : authReducer,
        movies: moviesReducer,

    },
    middleware : (getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware),
    devTools : true
})

setupListeners(store.dispatch)
export default store