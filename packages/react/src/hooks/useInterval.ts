import { useEffect } from "react";
import { useCallbackRef } from "@fewings/react/hooks";

export default function useInterval(callback: () => void, delay: number) {
  const savedCallback = useCallbackRef(callback);
  useEffect(() => {
    const id = setInterval(savedCallback, delay);
    return () => clearInterval(id);
  }, [delay]);
}
