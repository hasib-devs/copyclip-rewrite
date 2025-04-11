import { Dispatch } from "react";

export type ClipboardEntry = {
    id: string;
    type: "text" | "image";
    content: string;
    pinned?: boolean;
};

export type ClipboardContextType = {
    history: ClipboardEntry[],
    setHistory: Dispatch<React.SetStateAction<ClipboardEntry[]>>;
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