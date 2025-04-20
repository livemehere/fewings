import { SetStateAction, useState } from 'react';
import { useCallbackRef } from '@fewings/react/hooks';

interface TControlledState<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (state: T) => void;
}

export const useControlledState = <T>({
  value,
  defaultValue,
  onChange,
}: TControlledState<T>) => {
  const [unControlledValue, setUnControlledValue] = useState<T | undefined>(
    defaultValue
  );

  const isControlled = value !== undefined;
  const state = isControlled ? value : unControlledValue;
  const handleChange = useCallbackRef(onChange);
  const setState = useCallbackRef((state: SetStateAction<T>) => {
    const nextState =
      typeof state === 'function'
        ? (state as (prevState: T) => T)(value as T)
        : state;
    if (isControlled) {
      handleChange(nextState);
    } else {
      setUnControlledValue(state as SetStateAction<T | undefined>);
    }
  });

  return [state, setState] as const;
};
