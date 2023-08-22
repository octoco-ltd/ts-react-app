import { useCallback, useState, useEffect } from 'react'

/**
 * Custom hook that returns a stateful value from local storage and provides methods to modify it.
 * @param key The key used to store the value in local storage.
 * @param defaultValue The default value or function to compute the initial value.
 * @returns A tuple containing the stored value, a setter function, and a removal function.
 */
export function useLocalStorage<T>(key: string, defaultValue: T | (() => T)) {
  return useStorage(key, defaultValue, window.localStorage);
}

/**
 * Custom hook that returns a stateful value from session storage and provides methods to modify it.
 * @param key The key used to store the value in session storage.
 * @param defaultValue The default value or function to compute the initial value.
 * @returns A tuple containing the stored value, a setter function, and a removal function.
 */
export function useSessionStorage<T>(key: string, defaultValue: T | (() => T)) {
  return useStorage(key, defaultValue, window.sessionStorage);
}

function useStorage<T>(key: string, defaultValue: any, storageObject: Storage) {
  const [value, setValue] = useState<T | undefined>(() => {
    const jsonValue = storageObject.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof defaultValue === 'function') {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (value === undefined) {
      storageObject.removeItem(key);
    } else {
      storageObject.setItem(key, JSON.stringify(value));
    }
  }, [key, value, storageObject]);

  const remove = useCallback(() => {
    setValue(undefined);
  }, []);

  return [value, setValue, remove];
}
