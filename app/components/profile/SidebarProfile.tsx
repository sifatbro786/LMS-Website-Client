import Image from "next/image";
import React from "react";
import avatarDefault from "../../../public/avatar.png";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";

type Props = {
    user: any;
    active: number;
    setActive: (active: number) => void;
    avatar: string | null;
    logoutHandler: () => void;
};

const SidebarProfile: React.FC<Props> = ({ user, active, setActive, avatar, logoutHandler }) => {
    return (
        <div className="w-full">
            {/* //? my account */}
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

            {/* //? change password */}
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

            {/* //? enrolled courses */}
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

            {/* //? enrolled courses */}
            <div
                className="w-full flex items-center px-3 py-4 cursor-pointer"
                onClick={() => logoutHandler()}
            >
                <AiOutlineLogout size={20} className="dark:text-white text-black" />
                <h5 className="hidden 800px:block pl-2 font-Poppins text-black dark:text-white">
                    Log Out
                </h5>
            </div>
        </div>
    );
};
export default SidebarProfile;
