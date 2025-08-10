"use client";

import DashboardHero from "../../components/admin/DashboardHero";
import AdminSidebar from "../../components/admin/sidebar/AdminSidebar";
import Heading from "../../utils/Heading";
import CreateCourse from "../../components/admin/course/CreateCourse";

const CreateCoursePage = () => {
    return (
        <div>
            <Heading
                title="ELearning | Create Course"
                description="ELearning is a platform for students to learn and get help from teachers."
                keywords="Programming, Learn, LMS, React, Redux, Graphic Design, MERN, Website, UI/UX"
            />
            <div className="flex">
                {/* //? Sidebar */}
                <div className="1500px:w-[16%] w-1/5">
                    <AdminSidebar />
                </div>

                {/* //? Content */}
                <div className="w-[85%]">
                    <DashboardHero />
                    <CreateCourse />
                </div>
            </div>
        </div>
    );
};

export default CreateCoursePage;
