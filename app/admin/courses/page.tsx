"use client";

import AdminSidebar from "../../../app/components/admin/sidebar/AdminSidebar";
import AdminProtected from "../../../app/hooks/adminProtected";
import Heading from "../../../app/utils/Heading";
import DashboardHero from "../../../app/components/admin/DashboardHero";
import AllCourses from "../../../app/components/admin/course/AllCourses";

const CoursesPage = () => {
    return (
        <div>
            <AdminProtected>
                <Heading
                    title="ELearning | All Courses"
                    description="ELearning is a platform for students to learn and get help from teachers."
                    keywords="Programming, Learn, LMS, React, Redux, Graphic Design, MERN, Website, UI/UX"
                />
                <div className="flex h-screen">
                    {/* //? Sidebar */}
                    <div className="1500px:w-[16%] w-1/5">
                        <AdminSidebar />
                    </div>

                    {/* //? Content */}
                    <div className="w-[85%]">
                        <DashboardHero />
                        <AllCourses />
                    </div>
                </div>
            </AdminProtected>
        </div>
    );
};
export default CoursesPage;
