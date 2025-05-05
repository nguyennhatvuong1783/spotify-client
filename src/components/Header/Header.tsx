"use client";

import React, { useEffect, useRef, useState } from "react";
import { Profile, Spotify } from "../icons/Icons";
import SearchInput from "../TextInput/SearchInput";
import Button from "../Buttons/Button";
import TextButton from "../Buttons/TextButton";
import HomeButton from "../Buttons/HomeButton";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter();
    const { user, handleLogout, isLoading } = useAuth();

    const [searchTerm, setSearchTerm] = useState("");
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Clear timeout cũ nếu có
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Đặt timeout mới (500ms sau khi ngừng nhập)
        timeoutRef.current = setTimeout(() => {
            handleSearch(value);
        }, 500);
    };

    const handleSearch = (term: string) => {
        console.log("Searching for:", term);
        if (!term || term === "") router.push("/");
        else router.push(`/search/${term}`);
    };

    // Cleanup timeout khi component unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="flex w-full items-center">
            <Link href={"/"}>
                <div className="flex w-18 items-center justify-center">
                    <Spotify className="h-8 w-8 cursor-pointer text-(--text-color)" />
                </div>
            </Link>
            <div className="flex flex-1 items-center">
                <div className="ml-2">
                    <HomeButton />
                </div>
                <SearchInput onChange={handleInputChange} value={searchTerm} />
            </div>
            <div className="flex flex-1 items-center justify-center gap-2 font-bold">
                <TextButton text="Premium" href="#" />
                <TextButton text="Support" href="#" />
                <TextButton text="Download" href="#" />
                <div className="mx-4 h-7 w-[1px] bg-(--text-color)"></div>
                {!isLoading ? (
                    user ? (
                        <>
                            <TextButton
                                text="Log out"
                                href="/"
                                onClick={handleLogout}
                            />
                            <Link href="/profile">
                                <Profile className="ml-2 h-9 w-9 cursor-pointer rounded-full p-[7px] ring-1 hover:text-(--green-color)" />
                            </Link>
                        </>
                    ) : (
                        <>
                            <TextButton text="Sign up" href="/signup" />
                            <Button
                                className="ml-2 px-8 py-3"
                                text="Log in"
                                href="/login"
                            />
                        </>
                    )
                ) : null}
            </div>
        </div>
    );
};

export default Header;
