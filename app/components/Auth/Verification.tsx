import { styles } from "@/app/styles/style";
import { useActivationMutation } from "@/redux/features/auth/authApi";
import React, { FC, useEffect, useRef, useState, KeyboardEvent, ClipboardEvent } from "react";
import { toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";

type VerificationProps = {
    setRoute: React.Dispatch<React.SetStateAction<string>>;
};

const Verification: FC<VerificationProps> = ({ setRoute }) => {
    const { token } = useSelector((state: any) => state.auth);
    const [activation, { isLoading, isSuccess, error }] = useActivationMutation();

    const [invalidError, setInvalidError] = useState<boolean>(false);
    const [digits, setDigits] = useState<string[]>(["", "", "", ""]);
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    useEffect(() => {
        if (isSuccess) {
            toast.success("Account Activated Successfully!");
            setRoute("Login");
        }

        if (error) {
            if (typeof error === "object" && "data" in error && (error as any).data?.message) {
                toast.error((error as any).data.message);
            } else {
                toast.error("An unexpected error occurred.");
                console.error(error);
            }
            setInvalidError(true);
        }
    }, [isSuccess, error, setRoute]);

    const verificationHandler = async () => {
        if (!token) {
            toast.error("No activation token found.");
            return;
        }
        const code = digits.join("");
        if (code.length !== 4 || /\D/.test(code)) {
            setInvalidError(true);
            toast.error("Enter a valid 4-digit code.");
            return;
        }

        await activation({
            activation_token: token,
            activation_code: code,
        });
    };

    const handleInputChange = (index: number, raw: string) => {
        setInvalidError(false);

        const digit = raw.replace(/\D/g, "").slice(0, 1);
        setDigits((prev) => {
            const copy = [...prev];
            copy[index] = digit;
            return copy;
        });

        if (digit && index < 3) {
            inputRefs[index + 1].current?.focus();
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !digits[index] && index > 0) {
            inputRefs[index - 1].current?.focus();
            setDigits((prev) => {
                const copy = [...prev];
                copy[index - 1] = "";
                return copy;
            });
            e.preventDefault();
        } else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs[index - 1].current?.focus();
            e.preventDefault();
        } else if (e.key === "ArrowRight" && index < 3) {
            inputRefs[index + 1].current?.focus();
            e.preventDefault();
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
        if (!paste) return;
        const newDigits = paste.split("").concat(Array(4).fill("")).slice(0, 4);
        setDigits(newDigits);

        const firstEmpty = newDigits.findIndex((d) => d === "");
        if (firstEmpty !== -1) {
            inputRefs[firstEmpty].current?.focus();
        } else {
            inputRefs[3].current?.focus();
        }
    };

    const allFilled = digits.every((d) => d !== "");

    return (
        <div>
            <h1 className={`${styles.title}`}>Verify Your Account</h1>
            <div className="w-full flex items-center justify-center mt-4 mb-8">
                <div className="w-[80px] h-[80px] rounded-full bg-[#497df2] flex items-center justify-center">
                    <VscWorkspaceTrusted size={40} />
                </div>
            </div>
            <div className="m-auto flex items-center justify-around mb-8">
                {digits.map((val, idx) => (
                    <input
                        key={idx}
                        ref={inputRefs[idx]}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={val}
                        onChange={(e) => handleInputChange(idx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(idx, e)}
                        onPaste={handlePaste}
                        aria-label={`Digit ${idx + 1}`}
                        className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${
                            invalidError
                                ? "shake border-red-500"
                                : "dark:border-white border-[#0000004a]"
                        }`}
                        placeholder=""
                    />
                ))}
            </div>
            <div className="w-full flex justify-center">
                <button
                    className={`${styles.button} ${
                        (!allFilled || isLoading) && "cursor-not-allowed opacity-70"
                    }`}
                    onClick={verificationHandler}
                    disabled={!allFilled || isLoading}
                >
                    {isLoading ? "Verifying..." : "Verify OTP"}
                </button>
            </div>
            <h5 className="text-center pt-4 pb-2 font-Poppins text-[14px] text-black dark:text-white">
                Go back to login?{" "}
                <span
                    className="text-[#2190ff] pl-1 cursor-pointer"
                    onClick={() => setRoute("Login")}
                >
                    Login
                </span>
            </h5>
        </div>
    );
};

export default Verification;
