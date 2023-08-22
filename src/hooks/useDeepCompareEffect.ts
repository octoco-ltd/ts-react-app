import { useEffect, useRef } from 'react';
import isEqual from 'lodash/fp/isEqual';

/**
 * Custom hook that triggers an effect only when the dependencies have deeply changed.
 * @param callback The effect callback to run when dependencies change.
 * @param dependencies The dependencies to compare against the previous dependencies.
 */
export default function useDeepCompareEffect(
  callback: () => void,
  dependencies: any[]
): void {
  // Store the current dependencies in a ref to compare against
  const currentDependenciesRef = useRef<any[] | undefined>();

  // Update the stored dependencies when they change deeply
  if (!isEqual(currentDependenciesRef.current, dependencies)) {
    currentDependenciesRef.current = dependencies;
  }

  // Run the effect with the updated dependencies
  useEffect(callback, [currentDependenciesRef.current]);
}
