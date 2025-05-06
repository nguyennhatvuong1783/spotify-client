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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { fetcher } from "@/lib/api";
import useSWR from "swr";
import { ApiResponse } from "@/types/api";
import { Artist } from "@/types/artist";

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
    const {
        data,
        error: errorData,
        isLoading,
    } = useSWR<ApiResponse<Artist[]>>("music/artists/", fetcher);

    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<CreateSongDto>({
        title: "",
        duration: null,
        artist: undefined,
        audio_file: undefined,
    });

    useEffect(() => {
        if (song && isEditing) {
            setFormData(song);
        } else {
            setFormData({
                title: "",
                duration: null,
                artist: undefined,
                audio_file: undefined,
            });
        }
    }, [song, isEditing, open]);

    useEffect(() => {
        handleChange("audio_file", file as File);
    }, [file]);

    const handleChange = (
        field: keyof CreateSongDto,
        value: string | boolean | number | File,
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

    if (errorData) return <div>Error: {errorData}</div>;

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
                            type="number"
                            placeholder="Number of seconds"
                            value={formData.duration?.toString()}
                            onChange={(e) =>
                                handleChange(
                                    "duration",
                                    parseInt(e.target.value, 10),
                                )
                            }
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="artist">Artist</Label>
                        <Select
                            value={formData.artist?.toString()}
                            onValueChange={(value) =>
                                handleChange("artist", parseInt(value, 10))
                            }
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select Artist" />
                            </SelectTrigger>
                            <SelectContent>
                                {isLoading ? (
                                    <SelectItem value="0">
                                        Loading...
                                    </SelectItem>
                                ) : (
                                    data?.data?.map((artist) => (
                                        <SelectItem
                                            key={artist.id}
                                            value={artist.id?.toString() ?? "1"}
                                        >
                                            {artist.name}
                                        </SelectItem>
                                    ))
                                )}
                            </SelectContent>
                        </Select>
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
