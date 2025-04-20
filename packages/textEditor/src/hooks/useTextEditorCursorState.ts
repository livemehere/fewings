import { TCursorStatus } from "./../core/TextEditor";
import useTextEditorEffect from "./useTextEditorEffect";
import { useState } from "react";

export default function useTextEditorCursorState() {
  const [state, setState] = useState<TCursorStatus | undefined>(undefined);
  useTextEditorEffect("cursorChanged", (v) => {
    setState(v);
  });
  return state;
}
