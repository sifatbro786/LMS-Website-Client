import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Helper functions for localStorage persistence
const loadFromLocalStorage = () => {
    if (typeof window !== "undefined") {
        try {
            const serializedState = localStorage.getItem("auth");
            if (serializedState === null) {
                return { token: "", user: "" };
            }
            return JSON.parse(serializedState);
        } catch (err) {
            console.error("Failed to load auth state from localStorage:", err);
            return { token: "", user: "" };
        }
    }
    return { token: "", user: "" };
};

const saveToLocalStorage = (state: any) => {
    if (typeof window !== "undefined") {
        try {
            const serializedState = JSON.stringify(state);
            localStorage.setItem("auth", serializedState);
        } catch (err) {
            console.error("Failed to save auth state to localStorage:", err);
        }
    }
};

const initialState = loadFromLocalStorage();

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userRegistration: (state, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token;
            // Don't save registration token to localStorage
        },
        userLoggedIn: (state, action: PayloadAction<{ accessToken: string; user: any }>) => {
            state.token = action.payload.accessToken;
            state.user = action.payload.user;
            // Save to localStorage for persistence
            saveToLocalStorage(state);
        },
        userLoggedOut: (state) => {
            state.token = "";
            state.user = "";
            // Clear localStorage
            if (typeof window !== "undefined") {
                localStorage.removeItem("auth");
            }
        },
    },
});

export const { userRegistration, userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
