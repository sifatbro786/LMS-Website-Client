import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import HeroImage from "../../assets/banner-img-1.png";
import Client1 from "../../assets/client-1.jpg";
import Client2 from "../../assets/client-2.jpg";
import Client3 from "../../assets/client-3.jpg";

const HeroSection: FC = () => {
    return (
        <div className="w-full min-h-screen flex flex-col 1000px:flex-row items-center relative md:overflow-hidden">
            {/* //? Animated circle */}
            <div className="absolute top-[20px] 1000px:top-auto left-1.5 1100px:left-8 1500px:left-14 h-[30vh] w-[30vh] 1000px:h-[40vh] 1000px:w-[40vh] 1100px:h-[600px] 1100px:w-[600px] 1500px:h-[700px] 1500px:w-[700px] rounded-full hero_animation z-0" />

            {/* //? Image Section */}
            <div className="w-full 1000px:w-[40%] flex items-center justify-center 1000px:justify-end pt-[70px] 1000px:pt-0 z-10">
                <Image
                    src={HeroImage}
                    alt="Hero"
                    width={400}
                    height={400}
                    className="object-contain w-[80%] 1000px:w-[90%] 1100px:max-w-[90%] 1500px:max-w-[85%] h-auto z-10"
                />
            </div>

            {/* //? Text Section */}
            <div className="w-full 1000px:w-[60%] flex flex-col items-center 1000px:items-center text-center 1000px:text-left mt-[80px] 1000px:mt-0 z-10 px-4">
                <h2 className="dark:text-white text-[#000000c7] text-[28px] 400px:text-[32px] 800px:text-[38px] 1000px:text-[60px] 1200px:text-[70px] font-semibold font-Josefin py-2 leading-snug 1000px:leading-[75px] 1100px:w-[78%] 1500px:w-[60%] ">
                    Learn from the Best in the Industry
                </h2>

                <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-semibold text-[16px] 400px:text-[17px] 1000px:text-[18px] 1100px:w-[78%] 1500px:w-[55%] mt-2">
                    Join our ever-growing community and unlock your potential with expert-led online
                    courses.
                </p>

                {/* Search box */}
                <div className="relative w-full 1000px:w-[78%] 1500px:w-[55%] h-[50px] mt-6">
                    <input
                        type="search"
                        placeholder="Search Courses..."
                        className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] text-[#0000004e] dark:text-[#ffffffe6] rounded-[5px] px-3 w-full h-full outline-none text-[16px] 400px:text-[18px] 1000px:text-[20px] font-[500] font-Josefin"
                    />
                    <div className="absolute top-0 right-0 w-[50px] h-[50px] bg-[#39c1f3] flex items-center justify-center rounded-r-[5px] cursor-pointer">
                        <svg
                            className="text-white"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" />
                        </svg>
                    </div>
                </div>

                {/* Clients + CTA */}
                <div className="flex flex-col items-center 1000px:flex-row 1000px:items-center mt-6 w-full 1000px:w-[78%] 1500px:w-[55%] gap-4">
                    <div className="flex justify-center 1000px:justify-start">
                        <Image
                            src={Client1}
                            alt="client-1"
                            width={46}
                            height={46}
                            className="rounded-full"
                        />
                        <Image
                            src={Client2}
                            alt="client-2"
                            width={46}
                            height={46}
                            className="rounded-full -ml-5"
                        />
                        <Image
                            src={Client3}
                            alt="client-3"
                            width={46}
                            height={46}
                            className="rounded-full -ml-5"
                        />
                    </div>
                    <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] text-[16px] 800px:text-[18px] font-semibold text-center 1000px:text-left">
                        500K+ People already trusted us.{" "}
                        <Link
                            href="/courses"
                            className="dark:text-[#46e256] text-[crimson] underline block 400px:inline-block"
                        >
                            View Courses
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
