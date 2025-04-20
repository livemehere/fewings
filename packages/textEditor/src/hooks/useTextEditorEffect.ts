import { useEffect, useState } from 'react';
import { TextEditor, TextEditorEvent } from '../core/TextEditor';

export default function useTextEditorEffect<
  E extends keyof TextEditorEvent,
  V extends Parameters<TextEditorEvent[E]>[0],
>(editor: TextEditor, event: E): V | undefined {
  const [state, setState] = useState<V | undefined>(undefined);
  useEffect(() => {
    if (!editor) return;
    const off = editor.on(event, (e: any) => {
      setState(e);
    });
    return () => {
      off();
    };
  }, [editor, event]);

  return state;
}
