import { createContext, ReactElement, useState } from "react";
import Database from '@tauri-apps/plugin-sql';

type DatabaseContextType = {};
export const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const DatabaseProvider = ({ children }: { children: ReactElement; }) => {
    const [db] = useState(async () => {
        return await Database.load('sqlite:copyclip.db');
    });


    const value: DatabaseContextType = { db };

    return (
        <DatabaseContext.Provider value={value}>{children}</DatabaseContext.Provider>
    );
};