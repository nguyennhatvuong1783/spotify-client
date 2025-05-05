"use client";

import { AddEditPlaylistDialog } from "@/components/Dialog/add-edit-playlist-dialog";
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
import { exportToExcel } from "@/lib/excel-utils";
import { Playlist } from "@/types/playlist";
import { FileDown, FileUp, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

// Demo data
const initialUsers: Playlist[] = [
    {
        id: 1,
        title: "My Favorite Songs",
        description: "A collection of my favorite songs.",
        image_url: "https://example.com/image1.jpg",
        songs_count: 10,
        user: {
            id: 1,
            username: "john_doe",
            email: "",
            phone: "123-456-7890",
            account_type: "admin",
            is_active: true,
        },
    },
    {
        id: 2,
        title: "Chill Vibes",
        description: "Relaxing music for a chill day.",
        image_url: "https://example.com/image2.jpg",
        songs_count: 15,
        user: {
            id: 2,
            username: "jane_doe",
            email: "",
            phone: "987-654-3210",
            account_type: "premium",
            is_active: true,
        },
    },
    {
        id: 3,
        title: "Workout Mix",
        description: "High-energy songs for workouts.",
        image_url: "https://example.com/image3.jpg",
        songs_count: 20,
        user: {
            id: 3,
            username: "alice_smith",
            email: "",
            phone: "555-123-4567",
            account_type: "free",
            is_active: false,
        },
    },
];

const PlaylistsManager = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>(initialUsers);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(
        null,
    );
    const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Filter playlists based on search term
    const filteredPlaylists = playlists.filter(
        (playlist) =>
            playlist.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            playlist.description
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            playlist.user?.username
                .toLowerCase()
                .includes(searchTerm.toLowerCase()),
    );

    // Handle add new playlist
    const handleAddPlaylist = () => {
        setSelectedPlaylist(null);
        setIsEditing(false);
        setIsAddEditDialogOpen(true);
    };

    // Handle edit playlist
    const handleEditPlaylist = (playlist: Playlist) => {
        setSelectedPlaylist(playlist);
        setIsEditing(true);
        setIsAddEditDialogOpen(true);
    };

    // Handle delete playlist
    const handleDeleteClick = (playlist: Playlist) => {
        setSelectedPlaylist(playlist);
        setIsDeleteDialogOpen(true);
    };

    // Save playlist (add or edit)
    const handleSavePlaylist = (playlist: Playlist) => {
        if (isEditing) {
            // setPlaylists(
            //     playlists.map((p) => (p.id === playlist.id ? playlist : p)),
            // );
        } else {
            // setPlaylists([
            //     ...playlists,
            //     { ...playlist, id: (playlists.length + 1) as number },
            // ]);
        }
        console.log("playlist: ", playlist);
        setIsAddEditDialogOpen(false);
    };

    // Delete playlist
    const handleDeletePlaylist = () => {
        if (selectedPlaylist) {
            setPlaylists(
                playlists.filter(
                    (playlist) => playlist.id !== selectedPlaylist.id,
                ),
            );
            setIsDeleteDialogOpen(false);
        }
    };

    // Handle import excel
    const handleImportExcel = () => {
        setIsImportDialogOpen(true);
    };

    // Handle export excel
    const handleExportExcel = () => {
        exportToExcel(playlists, "playlists");
    };

    // Import playlist from excel data
    const handleImportPlaylists = (importedPlaylists: Playlist[]) => {
        setPlaylists([...playlists, ...importedPlaylists]);
        setIsImportDialogOpen(false);
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="mb-6 text-2xl font-bold">Playlist Management</h1>

            {/* Search and action buttons */}
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="relative w-full sm:w-64">
                    <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                    <Input
                        placeholder="Search for playlists..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex w-full gap-2 sm:w-auto">
                    <Button
                        className="cursor-pointer"
                        onClick={handleAddPlaylist}
                    >
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

            {/* Playlists table */}
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
                                User
                            </TableHead>
                            <TableHead className="text-(--green-color)">
                                NUmber of Song
                            </TableHead>
                            <TableHead className="text-(--green-color)">
                                Description
                            </TableHead>
                            <TableHead className="text-right text-(--green-color)">
                                Active
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPlaylists.length > 0 ? (
                            filteredPlaylists.map((playlist) => (
                                <TableRow key={playlist.id}>
                                    <TableCell>{playlist.id}</TableCell>
                                    <TableCell>{playlist.title}</TableCell>
                                    <TableCell>
                                        {playlist.user?.username}
                                    </TableCell>
                                    <TableCell>
                                        {playlist.songs_count}
                                    </TableCell>
                                    <TableCell>
                                        {playlist.description}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                className="cursor-pointer"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleEditPlaylist(playlist)
                                                }
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                className="cursor-pointer"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleDeleteClick(playlist)
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
                                    No playlists found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Add/Edit Playlist Dialog */}
            <AddEditPlaylistDialog
                open={isAddEditDialogOpen}
                onOpenChange={setIsAddEditDialogOpen}
                playlist={selectedPlaylist}
                isEditing={isEditing}
                onSave={handleSavePlaylist}
            />

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                onConfirm={handleDeletePlaylist}
            />

            {/* Import Excel Dialog */}
            <ImportExcelDialog
                open={isImportDialogOpen}
                onOpenChange={setIsImportDialogOpen}
                onImport={handleImportPlaylists}
            />
        </div>
    );
};

export default PlaylistsManager;
