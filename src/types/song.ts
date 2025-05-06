import { Album } from "./album";

export interface Song {
    id?: number;
    title: string;
    artist?: number;
    album?: number | null;
    duration: number;
    audio_file?: string;
    release_date?: string | null;
    total_plays?: number;
}

export interface CreateSongDto {
    title: string;
    artist?: number | undefined;
    album?: number | null;
    duration: number | null;
    audio_file?: File | undefined;
    release_date?: string | null;
}

export interface UpdateSongDto {
    title?: string;
    album_id?: number | null;
    duration?: number;
    audio_file?: string;
    release_date?: string | null;
}

export interface SongDisplay extends Omit<Song, "created_at" | "updated_at"> {
    albumO?: Album | null;
    formatted_duration?: string;
    formatted_release_date?: string;
}
