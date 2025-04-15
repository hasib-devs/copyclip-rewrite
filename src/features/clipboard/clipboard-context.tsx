import { createContext, FC, ReactElement, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { startListening, writeImageBase64, writeText } from "tauri-plugin-clipboard-api";
import { ClipboardContextType, ClipType, ClipCreateType } from "./types";
import { setupListeners } from "./setupListeners";

export const ClipboardContext = createContext<ClipboardContextType | undefined>(undefined);

export const ClipboardProvider: FC<{ children: ReactElement; }> = ({ children }) => {
    const [isRunning, setIsRunning] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [clips, setClips] = useState<ClipType[]>([
        {
            id: "123",
            type: "text",
            content: "Test Text World, How are you?",
            timestamp: Date.now(),
            isPinned: true
        },
        {
            id: "242343",
            type: "text",
            content: "https://copyclip.hasib.dev",
            timestamp: Date.now(),

        },
        {
            id: "12397979",
            type: "text",
            content: "Meeting at 3pm with the design team",
            timestamp: Date.now(),

        },
        {
            id: "12345",
            type: "text",
            content: "+1 (555) 123-4567",
            timestamp: Date.now(),

        },
    ]);
    const abortControllerRef = useRef<AbortController>();

    const stop = useCallback(() => {
        abortControllerRef.current?.abort();
    }, []);

    const start = useCallback(async () => {
        return startListening();
    }, [stop]);

    // Filtered history implementation
    const filteredClips = useMemo(() => {
        return clips.filter(entry => {
            const matchesSearch = entry.type === 'text'
                ? entry.content.toLowerCase().includes(searchQuery.toLowerCase())
                : entry.content.includes(searchQuery);
            return matchesSearch;
        });
    }, [clips, searchQuery]);

    // Save history with debouncing
    const saveHistory = useCallback((entry: ClipType) => {
        // db.create(STORE_NAME, entry);
    }, []);

    const addClip = (newEntry: ClipCreateType) => {
        setClips(prev => {
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
    const clear = useCallback(() => {
        setClips([]);
        // localStorage.removeItem(STORAGE_KEY);
    }, []);

    // Delete entry with storage
    const deleteClip = useCallback((id: string) => {
        setClips(prev => {
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
            addClip({
                content,
                type,
            });
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
        }
    }, []);



    // Load initial history
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                // const initialEntries = await db.query<ClipType>(STORE_NAME, {
                //     indexName: 'timestamp',
                //     direction: 'prev',
                //     count: 100
                // });

                // console.log({ initialEntries });

                // if (initialEntries) {
                //     setHistory(initialEntries);
                // }
            } catch (err) {
                console.log(err, "Failed to load entries");
            }
        };

        loadInitialData();
    }, []);

    useEffect(() => {
        setupListeners({
            abortControllerRef,
            addClip,
            setIsRunning,
        });

        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    const value: ClipboardContextType = {
        filteredClips,
        addClip,
        start,
        stop,
        isRunning,
        searchQuery,
        setSearchQuery,
        copyToClipboard,
        clear,
        deleteClip,
        clips,
        setClips,
    };

    return (
        <ClipboardContext.Provider value={value}>{children}</ClipboardContext.Provider>
    );
};

export const useClipboard = () => {
    const context = useContext(ClipboardContext);

    if (context === undefined) {
        throw new Error('useClipboard must be used within a ClipboardProvider');
    }

    return context;
};