import { Song } from "./song";
import { User } from "./user";

export interface Playlist {
    id?: number;
    name: string;
    image_url?: string | null;
    songs?: Song[];
    songs_count?: number;
    user: User | null;
    isSelected?: boolean;
}

export interface CreatePlaylistDto {
    name: string;
    description?: string | null;
    image_url?: string | null;
}

export interface UpdatePlaylistDto {
    name?: string;
    description?: string | null;
    image_url?: string | null;
}

export interface PlaylistDisplay
    extends Omit<Playlist, "created_at" | "updated_at"> {
    song_count?: number;
    duration_total?: number;
    formatted_duration?: string;
}
