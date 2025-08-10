"use client";

import { styles } from "@/app/styles/style";
import { FC } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import toast from "react-hot-toast";

type Props = {
    benefits: { title: string }[];
    setBenefits: React.Dispatch<React.SetStateAction<{ title: string }[]>>;
    prerequisites: { title: string }[];
    setPrerequisites: React.Dispatch<React.SetStateAction<{ title: string }[]>>;
    active: number;
    setActive: React.Dispatch<React.SetStateAction<number>>;
};

const CourseData: FC<Props> = ({
    benefits,
    setBenefits,
    prerequisites,
    setPrerequisites,
    active,
    setActive,
}) => {
    const handleBenefitsChange = (index: number, value: any) => {
        const updatedBenefits = [...benefits];
        updatedBenefits[index].title = value;
        setBenefits(updatedBenefits);
    };

    const handlePrerequisitesChange = (index: number, value: any) => {
        const updatedPrerequisites = [...prerequisites];
        updatedPrerequisites[index].title = value;
        setPrerequisites(updatedPrerequisites);
    };

    const handleAddBenefits = () => {
        setBenefits([...benefits, { title: "" }]);
    };

    const handleAddPrerequisites = () => {
        setPrerequisites([...prerequisites, { title: "" }]);
    };

    const prevButton = () => {
        setActive(active - 1);
    };

    const handleOptions = () => {
        if (
            benefits[benefits.length - 1]?.title !== "" &&
            prerequisites[prerequisites.length - 1]?.title !== ""
        ) {
            setActive(active + 1);
        } else {
            toast.error("Please fill all the fields before moving to the next step.");
        }
    };

    return (
        <div className="w-[80%] m-auto h-screen pt-24 block">
            {/* //? Benefits */}
            <div>
                <label htmlFor="benefits" className={`${styles.label} text-[20px]`}>
                    What are the benefits for students of this course?
                </label>
                <br />
                {benefits.map((benefit: any, index: number) => (
                    <input
                        type="text"
                        key={index}
                        id="benefits"
                        name="benefits"
                        placeholder="Enter a benefit..."
                        className={`${styles.input} my-2`}
                        required
                        value={benefit.title}
                        onChange={(e) => handleBenefitsChange(index, e.target.value)}
                    />
                ))}
                <AddCircleIcon
                    style={{ margin: "10px 0px", width: "30px", cursor: "pointer" }}
                    onClick={handleAddBenefits}
                />
            </div>

            {/* //? prerequisites */}
            <div>
                <label htmlFor="prerequisites" className={`${styles.label} text-[20px]`}>
                    What are the prerequisites for starting this course?
                </label>
                <br />
                {prerequisites.map((prerequisite: any, index: number) => (
                    <input
                        type="text"
                        key={index}
                        id="prerequisites"
                        name="prerequisites"
                        placeholder="you need a basic knowledge of..."
                        className={`${styles.input} my-2`}
                        required
                        value={prerequisite.title}
                        onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
                    />
                ))}
                <AddCircleIcon
                    style={{ margin: "10px 0px", width: "30px", cursor: "pointer" }}
                    onClick={handleAddPrerequisites}
                />
            </div>

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
        </div>
    );
};

export default CourseData;
