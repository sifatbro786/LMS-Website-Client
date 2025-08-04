import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";

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
            }),
        }),

        loadUser: builder.query<LoadUserResponse, void>({
            query: () => ({
                url: "/me",
                method: "GET",
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
                    }
                } catch (err) {
                    console.error("Failed to load user:", err);
                }
            },
        }),
    }),
});

export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;
