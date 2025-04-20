import { createContext } from "@fewings/react/contextSelector";
import { TextEditor, TextEditorConfig } from "../core/TextEditor";
import { ReactNode, useEffect, useState } from "react";
import useTextEditorEffect from "../hooks/useTextEditorEffect";

interface TTextEditorContext {
  editor: TextEditor | null;
  setEditorEl: (el: HTMLDivElement) => void;
}

export const TextEditorContext = createContext<TTextEditorContext>(
  {} as TTextEditorContext,
);

type Props = {
  children: ReactNode;
  onChange?: (html: string) => void;
} & Omit<TextEditorConfig, "element">;

export const TextEditorProvider = ({
  children,
  onChange,
  ...config
}: Props) => {
  const [editorEl, setEditorEl] = useState<HTMLDivElement | null>(null);
  const [editor, setEditor] = useState<TextEditor | null>(null);
  const { spellcheck, mode } = config;

  // initialize editor when element is ready
  useEffect(() => {
    if (editorEl) {
      setEditor(new TextEditor({ ...config, element: editorEl }));
    }
  }, [editorEl]);

  // bind event for onChange prop
  useTextEditorEffect(editor!, "onChange", (html) => {
    onChange?.(html);
  });

  // cleanup automatically
  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  // bind with state
  useEffect(() => {
    if (!editor) return;
    if (spellcheck != null) {
      editor.setSpellcheck(spellcheck);
    }
    if (mode) {
      editor.setMode(mode);
    }
  }, [editor, spellcheck, mode]);

  return (
    <TextEditorContext.Provider value={{ editor, setEditorEl }}>
      {children}
    </TextEditorContext.Provider>
  );
};
