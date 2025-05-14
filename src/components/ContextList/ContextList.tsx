import React, { useEffect, useState } from "react";
import ContextItem from "../ContextItem/ContextItem";
import { Artist } from "@/types/artist";
import { Album } from "@/types/album";
import { Song } from "@/types/song";
import useSWR from "swr";
import { ApiResponse } from "@/types/api";
import { fetcher } from "@/lib/api";

interface ContextListProps {
    contextKey: string;
}

const ContextList: React.FC<ContextListProps> = ({ contextKey }) => {
    const [artistNames, setArtistNames] = useState<(string | undefined)[]>([]);

    const { data, error, isLoading } = useSWR<
        ApiResponse<Artist[] | Album[] | Song[]>
    >(`music/${contextKey}/`, fetcher);

    const titles: Record<string, string> = {
        artists: "Popular artists",
        songs: "Trending songs",
        albums: "Popular albums and singles",
    };

    const displayTitle = titles[contextKey];

    const GetArtistById = async (id: number): Promise<Artist | undefined> => {
        if (contextKey !== "songs") return;
        try {
            const response = await fetch(
                `http://43.207.118.139:8000/api/music/artists/${id}/`,
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
            if (contextKey !== "songs") return;

            if (!data?.data) return;

            const promises = data.data.map((item) =>
                GetArtistById((item as Song).artist ?? 1).then(
                    (artist) => artist?.name,
                ),
            );

            const results = await Promise.all(promises);
            setArtistNames(results);
            console.log("Artist names:", results);
        };

        fetchArtists();
    }, [data]);

    if (error) return <div>{`Error when loading ${contextKey}`}</div>;

    return (
        <div className="my-5 mb-10 overflow-hidden px-3">
            <div className="mb-9 flex items-end justify-between px-3 pt-13 font-bold">
                <p className="text-3xl">{displayTitle}</p>
            </div>
            <div className="grid grid-cols-5 gap-y-6">
                {!isLoading && data?.data && contextKey == "artists"
                    ? data?.data.map((artist) => (
                          <ContextItem
                              key={artist.id}
                              title={(artist as Artist).name}
                              imgUrl={(artist as Artist).profile_picture}
                              contextId={artist.id ?? 1}
                              songs={(artist as Artist).songs ?? []}
                              type="artist"
                          />
                      ))
                    : !isLoading && data?.data && contextKey == "songs"
                      ? data?.data.map((song, index) => (
                            <ContextItem
                                key={song.id}
                                title={(song as Song).title}
                                artist={artistNames[index]}
                                artistId={(song as Song).artist}
                                contextId={song.id ?? 1}
                                songs={[song as Song]}
                                type="song"
                            />
                        ))
                      : !isLoading && data?.data && contextKey == "albums"
                        ? data?.data.map((album) => (
                              <ContextItem
                                  key={album.id}
                                  title={(album as Album).title}
                                  artist={(album as Album).artist.name}
                                  artistId={(album as Album).artist.id}
                                  imgUrl={(album as Album).cover_image}
                                  contextId={album.id ?? 1}
                                  songs={(album as Album).songs ?? []}
                                  type="album"
                              />
                          ))
                        : null}
            </div>
        </div>
    );
};

export default ContextList;
