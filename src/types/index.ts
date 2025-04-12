import { Dispatch, SetStateAction } from "react";

export type ClipboardEntry = {
    id: string;
    type: "text" | "image";
    content: string;
    pinned?: boolean;
    timestamp: number;
    contentType: 'text/plain' | 'image/png';
};

export type DBOptions = {
    name: string;
    version: number;
    objectStores: Array<{
        name: string;
        keyPath: string;
        indexes?: Array<{
            name: string;
            keyPath: string | string[];
            options?: IDBIndexParameters;
        }>;
    }>;
};

export type QueryParams = {
    indexName?: string;
    range?: IDBKeyRange;
    direction?: IDBCursorDirection;
    filter?: (value: any) => boolean;
    count?: number;
};

export type ClipboardContextType = {
    history: ClipboardEntry[];
    setHistory: React.Dispatch<React.SetStateAction<ClipboardEntry[]>>;
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

export type DatabaseContextType = {
    addEntry: (entry: ClipboardPayload) => Promise<void>;
    deleteEntry: (id: string) => Promise<void>;
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