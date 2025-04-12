
import { DBOptions } from "../types";
import { DB_NAME, STORE_NAME } from "../utils/constants";

export const clipboardDBConfig: DBOptions = {
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