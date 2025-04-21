import Database from "@tauri-apps/plugin-sql";
import {
    createContext,
    FC,
    ReactElement,
    useContext,
    useEffect,
    useState
} from "react";

type GlobalContextType = {
    db?: Database;
    isDbReady: boolean;
};

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
const DB_DATABASE = import.meta.env.DB_DATABASE || "sqlite:copyclip.db";

export const GlobalProvider: FC<{ children: ReactElement; }> = ({ children }) => {
    const [db, setDb] = useState<Database | undefined>(undefined);
    const [isDbReady, setIsDbReady] = useState(false);

    useEffect(() => {
        const initDb = async (dbPath: string) => {
            try {
                const database = await Database.load(dbPath);
                setDb(database);
                setIsDbReady(true);
            } catch (error) {
                console.error('Failed to load database:', error);
            }
        };
        initDb(DB_DATABASE);
    }, []);

    const value: GlobalContextType = {
        db,
        isDbReady,
    };

    if (!isDbReady) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobal = () => {
    const ctx = useContext(GlobalContext);
    if (!ctx) throw new Error("useGlobal must be used within a GlobalProvider");
    return ctx;
};
