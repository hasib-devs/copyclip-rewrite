import { createContext, FC, ReactElement, useEffect, useState } from "react";
import { ClipboardContextType, ClipboardEntry } from "../types";
import { onImageUpdate, onTextUpdate, startListening } from "tauri-plugin-clipboard-api";
import { UnlistenFn } from "@tauri-apps/api/event";

export const ClipboardContext = createContext<ClipboardContextType | undefined>(undefined);

export const ClipboardProvider: FC<{ children: ReactElement; }> = ({ children }) => {
    const [history, setHistory] = useState<ClipboardEntry[]>([
        {
            id: '1',
            content: "Hello world",
            type: "text"
        }
    ]);

    let unlistenClipboard: UnlistenFn;
    let unlistenTextUpdate: UnlistenFn;
    let unlistenImageUpdate: UnlistenFn;

    async function start() {
        return await startListening();
    }

    async function stop() {
        unlistenClipboard();
    }

    useEffect(() => {

        (async () => {
            unlistenClipboard = await start();
            unlistenTextUpdate = await onTextUpdate((newText) => {
                const entry: ClipboardEntry = {
                    id: crypto.randomUUID(),
                    type: "text",
                    content: newText
                };
                setHistory((prevState) => [entry, ...prevState]);
            });

            unlistenImageUpdate = await onImageUpdate((b64Str) => {
                const entry: ClipboardEntry = {
                    id: crypto.randomUUID(),
                    type: "image",
                    content: b64Str
                };
                setHistory((prevState) => [entry, ...prevState]);
            });
        })();

        return () => {
            if (unlistenTextUpdate) unlistenTextUpdate();
            if (unlistenImageUpdate) unlistenImageUpdate();

            if (unlistenClipboard) unlistenClipboard(); // should be at the end of cleanup
        };

    }, []);

    const value: ClipboardContextType = {
        history,
        setHistory,
        start,
        stop
    };
    return (
        <ClipboardContext.Provider value={value}>{children}</ClipboardContext.Provider>
    );
};