import { createContext, FC, ReactElement, useEffect, useState } from "react";
import { ClipboardContextType, ClipboardEntry } from "../types";
import { listenToMonitorStatusUpdate, onImageUpdate, onTextUpdate, startListening, stopMonitor } from "tauri-plugin-clipboard-api";
import { UnlistenFn } from "@tauri-apps/api/event";

export const ClipboardContext = createContext<ClipboardContextType | undefined>(undefined);

export const ClipboardProvider: FC<{ children: ReactElement; }> = ({ children }) => {
    const [isRunning, setIsRunning] = useState(true);
    const [history, setHistory] = useState<ClipboardEntry[]>([
        {
            id: '1',
            content: "Hello world",
            type: "text"
        }
    ]);

    let unlistenClipboard: () => Promise<void>;
    let unlistenTextUpdate: UnlistenFn;
    let unlistenImageUpdate: UnlistenFn;

    async function stop() {
        if (isRunning && unlistenClipboard) await unlistenClipboard();
    }

    async function start() {
        if (isRunning) await stop();;

        return await startListening();

    }

    useEffect(() => {
        (async () => {
            await listenToMonitorStatusUpdate((running) => {
                console.log(`Monitor Running Status: ${running ? 'Yes' : 'No'}`);
                setIsRunning(running);
            });

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
            (async () => {
                if (unlistenTextUpdate) unlistenTextUpdate();
                if (unlistenImageUpdate) unlistenImageUpdate();

                if (unlistenClipboard) await unlistenClipboard();
                if (isRunning) await stopMonitor();
            })();
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