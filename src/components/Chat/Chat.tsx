import React from "react";
import { ChatIcon, OpenChat } from "../icons/Icons";

interface ChatProps {
    chatSize: number;
    onClick: (newSize: number) => void;
}

const Chat: React.FC<ChatProps> = ({ onClick, chatSize }) => {
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
            )}
        </div>
    );
};

export default Chat;
