import Image from "next/image";
import PlayButton from "../Buttons/PlayButton";
import { AddIcon, ListIcon, MoreIcon } from "../icons/Icons";
import Link from "next/link";

interface ContextHeaderProps {
    title?: string;
    artist?: string;
    artistId?: string;
    albumImgUrl?: string;
    artistImgUrl?: string;
    totalSongs?: number;
    totalDuration?: number;
    isArtist?: boolean;
}

const ContextHeader: React.FC<ContextHeaderProps> = ({
    title = "Title",
    artist = "Artist",
    artistId = "1",
    albumImgUrl = "https://i.scdn.co/image/ab67616d00001e028bdbdf691a5b791a5afb515b",
    artistImgUrl = "https://i.scdn.co/image/ab6761610000f178b9c9e23c646125922719489e",
    totalSongs = 0,
    totalDuration = 0,
    isArtist = false,
}) => {
    return (
        <div className="flex min-w-full flex-col">
            <div className="relative flex p-6">
                <Image
                    src={albumImgUrl}
                    alt="Image"
                    fill
                    className="absolute z-0 overflow-hidden object-cover shadow-[0px_0px_40px_rgba(0,0,0,0.4)] blur-3xl brightness-95"
                />
                <div className="z-10 mr-6 flex flex-col justify-end">
                    <Image
                        src={albumImgUrl}
                        alt="Image"
                        width={221}
                        height={221}
                        className="aspect-square cursor-pointer overflow-hidden rounded-sm object-cover shadow-[0px_0px_40px_rgba(0,0,0,0.4)] transition-all duration-200 hover:scale-102"
                    />
                </div>
                <div className="z-10 flex flex-1 flex-col justify-end gap-2">
                    <p className="text-sm font-medium">
                        {isArtist ? "Artist" : "Album"}
                    </p>
                    <h1 className="cursor-default text-6xl/tight font-extrabold">
                        {title}
                    </h1>
                    {/* <AutoTextSize text="BẬT NÓ LÊN" /> */}
                    <div className="mt-3 flex items-center gap-1 truncate">
                        <Image
                            src={artistImgUrl}
                            alt="Image"
                            width={24}
                            height={24}
                            className="aspect-square overflow-hidden rounded-full object-cover"
                        />
                        {!isArtist && (
                            <Link
                                href={`/artist/${artistId}`}
                                className="text-sm font-bold hover:underline"
                            >
                                {artist}
                            </Link>
                        )}
                        <ul className="ml-4 flex list-disc gap-5 text-sm font-medium opacity-80">
                            <li className="-indent-[6px]">2025</li>
                            <li className="-indent-[6px]">
                                {`${totalSongs} songs, ${Math.floor(totalDuration / 60)} min ${totalDuration % 60} sec`}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-6">
                    <PlayButton
                        className="p-4"
                        // onClick={handleClickButtonPlay}
                    />
                    <div>
                        <AddIcon className="h-8 w-8 cursor-pointer text-(--secondary-text-color) hover:scale-105 hover:text-(--text-color) active:scale-100 active:text-(--secondary-text-color)" />
                    </div>
                    <div>
                        <MoreIcon className="h-8 w-8 cursor-pointer text-(--secondary-text-color) hover:scale-105 hover:text-(--text-color) active:scale-100 active:text-(--secondary-text-color)" />
                    </div>
                </div>
                <div className="flex cursor-pointer items-center gap-2 px-2 text-(--secondary-text-color) hover:text-(--text-color)">
                    <span className="pb-0.5 text-sm font-medium">List</span>
                    <ListIcon className="h-4 w-4" />
                </div>
            </div>
        </div>
    );
};

export default ContextHeader;
