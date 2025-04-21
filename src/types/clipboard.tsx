import { Dispatch, SetStateAction } from "react";

export type ClipType = {
    id: string;
    type: "text" | "image";
    content: string;
    isPinned?: boolean;
    createdAt: number;
    lastUsed?: number;
};

export type ClipCreateType = Omit<ClipType, "id" | "createdAt">;

export type ClipboardContextType = {
    clips: ClipType[];
    setClips: React.Dispatch<React.SetStateAction<ClipType[]>>;
    filteredClips: ClipType[];
    addClip: (newEntry: ClipType) => void;
    searchQuery: string;
    setSearchQuery: Dispatch<SetStateAction<string>>;
    copyToClipboard: (content: string, type: "text" | "image") => Promise<void>;
    clear: () => void;
    deleteClip: (id: string) => void;
    isLoading: boolean;
};

