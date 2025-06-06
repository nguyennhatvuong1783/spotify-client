"use client";
import { fetcher } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { Song } from "@/types/song";
import { createContext, useCallback, useEffect, useState } from "react";
import useSWR from "swr";

type PlayMode = "song" | "album" | "playlist" | "artist";
type RepeatMode = "none" | "all" | "one";

type PlayerContextType = {
    // State
    currentSong: Song | null;
    isPlaying: boolean;
    queue: Song[];
    shuffleQueue: Song[];
    currentIndex: number;
    playMode: PlayMode;
    repeatMode: RepeatMode;
    isShuffled: boolean;
    currentTime: number;
    currentContext: {
        // Thông tin context hiện tại (album/playlist/artist)
        id?: number;
        type?: PlayMode;
        name?: string;
    };

    // Actions
    playSong: (song: Song) => void;
    playPlaylist: (
        playlist: {
            id: number;
            name: string;
            playMode: PlayMode;
            songs: Song[];
        },
        startFrom?: number,
    ) => void;
    togglePlayPause: () => void;
    playNext: () => void;
    playPrevious: () => void;
    toggleRepeat: () => void;
    toggleShuffle: () => void;
    addToQueue: (songs: Song[]) => void;
    removeFromQueue: (song: Song) => void;
    clearQueue: () => void;
    seekTo: (time: number) => void;
};

export const PlayerContext = createContext<PlayerContextType | null>(null);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [queue, setQueue] = useState<Song[]>([]);
    const [shuffleQueue, setShuffleQueue] = useState<Song[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [playMode, setPlayMode] = useState<PlayMode>("playlist");
    const [repeatMode, setRepeatMode] = useState<RepeatMode>("none");
    const [isShuffled, setIsShuffled] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [currentContext, setCurrentContext] = useState<{
        id?: number;
        type?: PlayMode;
        name?: string;
    }>({});

    const currentSong = currentIndex >= 0 ? queue[currentIndex] : null;

    const {
        data: songsData,
        error: songsError,
        isLoading: isSongsLoading,
    } = useSWR<ApiResponse<Song[]>>("music/songs/", fetcher);

    useEffect(() => {
        if (!isSongsLoading && songsData && playMode === "song") {
            setQueue(songsData.data ?? []);
        }
        console.log("songsData", songsData);
    }, [isSongsLoading, songsData, playMode]);

    // Phát một bài hát đơn
    const playSong = useCallback((song: Song) => {
        setCurrentIndex((song.id ?? 2) - 1);
        setPlayMode("song");
        setCurrentContext({});
        setIsPlaying(true);
    }, []);

    // Phát một playlist
    const playPlaylist = useCallback(
        (
            playlist: {
                id: number;
                name: string;
                playMode: PlayMode;
                songs: Song[];
            },
            startFrom = 0,
        ) => {
            setQueue(playlist.songs);
            setCurrentIndex(startFrom);
            setPlayMode(playlist.playMode);
            setCurrentContext({
                id: playlist.id,
                type: playlist.playMode,
                name: playlist.name,
            });
            setIsPlaying(true);
        },
        [],
    );

    // Thêm bài hát vào queue (phát sau bài hiện tại)
    const addToQueue = useCallback((songs: Song[]) => {
        setQueue((prev) => {
            // Nếu queue rỗng, phát luôn bài đầu tiên
            if (prev.length === 0 && songs.length > 0) {
                setCurrentIndex(0);
                setIsPlaying(true);
            }
            return [...prev, ...songs];
        });
    }, []);

    const removeFromQueue = useCallback(
        (song: Song) => {
            setQueue((prev) => {
                const newQueue = prev.filter((s) => s.id !== song.id);
                // Nếu bài hát hiện tại bị xóa, cập nhật lại currentIndex
                if (currentSong?.id === song.id) {
                    setCurrentIndex((prevIndex) =>
                        prevIndex >= newQueue.length
                            ? newQueue.length - 1
                            : prevIndex,
                    );
                }
                return newQueue;
            });
        },
        [currentSong],
    );

    // Xóa toàn bộ queue
    const clearQueue = useCallback(() => {
        setQueue([]);
        setCurrentIndex(-1);
        setIsPlaying(false);
        setCurrentContext({});
    }, []);

    // Play/Pause
    const togglePlayPause = useCallback(() => {
        setIsPlaying((prev) => {
            // Nếu không có bài hát nào thì không làm gì
            if (queue.length === 0) return false;
            return !prev;
        });
    }, [queue]);

    // Bài tiếp theo (xử lý khác nhau tùy chế độ phát)
    const playNext = useCallback(() => {
        if (!isPlaying) setIsPlaying(true);
        setCurrentIndex((prev) => {
            // Nếu đang ở chế độ repeat một bài
            if (repeatMode === "one") return prev;

            // Nếu đang bật shuffle
            if (isShuffled && queue.length > 1) {
                let nextIndex;
                do {
                    nextIndex = Math.floor(Math.random() * queue.length);
                } while (nextIndex === prev && queue.length > 1);
                return nextIndex;
            }

            // Nếu còn bài tiếp theo trong queue
            if (prev < queue.length - 1) return prev + 1;

            // Nếu hết queue
            if (repeatMode === "all") {
                // Lặp lại từ đầu
                return 0;
            } else {
                // Dừng phát
                setIsPlaying(false);
                return prev;
            }
        });
    }, [repeatMode, queue, playMode, isPlaying, isShuffled]);

    // Bài trước đó
    const playPrevious = useCallback(() => {
        if (!isPlaying) setIsPlaying(true);
        setCurrentIndex((prev) => {
            // Nếu đang bật shuffle
            if (isShuffled && queue.length > 1) {
                let prevIndex;
                do {
                    prevIndex = Math.floor(Math.random() * queue.length);
                } while (prevIndex === prev && queue.length > 1);
                return prevIndex;
            }
            // Nếu đang ở đầu queue và chế độ lặp tất cả
            if (prev <= 0 && repeatMode === "all") {
                return queue.length - 1;
            }
            // Nếu đang ở chế độ repeat một bài
            if (repeatMode === "one") return prev;
            // Nếu không phải bài đầu tiên
            if (prev > 0) return prev - 1;
            // Mặc định trở về đầu
            return 0;
        });
    }, [repeatMode, queue, playMode, isPlaying, isShuffled]);

    // Seek đến thời gian cụ thể
    const seekTo = useCallback((time: number) => {
        setCurrentTime(time);
    }, []);

    // Bật/tắt shuffle
    const toggleShuffle = useCallback(() => {
        setIsShuffled(!isShuffled);
    }, [isShuffled]);

    // Chuyển đổi chế độ repeat
    const toggleRepeat = useCallback(() => {
        setRepeatMode((prev) => {
            switch (prev) {
                case "none":
                    return "all";
                case "all":
                    return "one";
                case "one":
                    return "none";
                default:
                    return "none";
            }
        });
    }, []);

    if (songsError) return <div>Error loading songs</div>;

    return (
        <PlayerContext.Provider
            value={{
                // State
                currentSong,
                isPlaying,
                queue,
                shuffleQueue: shuffleQueue,
                currentIndex,
                playMode,
                repeatMode,
                isShuffled,
                currentTime,
                currentContext,

                // Actions
                playSong,
                playPlaylist,
                togglePlayPause,
                playNext,
                playPrevious,
                addToQueue,
                clearQueue,
                seekTo,
                toggleRepeat,
                toggleShuffle,
                removeFromQueue,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};
