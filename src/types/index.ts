import { Dispatch, SetStateAction } from "react";

export type ClipboardEntry = {
    id: string;
    type: "text" | "image";
    content: string;
    pinned?: boolean;
    timestamp: number;
};

export type ClipboardContextType = {
    filteredHistory: ClipboardEntry[];
    addEntry: (newEntry: ClipboardEntry) => void;
    start(): Promise<() => Promise<void>>;
    stop(): void;
    isRunning: boolean;
    searchClipboard: (query: string) => ClipboardEntry[];
    searchQuery: string;
    setSearchQuery: Dispatch<SetStateAction<string>>;
    copyToClipboard: (content: string, type: "text" | "image") => Promise<void>;
    clearHistory: () => void;
    deleteEntry: (id: string) => void;
};

export type ClipboardPayload = Omit<ClipboardEntry, "id" | "timestamp">;

export type ClipboardListener = {
    start: () => Promise<void>;
    stop: () => void;
};

export enum ThemeType {
    System = "system",
    Light = "light",
    Dark = "dark",
}