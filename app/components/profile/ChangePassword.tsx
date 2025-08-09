import { styles } from "@/app/styles/style";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

    const passwordChangeHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match.");
        } else {
            await updatePassword({ oldPassword, newPassword });
        }
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Password updated successfully!");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }

        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            }
        }
    }, [isSuccess, error]);
    return (
        <div className="w-full pl-7 px-2 800px:px-5 800px:pl-0">
            <h1 className="block text-[25px] 800px:text-[30px] font-Poppins font-medium text-center dark:text-white text-black pb-2">
                Change Password
            </h1>
            <div className="w-full">
                <form onSubmit={passwordChangeHandler} className="flex flex-col items-center">
                    {/* //? old password */}
                    <div className="w-full 800px:w-[60%] mt-5">
                        <label htmlFor="oldPassword" className="block dark:text-white text-black">
                            Enter your old password
                        </label>
                        <input
                            type="password"
                            className={`${styles.input} !w-[95%] mb-2 800px:mb-0`}
                            id="oldPassword"
                            required
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>

                    {/* //? new password */}
                    <div className="w-full 800px:w-[60%] mt-2">
                        <label htmlFor="newPassword" className="block dark:text-white text-black">
                            Enter your new password
                        </label>
                        <input
                            type="password"
                            className={`${styles.input} !w-[95%] mb-2 800px:mb-0`}
                            id="newPassword"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    {/* //? confirm password */}
                    <div className="w-full 800px:w-[60%] mt-2">
                        <label
                            htmlFor="confirmPassword"
                            className="block dark:text-white text-black"
                        >
                            Enter your confirm password
                        </label>
                        <input
                            type="password"
                            className={`${styles.input} !w-[95%] mb-2 800px:mb-0`}
                            id="confirmPassword"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        {/* //? button */}
                        <input
                            type="submit"
                            value="Update"
                            required
                            className={`w-[95%] h-10 border border-[#37a39a] text-center text-black dark:text-white rounded-[3px] cursor-pointer mt-4 800px:mt-8 `}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};
export default ChangePassword;
