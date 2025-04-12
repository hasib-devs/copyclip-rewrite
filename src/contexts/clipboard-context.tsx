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

            const entry = {
                ...newEntry,
                id: crypto.randomUUID(),
                timestamp: Date.now()
            };

            return [entry, ...prev];
        });
    };

    // Load initial history
    useEffect(() => {
        try {
            const savedHistory = localStorage.getItem(STORAGE_KEY);
            if (savedHistory) {
                try {
                    const parsed = JSON.parse(savedHistory) as ClipboardEntry[];
                    setHistory(parsed);
                } catch (error) {
                    console.log("savedHistory parsed failed: ", error);
                }
            }
        } catch (error) {
            console.error("Failed to load clipboard history:", error);
        }
    }, []);

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