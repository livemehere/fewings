import { useContextSelector } from '@fewings/react/contextSelector';
import { TextEditorContext } from '../provider/TextEditorProvider';

export default function useTextEditor() {
  return useContextSelector(TextEditorContext, (ctx) => ctx.editor);
}
