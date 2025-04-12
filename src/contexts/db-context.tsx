import { createContext, ReactElement, useEffect, useState } from "react";
import { IndexedDBManager } from "../lib/IndexedDBManager";
import { ClipboardEntry } from "../types";
import { clipboardDBConfig } from "../lib/db-config";

export type DatabaseContextType = {
    db: IndexedDBManager<ClipboardEntry>;
};

export const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const DatabaseProvider = ({ children }: { children: ReactElement; }) => {
    const [db] = useState(new IndexedDBManager<ClipboardEntry>(clipboardDBConfig));
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const initDB = async () => {
            try {
                await db.initialize();
                setIsReady(true);
            } catch (err) {
                console.error("DB initialization error:", err);
            }
        };

        initDB();
    }, []);

    const value = { db };


    if (!isReady) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <DatabaseContext.Provider value={value}>{children}</DatabaseContext.Provider>
    );
};