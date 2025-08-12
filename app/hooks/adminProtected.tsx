"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Loader from "../components/loader/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

interface ProtectedProps {
    children: React.ReactNode;
}

export default function AdminProtected({ children }: ProtectedProps) {
    const { user } = useSelector((state: any) => state.auth);
    const router = useRouter();
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    // Try to load user if we don't have one but might have stored auth
    const shouldLoadUser = !user && typeof window !== "undefined" && localStorage.getItem("auth");

    const { isLoading: isLoadingUser } = useLoadUserQuery(undefined, {
        skip: !shouldLoadUser,
    });

    useEffect(() => {
        // If we're loading user data, wait
        if (shouldLoadUser && isLoadingUser) return;

        // Check if user is authenticated and is admin
        if (!user || user === "") {
            router.push("/");
            return;
        }

        if (user.role !== "admin") {
            router.push("/");
            return;
        }

        setIsAuthChecked(true);
    }, [user, shouldLoadUser, isLoadingUser, router]);

    // Show loading while checking
    if ((shouldLoadUser && isLoadingUser) || !isAuthChecked) {
        return <Loader />;
    }

    return <>{children}</>;
}
