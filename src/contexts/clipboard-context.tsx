import { createContext, FC, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { startListening, writeText, writeImageBase64 } from "tauri-plugin-clipboard-api";
import { ClipboardContextType, ClipboardEntry, ClipboardPayload } from "../types";
import { setupListeners } from "../utils/core";

export const ClipboardContext = createContext<ClipboardContextType | undefined>(undefined);

export const ClipboardProvider: FC<{ children: ReactElement; }> = ({ children }) => {
    const [isRunning, setIsRunning] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
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

    // Filtered history implementation
    const filteredHistory = useMemo(() => {
        return history.filter(entry => {
            const matchesSearch = entry.type === 'text'
                ? entry.content.toLowerCase().includes(searchQuery.toLowerCase())
                : entry.content.includes(searchQuery);
            return matchesSearch;
        });
    }, [history, searchQuery]);

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

    // Clear all history
    const clearHistory = useCallback(() => {
        setHistory([]);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    // Delete entry implementation
    const deleteEntry = useCallback((id: string) => {
        setHistory(prev => {
            const newHistory = prev.filter(entry => entry.id !== id);
            setHistory(newHistory);
            return newHistory;
        });
    }, []);

    // Copy to clipboard implementation
    const copyToClipboard = useCallback(async (content: string, type: 'text' | 'image') => {
        try {
            if (type === 'text') {
                await writeText(content);
            } else {
                await writeImageBase64(content);
            }
            // Add to history
            addEntry({
                content,
                type
            });
            // setHistory(prev => {
            //     const newEntry = createEntry(content, type);
            //     return [newEntry, ...prev];
            // });
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
        }
    }, []);

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
        filteredHistory,
        addEntry,
        start,
        stop,
        isRunning,
        searchClipboard,
        searchQuery,
        setSearchQuery,
        copyToClipboard,
        clearHistory,
        deleteEntry,
    };

    return (
        <ClipboardContext.Provider value={value}>{children}</ClipboardContext.Provider>
    );
};