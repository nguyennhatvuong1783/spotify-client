"use client";
import { usePlayer } from "@/hooks/usePlayer";
import { useRef } from "react";
import {
    Lyrics,
    Next,
    Pause,
    Play,
    Previous,
    Queue,
    Repeat,
    Shuffle,
    Volume,
} from "../icons/Icons";
import Image from "next/image";

const PlayerBar = () => {
    const {
        currentSong,
        isPlaying,
        togglePlayPause,
        playNext,
        playPrevious,
        toggleRepeat,
        toggleShuffle,
        isShuffled,
        repeatMode,
        currentTime,
        seekTo,
        queue,
    } = usePlayer();

    const audioRef = useRef<HTMLAudioElement>(null);
    const rangePlayer = useRef<HTMLInputElement>(null);
    const rangeVolume = useRef<HTMLInputElement>(null);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            seekTo(audioRef.current.currentTime);
        }
    };

    const handleSeek = () => {
        if (audioRef.current && rangePlayer.current) {
            audioRef.current.currentTime = Number(rangePlayer.current.value);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            audioRef.current.volume = Number(e.target.value);
        }
    };

    return (
        <div className="grid h-18 w-full grid-cols-13 items-center">
            {currentSong && (
                <audio
                    ref={audioRef}
                    src={currentSong.audio_file}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={playNext}
                    hidden
                    autoPlay={isPlaying}
                />
            )}
            <div className="col-span-4 flex items-center">
                {currentSong && (
                    <>
                        <Image
                            src={currentSong.image_url}
                            alt="Image"
                            width={56}
                            height={56}
                            className="mx-2 aspect-square overflow-hidden rounded object-cover"
                        />
                        <div className="flex flex-col justify-center px-[6px]">
                            <span className="text-sm font-medium">
                                {currentSong.title}
                            </span>
                            <span className="text-xs text-(--secondary-text-color)">
                                {/* {currentSong.artists
                                    .map((artist) => artist.name)
                                    .join(", ")} */}
                            </span>
                        </div>
                    </>
                )}
            </div>
            <div className="col-span-5 flex flex-col items-center justify-center gap-2">
                <div className="flex items-center justify-center gap-2">
                    <Shuffle
                        className={`m-2 h-4 w-4 cursor-pointer text-(--secondary-text-color) hover:scale-105 hover:brightness-150 active:scale-100 active:brightness-80 ${!queue.length && "pointer-events-none brightness-30"} ${isShuffled && "text-(--primary-color)"}`}
                        onClick={toggleShuffle}
                    />
                    <Previous
                        className={`m-2 h-4 w-4 cursor-pointer text-(--secondary-text-color) hover:scale-105 hover:brightness-150 active:scale-100 active:brightness-80 ${!queue.length && "pointer-events-none brightness-30"}`}
                        onClick={playPrevious}
                    />
                    <button
                        className={`mx-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-(--text-color) text-(--primary-color) transition duration-100 hover:scale-104 hover:brightness-90 active:scale-100 active:brightness-80 ${!queue.length && "pointer-events-none brightness-30"}`}
                        onClick={togglePlayPause}
                    >
                        {!isPlaying ? (
                            <Play className="h-5 w-5" />
                        ) : (
                            <Pause className="h-4 w-4" />
                        )}
                    </button>
                    <Next
                        className={`m-2 h-4 w-4 cursor-pointer text-(--secondary-text-color) hover:scale-105 hover:brightness-150 active:scale-100 active:brightness-80 ${!queue.length && "pointer-events-none brightness-30"}`}
                        onClick={playNext}
                    />
                    <Repeat
                        className={`m-2 h-4 w-4 cursor-pointer text-(--secondary-text-color) hover:scale-105 hover:brightness-150 active:scale-100 active:brightness-80 ${repeatMode !== "none" && "text-(--primary-color)"}`}
                        onClick={toggleRepeat}
                    />
                </div>
                <div className="flex w-full items-center justify-center gap-2 text-xs font-medium text-(--secondary-text-color)">
                    <span className="cursor-default">
                        {currentSong ? formatTime(currentTime) : "-:--"}
                    </span>
                    <input
                        ref={rangePlayer}
                        type="range"
                        min={0}
                        max={currentSong?.duration || 100}
                        step={0.5}
                        value={currentTime}
                        className={`slider-player slider relative h-[0.20rem] w-full flex-1 cursor-pointer appearance-none rounded bg-[#4d4d4d] ${!currentSong && "pointer-events-none"}`}
                        onChange={(e) => seekTo(Number(e.target.value))}
                        onMouseUp={handleSeek}
                        onTouchEnd={handleSeek}
                    />
                    <span className="cursor-default">
                        {currentSong
                            ? formatTime(currentSong.duration)
                            : "-:--"}
                    </span>
                </div>
            </div>
            <div className="col-span-4 flex items-center justify-center pl-32">
                <Lyrics className="m-2 h-4 w-4 cursor-pointer text-(--secondary-text-color) hover:scale-105 hover:brightness-150 active:scale-100 active:brightness-80" />
                <Queue className="m-2 h-4 w-4 cursor-pointer text-(--secondary-text-color) hover:scale-105 hover:brightness-150 active:scale-100 active:brightness-80" />
                <Volume
                    className="m-2 h-4 w-4 cursor-pointer text-(--secondary-text-color) hover:brightness-150 active:brightness-80"
                    onClick={() => {
                        if (audioRef.current) {
                            audioRef.current.muted = !audioRef.current.muted;
                        }
                    }}
                />
                <input
                    ref={rangeVolume}
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    defaultValue={1}
                    className="slider-volume slider relative h-[0.20rem] w-24 cursor-pointer appearance-none rounded bg-[#4d4d4d]"
                    onChange={handleVolumeChange}
                />
            </div>
        </div>
    );
};

const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default PlayerBar;
