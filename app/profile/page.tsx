"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import { useSelector } from "react-redux";
import Profile from "../components/profile/Profile";

// type Props = {};

const ProfilePage: React.FC = () => {
    const [open, setOpen] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [activeItem, setActiveItem] = useState(5);
    const [route, setRoute] = useState("Login");

    const { user } = useSelector((state: any) => state.auth);

    return (
        <div>
            <Protected>
                <Heading
                    title={`${user?.name} | Profile - ELearning`}
                    description="ELearning is a platform for students to learn and get help from teachers."
                    keywords="Programming, Learn, LMS, React, Redux, Graphic Design, MERN, Website, UI/UX"
                />
                <Header
                    open={open}
                    setOpen={setOpen}
                    activeItem={activeItem}
                    setRoute={setRoute}
                    route={route}
                />
                <Profile user={user} />
            </Protected>
        </div>
    );
};

export default ProfilePage;
