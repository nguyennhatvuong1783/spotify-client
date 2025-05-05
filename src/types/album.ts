import { Artist } from "./artist";
import { Genre } from "./genre";
import { Song } from "./song";

export interface Album {
    id?: number;
    title: string;
    release_date?: string | null;
    cover_image?: string;
    total_song?: number;
    artist: Artist;
    songs?: Song[];
    genre?: Genre;
}

export interface CreateAlbumDto {
    artist_id?: number | undefined;
    title: string;
    release_date?: string | null;
    image_url?: string | null;
    genre_id?: number | null;
    description?: string | null;
}

export interface UpdateAlbumDto {
    artist_id?: number;
    title?: string;
    release_date?: string | null;
    image_url?: string | null;
    genre_id?: number | null;
    description?: string | null;
}
