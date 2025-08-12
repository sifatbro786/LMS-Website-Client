"use client";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
    },
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

// Add a flag to prevent multiple initializations
let isInitialized = false;

// call the refresh token function on every page load:
const initializeApp = async () => {
    if (isInitialized) return;

    try {
        // First try to refresh the token
        const refreshResult = await store.dispatch(
            apiSlice.endpoints.refreshToken.initiate(undefined, {
                forceRefetch: true,
            }),
        );

        // If refresh token is successful, then load user
        if (refreshResult.data) {
            await store.dispatch(
                apiSlice.endpoints.loadUser.initiate(undefined, {
                    forceRefetch: true,
                }),
            );
        }

        isInitialized = true;
    } catch (error) {
        console.log("Authentication initialization failed:", error);
    }
};

// Only initialize if we're in the browser
if (typeof window !== "undefined") {
    initializeApp();
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
