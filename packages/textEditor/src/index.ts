// components
export { default as TextEditorBody } from "./components/TextEditorBody";
export { default as TextEditorView } from "./components/TextEditorView";

// core
export { BlockAPI } from "./core/BlockAPI";
export { CursorAPI } from "./core/CursorAPI";
export { DomAPI } from "./core/DomAPI";
export { InlineAPI, type TInlineTag } from "./core/InlineAPI";
export {
  TextEditor,
  type TEditorMode,
  type TCursorStatus,
  type TActionValueMap,
  type TEditorActionKeys,
  type TextEditorConfig,
} from "./core/TextEditor";

// hooks
export { default as useTextEditor } from "./hooks/useTextEditor";
export { default as useTextEditorCursorState } from "./hooks/useTextEditorCursorState";
export { default as useTextEditorEffect } from "./hooks/useTextEditorEffect";

// provider
export {
  TextEditorProvider,
  TextEditorContext,
} from "./provider/TextEditorProvider";
