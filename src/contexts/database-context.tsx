import SplashScreen from "@/components/layouts/SplashScreen";
import Database from "@tauri-apps/plugin-sql";
import {
    createContext,
    FC,
    ReactElement,
    useContext,
    useEffect,
    useState
} from "react";

type DatabaseContextType = {
    db?: Database;
    isDbReady: boolean;
};

export const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);
const DB_DATABASE = import.meta.env.DB_DATABASE || "sqlite:copyclip.db";

export const DatabaseProvider: FC<{ children: ReactElement; }> = ({ children }) => {
    const [db, setDb] = useState<Database | undefined>(undefined);
    const [isDbReady, setIsDbReady] = useState(false);

    useEffect(() => {
        const initDatabase = async (dbPath: string) => {
            try {
                const database = await Database.load(dbPath);
                setDb(database);
                setIsDbReady(true);
            } catch (error) {
                console.error('Failed to load database:', error);
            }
        };
        initDatabase(DB_DATABASE);

        return () => {
            if (db) {
                db.close();
            }
        };
    }, []);

    const value: DatabaseContextType = {
        db,
        isDbReady,
    };

    return (
        <DatabaseContext.Provider value={value}>
            {
                isDbReady ? children : <SplashScreen />
            }
        </DatabaseContext.Provider>
    );
};

export const useDatabase = () => {
    const ctx = useContext(DatabaseContext);
    if (!ctx) throw new Error("useDatabase must be used within a DatabaseProvider");
    return ctx;
};
