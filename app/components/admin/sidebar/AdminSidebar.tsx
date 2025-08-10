/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { FC, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import {
    HomeOutlinedIcon,
    ArrowForwardIosIcon,
    ArrowBackIosIcon,
    PeopleOutlinedIcon,
    ReceiptOutlinedIcon,
    BarChartOutlinedIcon,
    MapOutlinedIcon,
    GroupsIcon,
    OndemandVideoIcon,
    VideoCallIcon,
    WebIcon,
    QuizIcon,
    WysiwygIcon,
    ManageHistoryIcon,
    SettingsIcon,
    ExitToAppIcon,
} from "./icon";

import avatarDefault from "../../../../public/avatar.png";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";

interface itemProps {
    title: string;
    to: string;
    icon: JSX.Element;
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const Item: FC<itemProps> = ({ title, to, icon, selected, setSelected }) => {
    return (
        <MenuItem active={selected === title} icon={icon} onClick={() => setSelected(title)}>
            <Typography className="!text-base font-Poppins">{title}</Typography>
            <Link href={to} />
        </MenuItem>
    );
};

const AdminSidebar = () => {
    const { user } = useSelector((state: any) => state.auth);
    const [logout, setLogout] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const logoutHandler = () => {
        setLogout(true);
    };

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${theme === "dark" ? "#111c43 !important" : "#00000015 !important"}`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                    opacity: "1 !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
                "& .pro-menu-item": {
                    color: `${theme !== "dark" && "#000"}`,
                },
            }}
            className="!bg-white dark:bg-[#111c43]"
        >
            <ProSidebar
                collapsed={isCollapsed}
                style={{
                    height: "100vh",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: isCollapsed ? "0%" : "16%",
                }}
            >
                <Menu iconShape="square">
                    {/* //? logo and menu icon */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
                        style={{ margin: "10px 0 20px 0" }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Link href="/">
                                    <h3 className="text-[25px] font-Poppins uppercase dark:text-white text-black">
                                        ELearning
                                    </h3>
                                </Link>
                                <IconButton
                                    onClick={() => setIsCollapsed(!isCollapsed)}
                                    className="inline-block"
                                >
                                    <ArrowBackIosIcon className="dark:text-white text-black" />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <Image
                                    alt="profile-user"
                                    src={user.avatar ? user.avatar.url : avatarDefault}
                                    width={100}
                                    height={100}
                                    style={{
                                        borderRadius: "50%",
                                        border: "3px solid #5b6fe6",
                                        // cursor: "pointer",
                                    }}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    variant="h5"
                                    className=" dark:text-white text-black"
                                    sx={{ m: "15px 0 0 0" }}
                                >
                                    {user?.name}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    className=" dark:text-white text-black capitalize"
                                    sx={{ m: "10px 0 0 0" }}
                                >
                                    - {user?.role}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        {/* //? dashboard */}
                        <Item
                            title="Dashboard"
                            to="/admin"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h5"
                            sx={{ m: "15px 0 5px 25px" }}
                            className="!text-[18px] dark:text-white text-black capitalize !font-[400]"
                        >
                            {!isCollapsed && "Data"}
                        </Typography>

                        {/* //? users */}
                        <Item
                            title="Users"
                            to="/admin/users"
                            icon={<GroupsIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        {/* //? invoice */}
                        <Item
                            title="Invoices"
                            to="/admin/invoices"
                            icon={<ReceiptOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h5"
                            sx={{ m: "15px 0 5px 25px" }}
                            className="!text-[18px] dark:text-white text-black capitalize !font-[400]"
                        >
                            {!isCollapsed && "Content"}
                        </Typography>

                        {/* //? create course */}
                        <Item
                            title="Create Course"
                            to="/admin/create-course"
                            icon={<VideoCallIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        {/* //? live courses */}
                        <Item
                            title="Live Courses"
                            to="/admin/courses"
                            icon={<OndemandVideoIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h5"
                            sx={{ m: "15px 0 5px 25px" }}
                            className="!text-[18px] dark:text-white text-black capitalize !font-[400]"
                        >
                            {!isCollapsed && "Customization"}
                        </Typography>

                        {/* //? hero */}
                        <Item
                            title="Hero"
                            to="/admin/hero"
                            icon={<WebIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        {/* //? faq */}
                        <Item
                            title="FAQ"
                            to="/faq"
                            icon={<QuizIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        {/* //? categories */}
                        <Item
                            title="Categories"
                            to="/admin/categories"
                            icon={<WysiwygIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h5"
                            sx={{ m: "15px 0 5px 25px" }}
                            className="!text-[18px] dark:text-white text-black capitalize !font-[400]"
                        >
                            {!isCollapsed && "Controllers"}
                        </Typography>

                        {/* //? manage team */}
                        <Item
                            title="Manage Team"
                            to="/admin/team"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            sx={{ m: "15px 0 5px 25px" }}
                            className="!text-[18px] dark:text-white text-black capitalize !font-[400]"
                        >
                            {!isCollapsed && "Analytics"}
                        </Typography>

                        {/* //? courses analytics */}
                        <Item
                            title="Courses Analytics"
                            to="/admin/courses-analytics"
                            icon={<BarChartOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        {/* //? orders analytics */}
                        <Item
                            title="Orders Analytics"
                            to="/admin/orders-analytics"
                            icon={<MapOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        {/* //? users analytics */}
                        <Item
                            title="Users Analytics"
                            to="/admin/users-analytics"
                            icon={<ManageHistoryIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            sx={{ m: "15px 0 5px 25px" }}
                            className="!text-[18px] dark:text-white text-black capitalize !font-[400]"
                        >
                            {!isCollapsed && "Extras"}
                        </Typography>

                        {/* //? settings */}
                        <Item
                            title="Settings"
                            to="/admin/settings"
                            icon={<SettingsIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <div onClick={logoutHandler}>
                            {/* //? logout */}
                            <Item
                                title="Logout"
                                to="/"
                                icon={<ExitToAppIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        </div>
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default AdminSidebar;
