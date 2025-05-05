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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { User } from "@/types/user";

interface AddEditUserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: User | null;
    isEditing: boolean;
    onSave: (user: User) => void;
}

export function AddEditUserDialog({
    open,
    onOpenChange,
    user,
    isEditing,
    onSave,
}: AddEditUserDialogProps) {
    const [formData, setFormData] = useState<User>({
        username: "",
        email: "",
        phone: "",
        account_type: "admin",
        is_active: true,
    });

    useEffect(() => {
        if (user && isEditing) {
            setFormData(user);
        } else {
            setFormData({
                username: "",
                email: "",
                phone: "",
                account_type: "admin",
                is_active: true,
            });
        }
    }, [user, isEditing, open]);

    const handleChange = (field: keyof User, value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = () => {
        onSave(formData);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="border-(--secondary-color) bg-black brightness-150 sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? "Edit user" : "Add new user"}
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            value={formData.username}
                            onChange={(e) =>
                                handleChange("username", e.target.value)
                            }
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                handleChange("email", e.target.value)
                            }
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone">Phone number</Label>
                        <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) =>
                                handleChange("phone", e.target.value)
                            }
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="accountType">Account type</Label>
                        <Select
                            value={formData.account_type}
                            onValueChange={(value) =>
                                handleChange(
                                    "account_type",
                                    value as
                                        | "free"
                                        | "premium"
                                        | "admin"
                                        | "artist",
                                )
                            }
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Chọn loại tài khoản" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="free">Free</SelectItem>
                                <SelectItem value="premium">Premium</SelectItem>
                                <SelectItem value="artist">Artist</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="isActive" className="text-right">
                            Status
                        </Label>
                        <div className="col-span-3 flex items-center space-x-2">
                            <Switch
                                id="isActive"
                                checked={formData.is_active}
                                onCheckedChange={(checked) =>
                                    handleChange("is_active", checked)
                                }
                            />
                            <Label htmlFor="isActive">
                                {formData.is_active ? "Active" : "Inactive"}
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
