"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLoadUserQuery } from "../../redux/features/api/apiSlice";
import Loader from "../components/loader/Loader";

interface ProtectedProps {
    children: React.ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
    const { status, data: session } = useSession();
    const { user: customUser } = useSelector((state: any) => state.auth);
    const router = useRouter();
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    // Only try to load user if we don't have one but might have stored auth
    const shouldLoadUser =
        !customUser && !session && typeof window !== "undefined" && localStorage.getItem("auth");

    const { isLoading: isLoadingUser } = useLoadUserQuery(undefined, {
        skip: !shouldLoadUser,
    });

    useEffect(() => {
        // If NextAuth is still loading, wait
        if (status === "loading") return;

        // If we're loading custom user data, wait
        if (shouldLoadUser && isLoadingUser) return;

        // Check authentication status
        const isNextAuthAuthenticated = status === "authenticated" && session;
        const isCustomAuthenticated = customUser && customUser !== "";

        if (!isNextAuthAuthenticated && !isCustomAuthenticated) {
            router.push("/");
            return;
        }

        setIsAuthChecked(true);
    }, [status, session, customUser, shouldLoadUser, isLoadingUser, router]);

    // Show loading while checking
    if (status === "loading" || (shouldLoadUser && isLoadingUser) || !isAuthChecked) {
        return <Loader />;
    }

    return <>{children}</>;
}
