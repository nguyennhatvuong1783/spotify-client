"use client";

import type { User } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface UserListProps {
    users: User[];
    onUserSelect: (user: User) => void;
}

export function UserList({ users, onUserSelect }: UserListProps) {
    return (
        <Card className="border-0 shadow-none">
            <CardHeader className="pb-2">
                <CardTitle className="text-xl">Chat</CardTitle>
            </CardHeader>
            <CardContent className="h-[55vh] space-y-4 overflow-y-auto p-0">
                <div className="divide-border divide-y">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="hover:bg-muted flex cursor-pointer items-center gap-4 p-4 transition-colors"
                            onClick={() => onUserSelect(user)}
                        >
                            <Avatar>
                                <AvatarImage
                                    src={
                                        user.profile_picture ||
                                        "/placeholder.svg"
                                    }
                                    alt={user.username}
                                />
                                <AvatarFallback>
                                    {user.username
                                        .substring(0, 2)
                                        .toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1">
                                <p className="font-medium">{user.username}</p>
                                <p className="text-muted-foreground truncate text-sm">
                                    {user.lastMessage}
                                </p>
                            </div>
                            <div className="text-muted-foreground text-xs">
                                {user.lastMessageTime}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
