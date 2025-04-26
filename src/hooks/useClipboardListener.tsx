import { ClipCreateType } from "@/types/clipboard";
import { useRef } from "react";
import {
    listenToMonitorStatusUpdate,
    onImageUpdate,
    onTextUpdate,
    startListening
} from "tauri-plugin-clipboard-api";
import { writeFile, BaseDirectory } from '@tauri-apps/plugin-fs';

type UseClipboardListenerOptions = {

    onRunningStatusChange?: (isRunning: boolean) => void;
    debounceMs?: number;
    deduplicate?: boolean;
    filterEmpty?: boolean;
};

export const useClipboardListener = (onClipAdd: (entry: ClipCreateType) => void, {
    onRunningStatusChange,

}: UseClipboardListenerOptions = {}) => {
    const abortRef = useRef<AbortController | null>(null);
    const isListeningRef = useRef(false);
    const debounceTimerRef = useRef<number | null>();

    const start = async () => {
        if (isListeningRef.current) return;

        const controller = new AbortController();
        abortRef.current = controller;
        const { signal } = controller;

        try {
            const [unMonitor, unText, unImage] = await Promise.all([
                listenToMonitorStatusUpdate((running) => {
                    if (signal.aborted) return;
                    onRunningStatusChange?.(running);
                }),
                onTextUpdate((newText) => {
                    if (signal.aborted) return;
                    onClipAdd({ content_type: "text", content: newText });
                }),
                onImageUpdate(async (base64Img) => {
                    if (signal.aborted) return;

                    // const buffer = new Uint8Array(
                    //     atob(base64Img)
                    //         .split("")
                    //         .map((char) => char.charCodeAt(0))
                    // );

                    onClipAdd({ content_type: "image", content: base64Img });
                }),
            ]);

            const unStart = await startListening();

            signal.addEventListener("abort", () => {
                unMonitor();
                unText();
                unImage();
                unStart();
                isListeningRef.current = false;
            });

            isListeningRef.current = true;
        } catch (err) {
            console.error("Clipboard listener error:", err);
            stop();
        }
    };

    const stop = () => {
        abortRef.current?.abort();
        abortRef.current = null;
        if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };

    return { startListening: start, stopListening: stop };
};
