import { createContext, FC, ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { startListening } from "tauri-plugin-clipboard-api";
import { ClipboardContextType, ClipboardEntry } from "../types";
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

    useEffect(() => {
        setupListeners({
            abortControllerRef,
            setHistory,
            setIsRunning,
        });

        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    const value: ClipboardContextType = {
        history,
        setHistory,
        start,
        stop,
        isRunning
    };

    return (
        <ClipboardContext.Provider value={value}>{children}</ClipboardContext.Provider>
    );
};