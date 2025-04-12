import { createContext, FC, ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { startListening } from "tauri-plugin-clipboard-api";
import { ClipboardContextType, ClipboardEntry, ClipboardPayload } from "../types";
import { setupListeners } from "../utils/core";

export const ClipboardContext = createContext<ClipboardContextType | undefined>(undefined);

export const ClipboardProvider: FC<{ children: ReactElement; }> = ({ children }) => {
    const [isRunning, setIsRunning] = useState(true);
    const [history, setHistory] = useState<ClipboardEntry[]>([]);
    const abortControllerRef = useRef<AbortController>();

    const stop = useCallback(() => {
        abortControllerRef.current?.abort();
    }, []);

    const start = useCallback(async () => {
        stop();
        abortControllerRef.current = new AbortController();
        return startListening();
    }, [stop]);

    const searchClipboard = (query: string) =>
        history.filter(entry =>
            entry.type === 'text' && entry.content.includes(query)
        );

    const reportError = useCallback((error: Error) => {
        console.error(error);
        if (import.meta.env.PROD) {
            //   sentry.captureException(error);
        }
    }, []);

    const addEntry = (newEntry: ClipboardPayload) => {
        setHistory(prev => {
            if (prev[0]?.content === newEntry.content) return prev;

            return [{ ...newEntry, id: crypto.randomUUID() }, ...prev];
        });
    };

    useEffect(() => {
        setupListeners({
            abortControllerRef,
            addEntry,
            setIsRunning,
        });

        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    const value: ClipboardContextType = {
        history,
        addEntry,
        start,
        stop,
        isRunning,
        searchClipboard
    };

    return (
        <ClipboardContext.Provider value={value}>{children}</ClipboardContext.Provider>
    );
};