import { DBOptions, QueryParams } from "../types";
import { DB_NAME, STORE_NAME } from "../utils/constants";

export const indexedDBConfig: DBOptions = {
    name: DB_NAME,
    version: 5,
    objectStores: [
        {
            name: STORE_NAME,
            keyPath: 'id',
            indexes: [
                { name: 'timestamp', keyPath: 'timestamp' },
                { name: 'type', keyPath: 'type' },
                { name: 'contentType', keyPath: 'contentType' }
            ]
        }
    ]
};

export class IndexedDBManager<T extends { id: string; }> {
    private db: IDBDatabase | null = null;
    private options: DBOptions;

    constructor(options: DBOptions) {
        this.options = options;
    }

    async initialize(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.options.name, this.options.version);

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;

                this.options.objectStores.forEach(({ name, keyPath, indexes }) => {
                    if (!db.objectStoreNames.contains(name)) {
                        const store = db.createObjectStore(name, { keyPath });
                        indexes?.forEach(({ name, keyPath, options }) => {
                            store.createIndex(name, keyPath, options);
                        });
                    }
                });
            };

            request.onsuccess = (event) => {
                this.db = (event.target as IDBOpenDBRequest).result;
                resolve(this.db);
            };

            request.onerror = (event) => {
                reject((event.target as IDBOpenDBRequest).error);
            };
        });
    }

    private async transaction<RequestType, ResultType>(
        storeName: string,
        mode: IDBTransactionMode,
        operation: (store: IDBObjectStore) => IDBRequest<RequestType>
    ): Promise<ResultType> {
        if (!this.db) throw new Error('Database not initialized');

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction(storeName, mode);
            const store = transaction.objectStore(storeName);
            const request = operation(store);

            request.onsuccess = () => {
                // Handle special case for cursor queries
                if (request.result instanceof IDBCursor || request.result === null) {
                    resolve((request as unknown as { $result: ResultType; }).$result);
                } else {
                    resolve(request.result as unknown as ResultType);
                }
            };

            request.onerror = () => reject(request.error);
        });
    }

    // CRUD Operations
    async create(storeName: string, data: T): Promise<IDBValidKey> {
        return this.transaction(storeName, 'readwrite', (store) =>
            store.add(data)
        );
    }

    async read(storeName: string, id: string): Promise<T | undefined> {
        return this.transaction(storeName, 'readonly', (store) =>
            store.get(id)
        );
    }

    async update(storeName: string, data: T): Promise<IDBValidKey> {
        return this.transaction(storeName, 'readwrite', (store) =>
            store.put(data)
        );
    }

    async delete(storeName: string, id: string): Promise<void> {
        return this.transaction(storeName, 'readwrite', (store) =>
            store.delete(id)
        );
    }

    async query<T>(storeName: string, params: QueryParams = {}): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            if (!this.db) {
                throw new Error("Database not initialized");;
            };

            const transaction = this.db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const target = params.indexName ? store.index(params.indexName) : store;
            const request = target.openCursor(params.range, params.direction);
            const results: T[] = [];
            let count = 0;

            request.onsuccess = (event) => {
                const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
                if (cursor) {
                    if (!params.filter || params.filter(cursor.value)) {
                        results.push(cursor.value);
                        count++;
                    }
                    if (params.count && count >= params.count) {
                        resolve(results);
                        return;
                    }
                    cursor.continue();
                } else {
                    resolve(results);
                }
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }


    // Maintenance Operations
    clearStore(storeName: string): Promise<void> {
        return this.transaction(storeName, 'readwrite', (store) =>
            store.clear()
        );
    }

    close() {
        this.db?.close();
        this.db = null;
    }
}