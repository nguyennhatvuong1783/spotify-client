"use client";

import { Song } from "@/types/song";
import { Clock } from "../icons/Icons";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { usePlayer } from "@/hooks/usePlayer";
import { Artist } from "@/types/artist";
import { ApiResponse } from "@/types/api";
import { useEffect, useState } from "react";
import { formatTime } from "@/lib/utils";
import { deleteSongInPlaylist } from "@/lib/callApi";
import { mutate } from "swr";

interface SongListProps {
    contextId: number;
    title: string;
    type: "song" | "album" | "artist" | "playlist";
    songs?: Song[];
}

const SongList: React.FC<SongListProps> = ({
    contextId,
    title,
    type,
    songs = null,
}) => {
    const router = useRouter();
    const { user } = useAuth();

    const { playPlaylist } = usePlayer();

    const [artistNames, setArtistNames] = useState<(string | undefined)[]>([]);

    const handleDoubleClick = (index: number) => {
        if (!user) {
            router.push("/login");
            return;
        }
        playPlaylist(
            {
                id: contextId,
                name: title,
                playMode: type,
                songs: songs ?? [],
            },
            index,
        );
    };

    const GetArtistById = async (id: number): Promise<Artist | undefined> => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/music/artists/${id}/`,
            );
            if (!response.ok) {
                throw new Error("Failed to fetch artist data");
            }
            const artistData: ApiResponse<Artist> = await response.json();
            return artistData.data;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    };

    useEffect(() => {
        const fetchArtists = async () => {
            if (!songs) return;

            const promises = songs.map((item) =>
                GetArtistById(item.artist ?? 1).then((artist) => artist?.name),
            );

            const results = await Promise.all(promises);
            setArtistNames(results);
        };

        fetchArtists();
    }, [songs]);

    const handleDeleteSong = async (songId: number) => {
        const data = {
            songs: [songId],
        };
        const responseDelete = await deleteSongInPlaylist(data, contextId);
        mutate(`music/playlists/${contextId}/`);
    };

    return (
        <div className="mb-30 px-4 md:px-6">
            <div className="mb-4 border-b-1 border-[#293030] font-medium text-(--secondary-text-color)">
                <div className="grid h-9 grid-cols-22 items-center gap-4">
                    <span className="text-right text-lg">#</span>
                    <span className="col-span-19 text-sm">Title</span>
                    <Clock className="col-span-2 mx-2 h-4 w-4" />
                </div>
            </div>
            <ul>
                {songs?.map((item, index) => (
                    <li
                        key={item.id}
                        onDoubleClick={() => handleDoubleClick(index)}
                    >
                        <div
                            className="group grid h-14 cursor-pointer grid-cols-22 items-center gap-4 rounded text-sm font-medium text-(--secondary-text-color) focus-within:!bg-[#5a5a5a] hover:bg-[#2a2a2a]"
                            tabIndex={0}
                        >
                            <span className="pr-1 text-right text-lg">
                                {index + 1}
                            </span>
                            <div className="col-span-19 flex flex-col">
                                <span className="text-base text-(--text-color)">
                                    {item.title}
                                </span>
                                <span>{artistNames[index]}</span>
                            </div>
                            <span
                                className={`col-span-2 ${type === "playlist" && "flex items-center justify-center"}`}
                            >
                                {formatTime(item.duration)}
                                {type === "playlist" && (
                                    <h1
                                        className="mx-6 font-bold opacity-0 group-hover:opacity-100 hover:scale-105 hover:text-red-500"
                                        onClick={() =>
                                            handleDeleteSong(item.id as number)
                                        }
                                    >
                                        X
                                    </h1>
                                )}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SongList;
