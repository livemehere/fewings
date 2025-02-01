import { useRef } from "react";
import { TPointerState } from "./types";

export function usePointerRef() {
  return useRef<TPointerState>({
    isDown: false,
    startX: 0,
    startTx: 0,
  });
}
