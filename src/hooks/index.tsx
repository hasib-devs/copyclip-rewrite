import { useContext } from "react";
import { ClipboardContext } from "@/contexts/clipboard-context";
import { DatabaseContext } from "@/contexts/db-context";

export function useClipboard() {
    const context = useContext(ClipboardContext);

    if (context === undefined) {
        throw new Error('useClipboard must be used within a ClipboardProvider');
    }

    return context;
}

export function useDatabase() {
    const context = useContext(DatabaseContext);

    if (context === undefined) {
        throw new Error('useDatabase must be used within a DatabaseProvider');
    }

    return context;
}