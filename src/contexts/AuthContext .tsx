"use client";
import { fetcher } from "@/lib/api";
import { deleteCookie, getCookie } from "@/lib/cookie";
import { ApiResponse } from "@/types/api";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import useSWR from "swr";

interface AuthContextType {
    user: User | null;
    handleLogout: () => Promise<void>;
    handleLogin: (user: User) => void;
    isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined,
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { data, error, isLoading } = useSWR<ApiResponse<User>>(
        "me/",
        fetcher,
    );

    const route = useRouter();
    const [user, setUser] = useState<User | null>(null);

    const handleLogin = (user: User) => {
        setUser(user);
        route.push("/");
    };

    const handleLogout = async () => {
        // const logoutResponseData: ApiResponse<undefined> = await logout();
        // if (logoutResponseData.errors) {
        //     console.error("Logout failed:", logoutResponseData.errors);
        //     return;
        // }
        // Xóa cookie token
        deleteCookie("token");
        setUser(null);
        route.push("/");
    };

    const checkAuth = async () => {
        const token = getCookie("token");

        if (!token) {
            setUser(null);
        } else {
            if (data?.data) {
                setUser(data?.data);
            }
        }
    };

    useEffect(() => {
        checkAuth();
    });

    if (error) return <div>Error loading user data</div>;

    return (
        <AuthContext.Provider
            value={{
                user,
                handleLogout,
                handleLogin,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
