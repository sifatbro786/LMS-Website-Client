"use client";

import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { ReduxProvider } from "./ReduxProvider";
import { ThemeProvider } from "./ThemeProvider";
import { SessionProvider } from "next-auth/react";

type Props = {
    children: ReactNode;
};

export default function ClientProviders({ children }: Props) {
    return (
        <ReduxProvider>
            <SessionProvider>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    {children}
                    <Toaster position="top-center" reverseOrder={false} />
                </ThemeProvider>
            </SessionProvider>
        </ReduxProvider>
    );
}
