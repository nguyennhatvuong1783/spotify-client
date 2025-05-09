"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Music } from "lucide-react";
import Image from "next/image";

interface EditPlaylistDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialName?: string;
    onSave?: (data: { name: string }) => void;
}

export function EditPlaylistDialog({
    open,
    onOpenChange,
    initialName = "My Playlist #1",
    onSave,
}: EditPlaylistDialogProps) {
    const [name, setName] = useState(initialName);
    const [description, setDescription] = useState("");

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        onSave?.({ name });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="border-neutral-700 bg-[#121212] text-white sm:max-w-[600px]">
                <DialogHeader className="flex flex-row items-center justify-between">
                    <DialogTitle className="text-2xl font-bold">
                        Edit details
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSave}>
                    <div className="flex gap-4">
                        <Image
                            src="https://cdn.dribbble.com/userupload/20851422/file/original-b82fd38c350d47a4f8f4e689f609993a.png"
                            alt="Image"
                            width={200}
                            height={200}
                            className="aspect-square overflow-hidden rounded-sm object-cover"
                        />
                        <div className="flex-1 space-y-4">
                            <div className="space-y-2">
                                <label
                                    htmlFor="name"
                                    className="text-sm text-neutral-400"
                                >
                                    Name
                                </label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="border-none bg-neutral-700 focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                            </div>
                            <div className="space-y-2">
                                <Textarea
                                    placeholder="Add an optional description"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    className="h-32 resize-none border-none bg-neutral-700 focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <p className="max-w-[70%] text-xs text-neutral-400">
                            By proceeding, you agree to give Spotify access to
                            the image you choose to upload. Please make sure you
                            have the right to upload the image.
                        </p>
                        <Button
                            type="submit"
                            className="rounded-full bg-white px-8 text-black hover:bg-gray-200"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
