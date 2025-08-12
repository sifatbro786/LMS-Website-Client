"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "@/redux/features/auth/authSlice";

export default function AuthSyncProvider({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    const dispatch = useDispatch();

    useEffect(() => {
        if (session?.user) {
            dispatch(
                userLoggedIn({
                    accessToken: session?.accessToken || "",
                    user: session.user,
                }),
            );
        }
    }, [session, dispatch]);

    return <>{children}</>;
}
