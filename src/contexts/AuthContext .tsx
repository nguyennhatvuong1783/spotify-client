"use client";
import { fetcher } from "@/lib/api";
import { deleteCookie, getCookie } from "@/lib/cookie";
import { ApiResponse } from "@/types/api";
import { User } from "@/types/user";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";
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
    const pathname = usePathname();
    const route = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isChecking, setIsChecking] = useState(true);

    const { data, error, isLoading } = useSWR<ApiResponse<User>>(
        "me/",
        fetcher,
        {
            onSuccess: (data) => {
                if (data.data) {
                    setUser(data.data);
                }
            },
            onError: () => {
                setUser(null);
                deleteCookie("token");
            },
        },
    );

    const handleLogin = (user: User) => {
        setUser(user);
        const redirectPath = user.is_superuser ? "/dashboard" : "/";
        route.push(redirectPath);
    };

    const handleLogout = async () => {
        try {
            // const logoutResponseData: ApiResponse<undefined> = await logout();
            // if (logoutResponseData.errors) {
            //     throw new Error(logoutResponseData.errors.join(', '));
            // }
            deleteCookie("token");
            setUser(null);
            route.push("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const checkAuth = useCallback(() => {
        setIsChecking(true);
        const token = getCookie("token");

        if (!token) {
            setUser(null);
        }
        // SWR sẽ tự động xử lý data nếu có token
        setIsChecking(false);
    }, []);

    const checkAdmin = useCallback(() => {
        if (isLoading) return;

        setIsChecking(true);

        if (
            (pathname.startsWith("/dashboard") && !user?.is_superuser) ||
            (pathname.startsWith("/dashboard") && !user)
        ) {
            route.push("/");
        }

        setIsChecking(false);
    }, [pathname, route, user, isLoading]);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        if (!isLoading) {
            checkAdmin();
        }
    }, [isLoading, checkAdmin]);

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
            {!isChecking && children}
        </AuthContext.Provider>
    );
};
