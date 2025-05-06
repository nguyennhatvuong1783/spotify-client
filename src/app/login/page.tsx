"use client";

import TextIconButton from "@/components/Buttons/TextIconButton";
import {
    Apple,
    FacebookColor,
    Google,
    Spotify,
} from "@/components/icons/Icons";
import TextInput from "@/components/TextInput/TextInput";
import { useAuth } from "@/hooks/useAuth";
import { login } from "@/lib/callApi";
import { AuthUser, LoginUserDto } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// Định nghĩa schema
const loginSchema = z.object({
    username: z.string().min(1, "Please enter your username."),
    password: z.string().min(1, "Please enter your password."),
});

type RawLoginInput = z.infer<typeof loginSchema>;

export default function Login() {
    const MySwal = withReactContent(Swal);
    const { handleLogin } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<RawLoginInput>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: RawLoginInput) => {
        const loginData: LoginUserDto = {
            username: data.username,
            password: data.password,
        };

        const loginResponseData: AuthUser = await login(loginData);

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

        if (loginResponseData.errors) {
            Toast.fire({
                icon: "error",
                title: "Incorrect username or password",
            });

            const errors = loginResponseData.errors;

            Object.entries(errors).forEach(([field, message]) => {
                setError(field as keyof RawLoginInput, {
                    type: "manual",
                    message,
                });
            });

            return;
        }

        const { access, user } = loginResponseData ?? {};

        if (!access || !user) {
            Toast.fire({
                icon: "error",
                title: "Login failed",
            });

            console.error("Dữ liệu đăng nhập thiếu thông tin cần thiết.");
            console.error("Đăng nhập thất bại. Vui lòng thử lại.");
            return;
        }

        try {
            document.cookie = `token=${access}; path=/`;
            handleLogin(user);
        } catch (err) {
            console.error("Lỗi khi xử lý lưu token:", err);
            console.error("Đăng nhập thất bại.");
            Toast.fire({
                icon: "error",
                title: "Login failed",
            });
        }

        Toast.fire({
            icon: "success",
            title: "Login successful",
        });
    };

    return (
        <div className="flex items-center justify-center bg-(image:--gradient-color-login) md:p-8">
            <div className="flex min-h-screen w-full flex-col items-center justify-start bg-(--main-color) px-8 pb-8 md:h-auto md:min-h-auto md:w-[734px] md:rounded-md md:px-25">
                <div className="flex flex-col items-center justify-center gap-2 py-8">
                    <Link href="/">
                        <Spotify className="h-9 w-9 cursor-pointer" />
                    </Link>
                    <h1 className="text-center text-3xl font-bold">
                        Log in to Spotify
                    </h1>
                </div>
                <div className="flex w-full flex-col justify-center md:w-auto">
                    <div>
                        <TextIconButton
                            text="Continue with Google"
                            Icon={<Google className="h-6 w-6" />}
                        />
                    </div>
                    <div>
                        <TextIconButton
                            text="Continue with Facebook"
                            Icon={<FacebookColor className="h-6 w-6" />}
                        />
                    </div>
                    <div>
                        <TextIconButton
                            text="Continue with Apple"
                            Icon={<Apple className="h-6 w-6" />}
                        />
                    </div>
                    <div>
                        <TextIconButton text="Continue with phone number" />
                    </div>
                </div>
                <hr className="my-9 w-full border-[#292929]" />
                {/* Form đăng nhập */}
                <form
                    className="w-full md:w-auto"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col justify-center">
                        <div className="mb-2">
                            <TextInput
                                label="Username"
                                placeholder="Username"
                                register={register("username")}
                                error={errors.username?.message}
                            />
                        </div>
                        <div>
                            <TextInput
                                label="Password"
                                placeholder="Password"
                                isPassword
                                register={register("password")}
                                error={errors.password?.message}
                            />
                        </div>
                        <div className="my-6 rounded-full p-1 transition-all duration-200 focus-within:ring-3 hover:scale-105 active:scale-100">
                            <button
                                type="submit"
                                className="w-full cursor-pointer rounded-full bg-(--green-color) px-8 py-3 font-bold text-(--primary-color) outline-none hover:brightness-115 active:brightness-90 md:box-content md:w-65"
                            >
                                Log in
                            </button>
                        </div>
                    </div>
                </form>
                <div className="mt-2 mb-9 flex flex-col items-center gap-y-2 md:flex-row">
                    <span className="text-(--secondary-text-color)">{`Don't have an account?`}</span>
                    <Link
                        href="/signup"
                        className="underline decoration-2 underline-offset-1 transition-normal duration-200 outline-none focus-within:text-(--green-color) focus-within:decoration-3 focus-within:underline-offset-8 hover:text-(--green-color) md:ml-2"
                    >
                        Sign up for Spotify
                    </Link>
                </div>
            </div>
        </div>
    );
}
