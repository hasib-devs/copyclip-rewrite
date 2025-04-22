import { useDatabase } from '@/contexts/database-context';
import type { ClipType } from '@/types/clipboard';

export const useClipboardApi = () => {
    const { db } = useDatabase();

    const createOne = async (clip: ClipType) => {
        if (!db) {
            return;
        }
        try {
            await db.execute(
                'INSERT INTO clips (id, content_type, content, created_at) VALUES ($1, $2, $3, $4)',
                [clip.id, clip.content_type, clip.content, clip.created_at]
            );
        } catch (error) {
            console.error('Failed to create clip:', error);
        }
    };

    const findAll = async (): Promise<ClipType[]> => {
        if (!db) {
            return [];
        }
        try {
            const result = await db.select<ClipType[]>('SELECT * FROM clips LIMIT 20');
            return result;
        } catch (error) {
            console.error('Failed to fetch clips:', error);
            return [];
        }
    };

    const updateOne = async (clip: ClipType) => {
        if (!db) {
            return;
        }
        try {
            await db.execute(
                'UPDATE clips SET type = $1, content = $2, created_at = $3 WHERE id = $4',
                [clip.content_type, clip.content, clip.created_at, clip.id]
            );
        } catch (error) {
            console.error('Failed to update clip:', error);
        }
    };

    const updatePin = async (id: string, isPinned: boolean) => {
        if (!db) {
            return;
        }

        try {
            await db.execute(
                'UPDATE clips SET is_pinned = $1 WHERE id = $2',
                [isPinned, id]
            );
        } catch (error) {
            console.error('Failed to toggle pin:', error);
        }
    };

    const deleteOne = async (id: string) => {
        if (!db) {
            return;
        }
        try {
            await db.execute('DELETE FROM clips WHERE id = $1', [id]);
        } catch (error) {
            console.error('Failed to delete clip:', error);
        }
    };

    const deleteAll = async () => {
        if (!db) {
            return;
        }
        try {
            await db.execute('DELETE FROM clips');
        } catch (error) {
            console.error('Failed to clear clips:', error);
        }
    };

    return {
        createOne,
        findAll,
        updateOne,
        deleteOne,
        deleteAll,
        updatePin,
    };
};
