"use client";

import { AddEditUserDialog } from "@/components/Dialog/add-edit-user-dialog";
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
import { User } from "@/types/user";
import { FileDown, FileUp, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

// Demo data
const initialUsers: User[] = [
    {
        id: 1,
        username: "johndoe",
        email: "john.doe@example.com",
        phone: "0123456789",
        account_type: "admin",
        is_active: true,
    },
    {
        id: 2,
        username: "janedoe",
        email: "jane.doe@example.com",
        phone: "0987654321",
        account_type: "free",
        is_active: true,
    },
    {
        id: 3,
        username: "bobsmith",
        email: "bob.smith@example.com",
        phone: "0123498765",
        account_type: "free",
        is_active: false,
    },
    {
        id: 4,
        username: "alicejones",
        email: "alice.jones@example.com",
        phone: "0567891234",
        account_type: "premium",
        is_active: true,
    },
    {
        id: 5,
        username: "mikebrown",
        email: "mike.brown@example.com",
        phone: "0345678912",
        account_type: "free",
        is_active: false,
    },
];

const UsersManager = () => {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Filter users based on search term
    const filteredUsers = users.filter(
        (user) =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phone.includes(searchTerm),
    );

    // Handle add new user
    const handleAddUser = () => {
        setSelectedUser(null);
        setIsEditing(false);
        setIsAddEditDialogOpen(true);
    };

    // Handle edit user
    const handleEditUser = (user: User) => {
        setSelectedUser(user);
        setIsEditing(true);
        setIsAddEditDialogOpen(true);
    };

    // Handle delete user
    const handleDeleteClick = (user: User) => {
        setSelectedUser(user);
        setIsDeleteDialogOpen(true);
    };

    // Save user (add or edit)
    const handleSaveUser = (user: User) => {
        if (isEditing) {
            setUsers(users.map((u) => (u.id === user.id ? user : u)));
        } else {
            setUsers([...users, { ...user, id: (users.length + 1) as number }]);
        }
        setIsAddEditDialogOpen(false);
    };

    // Delete user
    const handleDeleteUser = () => {
        if (selectedUser) {
            setUsers(users.filter((user) => user.id !== selectedUser.id));
            setIsDeleteDialogOpen(false);
        }
    };

    // Handle import excel
    const handleImportExcel = () => {
        setIsImportDialogOpen(true);
    };

    // Handle export excel
    const handleExportExcel = () => {
        exportToExcel(users, "users");
    };

    // Import users from excel data
    const handleImportUsers = (importedUsers: User[]) => {
        setUsers([...users, ...importedUsers]);
        setIsImportDialogOpen(false);
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="mb-6 text-2xl font-bold">User Management</h1>

            {/* Search and action buttons */}
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="relative w-full sm:w-64">
                    <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                    <Input
                        placeholder="Search for users..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex w-full gap-2 sm:w-auto">
                    <Button className="cursor-pointer" onClick={handleAddUser}>
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

            {/* Users table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-(--green-color)">
                                ID
                            </TableHead>
                            <TableHead className="text-(--green-color)">
                                Username
                            </TableHead>
                            <TableHead className="text-(--green-color)">
                                Email
                            </TableHead>
                            <TableHead className="text-(--green-color)">
                                Phone number
                            </TableHead>
                            <TableHead className="text-(--green-color)">
                                Account type
                            </TableHead>
                            <TableHead className="text-(--green-color)">
                                Status
                            </TableHead>
                            <TableHead className="text-right text-(--green-color)">
                                Active
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                user.account_type === "admin"
                                                    ? "destructive"
                                                    : user.account_type ===
                                                        "free"
                                                      ? "default"
                                                      : "secondary"
                                            }
                                        >
                                            {user.account_type === "admin"
                                                ? "Admin"
                                                : user.account_type === "free"
                                                  ? "Free"
                                                  : "Premium"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            className={
                                                user.is_active
                                                    ? "text-(--green-color)"
                                                    : "text-red-500"
                                            }
                                            variant={
                                                user.is_active
                                                    ? "default"
                                                    : "outline"
                                            }
                                        >
                                            {user.is_active
                                                ? "Active"
                                                : "Inactive"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                className="cursor-pointer"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleEditUser(user)
                                                }
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                className="cursor-pointer"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleDeleteClick(user)
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
                                    No users found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Add/Edit User Dialog */}
            <AddEditUserDialog
                open={isAddEditDialogOpen}
                onOpenChange={setIsAddEditDialogOpen}
                user={selectedUser}
                isEditing={isEditing}
                onSave={handleSaveUser}
            />

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                onConfirm={handleDeleteUser}
            />

            {/* Import Excel Dialog */}
            <ImportExcelDialog
                open={isImportDialogOpen}
                onOpenChange={setIsImportDialogOpen}
                onImport={handleImportUsers}
            />
        </div>
    );
};

export default UsersManager;
