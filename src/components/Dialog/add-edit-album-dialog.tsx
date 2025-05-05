"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Album, CreateAlbumDto } from "@/types/album";

interface AddEditAlbumDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    album: Album | null;
    isEditing: boolean;
    onSave: (album: CreateAlbumDto) => void;
}

export function AddEditAlbumDialog({
    open,
    onOpenChange,
    album,
    isEditing,
    onSave,
}: AddEditAlbumDialogProps) {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<CreateAlbumDto>({
        title: "",
        description: "",
        artist_id: 0,
        image_url: "",
    });

    useEffect(() => {
        if (album && isEditing) {
            setFormData(album);
        } else {
            setFormData({
                title: "",
                description: "",
                artist_id: 0,
                image_url: "",
            });
        }
    }, [album, isEditing, open]);

    const handleChange = (
        field: keyof CreateAlbumDto,
        value: string | boolean,
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = () => {
        onSave(formData);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setError(null);
            console.log("file", file);
            console.log("error", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="border-(--secondary-color) bg-black brightness-150 sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? "Edit album" : "Add new album"}
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) =>
                                handleChange("title", e.target.value)
                            }
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            description
                        </Label>
                        <Input
                            id="description"
                            type="area"
                            value={formData.description ?? ""}
                            onChange={(e) =>
                                handleChange("description", e.target.value)
                            }
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="artist">Artist</Label>
                        <Input
                            id="artist"
                            value={formData.artist_id}
                            onChange={(e) =>
                                handleChange("artist_id", e.target.value)
                            }
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="imageFile">Image</Label>
                        <Input
                            id="imageFile"
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            onChange={handleFileChange}
                            className="col-span-3 cursor-pointer"
                        />
                    </div>
                    <p className="text-muted-foreground ml-45 -translate-y-3 text-sm">
                        (.png, .jpg, .jpeg)
                    </p>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        className="cursor-pointer"
                        onClick={handleSubmit}
                    >
                        {isEditing ? "Update" : "Add"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
