import { useContext } from "react";
import { ClipboardContext } from "../contexts/clipboard-context";

export function useClipboardContext() {
    const context = useContext(ClipboardContext);

    if (context === undefined) {
        throw new Error('useClipboardContext must be used within a ClipboardProvider');
    }

    return context;
}