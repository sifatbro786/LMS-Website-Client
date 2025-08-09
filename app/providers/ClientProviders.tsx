"use client";

import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { ReduxProvider } from "./ReduxProvider";
import { ThemeProvider } from "./ThemeProvider";
import { SessionProvider } from "next-auth/react";
import Loader from "../components/loader/Loader";
import { useLoadUserQuery } from "../../redux/features/api/apiSlice";

type Props = {
    children: ReactNode;
};

export default function ClientProviders({ children }: Props) {
    return (
        <ReduxProvider>
            <SessionProvider>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <Custom>{children}</Custom>
                    <Toaster position="top-center" reverseOrder={false} />
                </ThemeProvider>
            </SessionProvider>
        </ReduxProvider>
    );
}

const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isLoading } = useLoadUserQuery();

    return <>{isLoading ? <Loader /> : children}</>;
};
