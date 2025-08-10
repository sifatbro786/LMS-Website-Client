"use client";

import Heading from "../utils/Heading";
import AdminSidebar from "../components/admin/sidebar/AdminSidebar";
// import AdminProtected from "../hooks/adminProtected";
import DashboardHero from "../components/admin/DashboardHero";

const AdminPage = () => {
    return (
        <>
            {/* <AdminProtected> */}
                <Heading
                    title="ELearning | Admin"
                    description="ELearning is a platform for students to learn and get help from teachers."
                    keywords="Programming, Learn, LMS, React, Redux, Graphic Design, MERN, Website, UI/UX"
                />
                <div className="flex h-[200vh]">
                    {/* //? Sidebar */}
                    <div className="1500px:w-[16%] w-1/5">
                        <AdminSidebar />
                    </div>

                    {/* //? Content */}
                    <div className="w-[85%]">
                        <DashboardHero/>
                    </div>
                </div>
            {/* </AdminProtected> */}
        </>
    );
};
export default AdminPage;
