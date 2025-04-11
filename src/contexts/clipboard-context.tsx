import { createContext, FC, ReactElement, useState } from "react";
import { ClipboardContextType, ClipboardEntry } from "../types";

export const ClipboardContext = createContext<ClipboardContextType | undefined>(undefined);

export const ClipboardProvider: FC<{ children: ReactElement; }> = ({ children }) => {
    const [history, setHistory] = useState<ClipboardEntry[]>([
        {
            content: "Hello world",
            timestamp: Date.now().toString()
        }
    ]);

    const value: ClipboardContextType = {
        history,
        setHistory
    };
    return (
        <ClipboardContext.Provider value={value}>{children}</ClipboardContext.Provider>
    );
};