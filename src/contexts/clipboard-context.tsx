import { useClipboardListener } from "@/hooks/useClipboardListener";
import { useDatabase } from "@/hooks/useDatabase";
import { ClipboardContextType, ClipCreateType, ClipType } from "@/types/clipboard";
import {
    createContext,
    FC,
    ReactElement,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";
import { writeImageBase64, writeText } from "tauri-plugin-clipboard-api";

export const ClipboardContext = createContext<ClipboardContextType | undefined>(undefined);

export const ClipboardProvider: FC<{ children: ReactElement; }> = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [clips, setClips] = useState<ClipType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { getClips, createClip, isDbReady } = useDatabase();

    // Add a new clip
    const addClip = useCallback(
        async (newEntry: ClipCreateType) => {
            const exists = clips[0]?.content === newEntry.content;
            if (exists) return;

            const entry: ClipType = {
                ...newEntry,
                id: crypto.randomUUID(),
                createdAt: Date.now(),
                isPinned: false,
            };

            setClips((prev) => [entry, ...prev]);

            await saveClip(entry); // Save to DB
        },
        [clips, createClip]
    );

    // Save to DB
    const saveClip = useCallback(async (entry: ClipType) => {
        try {
            await createClip(entry);
            console.log("Saved");
        } catch (error) {
            console.error('Failed to save clip to database:', error);
        }
    }, []);

    // Save to DB when clip is added
    useEffect(() => {
        if (clips.length > 0) {
            saveClip(clips[0]);
        }
    }, [clips, saveClip]);

    // Delete a specific clip
    const deleteClip = useCallback((id: string) => {
        setClips((prev) => prev.filter((entry) => entry.id !== id));
    }, []);

    // Clear clipboard history
    const clear = useCallback(() => {
        setClips([]);
        // localStorage.removeItem(STORAGE_KEY);
    }, []);

    // Copy to clipboard handler
    const copyToClipboard = useCallback(
        async (content: string, type: ClipType["type"]) => {
            try {
                if (type === "text") {
                    await writeText(content);
                } else {
                    await writeImageBase64(content);
                }
                addClip({ content, type });
            } catch (error) {
                console.error("Failed to copy to clipboard:", error);
            }
        },
        [addClip]
    );

    // Filter search result
    const filteredClips = useMemo(() => {
        return clips.filter((entry) => {
            const matchText =
                entry.type === "text"
                    ? entry.content.toLowerCase().includes(searchQuery.toLowerCase())
                    : entry.content.includes(searchQuery);
            return matchText;
        });
    }, [clips, searchQuery]);

    // Clipboard Listener
    const { startListening, stopListening } = useClipboardListener({
        onClipAdd: addClip,
    });

    useEffect(() => {
        startListening();
        return () => stopListening();
    }, []);

    // Load clips from the database on mount
    useEffect(() => {
        if (!isDbReady) return;

        const loadClips = async () => {
            setIsLoading(true);
            try {
                const storedClips = await getClips();
                console.log({ storedClips });
                setClips(storedClips);
            } catch (error) {
                console.error('Failed to load clips from database:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadClips();
    }, [isDbReady]);

    const value: ClipboardContextType = {
        filteredClips,
        addClip,
        searchQuery,
        setSearchQuery,
        copyToClipboard,
        clear,
        deleteClip,
        clips,
        setClips,
        isLoading,
        //   isListening,
        //   setIsListening,
    };

    return <ClipboardContext.Provider value={value}>{children}</ClipboardContext.Provider>;
};

export const useClipboard = () => {
    const ctx = useContext(ClipboardContext);
    if (!ctx) throw new Error("useClipboard must be used within a ClipboardProvider");
    return ctx;
};
