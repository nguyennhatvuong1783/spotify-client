"use client";

import { AddEditAlbumDialog } from "@/components/Dialog/add-edit-album-dialog";
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
import { Album, CreateAlbumDto } from "@/types/album";
import { ApiResponse } from "@/types/api";
import { FileDown, FileUp, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";

const AlbumsManager = () => {
    const { data, error, isLoading } = useSWR<ApiResponse<Album[]>>(
        "music/albums/",
        fetcher,
    );
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
    const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Filter albums based on search term
    const filteredAlbums = data?.data?.filter(
        (album) =>
            album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            album.artist.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Handle add new album
    const handleAddAlbum = () => {
        setSelectedAlbum(null);
        setIsEditing(false);
        setIsAddEditDialogOpen(true);
    };

    // Handle edit album
    const handleEditAlbum = (album: Album) => {
        setSelectedAlbum(album);
        setIsEditing(true);
        setIsAddEditDialogOpen(true);
    };

    // Handle delete album
    const handleDeleteClick = (album: Album) => {
        setSelectedAlbum(album);
        setIsDeleteDialogOpen(true);
    };

    // Save album (add or edit)
    const handleSaveAlbum = (album: CreateAlbumDto) => {
        if (isEditing) {
            // setAlbums(albums.map((u) => (u.id === album.id ? album : u)));
        } else {
            // setAlbums([
            //     ...albums,
            //     { ...album, id: (albums.length + 1) as number },
            // ]);
        }
        console.log("Album: ", album);
        setIsAddEditDialogOpen(false);
    };

    // Delete album
    const handleDeleteAlbum = () => {
        if (selectedAlbum) {
            setIsDeleteDialogOpen(false);
        }
    };

    // Handle import excel
    const handleImportExcel = () => {
        setIsImportDialogOpen(true);
    };

    // Handle export excel
    const handleExportExcel = () => {
        // exportToExcel(albums, "albums");
    };

    // Import albums from excel data
    const handleImportAlbums = () => {
        setIsImportDialogOpen(false);
    };

    if (error) return <div>Error loading albums</div>;

    return (
        <div className="container mx-auto py-10">
            <h1 className="mb-6 text-2xl font-bold">Album Management</h1>

            {/* Search and action buttons */}
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="relative w-full sm:w-64">
                    <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                    <Input
                        placeholder="Search for albums..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex w-full gap-2 sm:w-auto">
                    <Button className="cursor-pointer" onClick={handleAddAlbum}>
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

            {/* Albums table */}
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
                                Artist
                            </TableHead>
                            <TableHead className="text-(--green-color)">
                                Number of Song
                            </TableHead>
                            <TableHead className="text-right text-(--green-color)">
                                Active
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {!isLoading &&
                        filteredAlbums &&
                        filteredAlbums.length > 0 ? (
                            filteredAlbums.map((album) => (
                                <TableRow key={album.id}>
                                    <TableCell>{album.id}</TableCell>
                                    <TableCell>{album.title}</TableCell>
                                    <TableCell>{album.artist.name}</TableCell>
                                    <TableCell>{album.total_song}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                className="cursor-pointer"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleEditAlbum(album)
                                                }
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                className="cursor-pointer"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleDeleteClick(album)
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
                                    No albums found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Add/Edit Album Dialog */}
            <AddEditAlbumDialog
                open={isAddEditDialogOpen}
                onOpenChange={setIsAddEditDialogOpen}
                album={selectedAlbum}
                isEditing={isEditing}
                onSave={handleSaveAlbum}
            />

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                onConfirm={handleDeleteAlbum}
            />

            {/* Import Excel Dialog */}
            <ImportExcelDialog
                open={isImportDialogOpen}
                onOpenChange={setIsImportDialogOpen}
                onImport={handleImportAlbums}
            />
        </div>
    );
};

export default AlbumsManager;
