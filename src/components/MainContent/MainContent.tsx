import React from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "../ui/resizable";
import LeftMenu from "../LeftMenu/LeftMenu";
import Chat from "../Chat/Chat";
import { ScrollArea } from "../ui/scroll-area";
import Footer from "../Footer/Footer";

interface MainContentProps {
    Content: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ Content }) => {
    const isMobile = false;

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
            <ResizablePanel defaultSize={isMobile ? 80 : 55}>
                <div className="h-full overflow-hidden rounded-md bg-(image:--gradient-color)">
                    <ScrollArea className="h-[calc(100vh-70px)] px-3">
                        {Content}
                        <Footer />
                    </ScrollArea>
                </div>
            </ResizablePanel>

            <ResizableHandle className="w-2 rounded-lg bg-black transition-colors" />

            {/* Right sidebar */}
            <ResizablePanel
                defaultSize={20}
                minSize={0}
                maxSize={25}
                collapsedSize={0}
            >
                <Chat />
            </ResizablePanel>
        </ResizablePanelGroup>
    );
};

export default MainContent;
