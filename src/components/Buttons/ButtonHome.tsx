import React from "react";
import { Home } from "../icons/Icons";

const ButtonHome = () => {
    return (
        <div className="cursor-pointer rounded-full bg-(--secondary-color) p-3 text-(--text-color) transition duration-100 hover:scale-105 hover:brightness-150 active:scale-100 active:opacity-75">
            <Home className="h-6 w-6" />
        </div>
    );
};

export default ButtonHome;
