"use client";

import { useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import HeroSection from "./components/Route/Hero";

const HomePage = () => {
    const [open, setOpen] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [activeItem, setActiveItem] = useState(0);
    const [route, setRoute] = useState("Login");

    return (
        <div>
            <Heading
                title="ELearning | Home"
                description="ELearning is a platform for students to learn and get help from teachers."
                keywords="Programming, Learn, LMS, React, Redux, Graphic Design, MERN, Website, UI/UX"
            />
            <Header open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} route={route} />
            <HeroSection />
        </div>
    );
};

export default HomePage;
