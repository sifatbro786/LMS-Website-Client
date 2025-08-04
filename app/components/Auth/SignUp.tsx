import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from "react-icons/ai";
import { styles } from "../../../app/styles/style";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type SignUpProps = {
    setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
    name: Yup.string().required("Please enter your name!"),
    email: Yup.string().email("Invalid email!").required("Please enter your email!"),
    password: Yup.string()
        .required("Please enter your password!")
        .min(6, "Password must be at least 6 characters!"),
});

// check if error is of type FetchBaseQueryError
const isFetchBaseQueryError = (err: unknown): err is FetchBaseQueryError =>
    typeof err === "object" && err !== null && "status" in err;

const SignUp: FC<SignUpProps> = ({ setRoute }) => {
    const [show, setShow] = useState(false);
    const [register, { isSuccess, isLoading, error, data }] = useRegisterMutation();

    useEffect(() => {
        if (isSuccess) {
            const message = (data as any)?.message || "Registration successful!";
            toast.success(message);
            setRoute("Verification");
        }

        if (error) {
            if (isFetchBaseQueryError(error)) {
                const errData = error.data as { message?: string } | undefined;
                const msg = errData?.message || "Registration failed.";
                toast.error(msg);
            } else if ("message" in (error as object)) {
                toast.error((error as any).message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    }, [isSuccess, error, data, setRoute]);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema: schema,
        onSubmit: async ({ name, email, password }) => {
            await register({ name, email, password });
        },
    });

    const { errors, touched, values, handleChange, handleSubmit } = formik;

    return (
        <div className="w-full">
            <h1 className={`${styles.title}`}>Join with ELearning</h1>
            <form onSubmit={handleSubmit}>
                {/* //? name */}
                <div className="mt-4">
                    <label htmlFor="name" className={`${styles.label}`}>
                        Enter your name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={values.name}
                        onChange={handleChange}
                        placeholder="john"
                        className={`${errors.name && touched.name ? "border-red-500" : ""} ${
                            styles.input
                        }`}
                    />
                    {errors.name && touched.name && (
                        <span className="text-red-500 text-sm pt-2 block">{errors.name}</span>
                    )}
                </div>

                {/* //? email */}
                <div className="mt-4">
                    <label htmlFor="email" className={`${styles.label}`}>
                        Enter your email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={values.email}
                        onChange={handleChange}
                        placeholder="mail@gmail.com"
                        className={`${errors.email && touched.email ? "border-red-500" : ""} ${
                            styles.input
                        }`}
                    />
                    {errors.email && touched.email && (
                        <span className="text-red-500 text-sm pt-2 block">{errors.email}</span>
                    )}
                </div>

                {/* //? password */}
                <div className="w-full mt-5 relative mb-1">
                    <label htmlFor="password" className={`${styles.label}`}>
                        Enter your password
                    </label>
                    <input
                        type={show ? "text" : "password"}
                        name="password"
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                        placeholder="password!@3%"
                        className={`${
                            errors.password && touched.password ? "border-red-500" : ""
                        } ${styles.input}`}
                    />
                    {show ? (
                        <AiOutlineEyeInvisible
                            className="absolute right-2 bottom-2.5 z-10 cursor-pointer text-black dark:text-white"
                            size={22}
                            onClick={() => setShow(false)}
                        />
                    ) : (
                        <AiOutlineEye
                            className="absolute right-2 bottom-2.5 z-10 cursor-pointer text-black dark:text-white"
                            size={22}
                            onClick={() => setShow(true)}
                        />
                    )}
                </div>
                {errors.password && touched.password && (
                    <span className="text-red-500 text-sm pt-2 block">{errors.password}</span>
                )}

                {/* //? submit */}
                <div className="w-full mt-5">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`${styles.button} ${isLoading && "cursor-not-allowed"}`}
                    >
                        {isLoading ? "Signing up..." : "Sign Up"}
                    </button>
                </div>

                <br />
                <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
                    or login with
                </h5>
                <hr className="my-3 border-gray-300 dark:border-gray-500" />

                {/* //? social */}
                <div className="flex items-center justify-center my-3">
                    <FcGoogle size={30} className="cursor-pointer mr-2" />
                    <AiFillGithub
                        size={30}
                        className="cursor-pointer ml-2 text-black dark:text-white"
                    />
                </div>

                <h5 className="text-center pt-4 pb-2 font-Poppins text-[14px] text-black dark:text-white">
                    Already have an account?{" "}
                    <span
                        className="text-[#2190ff] pl-1 cursor-pointer"
                        onClick={() => setRoute("Login")}
                    >
                        Login
                    </span>
                </h5>
            </form>
        </div>
    );
};

export default SignUp;
