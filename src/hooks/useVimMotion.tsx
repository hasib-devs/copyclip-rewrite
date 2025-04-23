// src/hooks/useGlobalNavigation.ts
import { useEffect } from "react";


export const useVimMotion = () => {

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const isTyping =
                e.target instanceof HTMLInputElement ||
                e.target instanceof HTMLTextAreaElement ||
                e.target instanceof HTMLSelectElement ||
                e.target instanceof HTMLElement && e.target.getAttribute("contenteditable") === "true";

            if (isTyping || e.metaKey || e.ctrlKey || e.altKey) return;

            const key = e.key;

            // --- Vim motions as arrow keys
            const arrows: Record<string, () => void> = {
                h: () => simulateKey("ArrowLeft"),
                j: () => simulateKey("ArrowDown"),
                k: () => simulateKey("ArrowUp"),
                l: () => simulateKey("ArrowRight"),
            };


            if (arrows[key]) {
                e.preventDefault();
                arrows[key]();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);


};

// Simulate native arrow key press to move focus (e.g., for Radix UI or grid)
const simulateKey = (key: "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight") => {
    console.log("Key", key);
    const event = new KeyboardEvent("keydown", {
        key,
        bubbles: true,
        cancelable: true,
    });
    document.activeElement?.dispatchEvent(event);
};
