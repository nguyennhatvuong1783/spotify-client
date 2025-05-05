"use client";
import Link from "next/link";
import { Profile, Spotify } from "../icons/Icons";
import { usePathname } from "next/navigation";

const LeftMenuForAdmin = () => {
    const pathname = usePathname();

    const menuItems = [
        {
            name: "Dashboard",
            link: "/dashboard",
        },
        {
            name: "Users",
            link: "/dashboard/users",
        },
        {
            name: "Artists",
            link: "/dashboard/artists",
        },
        {
            name: "Songs",
            link: "/dashboard/songs",
        },
        {
            name: "Albums",
            link: "/dashboard/albums",
        },
        {
            name: "Playlists",
            link: "/dashboard/playlists",
        },
    ];

    return (
        <div className="flex h-full flex-col">
            <div className="mx-3 flex items-center justify-center gap-2 border-b-2 border-b-[#292929] py-3">
                <Spotify className="h-8 w-8 cursor-pointer" />
                <h1 className="cursor-default text-lg font-bold">
                    Spotify Dashboard
                </h1>
            </div>
            <div className="flex flex-1 flex-col p-3">
                {menuItems.map((item) => {
                    const isActive = pathname === item.link;
                    return (
                        <Link
                            key={item.name}
                            href={item.link}
                            className={`my-2 w-full cursor-pointer rounded-md p-2 text-center font-medium transition-all duration-200 hover:bg-[#292929] ${isActive && "bg-[#292929] text-(--green-color)"}`}
                        >
                            {item.name}
                        </Link>
                    );
                })}
            </div>
            <div className="mx-3 flex items-center gap-2 border-t-2 border-t-[#292929] py-3">
                <Profile className="h-8 w-8 cursor-pointer" />
                <p className="cursor-pointer font-medium">Admin</p>
            </div>
        </div>
    );
};

export default LeftMenuForAdmin;
