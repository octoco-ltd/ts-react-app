import { useCallback, useState } from 'react';
import { debounce } from 'lodash';

type DebouncedStateSetter<T> = (value: T) => void;

export default function useDebouncedState<T>(initialValue: T, delay = 500): [T, DebouncedStateSetter<T>] {
  const [state, setState] = useState<T>(initialValue);

  const debouncedSetState = useCallback(
    debounce((value: T) => {
      setState(value);
    }, delay),
    []
  );

  const handleStateChange: DebouncedStateSetter<T> = (value: T) => {
    debouncedSetState(value);
  };

  return [state, handleStateChange];
}
