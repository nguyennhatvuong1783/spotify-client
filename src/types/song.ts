import { Album } from "./album";
import { Artist } from "./artist";

export interface Song {
    id?: number;
    title: string;
    artist?: Artist;
    album?: Album | null;
    duration: number;
    audio_file?: string;
    release_date?: string | null;
    total_plays?: number;
}

export interface CreateSongDto {
    title: string;
    artist_ids?: number[] | undefined;
    album_id?: number | null;
    duration: number;
    audio_file?: string | undefined;
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
    album?: Album | null;
    formatted_duration?: string;
    formatted_release_date?: string;
}
