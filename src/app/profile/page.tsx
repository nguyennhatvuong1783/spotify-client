"use client";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import TextInput from "@/components/TextInput/TextInput";
import { useAuth } from "@/hooks/useAuth";
import { changePassword, editProfile } from "@/lib/callApi";
import { ApiResponse } from "@/types/api";
import { PasswordChangeDto, UpdateProfileDto, User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { z } from "zod";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const profileSchema = z.object({
    email: z
        .string()
        .min(1, "Please enter your email.")
        .email("Invalid email address (name@domain.com)."),
});

const passwordSchema = z
    .object({
        current_password: z
            .string()
            .min(1, "Please enter your current password."),
        new_password: z
            .string()
            .min(1, "Please enter your password.")
            .min(8, "Password must be at least 8 characters long."),
        new_password_confirmation: z
            .string()
            .min(1, "Please enter your confirm password."),
    })
    .superRefine(({ new_password_confirmation, new_password }, ctx) => {
        // Password complexity checks
        const hasUppercase = /[A-Z]/.test(new_password);
        const hasLowercase = /[a-z]/.test(new_password);
        const hasNumber = /[0-9]/.test(new_password);
        const hasSpecialChar = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(
            new_password,
        );

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
        if (new_password_confirmation !== new_password) {
            ctx.addIssue({
                code: "custom",
                message: "Passwords do not match.",
                path: ["new_password_confirmation"],
            });
        }
    });

type RawProfileInput = z.infer<typeof profileSchema>;
type RawPasswordInput = z.infer<typeof passwordSchema>;

const Profile = () => {
    const MySwal = withReactContent(Swal);
    const { user } = useAuth();

    const {
        register: registerProfile,
        handleSubmit: handleSubmitProfile,
        formState: { errors: errorsProfile },
        setError: setErrorProfile,
    } = useForm<RawProfileInput>({
        resolver: zodResolver(profileSchema),
        values: {
            email: user?.email ?? "",
        },
    });

    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        formState: { errors: errorsPassword },
        setError: setErrorPassword,
        reset,
    } = useForm<RawPasswordInput>({
        resolver: zodResolver(passwordSchema),
    });

    const onSubmitProfile = async (data: RawProfileInput) => {
        const profileData: UpdateProfileDto = {
            email: data.email,
        };

        const editProfileResponseData: ApiResponse<User> =
            await editProfile(profileData);

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

        if (editProfileResponseData.errors) {
            Toast.fire({
                icon: "error",
                title: "Registration failed",
            });

            // Xử lý lỗi từ API và gán vào form
            Object.entries(editProfileResponseData.errors).forEach(
                ([field, message]) => {
                    setErrorProfile(field as keyof RawProfileInput, {
                        type: "manual",
                        message,
                    });
                },
            );
            return;
        }

        Toast.fire({
            icon: "success",
            title: "Profile updated successfully",
        });

        mutate("auth/me");
    };

    const onSubmitPassword = async (data: RawPasswordInput) => {
        const passwordData: PasswordChangeDto = {
            current_password: data.current_password,
            new_password: data.new_password,
            new_password_confirmation: data.new_password_confirmation,
        };

        const dataChangePassword: any = await changePassword(passwordData);

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

        if (dataChangePassword.success === false) {
            Toast.fire({
                icon: "error",
                title: "Password change failed",
            });

            // Xử lý lỗi từ API và gán vào form
            setErrorPassword("current_password", {
                type: "manual",
                message: dataChangePassword.message,
            });
            return;
        }

        Toast.fire({
            icon: "success",
            title: "Password changed successfully",
        });

        reset();
    };

    return (
        <div className="p-2">
            <Header />
            <div className="block h-full w-full pt-16">
                <div className="flex justify-center py-8">
                    <div className="mx-2 w-196">
                        <h1 className="pb-8 text-4xl font-bold">
                            Your profile
                        </h1>
                        <form onSubmit={handleSubmitProfile(onSubmitProfile)}>
                            <div className="flex flex-col gap-6 pb-10">
                                <TextInput
                                    label="Username"
                                    isDisabled={true}
                                    value={user?.username}
                                />
                                <TextInput
                                    label="Your plan"
                                    isDisabled={true}
                                    value={
                                        user?.is_superuser
                                            ? "Admin"
                                            : user?.is_premium
                                              ? "Premium"
                                              : "Free"
                                    }
                                />
                                <TextInput
                                    label="Email"
                                    register={registerProfile("email")}
                                    error={errorsProfile.email?.message}
                                />
                                <div className="w-fit self-end rounded-full p-1 transition-all duration-200 focus-within:ring-3 hover:scale-105 active:scale-100">
                                    <button
                                        type="submit"
                                        className="w-fit cursor-pointer rounded-full bg-(--green-color) px-8 py-3 font-bold text-(--primary-color) outline-none hover:brightness-115 active:brightness-90"
                                    >
                                        Save profile
                                    </button>
                                </div>
                            </div>
                        </form>
                        <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
                            <h1 className="border-t-2 border-(--secondary-color) pt-10 pb-8 text-4xl font-bold">
                                Change password
                            </h1>
                            <div className="flex flex-col gap-6 pb-4">
                                <TextInput
                                    label="Current password"
                                    register={registerPassword(
                                        "current_password",
                                    )}
                                    error={
                                        errorsPassword.current_password?.message
                                    }
                                />
                                <TextInput
                                    label="New password"
                                    isPassword={true}
                                    register={registerPassword("new_password")}
                                    error={errorsPassword.new_password?.message}
                                />
                                <TextInput
                                    label="Confirm new password"
                                    isPassword={true}
                                    register={registerPassword(
                                        "new_password_confirmation",
                                    )}
                                    error={
                                        errorsPassword.new_password_confirmation
                                            ?.message
                                    }
                                />
                                <div className="w-fit self-end rounded-full p-1 transition-all duration-200 focus-within:ring-3 hover:scale-105 active:scale-100">
                                    <button
                                        type="submit"
                                        className="w-fit cursor-pointer rounded-full bg-(--green-color) px-8 py-3 font-bold text-(--primary-color) outline-none hover:brightness-115 active:brightness-90"
                                    >
                                        Change password
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
