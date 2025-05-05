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
import { Switch } from "@/components/ui/switch";
import { Artist, CreateArtistDto } from "@/types/artist";

interface AddEditArtistDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    artist: Artist | null;
    isEditing: boolean;
    onSave: (artist: CreateArtistDto) => void;
}

export function AddEditArtistDialog({
    open,
    onOpenChange,
    artist,
    isEditing,
    onSave,
}: AddEditArtistDialogProps) {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<CreateArtistDto>({
        name: "",
        biography: "",
        image_url: "",
        is_verified: true,
    });

    useEffect(() => {
        if (artist && isEditing) {
            setFormData(artist);
        } else {
            setFormData({
                name: "",
                biography: "",
                image_url: "",
                is_verified: true,
            });
        }
        setFile(null);
    }, [artist, isEditing, open]);

    const handleChange = (
        field: keyof CreateArtistDto,
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
                        {isEditing ? "Edit artist" : "Add new artist"}
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            name
                        </Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                                handleChange("name", e.target.value)
                            }
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="biography" className="text-right">
                            Biography
                        </Label>
                        <Input
                            id="biography"
                            value={formData.biography ?? ""}
                            onChange={(e) =>
                                handleChange("biography", e.target.value)
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
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="isVerified" className="text-right">
                            Verify
                        </Label>
                        <div className="col-span-3 flex items-center space-x-2">
                            <Switch
                                id="isVerified"
                                checked={formData.is_verified}
                                onCheckedChange={(checked) =>
                                    handleChange("is_verified", checked)
                                }
                            />
                            <Label htmlFor="isVerified">
                                {formData.is_verified
                                    ? "Verified"
                                    : "Not verified"}
                            </Label>
                        </div>
                    </div>
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
