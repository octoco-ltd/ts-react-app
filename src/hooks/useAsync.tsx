import { useCallback, useEffect, useState } from 'react';

/**
 * Custom hook that handles asynchronous operations.
 * @param callback The async function to execute.
 * @param dependencies An array of dependencies for the callback.
 * @returns An object containing loading, error, and value states.
 */
export default function useAsync<T>(
  callback: () => Promise<T>,
  dependencies: any[] = []
): {
  loading: boolean;
  error?: any;
  value?: T;
} {
  // State to track loading, error, and value
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>();
  const [value, setValue] = useState<T>();

  // Memoized callback that handles loading, error, and value states
  const callbackMemoized = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    setValue(undefined);
    try {
      const result = await callback();
      setValue(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, dependencies);

  // Execute the memoized callback on mount and when dependencies change
  useEffect(() => {
    callbackMemoized();
  }, [callbackMemoized]);

  return { loading, error, value };
}
