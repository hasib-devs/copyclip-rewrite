import { Dispatch, SetStateAction } from "react";

export type ClipType = {
    id: string;
    content_type: "text" | "image";
    content: string;
    is_pinned?: boolean;
    created_at: number;
};

export type ClipCreateType = Omit<ClipType, "id" | "created_at">;

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

