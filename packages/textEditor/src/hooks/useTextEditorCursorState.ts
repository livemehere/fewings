import { useContextSelector } from '@fewings/react/contextSelector';
import { TextEditorContext } from '../provider/TextEditorProvider';
import useTextEditorEffect from './useTextEditorEffect';

export default function useTextEditorCursorState() {
  const editor = useContextSelector(TextEditorContext, (ctx) => ctx.editor);
  return useTextEditorEffect(editor!, 'cursorChanged');
}
