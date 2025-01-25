import { useEffect, useRef } from "react";

export const usePrevState = <T>(state: T | undefined) => {
  const prevState = useRef<T | undefined>(undefined);
  useEffect(() => {
    prevState.current = state;
  });
  return prevState.current;
};
