// import { redirect } from "next/navigation";
// import { useSelector } from "react-redux";

// interface ProtectedProps {
//     children: React.ReactNode;
// }

// export default function AdminProtected({ children }: ProtectedProps) {
//     const { user } = useSelector((state: any) => state.auth);
//     if (user) {
//         const isAdmin = user?.role === "admin";
//         return isAdmin ? children : redirect("/");
//     }
// }

import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import Loader from "../components/loader/Loader";

export default function AdminProtected({ children }: { children: React.ReactNode }) {
    const { user, loading } = useSelector((state: any) => state.auth);

    if (loading) {
        return <Loader />
    }

    if (!user) {
        redirect("/login");
    }

    if (user.role !== "admin") {
        redirect("/");
    }

    return children;
}
