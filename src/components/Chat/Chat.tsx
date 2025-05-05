import React, { useState } from "react";
import { ChatIcon, OpenChat } from "../icons/Icons";
import { ThemeProvider } from "../ui/theme-provider";
import { User } from "@/types/user";
import { ThemeToggle } from "./theme-toggle";
import { ChatScreen } from "./chat-screen";
import { UserList } from "./user-list";
import { demoUsers } from "@/contexts/demo-users";

interface ChatProps {
    chatSize: number;
    onClick: (newSize: number) => void;
}

const Chat: React.FC<ChatProps> = ({ onClick, chatSize }) => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleUserSelect = (user: User) => {
        setSelectedUser(user);
    };

    const handleBackToList = () => {
        setSelectedUser(null);
    };

    return (
        <div className="ml-2 h-full rounded-md bg-(--main-color) p-4">
            {chatSize == 5 ? (
                <div className="group flex h-fit w-full justify-center">
                    <ChatIcon
                        className="h-6 w-6 cursor-pointer group-hover:hidden"
                        onClick={() => onClick(chatSize == 5 ? 25 : 5)}
                    />
                    <OpenChat
                        className="hidden h-6 w-6 rotate-180 cursor-pointer group-hover:block"
                        onClick={() => onClick(chatSize == 5 ? 25 : 5)}
                    />
                </div>
            ) : (
                <div className="flex flex-col">
                    <div className="group float-right h-fit w-fit">
                        <ChatIcon
                            className="h-6 w-6 cursor-pointer group-hover:hidden"
                            onClick={() => onClick(chatSize == 5 ? 25 : 5)}
                        />
                        <OpenChat
                            className="hidden h-6 w-6 cursor-pointer group-hover:block"
                            onClick={() => onClick(chatSize == 5 ? 25 : 5)}
                        />
                    </div>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <main className="flex min-h-screen flex-col items-center justify-between bg-(--main-color) pt-2">
                            <div className="mx-auto w-full max-w-md overflow-hidden rounded-xl bg-(--main-color) shadow-md">
                                <div className="absolute top-4 right-4">
                                    <ThemeToggle />
                                </div>
                                {selectedUser ? (
                                    <ChatScreen
                                        user={selectedUser}
                                        onBack={handleBackToList}
                                    />
                                ) : (
                                    <UserList
                                        users={demoUsers}
                                        onUserSelect={handleUserSelect}
                                    />
                                )}
                            </div>
                        </main>
                    </ThemeProvider>
                </div>
            )}
        </div>
    );
};

export default Chat;
