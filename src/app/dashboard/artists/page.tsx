"use client";

import { AddEditArtistDialog } from "@/components/Dialog/add-edit-artist-dialog";
import { DeleteConfirmDialog } from "@/components/Dialog/delete-confirm-dialog";
import { ImportExcelDialog } from "@/components/Dialog/import-excel-dialog";
import { Plus, Search } from "@/components/icons/Icons";
import { Badge } from "@/components/ui/badge";
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
import { Artist, CreateArtistDto } from "@/types/artist";
import { FileDown, FileUp, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

// Demo data
const initialUsers: Artist[] = [
    {
        id: 1,
        name: "John Doe",
        biography: "Lorem ipsum dolor sit amet.",
        is_verified: true,
        songs_count: 10,
        albums_count: 5,
    },
    {
        id: 2,
        name: "Jane Smith",
        biography: "Consectetur adipiscing elit.",
        is_verified: false,
        songs_count: 8,
        albums_count: 3,
    },
    {
        id: 3,
        name: "Alice Johnson",
        biography: "Sed do eiusmod tempor incididunt.",
        is_verified: true,
        songs_count: 15,
        albums_count: 7,
    },
    {
        id: 4,
        name: "Bob Brown",
        biography: "Ut labore et dolore magna aliqua.",
        is_verified: false,
        songs_count: 5,
        albums_count: 2,
    },
    {
        id: 5,
        name: "Charlie Davis",
        biography: "Ut enim ad minim veniam.",
        is_verified: true,
        songs_count: 12,
        albums_count: 6,
    },
    {
        id: 6,
        name: "David Wilson",
        biography: "Quis nostrud exercitation ullamco laboris.",
        is_verified: false,
        songs_count: 7,
        albums_count: 4,
    },
];

const ArtistsManager = () => {
    const [artists, setArtists] = useState<Artist[]>(initialUsers);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
    const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Filter artists based on search term
    const filteredUsers = artists.filter(
        (artist) =>
            artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            artist.biography?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Handle add new artist
    const handleAddArtist = () => {
        setSelectedArtist(null);
        setIsEditing(false);
        setIsAddEditDialogOpen(true);
    };

    // Handle edit artist
    const handleEditArtist = (artist: Artist) => {
        setSelectedArtist(artist);
        setIsEditing(true);
        setIsAddEditDialogOpen(true);
    };

    // Handle delete artist
    const handleDeleteClick = (artist: Artist) => {
        setSelectedArtist(artist);
        setIsDeleteDialogOpen(true);
    };

    // Save artist (add or edit)
    const handleSaveArtist = (artist: CreateArtistDto) => {
        if (isEditing) {
            // setArtists(artists.map((u) => (u.id === artist.id ? artist : u)));
        } else {
            // setArtists([
            //     ...artists,
            //     { ...artist, id: (artists.length + 1) as number },
            // ]);
        }
        console.log("artist: ", artist);
        setIsAddEditDialogOpen(false);
    };

    // Delete artist
    const handleDeleteArtist = () => {
        if (selectedArtist) {
            setArtists(
                artists.filter((artist) => artist.id !== selectedArtist.id),
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
        exportToExcel(artists, "artists");
    };

    // Import artists from excel data
    const handleImportArtists = (importedArtists: Artist[]) => {
        setArtists([...artists, ...importedArtists]);
        setIsImportDialogOpen(false);
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="mb-6 text-2xl font-bold">Artist Management</h1>

            {/* Search and action buttons */}
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="relative w-full sm:w-64">
                    <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                    <Input
                        placeholder="Search for artists..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex w-full gap-2 sm:w-auto">
                    <Button
                        className="cursor-pointer"
                        onClick={handleAddArtist}
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

            {/* Artists table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-(--green-color)">
                                ID
                            </TableHead>
                            <TableHead className="text-(--green-color)">
                                Name
                            </TableHead>
                            <TableHead className="text-(--green-color)">
                                Biography
                            </TableHead>
                            <TableHead className="text-(--green-color)">
                                Verify
                            </TableHead>
                            <TableHead className="text-(--green-color)">
                                Number of song
                            </TableHead>
                            <TableHead className="text-(--green-color)">
                                Number of album
                            </TableHead>
                            <TableHead className="text-right text-(--green-color)">
                                Active
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((artist) => (
                                <TableRow key={artist.id}>
                                    <TableCell>{artist.id}</TableCell>
                                    <TableCell>{artist.name}</TableCell>
                                    <TableCell>{artist.biography}</TableCell>
                                    <TableCell>
                                        <Badge
                                            className={
                                                artist.is_verified
                                                    ? "text-(--green-color)"
                                                    : "text-red-500"
                                            }
                                            variant={
                                                artist.is_verified
                                                    ? "default"
                                                    : "outline"
                                            }
                                        >
                                            {artist.is_verified
                                                ? "Verified"
                                                : "Not verified"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{artist.songs_count}</TableCell>
                                    <TableCell>{artist.albums_count}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                className="cursor-pointer"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleEditArtist(artist)
                                                }
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                className="cursor-pointer"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleDeleteClick(artist)
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
                                    No artists found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Add/Edit Artist Dialog */}
            <AddEditArtistDialog
                open={isAddEditDialogOpen}
                onOpenChange={setIsAddEditDialogOpen}
                artist={selectedArtist}
                isEditing={isEditing}
                onSave={handleSaveArtist}
            />

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                onConfirm={handleDeleteArtist}
            />

            {/* Import Excel Dialog */}
            <ImportExcelDialog
                open={isImportDialogOpen}
                onOpenChange={setIsImportDialogOpen}
                onImport={handleImportArtists}
            />
        </div>
    );
};

export default ArtistsManager;
