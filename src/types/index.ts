import { Dispatch } from "react";

export type ClipboardEntry = {
    content: string;
    timestamp: string;
};

export type ClipboardContextType = {
    history: ClipboardEntry[],
    setHistory: Dispatch<React.SetStateAction<ClipboardEntry[]>>;
};