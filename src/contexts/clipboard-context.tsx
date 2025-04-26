import { useClipboardApi } from "@/hooks/useClipboardApi";
import { useClipboardListener } from "@/hooks/useClipboardListener";
import { ClearOptions, ClipboardContextType, ClipCreateType, ClipType, ContentTypes } from "@/types/clipboard";
import {
    createContext,
    FC,
    ReactElement,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";
import { writeImageBase64, writeText } from "tauri-plugin-clipboard-api";

export const ClipboardContext = createContext<ClipboardContextType | undefined>(undefined);

export const ClipboardProvider: FC<{ children: ReactElement; }> = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterTerm, setFilterTerm] = useState<ContentTypes | "">("");
    const [clips, setClips] = useState<ClipType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const lastEntryRef = useRef<ClipCreateType | null>(null);
    const debounceTimerRef = useRef<number | null>();
    const ignoreClip = useRef(false);
    const ignoreId = useRef<string | undefined>();

    const { findAll, createOne, deleteOne, updatePin } = useClipboardApi();

    const debounceMs = 200;
    // Add a new clip
    const addClip =
        async (newEntry: ClipCreateType) => {

            console.log({ ignoreClip: ignoreClip.current });
            if (ignoreClip.current) {
                setClips(prev => {
                    return prev.map(entry => {
                        if (entry.id === ignoreId.current) {
                            return { ...entry, accesed_at: Date.now() };
                        }
                        return entry;
                    });
                });
                setTimeout(() => {
                    ignoreClip.current = false;
                }, 10);
                return;
            }

            const isEmpty = !newEntry.content || newEntry.content.trim?.() === "";
            if (isEmpty) return;

            if (
                lastEntryRef.current &&
                lastEntryRef.current.content === newEntry.content &&
                lastEntryRef.current.content_type === newEntry.content_type
            )
                return;

            lastEntryRef.current = newEntry;

            const exists = clips[0]?.content === newEntry.content;
            if (exists) return clips;

            const accesed_at = Date.now();
            const entry: ClipType = {
                id: crypto.randomUUID(),
                is_pinned: false,
                accesed_at,
                ...newEntry,
            };
            setClips((prev) => [entry, ...prev]);

            if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
            debounceTimerRef.current = setTimeout(() => saveClip(entry), debounceMs);

        };

    // Save to DB
    const saveClip = async (entry: ClipType) => {
        try {
            await createOne(entry);
        } catch (error) {
            console.error('Failed to save clip to database:', error);
        }
    };

    // Delete a specific clip
    const deleteClip = (id: string) => {
        setClips((prev) => prev.filter((entry) => entry.id !== id));
        deleteOne(id);
    };

    // Clear clipboard history without pinnded items
    const clearClips = (opt: ClearOptions) => {
        switch (opt) {
            case ClearOptions.All:
                setClips(() => []);
                break;

            case ClearOptions.Pined:
                setClips(prev => prev.filter(entry => !entry.is_pinned));
                break;

            case ClearOptions.Unpined:
                setClips(prev => prev.filter(entry => entry.is_pinned));
                break;
        }
    };

    // Copy to clipboard handler
    const copyToClipboard = async (clip: ClipType) => {
        ignoreClip.current = true;
        ignoreId.current = clip.id;

        try {
            if (clip.content_type === "text") {
                writeText(clip.content);
            } else {
                writeImageBase64(clip.content);
            }
        } catch (error) {
            console.error("Failed to copy to clipboard:", error);
        }

    };

    // Toggle pin status
    const togglePin = (clip: ClipType) => {
        setClips((prev) => {
            const updatedClips = prev.map((c) => {
                if (c.id === clip.id) {
                    return { ...c, is_pinned: !c.is_pinned };
                }
                return c;
            });
            return updatedClips;
        });
        updatePin(clip.id, !Boolean(clip.is_pinned));
    };

    // Filter search result
    const filteredClips = useMemo(() => {
        return clips.filter((entry) => {
            // Filter by content type and search term
            const matchesType = filterTerm ? entry.content_type === filterTerm : true;
            const matchesSearch = entry.content.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesType && matchesSearch;
        }).sort((a, b) => b.accesed_at - a.accesed_at);
    }, [clips, searchTerm, filterTerm]);

    // Clipboard Listener
    const { startListening, stopListening } = useClipboardListener(addClip);

    useEffect(() => {
        startListening();
        return () => stopListening();
    }, []);

    // Load clips from the database on mount
    useEffect(() => {
        const loadClips = async () => {
            setIsLoading(true);
            try {
                const storedClips = await findAll();
                setClips(storedClips);
            } catch (error) {
                console.error('Failed to load clips from database:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadClips();
    }, []);

    const value: ClipboardContextType = {
        filteredClips,
        addClip,
        searchTerm,
        setSearchTerm,
        filterTerm,
        setFilterTerm,
        copyToClipboard,
        clearClips,
        deleteClip,
        clips,
        setClips,
        isLoading,
        togglePin,
    };

    return <ClipboardContext.Provider value={value}>{children}</ClipboardContext.Provider>;
};

export const useClipboardContext = () => {
    const ctx = useContext(ClipboardContext);
    if (!ctx) throw new Error("useClipboard must be used within a ClipboardProvider");
    return ctx;
};
