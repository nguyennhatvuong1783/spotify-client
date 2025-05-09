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
import { Playlist } from "@/types/playlist";

interface AddEditPlaylistDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    playlist: Playlist | null;
    isEditing: boolean;
    onSave: (playlist: Playlist) => void;
}

export function AddEditPlaylistDialog({
    open,
    onOpenChange,
    playlist,
    isEditing,
    onSave,
}: AddEditPlaylistDialogProps) {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<Playlist>({
        name: "",
        user: null,
        image_url: null,
    });

    useEffect(() => {
        if (playlist && isEditing) {
            setFormData(playlist);
        } else {
            setFormData({
                name: "",
                user: null,
                image_url: null,
            });
        }
    }, [playlist, isEditing, open]);

    const handleChange = (field: keyof Playlist, value: string | boolean) => {
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
                        {isEditing ? "Edit playlist" : "Add new playlist"}
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            title
                        </Label>
                        <Input
                            id="title"
                            value={formData.name}
                            onChange={(e) =>
                                handleChange("name", e.target.value)
                            }
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="user" className="text-right">
                            User
                        </Label>
                        <Input
                            id="user"
                            value={formData.user?.username ?? ""}
                            onChange={(e) =>
                                handleChange("user", e.target.value)
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
