"use client";
import React, { useRef, useState } from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "../ui/resizable";
import LeftMenu from "../LeftMenu/LeftMenu";
import Chat from "../Chat/Chat";
import { ScrollArea } from "../ui/scroll-area";
import Footer from "../Footer/Footer";
import { ImperativePanelHandle } from "react-resizable-panels";
import { usePathname } from "next/navigation";

interface MainContentProps {
    Content: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ Content }) => {
    const currentPath = usePathname();
    console.log("Current path:", currentPath); // Log current path for debugging
    const isMobile = false;

    // State lưu kích thước hiện tại của Chat panel (đơn vị %)
    const [chatSize, setChatSize] = useState(5);

    // Ref để truy cập ResizablePanel của Chat
    const chatPanelRef = useRef<ImperativePanelHandle>(null);

    // Hàm thay đổi kích thước Chat panel
    const resizeChat = (newSize: number) => {
        setChatSize(newSize);
        chatPanelRef.current?.resize(newSize); // Áp dụng kích thước mới
    };

    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="flex h-fit w-full flex-1 overflow-hidden"
        >
            {/* Left sidebar */}
            <ResizablePanel
                defaultSize={25}
                minSize={isMobile ? 0 : 19}
                maxSize={28}
            >
                <LeftMenu />
            </ResizablePanel>

            <ResizableHandle className="w-2 rounded-lg bg-black transition-colors" />

            {/* Main content */}
            <ResizablePanel defaultSize={isMobile ? 80 : 70}>
                <div className="h-full overflow-hidden rounded-md bg-(image:--gradient-color)">
                    <ScrollArea
                        key={currentPath}
                        className="h-[calc(100vh-70px)] px-3"
                    >
                        {Content}
                        <Footer />
                    </ScrollArea>
                </div>
            </ResizablePanel>

            <ResizableHandle className="hidden" />

            {/* Right sidebar */}
            <ResizablePanel
                ref={chatPanelRef}
                minSize={5}
                maxSize={25}
                defaultSize={chatSize}
            >
                <Chat chatSize={chatSize} onClick={resizeChat} />
            </ResizablePanel>
        </ResizablePanelGroup>
    );
};

export default MainContent;
