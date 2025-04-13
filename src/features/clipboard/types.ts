import { Dispatch, SetStateAction } from "react";

export type ClipType = {
    id: string;
    type: "text" | "image";
    content: string;
    pinned?: boolean;
    timestamp: number;
};

export type ClipCreateType = Omit<ClipType, "id" | "timestamp">;

export type ClipboardContextType = {
    clips: ClipType[];
    setClips: React.Dispatch<React.SetStateAction<ClipType[]>>;
    filteredClips: ClipType[];
    addClip: (newEntry: ClipType) => void;
    start(): Promise<() => Promise<void>>;
    stop(): void;
    isRunning: boolean;
    searchQuery: string;
    setSearchQuery: Dispatch<SetStateAction<string>>;
    copyToClipboard: (content: string, type: "text" | "image") => Promise<void>;
    clear: () => void;
    deleteClip: (id: string) => void;
};

