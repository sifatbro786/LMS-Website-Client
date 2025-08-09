"use client";

import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import AvatarImage from "../../public/avatar.png";
import { useSession } from "next-auth/react";
import { useLogOutQuery, useSocialAuthMutation } from "../../redux/features/auth/authApi";
import toast from "react-hot-toast";

type HeaderProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    activeItem: number;
    setRoute: React.Dispatch<React.SetStateAction<string>>;
    route: string;
};

const Header: FC<HeaderProps> = ({ open, setOpen, activeItem, setRoute, route }) => {
    const { user } = useSelector((state: any) => state.auth);
    const { data } = useSession();
    const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();

    const [active, setActive] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [logout, setLogout] = useState(false);
    const {} = useLogOutQuery(undefined, {
        skip: !logout ? true : false,
    });

    //! Social auth / toast logic
    useEffect(() => {
        if (!user) {
            if (data) {
                socialAuth({
                    email: data?.user?.email,
                    name: data?.user?.name,
                    avatar: data?.user?.image,
                });
            }
        }
        if (data === null) {
            if (isSuccess) {
                toast.success("Login successful.");
            }
        }

        if (data === null) {
            setLogout(true);
        }
    }, [data, user, socialAuth, isSuccess, error]);

    //! Scroll effect
    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 85) {
                setActive(true);
            } else {
                setActive(false);
            }
        });
    }

    const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLDivElement).id === "screen") {
            setOpenSidebar(false);
        }
    };

    return (
        <div className="w-full relative">
            <div
                className={`${
                    active
                        ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
                        : "w-full border-b dark:border-[#ffffff1c] h-[80px] dark:shadow"
                }`}
            >
                <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
                    <div className="w-full h-[80px] flex items-center justify-between p-3">
                        <div>
                            <Link
                                href={"/"}
                                className="text-[25px] font-Poppins font-[500] text-black dark:text-white"
                            >
                                ELearning
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <NavItems activeItem={activeItem} isMobile={false} />
                            <ThemeSwitcher />

                            {/* //! only for mobile view */}
                            <div className="800px:hidden">
                                <HiOutlineMenuAlt3
                                    size={25}
                                    className="cursor-pointer dark:text-white text-black"
                                    onClick={() => setOpenSidebar(true)}
                                />
                            </div>
                            {user ? (
                                <Link href="/profile">
                                    <Image
                                        src={user?.avatar ? user?.avatar?.url : AvatarImage}
                                        alt={user.name || "avatar"}
                                        width={30}
                                        height={30}
                                        className="w-[32px] h-[32px] rounded-full cursor-pointer object-cover"
                                        style={{
                                            border: activeItem === 5 ? "2px solid #37a39a" : "none",
                                        }}
                                    />
                                </Link>
                            ) : (
                                <HiOutlineUserCircle
                                    size={26}
                                    className="hidden 800px:block cursor-pointer dark:text-white text-black"
                                    onClick={() => setOpen(true)}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* //? mobile sidebar */}
                {openSidebar && (
                    <div
                        className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
                        onClick={handleClose}
                        id="screen"
                    >
                        <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0 ">
                            <NavItems activeItem={activeItem} isMobile={true} />
                            <HiOutlineUserCircle
                                size={25}
                                className="cursor-pointer ml-5 my-2 dark:text-white text-black"
                                onClick={() => setOpen(true)}
                            />
                            <p className="text-base mt-5 px-2 pl-5 text-black dark:text-white ">
                                Copyright &copy; 2025 ELearning
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* //? login modal */}
            {route === "Login" && open && (
                <CustomModal
                    open={open}
                    setOpen={setOpen}
                    activeItem={activeItem}
                    component={Login}
                    setRoute={setRoute}
                />
            )}

            {/* //? signup modal */}
            {route === "Sign-Up" && open && (
                <CustomModal
                    open={open}
                    setOpen={setOpen}
                    activeItem={activeItem}
                    component={SignUp}
                    setRoute={setRoute}
                />
            )}

            {/* //? verification modal */}
            {route === "Verification" && open && (
                <CustomModal
                    open={open}
                    setOpen={setOpen}
                    activeItem={activeItem}
                    component={Verification}
                    setRoute={setRoute}
                />
            )}
        </div>
    );
};

export default Header;
