import { createContext, FC, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { startListening, writeImageBase64, writeText } from "tauri-plugin-clipboard-api";
import { ClipboardContextType, ClipboardEntry, ClipboardPayload } from "../types";
import { setupListeners } from "../utils/core";
import { useDatabase } from "../hooks";
import { STORE_NAME } from "../utils/constants";

export const ClipboardContext = createContext<ClipboardContextType | undefined>(undefined);

export const ClipboardProvider: FC<{ children: ReactElement; }> = ({ children }) => {
    const { db } = useDatabase();
    const [isRunning, setIsRunning] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [history, setHistory] = useState<ClipboardEntry[]>([
        {
            id: "123",
            type: "text",
            content: "Hello world",
            timestamp: 0,
            contentType: "text/plain"
        }
    ]);
    const abortControllerRef = useRef<AbortController>();
    const saveTimeoutRef = useRef<number>();

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

    // Filtered history implementation
    const filteredHistory = useMemo(() => {
        return history.filter(entry => {
            const matchesSearch = entry.type === 'text'
                ? entry.content.toLowerCase().includes(searchQuery.toLowerCase())
                : entry.content.includes(searchQuery);
            return matchesSearch;
        });
    }, [history, searchQuery]);

    // Save history with debouncing
    const saveHistory = useCallback((entry: ClipboardEntry) => {
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = setTimeout(() => {
            db.create(STORE_NAME, entry);
        }, 300);
    }, []);

    const addHistory = (newEntry: ClipboardPayload) => {
        setHistory(prev => {
            if (prev[0]?.content === newEntry.content) return prev;

            const entry = {
                ...newEntry,
                id: crypto.randomUUID(),
                timestamp: Date.now()
            };
            const newHistory = [entry, ...prev];
            saveHistory(entry);
            return newHistory;
        });
    };

    // Clear all history
    const clearHistory = useCallback(() => {
        setHistory([]);
        // localStorage.removeItem(STORAGE_KEY);
    }, []);

    // Delete entry with storage
    const deleteHistory = useCallback((id: string) => {
        setHistory(prev => {
            return prev.filter(entry => entry.id !== id);
        });
    }, [saveHistory]);

    // Copy to clipboard implementation
    const copyToClipboard = useCallback(async (content: string, type: 'text' | 'image') => {
        try {
            if (type === 'text') {
                await writeText(content);
            } else {
                await writeImageBase64(content);
            }
            // Add to history
            addHistory({
                content,
                type,
                contentType: type === "text" ? "text/plain" : "image/png"
            });
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
        }
    }, []);



    // Load initial history
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const initialEntries = await db.query<ClipboardEntry>(STORE_NAME, {
                    indexName: 'timestamp',
                    direction: 'prev',
                    count: 100
                });

                console.log({ initialEntries });

                if (initialEntries) {
                    setHistory(initialEntries);
                }
            } catch (err) {
                console.log(err, "Failed to load entries");
            }
        };

        loadInitialData();
    }, []);

    useEffect(() => {
        setupListeners({
            abortControllerRef,
            addEntry: addHistory,
            setIsRunning,
        });

        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    const value: ClipboardContextType = {
        filteredHistory,
        addEntry: addHistory,
        start,
        stop,
        isRunning,
        searchClipboard,
        searchQuery,
        setSearchQuery,
        copyToClipboard,
        clearHistory,
        deleteEntry: deleteHistory,
        history,
        setHistory,
    };

    return (
        <ClipboardContext.Provider value={value}>{children}</ClipboardContext.Provider>
    );
};