import React from "react";
import ContextItem from "../ContextItem/ContextItem";

interface ContextListProps {
    id?: string;
}

const ContextList: React.FC<ContextListProps> = ({ id = 0 }) => {
    return (
        <div className="my-5 mb-10 overflow-hidden">
            <div className="mb-9 flex items-end justify-between px-3 pt-13 font-bold">
                <p className="text-3xl">Trending songs {id}</p>
            </div>
            <div className="grid grid-cols-5 gap-y-6">
                <ContextItem />
                <ContextItem />
                <ContextItem />
                <ContextItem />
                <ContextItem />
                <ContextItem />
                <ContextItem />
                <ContextItem />
                <ContextItem />
                <ContextItem />
                <ContextItem />
                <ContextItem />
            </div>
        </div>
    );
};

export default ContextList;
