import React from "react";
import ItemAlbum from "../ItemAlbum/ItemAlbum";
import Link from "next/link";

const Content = () => {
    return (
        <>
            <div className="my-5 mb-10 overflow-hidden">
                <div className="mb-2 flex items-end justify-between px-3 font-bold">
                    <Link
                        href="/section/1"
                        className="text-2xl decoration-2 hover:underline"
                    >
                        Trending songs
                    </Link>
                    <Link
                        href="/section/1"
                        className="text-sm text-(--secondary-text-color) hover:underline"
                    >
                        Show all
                    </Link>
                </div>
                <div className="flex">
                    <ItemAlbum
                        title="DANCING IN THE DARK"
                        artist="SOOBIN"
                        url="/album/1"
                    />
                    <ItemAlbum
                        title="DANCING IN THE DARK"
                        artist="SOOBIN"
                        url="/album/2"
                    />
                    <ItemAlbum
                        title="DANCING IN THE DARK"
                        artist="SOOBIN"
                        url="/album/3"
                    />
                    <ItemAlbum
                        title="DANCING IN THE DARK"
                        artist="SOOBIN"
                        url="/album/4"
                    />
                    <ItemAlbum
                        title="DANCING IN THE DARK"
                        artist="SOOBIN"
                        url="/album/5"
                    />
                </div>
            </div>
            <div className="my-5 mb-10 overflow-hidden">
                <div className="mb-2 flex items-end justify-between px-3 font-bold">
                    <Link
                        href="/section/2"
                        className="text-2xl decoration-2 hover:underline"
                    >
                        Trending songs
                    </Link>
                    <Link
                        href="/section/2"
                        className="text-sm text-(--secondary-text-color) hover:underline"
                    >
                        Show all
                    </Link>
                </div>
                <div className="flex">
                    <ItemAlbum />
                    <ItemAlbum />
                    <ItemAlbum />
                    <ItemAlbum />
                    <ItemAlbum />
                </div>
            </div>
        </>
    );
};

export default Content;
