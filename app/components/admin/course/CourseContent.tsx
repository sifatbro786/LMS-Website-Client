"use client";

import { styles } from "@/app/styles/style";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type Props = {
    courseContentData: any;
    setCourseContentData: React.Dispatch<React.SetStateAction<any>>;
    active: number;
    setActive: React.Dispatch<React.SetStateAction<number>>;
    handleSubmit: () => void;
};

const CourseContent: FC<Props> = ({
    courseContentData,
    setCourseContentData,
    active,
    setActive,
    handleSubmit: handleCourseSubmit,
}) => {
    const [isCollapsed, setIsCollapsed] = useState(Array(courseContentData.length).fill(false));
    const [activeSection, setActiveSection] = useState(1);

    const handleSubmit = (e: any) => {
        e.preventDefault();
    };

    const handleCollapseToggle = (index: number) => {
        const updatedIsCollapsed = [...isCollapsed];
        updatedIsCollapsed[index] = !updatedIsCollapsed[index];
        setIsCollapsed(updatedIsCollapsed);
    };

    const handleRemoveLink = (index: number, linkIndex: number) => {
        const updatedData = [...courseContentData];
        updatedData[index].links.splice(linkIndex, 1);
        setCourseContentData(updatedData);
    };

    const handleAddLink = (index: number) => {
        const updatedData = [...courseContentData];
        updatedData[index].links.push({ title: "", url: "" });
        setCourseContentData(updatedData);
    };

    const newContentHandler = (item: any) => {
        if (
            item.title === "" ||
            item.description === "" ||
            item.videoUrl === "" ||
            item.links[0].title === "" ||
            item.links[0].url === ""
        ) {
            toast.error("Please fill all the fields first!");
        } else {
            let newVideoSection = "";

            if (courseContentData.length > 0) {
                const lastVideoSection =
                    courseContentData[courseContentData.length - 1].videoSection;

                if (lastVideoSection) {
                    newVideoSection = lastVideoSection;
                }
            }
            const newContent = {
                videoUrl: "",
                title: "",
                description: "",
                videoSection: newVideoSection,
                links: [
                    {
                        title: "",
                        url: "",
                    },
                ],
            };

            setCourseContentData([...courseContentData, newContent]);
        }
    };

    const addNewSection = () => {
        if (
            courseContentData[courseContentData.length - 1].title === "" ||
            courseContentData[courseContentData.length - 1].description === "" ||
            courseContentData[courseContentData.length - 1].videoUrl === "" ||
            courseContentData[courseContentData.length - 1].links[0].title === "" ||
            courseContentData[courseContentData.length - 1].links[0].url === ""
        ) {
            toast.error("Please fill all the fields first!");
        } else {
            setActiveSection(activeSection + 1);
            const newContent = {
                videoUrl: "",
                title: "",
                description: "",
                videoSection: `Untitled Section ${activeSection}`,
                links: [
                    {
                        title: "",
                        url: "",
                    },
                ],
            };

            setCourseContentData([...courseContentData, newContent]);
        }
    };

    const prevButton = () => {
        setActive(active - 1);
    };

    const handleOptions = () => {
        if (
            courseContentData[courseContentData.length - 1].title !== "" &&
            courseContentData[courseContentData.length - 1].description !== "" &&
            courseContentData[courseContentData.length - 1].videoUrl !== "" &&
            courseContentData[courseContentData.length - 1].links[0].title !== "" &&
            courseContentData[courseContentData.length - 1].links[0].url !== ""
        ) {
            setActive(active + 1);
            handleCourseSubmit();
        } else {
            toast.error("Please fill all the fields before moving to the next step.");
        }
    };

    return (
        <div className="w-[80%] m-auto min-h-[100vh] pt-24 block">
            <form onSubmit={handleSubmit}>
                {courseContentData.map((item: any, index: number) => {
                    const showSectionInput =
                        index === 0 ||
                        item.videoSection !== courseContentData[index - 1].videoSection;

                    return (
                        <div
                            key={index}
                            className={`w-full dark:bg-[#cdc8c817] bg-gray-100 p-4 ${
                                showSectionInput ? "mt-10" : "mb-0"
                            }`}
                        >
                            {showSectionInput && (
                                <>
                                    <div className="flex items-center w-full">
                                        <input
                                            type="text"
                                            className={`text-[20px] font-Poppins cursor-pointer text-black dark:text-white bg-transparent outline-none ${
                                                item.videoSection === "Untitled Section"
                                                    ? "w-[170px]"
                                                    : "w-min"
                                            }`}
                                            value={item.videoSection}
                                            onChange={(e) => {
                                                const updatedData = [...courseContentData];
                                                updatedData[index].videoSection = e.target.value;
                                                setCourseContentData(updatedData);
                                            }}
                                        />
                                        <BsPencil className="text-black dark:text-white cursor-pointer" />
                                    </div>
                                    <br />
                                </>
                            )}
                            <div className="w-full flex items-center justify-between my-0 ">
                                {isCollapsed[index] ? (
                                    <>
                                        {item?.title ? (
                                            <p className="font-Poppins text-black dark:text-white">
                                                {index + 1}. {item?.title}
                                            </p>
                                        ) : (
                                            <></>
                                        )}
                                    </>
                                ) : (
                                    <div></div>
                                )}

                                {/* //? arrow button for collapsed video content */}
                                <div className="flex items-center">
                                    <AiOutlineDelete
                                        className={`text-black dark:text-white text-[20px] mr-2 ${
                                            index > 0 ? "cursor-pointer" : "cursor-no-drop"
                                        }`}
                                        onClick={() => {
                                            if (index > 0) {
                                                const updatedData = [...courseContentData];
                                                updatedData.splice(index, 1);
                                                setCourseContentData(updatedData);
                                            }
                                        }}
                                    />
                                    <MdOutlineKeyboardArrowDown
                                        fontSize="large"
                                        className="text-black dark:text-white"
                                        style={{
                                            transform: isCollapsed[index]
                                                ? "rotate(180deg)"
                                                : "rotate(0deg)",
                                        }}
                                        onClick={() => handleCollapseToggle(index)}
                                    />
                                </div>
                            </div>
                            {!isCollapsed[index] && (
                                <>
                                    {/* //? video title */}
                                    <div className="my-3">
                                        <label htmlFor="videoTitle" className={`${styles.label}`}>
                                            Video Title
                                        </label>
                                        <input
                                            type="text"
                                            id="videoTitle"
                                            placeholder="Video Title"
                                            className={`${styles.input}`}
                                            value={item.title}
                                            onChange={(e) => {
                                                const updatedData = [...courseContentData];
                                                updatedData[index].title = e.target.value;
                                                setCourseContentData(updatedData);
                                            }}
                                        />
                                    </div>

                                    {/* //? video url */}
                                    <div className="mb-3">
                                        <label htmlFor="videoUrl" className={`${styles.label}`}>
                                            Video Url
                                        </label>
                                        <input
                                            type="text"
                                            id="videoUrl"
                                            placeholder="sh6654sdf"
                                            className={`${styles.input}`}
                                            value={item.videoUrl}
                                            onChange={(e) => {
                                                const updatedData = [...courseContentData];
                                                updatedData[index].videoUrl = e.target.value;
                                                setCourseContentData(updatedData);
                                            }}
                                        />
                                    </div>

                                    {/* //? video description */}
                                    <div className="mb-3">
                                        <label htmlFor="description" className={`${styles.label}`}>
                                            Video Description
                                        </label>
                                        <textarea
                                            rows={8}
                                            cols={30}
                                            id="description"
                                            placeholder="Description"
                                            className={`${styles.input} !h-min py-2`}
                                            value={item.description}
                                            onChange={(e) => {
                                                const updatedData = [...courseContentData];
                                                updatedData[index].description = e.target.value;
                                                setCourseContentData(updatedData);
                                            }}
                                        />
                                        <br />
                                        <br />
                                        <br />
                                    </div>
                                    {item?.links.map((link: any, linkIndex: number) => (
                                        <div className="mb-3 block" key={linkIndex}>
                                            <div className="w-full flex items-center justify-between">
                                                <label className={`${styles.label}`}>
                                                    Link {linkIndex + 1}
                                                </label>
                                                <AiOutlineDelete
                                                    className={`text-black dark:text-white text-[20px] ${
                                                        linkIndex === 0
                                                            ? "cursor-no-drop"
                                                            : "cursor-pointer"
                                                    }`}
                                                    onClick={() =>
                                                        linkIndex === 0
                                                            ? null
                                                            : handleRemoveLink(index, linkIndex)
                                                    }
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Source Code... (link title)"
                                                className={`${styles.input}`}
                                                value={link.title}
                                                onChange={(e) => {
                                                    const updatedData = [...courseContentData];
                                                    updatedData[index].links[linkIndex].title =
                                                        e.target.value;
                                                    setCourseContentData(updatedData);
                                                }}
                                            />
                                            <input
                                                type="url"
                                                placeholder="Source Code... (link url)"
                                                className={`${styles.input} mt-6`}
                                                value={link.url}
                                                onChange={(e) => {
                                                    const updatedData = [...courseContentData];
                                                    updatedData[index].links[linkIndex].url =
                                                        e.target.value;
                                                    setCourseContentData(updatedData);
                                                }}
                                            />
                                        </div>
                                    ))}
                                    <br />

                                    {/* //? add link */}
                                    <div className="inline-block mb-4">
                                        <p
                                            className="flex items-center text-[18px] text-black dark:text-white cursor-pointer "
                                            onClick={() => handleAddLink(index)}
                                        >
                                            <BsLink45Deg className="text-black dark:text-white mr-2" />{" "}
                                            Add Link
                                        </p>
                                    </div>
                                </>
                            )}
                            <br />

                            {/* //? add new content */}
                            {index === courseContentData.length - 1 && (
                                <div>
                                    <p
                                        className="flex items-center text-[18px] text-black dark:text-white cursor-pointer "
                                        onClick={() => newContentHandler(item)}
                                    >
                                        <AiOutlinePlusCircle className="text-black dark:text-white mr-2" />{" "}
                                        Add New Content
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
                <br />
                <div
                    className="w-full flex items-center text-[20px] cursor-pointer text-black dark:text-white "
                    onClick={() => addNewSection()}
                >
                    <AiOutlinePlusCircle className="text-black dark:text-white mr-2" /> Add New
                    Section
                </div>
            </form>
            <br />

            {/* //? buttons */}
            <div className="w-full flex items-center justify-between">
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-10 bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer"
                    onClick={() => prevButton()}
                >
                    Prev
                </div>
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-10 bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer"
                    onClick={() => handleOptions()}
                >
                    Next
                </div>
            </div>

            <br />
            <br />
            <br />
        </div>
    );
};
export default CourseContent;
