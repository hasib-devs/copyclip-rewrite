import { useEffect, useState } from 'react';
import Database from '@tauri-apps/plugin-sql';
import type { ClipType } from '@/types/clipboard';

export const useDatabase = () => {
    const [db, setDb] = useState<Database | null>(null);
    const [isDbReady, setIsDbReady] = useState(false);

    const DB_DATABASE = import.meta.env.DB_DATABASE || "sqlite:copyclip.db";

    useEffect(() => {
        const initDb = async () => {
            try {
                const database = await Database.load(DB_DATABASE);
                console.log({ database });
                setDb(database);
                database.execute('INSERT INTO clips (id, content_type, content, created_at) VALUES ($1, $2, $3, $4)',
                    [crypto.randomUUID(), 'text', 'Sample content', Date.now()]
                );
                setIsDbReady(true);
            } catch (error) {
                console.error('Failed to load database:', error);
            }
        };

        initDb();
    }, []);

    const createClip = async (clip: ClipType) => {
        if (!db) return;
        try {
            await db.execute(
                'INSERT INTO clips (id, content_type, content, created_at) VALUES ($1, $2, $3, $4)',
                [clip.id, clip.type, clip.content, clip.createdAt]
            );
        } catch (error) {
            console.error('Failed to create clip:', error);
        }
    };

    const getClips = async (): Promise<ClipType[]> => {
        console.log({ db });
        if (!db) return [];
        try {
            const result = await db.select<ClipType[]>('SELECT * FROM clips LIMIT 20');
            console.log({ result });
            return result;
        } catch (error) {
            console.error('Failed to fetch clips:', error);
            return [];
        }
    };

    const updateClip = async (clip: ClipType) => {
        if (!db) return;
        try {
            await db.execute(
                'UPDATE clips SET type = $1, content = $2, created_at = $3 WHERE id = $4',
                [clip.type, clip.content, clip.createdAt, clip.id]
            );
        } catch (error) {
            console.error('Failed to update clip:', error);
        }
    };

    const deleteClip = async (id: string) => {
        if (!db) return;
        try {
            await db.execute('DELETE FROM clips WHERE id = $1', [id]);
        } catch (error) {
            console.error('Failed to delete clip:', error);
        }
    };

    const clearClips = async () => {
        if (!db) return;
        try {
            await db.execute('DELETE FROM clips');
        } catch (error) {
            console.error('Failed to clear clips:', error);
        }
    };

    return {
        createClip,
        getClips,
        updateClip,
        deleteClip,
        clearClips,
        isDbReady,
    };
};
