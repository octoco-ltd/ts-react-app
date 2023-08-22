/**
 * Specifies the type of storage to be used: either local storage or session storage.
 */
export type StorageType = 'local' | 'session';

/**
 * Stores a value with the specified key in the selected storage.
 *
 * @param key - The key under which the value will be stored.
 * @param value - The value to be stored.
 * @param storageType - The type of storage to use: local or session. Default is local storage.
 */
const setStorageItem = (key: string, value: any, storageType: StorageType = 'local'): void => {
    const storage = storageType === 'local' ? localStorage : sessionStorage;
    storage.setItem(key, JSON.stringify(value));
}

/**
 * Retrieves the value associated with the specified key from the selected storage.
 *
 * @param key - The key of the value to retrieve.
 * @param storageType - The type of storage to use: local or session. Default is local storage.
 * @returns The retrieved value, or null if the key is not found.
 */
const getStorageItem = (key: string, storageType: StorageType = 'local'): any | null => {
    const storage = storageType === 'local' ? localStorage : sessionStorage;
    const item = storage.getItem(key);
    return item ? JSON.parse(item) : null;
}

/**
 * Removes the value associated with the specified key from the selected storage.
 *
 * @param key - The key of the value to remove.
 * @param storageType - The type of storage to use: local or session. Default is local storage.
 */
const removeStorageItem = (key: string, storageType: StorageType = 'local'): void => {
    const storage = storageType === 'local' ? localStorage : sessionStorage;
    storage.removeItem(key);
}

export {setStorageItem, getStorageItem, removeStorageItem}
