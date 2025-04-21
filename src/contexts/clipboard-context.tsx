import { useClipboardListener } from "@/hooks/useClipboardListener";
import { useDatabase } from "@/hooks/useDatabase";
import { ClipboardContextType, ClipCreateType, ClipType } from "@/types/clipboard";
import {
    createContext,
    FC,
    ReactElement,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";
import { writeImageBase64, writeText } from "tauri-plugin-clipboard-api";
import { useGlobal } from "./global-context";

export const ClipboardContext = createContext<ClipboardContextType | undefined>(undefined);

export const ClipboardProvider: FC<{ children: ReactElement; }> = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [clips, setClips] = useState<ClipType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { db, isDbReady } = useGlobal();

    const { getClips, createClip } = useDatabase(db);

    // Add a new clip
    const addClip =
        async (newEntry: ClipCreateType) => {
            setClips((prev) => {
                const exists = prev[0]?.content === newEntry.content;
                if (exists) return prev;

                const entry: ClipType = {
                    ...newEntry,
                    id: crypto.randomUUID(),
                    created_at: Date.now(),
                    is_pinned: false,
                };

                saveClip(entry); // Save to DB

                return [entry, ...prev];
            });
        };

    // Save to DB
    const saveClip = async (entry: ClipType) => {
        try {
            await createClip(entry);
        } catch (error) {
            console.error('Failed to save clip to database:', error);
        }
    };

    // Delete a specific clip
    const deleteClip = (id: string) => {
        setClips((prev) => prev.filter((entry) => entry.id !== id));
    };

    // Clear clipboard history
    const clear = () => {
        setClips([]);
        // localStorage.removeItem(STORAGE_KEY);
    };

    // Copy to clipboard handler
    const copyToClipboard = async (content: string, type: ClipType["content_type"]) => {
        try {
            if (type === "text") {
                await writeText(content);
            } else {
                await writeImageBase64(content);
            }
            addClip({ content, content_type: type });
        } catch (error) {
            console.error("Failed to copy to clipboard:", error);
        }
    };

    // Filter search result
    const filteredClips = useMemo(() => {
        return clips.filter((entry) => {
            const matchText =
                entry.content_type === "text"
                    ? entry.content.toLowerCase().includes(searchQuery.toLowerCase())
                    : entry.content.includes(searchQuery);
            return matchText;
        });
    }, [clips, searchQuery]);

    // Clipboard Listener
    const { startListening, stopListening } = useClipboardListener(addClip);

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
    };

    return <ClipboardContext.Provider value={value}>{children}</ClipboardContext.Provider>;
};

export const useClipboard = () => {
    const ctx = useContext(ClipboardContext);
    if (!ctx) throw new Error("useClipboard must be used within a ClipboardProvider");
    return ctx;
};
