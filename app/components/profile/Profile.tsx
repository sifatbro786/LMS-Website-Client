/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import SidebarProfile from "./SidebarProfile";
import { useLogOutQuery } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";

type ProfileProps = {
    user: any;
};

const Profile: React.FC<ProfileProps> = ({ user }) => {
    const [scroll, setScroll] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [active, setActive] = useState(1);
    const [logout, setLogout] = useState(false);
    const {} = useLogOutQuery(undefined, {
        skip: !logout ? true : false,
    });

    const logoutHandler = async () => {
        setLogout(true);
        await signOut();
        toast.success("Logout successful.");
    };

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 85) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="w-[85%] flex mx-auto">
            <div
                className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-white bg-opacity-90 border dark:border-[#ffffff1d] border-[#00000014] rounded-[5px] shadow-sm my-20 sticky ${
                    scroll ? "top-[120px]" : "top-[30px]"
                } left-[30px]`}
            >
                <SidebarProfile
                    user={user}
                    active={active}
                    setActive={setActive}
                    avatar={avatar}
                    logoutHandler={logoutHandler}
                />
            </div>
            {active === 1 && (
                <div className="w-full h-full bg-transparent mt-20">
                    <ProfileInfo avatar={avatar} user={user} />
                </div>
            )}
            {active === 2 && (
                <div className="w-full h-full bg-transparent mt-20">
                    <ChangePassword />
                </div>
            )}
        </div>
    );
};

export default Profile;
