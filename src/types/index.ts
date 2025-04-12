
export type ClipboardEntry = {
    id: string;
    type: "text" | "image";
    content: string;
    pinned?: boolean;
};

export type ClipboardContextType = {
    history: ClipboardEntry[],
    addEntry: (newEntry: ClipboardEntry) => void;
    start(): Promise<() => Promise<void>>;
    stop(): void;
    isRunning: boolean;
    searchClipboard: (query: string) => ClipboardEntry[];
};

export type ClipboardPayload = Omit<ClipboardEntry, "id">;

export type ClipboardListener = {
    start: () => Promise<void>;
    stop: () => void;
};

export enum ThemeType {
    System = "system",
    Light = "light",
    Dark = "dark",
}