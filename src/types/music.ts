export interface Song {
    id: number;
    title: string;
    image_url: string;
    audio_file: string;
    video_file: string | null;
    duration: number; // Hoac string
    lyrics: string | null;
    total_plays: number;
    release_date: string; // Trong db la `release_date` (can xem lai)
    // album?: Album | null;
    // artist: Artist;
    // genre?: Genre | null;
}
