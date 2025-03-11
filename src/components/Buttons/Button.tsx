import React from "react";

interface ButtonProps {
    px?: string;
    py?: string;
    mx?: string;
}

const Button: React.FC<ButtonProps> = ({ px = "4", py = "1", mx = "0" }) => {
    return (
        <a
            href="#"
            className={`mx-${mx} px-${px} py-${py} rounded-full bg-white px-8 py-2 align-middle text-black transition duration-100 hover:scale-103 hover:brightness-90 active:scale-100 active:opacity-80`}
        >
            Log in
        </a>
    );
};

export default Button;
