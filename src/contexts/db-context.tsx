import { createContext, ReactElement } from "react";

export type DatabaseContextType = {
};

export const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const DatabaseProvider = ({ children }: { children: ReactElement; }) => {
    const value = {};

    return (
        <DatabaseContext.Provider value={value}>{children}</DatabaseContext.Provider>
    );
};