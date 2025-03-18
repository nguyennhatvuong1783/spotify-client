import React from "react";
import { Play } from "../icons/Icons";

const ItemAlbum = () => {
    return (
        <div className="group flex cursor-pointer flex-col gap-y-1 rounded-md p-[.8rem] hover:bg-(--secondary-color) active:bg-(--primary-color)">
            <div className="relative">
                <img
                    src="https://i.scdn.co/image/ab67616d00001e028bdbdf691a5b791a5afb515b"
                    alt="Image"
                    width="100%"
                    height="100%"
                    className="aspect-square overflow-hidden rounded-md object-cover"
                />
                <button className="absolute right-2 bottom-0 cursor-pointer rounded-full bg-(--green-color) p-3 text-(--primary-color) opacity-0 shadow-2xl shadow-black transition duration-300 group-hover:-translate-y-2 group-hover:opacity-100 hover:scale-104 hover:brightness-105 active:scale-100 active:brightness-80">
                    <Play className="h-6 w-6" />
                </button>
            </div>
            <span className="mt-1 font-bold decoration-[.1rem] hover:underline">
                DANCING IN THE DARK
            </span>
            <a
                href="#"
                className="text-sm text-(--secondary-text-color) hover:underline"
            >
                SOOBIN
            </a>
        </div>
    );
};

export default ItemAlbum;
