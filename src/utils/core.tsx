import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { listenToMonitorStatusUpdate, onImageUpdate, onTextUpdate, startListening } from "tauri-plugin-clipboard-api";
import { ClipboardPayload } from "@/types";

export type SetupListenersProps = {
    abortControllerRef: MutableRefObject<AbortController | undefined>;
    addEntry: (newEntry: ClipboardPayload) => void;
    setIsRunning: Dispatch<SetStateAction<boolean>>;
};

export async function setupListeners({ abortControllerRef: abortRef, setIsRunning, addEntry }: SetupListenersProps) {
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
                console.log(`Monitor Running Status: ${running ? 'On' : 'Off'}`);
                setIsRunning(running);
            }),

            // Order 2
            onTextUpdate((newText) => {
                if (signal.aborted) return;
                addEntry({
                    type: "text",
                    content: newText,
                    contentType: 'text/plain'
                });
            }),

            // Order 3
            onImageUpdate((b64Str) => {
                if (signal.aborted) return;

                addEntry({
                    type: "image",
                    content: b64Str,
                    contentType: 'image/png'
                });
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