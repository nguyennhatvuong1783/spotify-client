"use client";

import { AddEditSongDialog } from "@/components/Dialog/add-edit-song-dialog";
import { DeleteConfirmDialog } from "@/components/Dialog/delete-confirm-dialog";
import { ImportExcelDialog } from "@/components/Dialog/import-excel-dialog";
import { Plus, Search } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { fetcher } from "@/lib/api";
import { getCookie } from "@/lib/cookie";
import { Album } from "@/types/album";
import { ApiResponse } from "@/types/api";
import { Artist } from "@/types/artist";
import { CreateSongDto, Song } from "@/types/song";
import { FileDown, FileUp, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const SongsManager = () => {
    const MySwal = withReactContent(Swal);

    const { data, error, isLoading } = useSWR<ApiResponse<Song[]>>(
        "music/songs/",
        fetcher,
    );
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);
    const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [artistNames, setArtistNames] = useState<(string | undefined)[]>([]);
    const [albumNames, setAlbumNames] = useState<(string | undefined)[]>([]);

    // Filter songs based on search term
    const filteredSongs = data?.data?.filter((song) =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Handle add new user
    const handleAddSong = () => {
        setSelectedSong(null);
        setIsEditing(false);
        setIsAddEditDialogOpen(true);
    };

    // Handle edit song
    const handleEditSong = (song: Song) => {
        setSelectedSong(song);
        setIsEditing(true);
        setIsAddEditDialogOpen(true);
    };

    // Handle delete song
    const handleDeleteClick = (song: Song) => {
        setSelectedSong(song);
        setIsDeleteDialogOpen(true);
    };

    // Save song (add or edit)
    const handleSaveSong = async (song: CreateSongDto) => {
        const Toast = MySwal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = MySwal.stopTimer;
                toast.onmouseleave = MySwal.resumeTimer;
            },
        });

        if (isEditing) {
            // setSongs(songs.map((u) => (u.id === song.id ? song : u)));
        } else {
            try {
                const formData = new FormData();
                formData.append("title", song.title);
                formData.append("duration", song.duration?.toString() || "");
                formData.append("artist", song.artist?.toString() || "");
                formData.append("audio_file", song.audio_file as File);

                const token = getCookie("token");
                const response = await fetch(
                    "http://localhost:8000/api/music/songs/",
                    {
                        method: "POST",
                        body: formData,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                const result = await response.json();
                console.log("Upload result:", result);
                Toast.fire({
                    icon: "success",
                    title: "Add music successfully",
                });
                setIsAddEditDialogOpen(false);
                mutate("music/songs/");
            } catch (error) {
                console.error("Upload failed:", error);
                Toast.fire({
                    icon: "error",
                    title: "Add music failed",
                });
            }
        }
        console.log("song", song);
    };

    // Delete song
    const handleDeleteSong = () => {
        if (selectedSong) {
            setIsDeleteDialogOpen(false);
        }
    };

    // Handle import excel
    const handleImportExcel = () => {
        setIsImportDialogOpen(true);
    };

    // Handle export excel
    const handleExportExcel = () => {
        // exportToExcel(songs, "users");
    };

    // Import users from excel data
    const handleImportSongs = () => {
        setIsImportDialogOpen(false);
    };

    const GetArtistById = async (id: number): Promise<Artist | undefined> => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/music/artists/${id}/`,
            );
            if (!response.ok) {
                throw new Error("Failed to fetch artist data");
            }
            const artistData: ApiResponse<Artist> = await response.json();
            return artistData.data;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    };

    const GetAlbumById = async (id: number): Promise<Album | undefined> => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/music/albums/${id}/`,
            );
            if (!response.ok) {
                throw new Error("Failed to fetch album data");
            }
            const artistData: ApiResponse<Album> = await response.json();
            return artistData.data;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    };

    useEffect(() => {
        const fetchArtists = async () => {
            if (!data?.data) return;

            const promises = data.data.map((item) =>
                GetArtistById(item.artist ?? 1).then((artist) => artist?.name),
            );

            const results = await Promise.all(promises);
            setArtistNames(results);
        };

        const fetchAlbums = async () => {
            if (!data?.data) return;

            const promises = data.data.map((item) =>
                GetAlbumById(item.album ?? 1).then((album) => album?.title),
            );

            const results = await Promise.all(promises);
            setAlbumNames(results);
        };

        fetchArtists();
        fetchAlbums();
    }, [data]);

    if (error) return <div>Error loading songs</div>;

    return (
        <div className="container mx-auto py-10">
            <h1 className="mb-6 text-2xl font-bold">Song Management</h1>

            {/* Search and action buttons */}
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="relative w-full sm:w-64">
                    <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                    <Input
                        placeholder="Search for songs..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex w-full gap-2 sm:w-auto">
                    <Button className="cursor-pointer" onClick={handleAddSong}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add
                    </Button>
                    <Button
                        className="cursor-pointer"
                        onClick={handleImportExcel}
                    >
                        <FileUp className="mr-2 h-4 w-4" />
                        Import Excel
                    </Button>
                    <Button
                        className="cursor-pointer"
                        onClick={handleExportExcel}
                    >
                        <FileDown className="mr-2 h-4 w-4" />
                        Export Excel
                    </Button>
                </div>
            </div>

            {/* Songs table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-(--green-color)">
                                ID
                            </TableHead>
                            <TableHead className="text-(--green-color)">
                                Title
                            </TableHead>
                            <TableHead className="text-(--green-color)">
                                Duration
                            </TableHead>
                            <TableHead className="text-(--green-color)">
                                Artist
                            </TableHead>
                            <TableHead className="text-(--green-color)">
                                Album
                            </TableHead>
                            <TableHead className="text-right text-(--green-color)">
                                Active
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {!isLoading &&
                        filteredSongs &&
                        filteredSongs.length > 0 ? (
                            filteredSongs.map((song, index) => (
                                <TableRow key={song.id}>
                                    <TableCell>{song.id}</TableCell>
                                    <TableCell>{song.title}</TableCell>
                                    <TableCell>{song.duration}</TableCell>
                                    <TableCell>{artistNames[index]}</TableCell>
                                    <TableCell>{albumNames[index]}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                className="cursor-pointer"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleEditSong(song)
                                                }
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                className="cursor-pointer"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleDeleteClick(song)
                                                }
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="py-4 text-center"
                                >
                                    No songs found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Add/Edit Song Dialog */}
            <AddEditSongDialog
                open={isAddEditDialogOpen}
                onOpenChange={setIsAddEditDialogOpen}
                song={selectedSong}
                isEditing={isEditing}
                onSave={handleSaveSong}
            />

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                onConfirm={handleDeleteSong}
            />

            {/* Import Excel Dialog */}
            <ImportExcelDialog
                open={isImportDialogOpen}
                onOpenChange={setIsImportDialogOpen}
                onImport={handleImportSongs}
            />
        </div>
    );
};

export default SongsManager;
