import React from "react";
import ContextItem from "../ContextItem/ContextItem";
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
                    <ContextItem
                        title="DANCING IN THE DARK"
                        artist="SOOBIN"
                        url="/album/1"
                    />
                    <ContextItem
                        title="DANCING IN THE DARK"
                        artist="SOOBIN"
                        url="/album/2"
                    />
                    <ContextItem
                        title="DANCING IN THE DARK"
                        artist="SOOBIN"
                        url="/album/3"
                    />
                    <ContextItem
                        title="DANCING IN THE DARK"
                        artist="SOOBIN"
                        url="/album/4"
                    />
                    <ContextItem
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
                    <ContextItem />
                    <ContextItem />
                    <ContextItem />
                    <ContextItem />
                    <ContextItem />
                </div>
            </div>
        </>
    );
};

export default Content;
