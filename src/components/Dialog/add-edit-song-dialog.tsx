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
import { CreateSongDto, Song } from "@/types/song";

interface AddEditSongDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    song: Song | null;
    isEditing: boolean;
    onSave: (song: CreateSongDto) => void;
}

export function AddEditSongDialog({
    open,
    onOpenChange,
    song,
    isEditing,
    onSave,
}: AddEditSongDialogProps) {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<CreateSongDto>({
        title: "",
        duration: 0,
        artist_ids: [],
        file_url: "",
    });

    useEffect(() => {
        if (song && isEditing) {
            setFormData(song);
        } else {
            setFormData({
                title: "",
                duration: 0,
                artist_ids: [],
                file_url: "",
            });
        }
    }, [song, isEditing, open]);

    const handleChange = (
        field: keyof CreateSongDto,
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
                        {isEditing ? "Edit song" : "Add new song"}
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
                        <Label htmlFor="duration" className="text-right">
                            Duration
                        </Label>
                        <Input
                            id="duration"
                            type="duration"
                            placeholder="hh:mm:ss"
                            value={formData.duration}
                            onChange={(e) =>
                                handleChange("duration", e.target.value)
                            }
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="artist">Artist</Label>
                        <Input
                            id="artist"
                            value={formData.artist_ids?.join(", ")}
                            onChange={(e) =>
                                handleChange("artist_ids", e.target.value)
                            }
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="file">File</Label>
                        <Input
                            id="imageFile"
                            type="file"
                            accept=".mp3, .wav, .mp4"
                            onChange={handleFileChange}
                            className="col-span-3 cursor-pointer"
                        />
                    </div>
                    <p className="text-muted-foreground ml-45 -translate-y-3 text-sm">
                        (.mp3, .wav, .mp4)
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
