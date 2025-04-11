import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { listenToMonitorStatusUpdate, onImageUpdate, onTextUpdate, startListening } from "tauri-plugin-clipboard-api";
import { ClipboardEntry } from "../types";

export type SetupListenersProps = {
    abortControllerRef: MutableRefObject<AbortController | undefined>;
    setHistory: Dispatch<React.SetStateAction<ClipboardEntry[]>>;
    setIsRunning: Dispatch<SetStateAction<boolean>>;
};

export async function setupListeners({ abortControllerRef: abortRef, setIsRunning, setHistory }: SetupListenersProps) {
    try {
        const controller = new AbortController();
        abortRef.current = controller;
        const { signal } = controller;

        // Setup all listeners in parallel 
        // 1. unlistenMonitor
        // 2. unlistenText
        // 3. unlistenImage
        const [unlistenMonitor, unlistenText, unlistenImage] = await Promise.all([
            // Order 1
            listenToMonitorStatusUpdate((running) => {
                if (signal.aborted) return;
                console.log(`Monitor Running Status: ${running ? 'Yes' : 'No'}`);
                setIsRunning(running);
            }),

            // Order 2
            onTextUpdate((newText) => {
                if (signal.aborted) return;
                setHistory(prev => {
                    // Deduplication check
                    if (prev[0]?.content === newText) return prev;
                    return [{
                        id: crypto.randomUUID(),
                        type: "text",
                        content: newText
                    }, ...prev];
                });
            }),

            // Order 3
            onImageUpdate((b64Str) => {
                if (signal.aborted) return;
                setHistory(prev => [{
                    id: crypto.randomUUID(),
                    type: "image",
                    content: b64Str
                }, ...prev]);
            })
        ]);

        // Start monitoring after listeners are ready
        const unlistenStart = await startListening();

        // Cleanup coordination
        signal.addEventListener('abort', () => {
            unlistenMonitor();
            unlistenText();
            unlistenImage();
            unlistenStart();
        });
    } catch (error) {
        console.error('Clipboard initialization failed:', error);
        abortRef.current?.abort();
    }
};