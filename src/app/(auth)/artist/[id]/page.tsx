"use client";
import ContextHeader from "@/components/ContextHeader/ContextHeader";
import ListSong from "@/components/SongList/SongList";
import { fetcher } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { Artist } from "@/types/artist";
import { useParams } from "next/navigation";
import useSWR from "swr";

export default function ArtistPage() {
    const params = useParams<{ id: string }>();
    const { id } = params;

    const { data, error, isLoading } = useSWR<ApiResponse<Artist>>(
        `music/artists/${id}/`,
        fetcher,
    );
    if (error) return <div>Error when loading artist</div>;

    return (
        <>
            {!isLoading && data?.data && (
                <>
                    <ContextHeader
                        key={data.data.id}
                        title={data.data.name}
                        PriImgUrl={data.data.profile_picture}
                        SecImgUrl={
                            data.data.profile_picture ??
                            "https://www.shyamh.com/images/blog/music.jpg"
                        }
                        totalSongs={data.data.songs_count}
                        totalDuration={
                            data.data.songs?.reduce(
                                (total, song) => total + song.duration,
                                0,
                            ) ?? 0
                        }
                        type="artist"
                        contextId={data.data.id ?? 1}
                        songs={data.data.songs ?? []}
                    />
                    <ListSong
                        contextId={data.data.id ?? 1}
                        title={data.data.name}
                        type="artist"
                        songs={data.data.songs}
                    />
                </>
            )}
        </>
    );
}
