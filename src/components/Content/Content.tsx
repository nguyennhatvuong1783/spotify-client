"use client";

import React from "react";
import ContextItem from "../ContextItem/ContextItem";
import Link from "next/link";
import useSWR from "swr";
import { ApiResponse } from "@/types/api";
import { Album } from "@/types/album";
import { Artist } from "@/types/artist";
import { Song } from "@/types/song";
import { fetcher } from "@/lib/api";

interface ContentProps {
    keyword?: string | null;
}

const Content: React.FC<ContentProps> = ({ keyword = null }) => {
    const {
        data: albumsData,
        error: AlbumsError,
        isLoading: isAlbumsLoading,
    } = useSWR<ApiResponse<Album[]>>(
        `music/albums/${keyword ? `?search=${keyword}` : ""}`,
        fetcher,
    );

    const {
        data: ArtistsData,
        error: ArtistsError,
        isLoading: isArtistsLoading,
    } = useSWR<ApiResponse<Artist[]>>(
        `music/artists/${keyword ? `?name=${keyword}` : ""}`,
        fetcher,
    );

    const {
        data: SongsData,
        error: SongsError,
        isLoading: isSongsLoading,
    } = useSWR<ApiResponse<Song[]>>(
        `music/songs/${keyword ? `?search=${keyword}` : ""}`,
        fetcher,
    );

    if (AlbumsError) return <div>Error when loading albums</div>;
    if (ArtistsError) return <div>Error when loading artists</div>;
    if (SongsError) return <div>Error when loading songs</div>;

    return (
        <div className="px-3">
            {albumsData?.data?.length ? (
                <div className="my-5 mb-10 overflow-hidden">
                    <div className="mb-2 flex items-end justify-between px-3 font-bold">
                        {!keyword ? (
                            <>
                                <Link
                                    href="/section/albums"
                                    className="text-2xl decoration-2 hover:underline"
                                >
                                    Popular albums and singles
                                </Link>
                                <Link
                                    href="/section/albums"
                                    className="text-sm text-(--secondary-text-color) hover:underline"
                                >
                                    Show all
                                </Link>
                            </>
                        ) : (
                            <>
                                <p className="text-2xl decoration-2">Albums</p>
                            </>
                        )}
                    </div>
                    <div className="grid grid-cols-5">
                        {!isAlbumsLoading &&
                            albumsData?.data &&
                            albumsData?.data.map((item) => (
                                <ContextItem
                                    key={item.id}
                                    title={item.title}
                                    artist={item.artist.name}
                                    artistId={item.artist.id}
                                    imgUrl={item.image_url}
                                    contextId={item.id ?? 1}
                                    songs={item.songs ?? []}
                                    type="album"
                                />
                            ))}
                    </div>
                </div>
            ) : null}
            {ArtistsData?.data?.length ? (
                <div className="my-5 mb-10 overflow-hidden">
                    <div className="mb-2 flex items-end justify-between px-3 font-bold">
                        {!keyword ? (
                            <>
                                <Link
                                    href="/section/artists"
                                    className="text-2xl decoration-2 hover:underline"
                                >
                                    Popular artists
                                </Link>
                                <Link
                                    href="/section/artists"
                                    className="text-sm text-(--secondary-text-color) hover:underline"
                                >
                                    Show all
                                </Link>
                            </>
                        ) : (
                            <>
                                <p className="text-2xl decoration-2">Artists</p>
                            </>
                        )}
                    </div>
                    <div className="grid grid-cols-5">
                        {!isArtistsLoading &&
                            ArtistsData?.data &&
                            ArtistsData?.data.map((item) => (
                                <ContextItem
                                    key={item.id}
                                    title={item.name}
                                    imgUrl={item.profile_picture}
                                    contextId={item.id ?? 1}
                                    songs={item.songs ?? []}
                                    type="artist"
                                />
                            ))}
                    </div>
                </div>
            ) : null}
            {SongsData?.data?.length ? (
                <div className="my-5 mb-10 overflow-hidden">
                    <div className="mb-2 flex items-end justify-between px-3 font-bold">
                        {!keyword ? (
                            <>
                                <Link
                                    href="/section/songs"
                                    className="text-2xl decoration-2 hover:underline"
                                >
                                    Trending songs
                                </Link>
                                <Link
                                    href="/section/songs"
                                    className="text-sm text-(--secondary-text-color) hover:underline"
                                >
                                    Show all
                                </Link>
                            </>
                        ) : (
                            <>
                                <p className="text-2xl decoration-2">Songs</p>
                            </>
                        )}
                    </div>
                    <div className="grid grid-cols-5">
                        {!isSongsLoading &&
                            SongsData?.data &&
                            SongsData?.data.map((item) => (
                                <ContextItem
                                    key={item.id}
                                    title={item.title}
                                    artist={item.artist?.name}
                                    artistId={item.artist?.id}
                                    contextId={item.id ?? 1}
                                    songs={[item]}
                                    type="song"
                                />
                            ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Content;
