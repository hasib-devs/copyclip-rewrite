import { Dispatch, SetStateAction } from "react";

export type ContentTypes = "text" | "image";
export type ClipType = {
    id: string;
    content_type: ContentTypes;
    content: string;
    is_pinned?: boolean;
    created_at: number;
    accesed_at: number;
};

export type ClipCreateType = Omit<ClipType, "id" | "created_at" | "accesed_at">;

export type ClipboardContextType = {
    clips: ClipType[];
    setClips: React.Dispatch<React.SetStateAction<ClipType[]>>;
    filteredClips: ClipType[];
    addClip: (newEntry: ClipType) => void;
    searchTerm: string;
    setSearchTerm: Dispatch<SetStateAction<string>>;
    filterTerm: string | "";
    setFilterTerm: Dispatch<SetStateAction<ContentTypes | "">>;
    copyToClipboard: (clip: ClipType) => Promise<void>;
    clearClips: (opt: ClearOptions) => void;
    deleteClip: (id: string) => void;
    isLoading: boolean;
    togglePin: (clip: ClipType) => void;
};

export enum ClearOptions {
    Pined,
    Unpined,
    All
}
