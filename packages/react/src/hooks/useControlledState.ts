import { SetStateAction, useEffect, useState } from "react";
import { usePrevState } from "@fewings/react/hooks/usePrevState";
import { useCallbackRef } from "@fewings/react/hooks/useCallbackRef";

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
  const [unControlledValue, setUnControlledValue] = useUnControlledState({
    defaultValue,
    onChange,
  });
  const isControlled = value !== undefined;
  const state = isControlled ? value : unControlledValue;
  const handleChange = useCallbackRef(onChange);
  const setState = useCallbackRef((state: SetStateAction<T>) => {
    const nextState =
      typeof state === "function"
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

const useUnControlledState = <T>({
  defaultValue,
  onChange,
}: Omit<TControlledState<T>, "value">) => {
  const state = useState<T | undefined>(defaultValue);
  const [value] = state;
  const prevValue = usePrevState(value);
  const handleChange = useCallbackRef(onChange);
  useEffect(() => {
    if (prevValue !== value) {
      handleChange(value as T);
    }
  });

  return state;
};
