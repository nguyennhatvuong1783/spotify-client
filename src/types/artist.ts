import { Album } from "./album";
import { Song } from "./song";

export interface Artist {
    id?: number;
    user_id?: number | null;
    verified: boolean;
    name: string;
    bio: string | null;
    profile_picture?: string;
    monthly_listeners: number;
    songs_count: number;
    albums_count: number;
    songs?: Song[];
    albums?: Album[];
}

export interface CreateArtistDto {
    name: string;
    bio?: string | null;
    profile_picture?: string | null;
    verified?: boolean;
}

export interface UpdateArtistDto {
    name?: string;
    bio?: string | null;
    profile_picture?: string | null;
    verified?: boolean;
}

export interface ArtistDisplay
    extends Omit<Artist, "created_at" | "updated_at"> {
    formattedDate?: string;
}
