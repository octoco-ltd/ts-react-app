import { useCallback, useEffect, useRef } from 'react'

/**
 * Custom hook that sets up a timeout and returns methods to reset and clear the timeout.
 * @param callback The function to be called when the timeout elapses.
 * @param delay The delay in milliseconds before the timeout elapses.
 * @returns An object with methods to reset and clear the timeout.
 */
interface TimeoutHandle {
  /**
   * Clears the currently active timeout.
   */
  clear: () => void;
  
  /**
   * Resets the timeout, cancelling the current one and setting up a new timeout.
   */
  reset: () => void;
}

export default function useTimeout(callback: () => void, delay: number): TimeoutHandle {
  // Store the callback in a ref to keep it up to date across renders
  const callbackRef = useRef<() => void>(callback);
  
  // Store the timeout ID in a ref to manage the timeout
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Update the stored callback whenever the passed callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Function to set up the timeout
  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  // Function to clear the timeout
  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  // Set up the timeout when the component mounts, and clear it when unmounting
  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  // Function to reset the timeout by clearing and setting up a new one
  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { reset, clear };
}
