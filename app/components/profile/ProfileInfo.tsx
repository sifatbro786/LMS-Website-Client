import Image from "next/image";
import React, { useEffect, useState } from "react";
import avatarDefault from "../../../public/avatar.png";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "@/app/styles/style";
import { useEditProfileMutation, useUpdateAvatarMutation } from "@/redux/features/user/userApi";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
    avatar: string | null;
    user: any;
};

const ProfileInfo: React.FC<Props> = ({ user, avatar }) => {
    const [name, setName] = useState(user?.name || "");
    const [loadUser, setLoadUser] = useState(false);
    const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });

    const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
    const [editProfile, { isSuccess: editSuccess, error: editError }] = useEditProfileMutation();

    const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        const fileReader = new FileReader();

        fileReader.onload = async () => {
            if (fileReader.readyState === 2) {
                const avatar = fileReader.result as string;
                await updateAvatar(avatar);
                window.location.reload();
            }
        };
        fileReader.readAsDataURL(file);
    };

    useEffect(() => {
        if (isSuccess) {
            setLoadUser(true);
            toast.success("Avatar updated successfully");
        }
        if (editSuccess) {
            setLoadUser(true);
            toast.success("Name updated successfully");
        }
        if (error || editError) {
            console.error(error);
        }
    }, [isSuccess, error, editSuccess, editError]);

    useEffect(() => {
        if (user?.name) {
            setName(user.name);
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedName = name.trim();
        if (trimmedName.length > 0) {
            await editProfile({ name: trimmedName });
            window.location.reload();
        } else {
            toast.error("Please enter your name");
        }
    };

    return (
        <>
            <div className="w-full flex justify-center">
                <div className="relative">
                    <Image
                        src={user?.avatar?.url || avatar || avatarDefault}
                        alt={user?.name}
                        width={120}
                        height={120}
                        className="w-[120px] h-[120px] object-cover border-[3px] border-[#37a39a] rounded-full"
                    />
                    <input
                        type="file"
                        name=""
                        id="avatar"
                        className="hidden"
                        onChange={imageHandler}
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                    />
                    <label htmlFor="avatar">
                        <div className="w-[30px] h-[30px] bg-slate-900 rounded-full flex items-center justify-center absolute bottom-2 right-2 cursor-pointer">
                            <AiOutlineCamera size={20} className="z-10" />
                        </div>
                    </label>
                </div>
            </div>
            <br />
            <br />
            <div className="w-full pl-6 800px:pl-10">
                <form onSubmit={handleSubmit}>
                    <div className="800px:w-[50%] m-auto block pb-4">
                        {/* //? Name */}
                        <div className="w-full">
                            <label htmlFor="name" className="block dark:text-white text-black">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        {/* //? Email */}
                        <div className="w-full pt-5">
                            <label className="block dark:text-white text-black">Email Address</label>
                            <input
                                type="text"
                                className={`${styles.input} !w-[95%] mb-1 800px:mb-0 cursor-not-allowed`}
                                readOnly
                                value={user?.email}
                            />
                        </div>

                        {/* //? submit */}
                        <input
                            type="submit"
                            value="Update"
                            required
                            className={`w-full 800px:w-[250px] h-10 border border-[#37a39a] text-center text-black dark:text-white rounded-[3px] cursor-pointer mt-8 `}
                        />
                    </div>
                </form>
            </div>
        </>
    );
};
export default ProfileInfo;
