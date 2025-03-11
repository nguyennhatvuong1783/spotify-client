import React from "react";
import { Spotify } from "../icons/Icons";
import Textbox from "../Textbox/Textbox";
import Button from "../Buttons/Button";
import TextButton from "../Buttons/TextButton";
import ButtonHome from "../Buttons/ButtonHome";

const Header = () => {
    return (
        <div className="fixed flex w-full items-center p-2">
            <div className="flex w-18 items-center justify-center">
                <Spotify className="h-8 w-8 cursor-pointer" />
            </div>
            <div className="flex items-center">
                <div className="ml-2">
                    <ButtonHome />
                </div>
                <div className="px-2">
                    <Textbox />
                </div>
            </div>
            <div className="flex flex-1 items-center justify-center gap-2 font-bold">
                <TextButton text="Premium" href="#" />
                <TextButton text="Support" href="#" />
                <TextButton text="Download" href="#" />
                <div className="mx-4 h-7 w-[1px] bg-(--text-color)"></div>
                <TextButton text="Sign up" href="#" />
                <Button px="12" py="3" mx="2" />
            </div>
        </div>
    );
};

export default Header;
