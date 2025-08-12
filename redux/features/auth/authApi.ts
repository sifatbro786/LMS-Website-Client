import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";

type RegistrationResponse = {
    message: string;
    activationToken: string;
};

type RegistrationData = {
    name: string;
    email: string;
    password: string;
};

type LoginResponse = {
    success: boolean;
    accessToken: string;
    user: any;
    message: string;
};

type LoginData = {
    email: string;
    password: string;
};

type SocialAuthData = {
    email: string;
    name: string;
    avatar?: string;
};

type ActivationData = {
    activation_token: string;
    activation_code: string;
};

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
                url: "/registration",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    dispatch(
                        userRegistration({
                            token: result.data.activationToken,
                        }),
                    );
                } catch (err: any) {
                    console.error("Registration failed:", err);
                }
            },
        }),

        activation: builder.mutation<{ success: boolean; message: string }, ActivationData>({
            query: ({ activation_token, activation_code }) => ({
                url: "/activate-user",
                method: "POST",
                body: { activation_token, activation_code },
                credentials: "include" as const,
            }),
        }),

        login: builder.mutation<LoginResponse, LoginData>({
            query: ({ email, password }) => ({
                url: "/login",
                method: "POST",
                body: { email, password },
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    if (result.data.success && result.data.accessToken && result.data.user) {
                        dispatch(
                            userLoggedIn({
                                accessToken: result.data.accessToken,
                                user: result.data.user,
                            }),
                        );
                    } else {
                        console.warn("Login response missing required data:", result.data);
                    }
                } catch (err: any) {
                    console.error("Login failed:", err);
                    // Ensure user is logged out on login failure
                    dispatch(userLoggedOut());
                }
            },
        }),

        socialAuth: builder.mutation<LoginResponse, SocialAuthData>({
            query: ({ email, name, avatar }) => ({
                url: "/social-auth",
                method: "POST",
                body: { email, name, avatar },
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    if (result.data.success && result.data.accessToken && result.data.user) {
                        dispatch(
                            userLoggedIn({
                                accessToken: result.data.accessToken,
                                user: result.data.user,
                            }),
                        );
                    } else {
                        console.warn("Social auth response missing required data:", result.data);
                    }
                } catch (err: any) {
                    console.error("Social authentication failed:", err);
                    dispatch(userLoggedOut());
                }
            },
        }),

        logOut: builder.mutation<{ success: boolean; message: string }, void>({
            query: () => ({
                url: "/logout",
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    // Always dispatch logout, regardless of server response
                    dispatch(userLoggedOut());
                } catch (err: any) {
                    console.error("Logout failed:", err);
                    // Still dispatch logout even if server request fails
                    // This ensures client state is cleared
                    dispatch(userLoggedOut());
                }
            },
        }),
    }),
});

export const {
    useRegisterMutation,
    useActivationMutation,
    useLoginMutation,
    useSocialAuthMutation,
    useLogOutMutation,
} = authApi;
