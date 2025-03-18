import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import ItemAlbum from "../ItemAlbum/ItemAlbum";

const Content = () => {
    return (
        <div className="h-full rounded-md bg-(image:--gradient-color)">
            <ScrollArea className="h-[calc(100vh-100px)] px-3">
                <div className="my-5 mb-10 overflow-hidden">
                    <div className="mb-2 flex items-end justify-between px-3 font-bold">
                        <a
                            href="#"
                            className="text-2xl decoration-2 hover:underline"
                        >
                            Trending songs
                        </a>
                        <a
                            href="#"
                            className="text-sm text-(--secondary-text-color) hover:underline"
                        >
                            Show all
                        </a>
                    </div>
                    <div className="flex">
                        <ItemAlbum />
                        <ItemAlbum />
                        <ItemAlbum />
                        <ItemAlbum />
                        <ItemAlbum />
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
};

export default Content;
