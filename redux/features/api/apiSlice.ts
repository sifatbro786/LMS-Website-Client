import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../auth/authSlice";

interface LoadUserResponse {
    accessToken: string;
    user: any;
}

interface RefreshTokenResponse {
    accessToken: string;
}

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        refreshToken: builder.query<RefreshTokenResponse, void>({
            query: () => ({
                url: "/refresh",
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    // Don't dispatch anything here, let loadUser handle it
                    console.log("Token refreshed successfully");
                } catch (err: any) {
                    console.log("Failed to refresh token:", err);
                    // If refresh fails, user should be logged out
                    if (err.error?.status === 400 || err.error?.status === 401) {
                        dispatch(userLoggedOut());
                    }
                }
            },
        }),

        loadUser: builder.query<LoadUserResponse, void>({
            query: () => ({
                url: "/me",
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    const { accessToken, user } = result.data ?? {};

                    if (accessToken && user) {
                        dispatch(
                            userLoggedIn({
                                accessToken,
                                user,
                            }),
                        );
                    } else {
                        console.warn(
                            "loadUser: missing accessToken or user in response",
                            result.data,
                        );
                        dispatch(userLoggedOut());
                    }
                } catch (err: any) {
                    console.error("Failed to load user:", err);
                    // If loadUser fails, user should be logged out
                    if (err.error?.status === 400 || err.error?.status === 401) {
                        dispatch(userLoggedOut());
                    }
                }
            },
        }),
    }),
});

export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;
