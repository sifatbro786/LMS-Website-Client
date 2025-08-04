import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from "react-icons/ai";
import { styles } from "../../../app/styles/style";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

type LoginProps = {
    setRoute: (route: string) => void;
    setOpen: (open: boolean) => void;
};

const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email!").required("Please enter your email!"),
    password: Yup.string()
        .required("Please enter your password!")
        .min(6, "Password must be at least 6 characters!"),
});

const Login: FC<LoginProps> = ({ setRoute, setOpen }) => {
    const [login, { isLoading, isSuccess, error }] = useLoginMutation();
    const [show, setShow] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {
            await login({ email, password });
        },
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("Login successful!");
            setOpen(false);
        }

        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            }
        }
    }, [isSuccess, error, setRoute, setOpen]);

    const { errors, touched, values, handleChange, handleSubmit } = formik;

    return (
        <div className="w-full">
            <h1 className={`${styles.title}`}>Login with ELearning</h1>
            <form onSubmit={handleSubmit}>
                {/* //? Email */}
                <div className="mt-4">
                    <label htmlFor="email" className={`${styles.label}`}>
                        Enter your email
                    </label>
                    <input
                        type="email"
                        name=""
                        id="email"
                        value={values.email}
                        onChange={handleChange}
                        placeholder="mail@gmail.com"
                        className={`${errors.email && touched.email && "border-red-500"} ${
                            styles.input
                        }`}
                    />

                    {errors.email && touched.email && (
                        <span className="text-red-500 text-sm pt-2 block">{errors.email}</span>
                    )}
                </div>

                {/* //? Password */}
                <div className="w-full mt-5 relative mb-1">
                    <label htmlFor="password" className={`${styles.label}`}>
                        Enter your password
                    </label>
                    <input
                        type={!show ? "text" : "password"}
                        name="password"
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                        placeholder="password!@3%"
                        className={`${errors.password && touched.password && "border-red-500"} ${
                            styles.input
                        }`}
                    />
                    {show ? (
                        <AiOutlineEyeInvisible
                            className="absolute right-2 bottom-2.5 z-10 cursor-pointer text-black dark:text-white"
                            size={22}
                            onClick={() => setShow(!show)}
                        />
                    ) : (
                        <AiOutlineEye
                            className="absolute right-2 bottom-2.5 z-10 cursor-pointer text-black dark:text-white"
                            size={22}
                            onClick={() => setShow(!show)}
                        />
                    )}

                    {errors.password && touched.password && (
                        <span className="text-red-500 text-sm pt-2 block">{errors.password}</span>
                    )}
                </div>

                {/* //? submit button */}
                <div className="w-full mt-5">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`${styles.button} ${isLoading && "cursor-not-allowed"}`}
                    >
                        {isLoading ? "Loading..." : "Login"}
                    </button>
                </div>
                <br />
                <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
                    or login with
                </h5>
                <hr className="my-3 border-gray-300 dark:border-gray-500" />

                {/* //? Social login */}
                <div className="flex items-center justify-center my-3">
                    <FcGoogle size={30} className="cursor-pointer mr-2" onClick={() => signIn("google")} />
                    <AiFillGithub
                        size={30}
                        className="cursor-pointer ml-2 text-black dark:text-white"
                        onClick={() => signIn("github")}
                    />
                </div>
                <h5 className="text-center pt-4 pb-2 font-Poppins text-[14px] text-black dark:text-white">
                    Not have any account?{" "}
                    <span
                        className="text-[#2190ff] pl-1 cursor-pointer"
                        onClick={() => setRoute("Sign-Up")}
                    >
                        SignUp
                    </span>
                </h5>
            </form>
        </div>
    );
};
export default Login;
