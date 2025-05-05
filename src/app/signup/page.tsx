"use client";

import TextIconButton from "@/components/Buttons/TextIconButton";
import {
    Apple,
    FacebookColor,
    Google,
    Spotify,
} from "@/components/icons/Icons";
import TextInput from "@/components/TextInput/TextInput";
import { signup } from "@/lib/callApi";
import { ApiResponse } from "@/types/api";
import { AuthUser, RegisterUserDto } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const signupSchema = z
    .object({
        username: z.string().min(1, "Please enter your username."),
        email: z
            .string()
            .min(1, "Please enter your email.")
            .email("Invalid email address (name@domain.com)."),
        password: z
            .string()
            .min(1, "Please enter your password.")
            .min(8, "Password must be at least 8 characters long."),
        confirm_password: z
            .string()
            .min(1, "Please enter your confirm password."),
    })
    .superRefine(({ confirm_password, password, username }, ctx) => {
        // Password complexity checks
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(
            password,
        );
        const noSpecialChar = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(
            username,
        );
        if (noSpecialChar) {
            ctx.addIssue({
                code: "custom",
                message: "Username must not contain special characters.",
                path: ["username"],
            });
        }
        // Individual checks with separate error messages
        if (!hasUppercase) {
            ctx.addIssue({
                code: "custom",
                message:
                    "Password must contain at least one uppercase letter (A-Z).",
                path: ["password"],
            });
        }
        if (!hasLowercase) {
            ctx.addIssue({
                code: "custom",
                message:
                    "Password must contain at least one lowercase letter (a-z).",
                path: ["password"],
            });
        }
        if (!hasNumber) {
            ctx.addIssue({
                code: "custom",
                message: "Password must contain at least one number (0-9).",
                path: ["password"],
            });
        }
        if (!hasSpecialChar) {
            ctx.addIssue({
                code: "custom",
                message:
                    "Password must contain at least one special character.",
                path: ["password"],
            });
        }
        // Check password match
        if (confirm_password !== password) {
            ctx.addIssue({
                code: "custom",
                message: "Passwords do not match.",
                path: ["password_confirmation"],
            });
        }
    });

type RawSignupInput = z.infer<typeof signupSchema>;

export default function Signup() {
    const MySwal = withReactContent(Swal);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<RawSignupInput>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: RawSignupInput) => {
        const signupData: RegisterUserDto = {
            username: data.username,
            email: data.email,
            password: data.password,
            confirm_password: data.confirm_password,
        };

        const signupResponseData: ApiResponse<AuthUser> =
            await signup(signupData);

        const Toast = MySwal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = MySwal.stopTimer;
                toast.onmouseleave = MySwal.resumeTimer;
            },
        });

        if (signupResponseData.errors) {
            Toast.fire({
                icon: "error",
                title: "Registration failed",
            });
            // Xử lý lỗi từ API và gán vào form
            Object.entries(signupResponseData.errors).forEach(
                ([field, message]) => {
                    setError(field as keyof RawSignupInput, {
                        type: "manual",
                        message,
                    });
                },
            );
        } else {
            Toast.fire({
                icon: "success",
                title: "Registration successful",
            });
        }
    };

    return (
        <div className="flex min-h-screen justify-center bg-(--main-color)">
            <div className="flex w-97 flex-col items-center px-8">
                <div className="mb-10 flex flex-col items-center pt-8">
                    <Spotify className="h-10 w-10" />
                    <h1 className="pt-6 text-center text-3xl font-bold md:text-5xl/15">
                        Sign up to <br /> start listening
                    </h1>
                </div>
                <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2">
                        <TextInput
                            label="Username"
                            placeholder="Username"
                            register={register("username")}
                            error={errors.username?.message}
                        />
                        <TextInput
                            label="Email address"
                            placeholder="name@domain.com"
                            register={register("email")}
                            error={errors.email?.message}
                        />
                        <TextInput
                            label="Password"
                            placeholder="Password"
                            isPassword={true}
                            register={register("password")}
                            error={errors.password?.message}
                        />
                        <TextInput
                            label="Confirm password"
                            placeholder="Confirm password"
                            isPassword={true}
                            register={register("confirm_password")}
                            error={errors.confirm_password?.message}
                        />
                        <div className="mt-4 mb-2 rounded-full p-1 transition-all duration-200 focus-within:ring-3 hover:scale-105 active:scale-100">
                            <button
                                type="submit"
                                className="w-full cursor-pointer rounded-full bg-(--green-color) px-8 py-3 font-bold text-(--primary-color) outline-none hover:brightness-115 active:brightness-90"
                            >
                                Sign up
                            </button>
                        </div>
                    </div>
                </form>
                <div className="my-5 flex w-full items-center justify-center">
                    <hr className="w-full border-[--secondary-text-color]" />
                    <span className="-translate-y-0.5 px-3 text-sm font-medium">
                        or
                    </span>
                    <hr className="w-full border-[--secondary-text-color]" />
                </div>
                <div className="my-2 flex w-full flex-col">
                    <div>
                        <TextIconButton
                            text="Sign up with Google"
                            Icon={<Google className="h-6 w-6" />}
                        />
                    </div>
                    <div>
                        <TextIconButton
                            text="Sign up with Facebook"
                            Icon={<FacebookColor className="h-6 w-6" />}
                        />
                    </div>
                    <div>
                        <TextIconButton
                            text="Sign up with Apple"
                            Icon={<Apple className="h-6 w-6" />}
                        />
                    </div>
                </div>
                <hr className="mt-5 w-full border-[#292929]" />
                <div className="my-8 pb-4 text-center">
                    <span className="text-(--secondary-text-color)">
                        Already have an account?{" "}
                    </span>
                    <Link href="/login" className="underline">
                        Log in here.
                    </Link>
                </div>
            </div>
        </div>
    );
}
