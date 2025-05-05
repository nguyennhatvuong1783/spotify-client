"use client";

import type React from "react";

import { useState } from "react";
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
import { FileUp } from "lucide-react";
import { parseExcelFile } from "@/lib/excel-utils";

interface ImportExcelDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onImport: (users: any[]) => void;
}

export function ImportExcelDialog({
    open,
    onOpenChange,
    onImport,
}: ImportExcelDialogProps) {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setError(null);
        }
    };

    const handleImport = async () => {
        if (!file) {
            setError("Vui lòng chọn file Excel để import");
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const users = await parseExcelFile(file);
            onImport(users);

            // Reset state
            setFile(null);
            setIsLoading(false);
        } catch (err) {
            setError(
                "Có lỗi xảy ra khi đọc file Excel. Vui lòng kiểm tra định dạng file.",
            );
            setIsLoading(false);
            console.error("Error parsing Excel file:", err);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="border-(--secondary-color) bg-black brightness-150 sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Import data from Excel</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="excel-file">Select Excel file</Label>
                        <div className="flex items-center gap-2">
                            <Input
                                id="excel-file"
                                type="file"
                                accept=".xlsx, .xls"
                                onChange={handleFileChange}
                                className="flex-1 cursor-pointer"
                            />
                        </div>
                        {file && (
                            <p className="text-muted-foreground text-sm">
                                Selected file: {file.name}
                            </p>
                        )}
                        {error && (
                            <p className="text-destructive text-sm">{error}</p>
                        )}
                        <div className="mt-2">
                            <p className="text-muted-foreground text-sm">
                                Excel file must be in correct format
                            </p>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        onClick={handleImport}
                        disabled={!file || isLoading}
                        className="cursor-pointer gap-2"
                    >
                        {isLoading ? (
                            "Đang xử lý..."
                        ) : (
                            <>
                                <FileUp className="h-4 w-4" />
                                Import
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
