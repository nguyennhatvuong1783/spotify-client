"use client";

import type React from "react";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { ArrowLeft, Send } from "lucide-react";
import { Message, User } from "@/types/user";
import { demoMessages } from "@/contexts/demo-messages";

interface ChatScreenProps {
    user: User;
    onBack: () => void;
}

export function ChatScreen({ user, onBack }: ChatScreenProps) {
    const [messages, setMessages] = useState<Message[]>(
        demoMessages[user.id ?? 1] || [],
    );
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const message: Message = {
            id: Date.now().toString(),
            senderId: "me",
            text: newMessage,
            timestamp: new Date().toISOString(),
        };

        setMessages([...messages, message]);
        setNewMessage("");

        // Simulate reply after 1 second
        setTimeout(() => {
            const reply: Message = {
                id: (Date.now() + 1).toString(),
                senderId: user.id?.toString() || "1",
                text: `Đây là tin nhắn tự động từ ${user.username}`,
                timestamp: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, reply]);
        }, 1000);
    };

    return (
        <Card className="flex h-[70vh] flex-col border-0 shadow-none">
            <CardHeader className="border-border flex flex-row items-center gap-3 border-b px-4 pb-3">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onBack}
                    className="h-8 w-8 cursor-pointer"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <Avatar className="h-8 w-8">
                    <AvatarImage
                        src={user.profile_picture || "/placeholder.svg"}
                        alt={user.username}
                    />
                    <AvatarFallback>
                        {user.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="text-base font-medium">{user.username}</h2>
                </div>
            </CardHeader>

            <CardContent className="flex-1 space-y-4 overflow-y-auto p-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                message.senderId === "me"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-secondary text-secondary-foreground"
                            }`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
            </CardContent>

            <CardFooter className="border-border border-t p-3 pb-0">
                <form
                    onSubmit={handleSendMessage}
                    className="flex w-full gap-2"
                >
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Enter message..."
                        className="flex-1"
                    />
                    <Button
                        type="submit"
                        size="icon"
                        className="cursor-pointer"
                    >
                        <Send className="h-5 w-5" />
                    </Button>
                </form>
            </CardFooter>
        </Card>
    );
}
