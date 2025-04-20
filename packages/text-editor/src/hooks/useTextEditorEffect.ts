import { useEffect } from 'react';
import { TextEditorEvent, TextEditor } from '../core/TextEditor';
import { useCallbackRef } from '@fewings/react/hooks';
import { useContextSelector } from '@fewings/react/contextSelector';
import { TextEditorContext } from '../provider/TextEditorProvider';

/** for inside of TextEditorContext.Provider */
export default function useTextEditorEffect<
  E extends keyof TextEditorEvent,
  V extends Parameters<TextEditorEvent[E]>[0],
>(editor: TextEditor, event: E, cb: (value: V) => void): void;

/** for inside of TextEditorContext.Provider */
export default function useTextEditorEffect<
  E extends keyof TextEditorEvent,
  V extends Parameters<TextEditorEvent[E]>[0],
>(event: E, cb: (value: V) => void): void;

export default function useTextEditorEffect(...args: any[]): void {
  const isInstanceProvided = args.length === 3;
  const editor = isInstanceProvided
    ? args[0]
    : useContextSelector(TextEditorContext, (ctx) => ctx.editor);
  const event = isInstanceProvided ? args[1] : args[0];
  const cb = isInstanceProvided ? args[2] : args[1];
  const callbackRef = useCallbackRef(cb);

  useEffect(() => {
    if (!editor) return;
    const off = editor.on(event, (e: any) => {
      callbackRef(e);
    });
    return () => {
      off();
    };
  }, [editor, event]);
}
