import { ClipCreateType } from "@/types/clipboard";
import { useRef } from "react";
import {
    listenToMonitorStatusUpdate,
    onImageUpdate,
    onTextUpdate,
    startListening,
} from "tauri-plugin-clipboard-api";


type UseClipboardListenerOptions = {

    onRunningStatusChange?: (isRunning: boolean) => void;
    debounceMs?: number;
    deduplicate?: boolean;
    filterEmpty?: boolean;
};

export const useClipboardListener = (onClipAdd: (entry: ClipCreateType) => void, {
    onRunningStatusChange,
    debounceMs = 300,
    deduplicate = true,
    filterEmpty = true,
}: UseClipboardListenerOptions = {}) => {
    const abortRef = useRef<AbortController | null>(null);
    const isListeningRef = useRef(false);
    const lastEntryRef = useRef<ClipCreateType | null>(null);
    const debounceTimerRef = useRef<number | null>();

    const handleClipAdd = (entry: ClipCreateType) => {
        const isEmpty = !entry.content || entry.content.trim?.() === "";

        if (filterEmpty && isEmpty) return;
        if (
            deduplicate &&
            lastEntryRef.current &&
            lastEntryRef.current.content === entry.content &&
            lastEntryRef.current.content_type === entry.content_type
        )
            return;

        lastEntryRef.current = entry;

        if (debounceMs > 0) {
            if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
            debounceTimerRef.current = setTimeout(() => onClipAdd(entry), debounceMs);
        } else {
            onClipAdd(entry);
        }
    };

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
                    handleClipAdd({ content_type: "text", content: newText });
                }),
                onImageUpdate((base64) => {
                    if (signal.aborted) return;
                    handleClipAdd({ content_type: "image", content: base64 });
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
