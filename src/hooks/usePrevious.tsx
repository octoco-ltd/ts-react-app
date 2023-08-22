import { useRef } from 'react'

/**
 * Custom hook that allows a component to keep track of the previous value of a variable
 * @param value The current value to track.
 * @returns The previous value.
 */
export default function usePrevious<T>(value: T): T | undefined {
  // Store the current value in a ref to keep it across renders
  const currentRef = useRef<T>(value);

  // Store the previous value in a ref
  const previousRef = useRef<T>();

  // Update the previous value when the current value changes
  if (currentRef.current !== value) {
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }

  // Return the previous value
  return previousRef.current;
}