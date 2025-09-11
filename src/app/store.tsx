import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/store/authSlice";

export const store = configureStore({
    reducer: {
        fake: () => "hello world",
        auth
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch