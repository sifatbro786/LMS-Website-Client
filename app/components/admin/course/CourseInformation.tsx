"use client";

import { styles } from "@/app/styles/style";
import Image from "next/image";
import { FC, useState } from "react";

type props = {
    courseInfo: any;
    setCourseInfo: (courseInfo: any) => void;
    active: number;
    setActive: (active: number) => void;
};

const CourseInformation: FC<props> = ({ courseInfo, setCourseInfo, active, setActive }) => {
    const [dragging, setDragging] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setActive(active + 1);
    };

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setCourseInfo({ ...courseInfo, thumbnail: reader.result });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e: any) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e: any) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleDrop = (e: any) => {
        e.preventDefault();
        setDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setCourseInfo({ ...courseInfo, thumbnail: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="w-[80%] h-full m-auto pt-24">
            <form onSubmit={handleSubmit}>
                {/* //? course name */}
                <div>
                    <label htmlFor="name" className={`${styles.label}`}>
                        Course Name
                    </label>
                    <input
                        type="text"
                        name=""
                        id="name"
                        required
                        value={courseInfo.name}
                        onChange={(e: any) =>
                            setCourseInfo({ ...courseInfo, name: e.target.value })
                        }
                        placeholder="Course Name"
                        className={`${styles.input}`}
                    />
                </div>
                <br />

                {/* //? course description */}
                <div className="mb-5">
                    <label htmlFor="description" className={`${styles.label}`}>
                        Course Description
                    </label>
                    <textarea
                        name=""
                        id="description"
                        value={courseInfo.description}
                        onChange={(e: any) =>
                            setCourseInfo({ ...courseInfo, description: e.target.value })
                        }
                        cols={30}
                        rows={8}
                        placeholder="Write something amazing..."
                        className={`${styles.input} !h-min !py-2`}
                    />
                </div>

                <div className="w-full flex justify-between">
                    {/* //? price */}
                    <div className="w-[45%]">
                        <label htmlFor="price" className={`${styles.label}`}>
                            Course Price
                        </label>
                        <input
                            type="number"
                            name=""
                            id="price"
                            value={courseInfo.price}
                            onChange={(e: any) =>
                                setCourseInfo({ ...courseInfo, price: e.target.value })
                            }
                            placeholder="30"
                            className={`${styles.input}`}
                        />
                    </div>

                    {/* //? estimated price */}
                    <div className="w-1/2">
                        <label htmlFor="estimatedPrice" className={`${styles.label} w-1/2`}>
                            Estimated Price (optional)
                        </label>
                        <input
                            type="number"
                            name=""
                            id="estimatedPrice"
                            value={courseInfo.estimatedPrice}
                            onChange={(e: any) =>
                                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
                            }
                            placeholder="70"
                            className={`${styles.input}`}
                        />
                    </div>
                </div>
                <br />
                {/* //? tags */}
                <div>
                    <label htmlFor="tags" className={`${styles.label}`}>
                        Course Tags
                    </label>
                    <input
                        type="text"
                        name=""
                        id="tags"
                        value={courseInfo.tags}
                        onChange={(e: any) =>
                            setCourseInfo({ ...courseInfo, tags: e.target.value })
                        }
                        placeholder="react, next, tailwind, etc..."
                        className={`${styles.input}`}
                    />
                </div>

                <br />
                <div className="w-full flex justify-between">
                    {/* //? course level */}
                    <div className="w-[45%]">
                        <label htmlFor="level" className={`${styles.label}`}>
                            Course Level
                        </label>
                        <input
                            type="text"
                            name=""
                            id="level"
                            value={courseInfo.level}
                            onChange={(e: any) =>
                                setCourseInfo({ ...courseInfo, level: e.target.value })
                            }
                            placeholder="Beginner/Intermediate/Expert"
                            className={`${styles.input}`}
                        />
                    </div>

                    {/* //? demo url */}
                    <div className="w-1/2">
                        <label htmlFor="demoUrl" className={`${styles.label} w-1/2`}>
                            Demo Url
                        </label>
                        <input
                            type="text"
                            name=""
                            id="demoUrl"
                            value={courseInfo.demoUrl}
                            onChange={(e: any) =>
                                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
                            }
                            placeholder="ee4563kl"
                            className={`${styles.input}`}
                        />
                    </div>
                </div>
                <br />

                <div className="w-full">
                    <input
                        type="file"
                        accept="image/*"
                        id="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <label
                        htmlFor="file"
                        className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
                            dragging ? "bg-blue-500" : "bg-transparent"
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {courseInfo.thumbnail ? (
                            <Image
                                src={courseInfo.thumbnail}
                                alt="thumbnail"
                                width={100}
                                height={100}
                                className="w-full max-h-full object-cover"
                            />
                        ) : (
                            <span className="text-black dark:text-white">
                                Drag and drop your thumbnail here or click to upload
                            </span>
                        )}
                    </label>
                </div>
                <br />

                <div className="w-full flex items-center justify-end">
                    <input
                        type="submit"
                        value="Next"
                        className="w-full 800px:w-[180px] h-10 bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer "
                    />
                </div>
                <br />
                <br />
            </form>
        </div>
    );
};

export default CourseInformation;
