import { RefObject, useEffect, useRef } from "react";

export const useClickOutside = (
  handler: (event: MouseEvent) => void,
  exclude?: RefObject<HTMLElement | null>,
) => {
  const ref = useRef<HTMLElement | null>(null);

  const handlerRef = useRef<(event: MouseEvent) => void>(undefined);
  useEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current) return;
      if (ref.current.contains(event.target as Node)) return;
      if (exclude?.current && exclude.current.contains(event.target as Node))
        return;
      handlerRef.current?.(event);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return ref;
};
