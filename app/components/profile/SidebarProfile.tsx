"use client";

import Image from "next/image";
import React from "react";
import avatarDefault from "../../../public/avatar.png";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useLogOutMutation } from "../../../redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../../redux/features/auth/authSlice";

type Props = {
    user: any;
    active: number;
    setActive: (active: number) => void;
    avatar: string | null;
};

const SidebarProfile: React.FC<Props> = ({ user, active, setActive, avatar }) => {
    const [logOut, { isLoading }] = useLogOutMutation();
    const router = useRouter();
    const { data: session } = useSession();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            if (session) {
                // Social login → NextAuth sign out
                await signOut({ redirect: false });
                setTimeout(async () => {
                    await signOut({ redirect: false }); // Call signOut again after a short delay
                }, 3000); // Adjust the delay as needed
                dispatch(userLoggedOut()); // Clear Redux/localStorage
                toast.success("Logged out successfully");
                router.push("/");
            } else {
                // Email/password → backend logout
                await logOut().unwrap();
                dispatch(userLoggedOut());
                toast.success("Logged out successfully");
                router.push("/");
            }
        } catch (error: any) {
            console.error("Logout error:", error);
            toast.error("Failed to log out");
        }
    };

    return (
        <div className="w-full">
            {/* My account */}
            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${
                    active === 1 ? "dark:bg-slate-800 bg-slate-200" : "bg-transparent"
                } `}
                onClick={() => setActive(1)}
            >
                <Image
                    src={user?.avatar || avatar ? user?.avatar?.url || avatar : avatarDefault}
                    alt={user?.name}
                    width={30}
                    height={30}
                    className="w-5 h-5 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full"
                />
                <h5 className="hidden 800px:block pl-2 font-Poppins text-black dark:text-white">
                    My Account
                </h5>
            </div>

            {/* Change password */}
            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${
                    active === 2 ? "dark:bg-slate-800 bg-slate-200" : "bg-transparent"
                } `}
                onClick={() => setActive(2)}
            >
                <RiLockPasswordLine size={20} className="dark:text-white text-black" />
                <h5 className="hidden 800px:block pl-2 font-Poppins text-black dark:text-white">
                    Change Password
                </h5>
            </div>

            {/* Enrolled courses */}
            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${
                    active === 3 ? "dark:bg-slate-800 bg-slate-200" : "bg-transparent"
                } `}
                onClick={() => setActive(3)}
            >
                <SiCoursera size={20} className="dark:text-white text-black" />
                <h5 className="hidden 800px:block pl-2 font-Poppins text-black dark:text-white">
                    Enrolled Courses
                </h5>
            </div>

            {/* Admin dashboard */}
            {user?.role === "admin" && (
                <Link href="/admin" className="w-full flex items-center px-3 py-4 cursor-pointer">
                    <MdOutlineAdminPanelSettings size={20} className="dark:text-white text-black" />
                    <h5 className="hidden 800px:block pl-2 font-Poppins text-black dark:text-white hover:underline">
                        Admin Dashboard
                    </h5>
                </Link>
            )}

            {/* Log out */}
            <div
                className="w-full flex items-center px-3 py-4 cursor-pointer"
                onClick={handleLogout}
            >
                <AiOutlineLogout size={20} className="dark:text-white text-black" />
                <h5 className="hidden 800px:block pl-2 font-Poppins text-black dark:text-white hover:underline">
                    {isLoading ? "Logging out..." : "Log Out"}
                </h5>
            </div>
        </div>
    );
};

export default SidebarProfile;
