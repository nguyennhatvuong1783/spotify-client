import React from "react";
import { Spotify } from "../icons/Icons";
import SearchInput from "../TextInput/SearchInput";
import Button from "../Buttons/Button";
import TextButton from "../Buttons/TextButton";
import HomeButton from "../Buttons/HomeButton";
import Link from "next/link";

const Header = () => {
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
                <SearchInput />
            </div>
            <div className="flex flex-1 items-center justify-center gap-2 font-bold">
                <TextButton text="Premium" href="#" />
                <TextButton text="Support" href="#" />
                <TextButton text="Download" href="#" />
                <div className="mx-4 h-7 w-[1px] bg-(--text-color)"></div>
                <TextButton text="Sign up" href="/signup" />
                <Button
                    className="ml-2 px-8 py-3"
                    text="Log in"
                    href="/login"
                />
            </div>
        </div>
    );
};

export default Header;
