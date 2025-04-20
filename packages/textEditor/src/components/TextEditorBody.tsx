import { useContextSelector } from "@fewings/react/contextSelector";
import { TextEditorContext } from "../provider/TextEditorProvider";
import { ComponentProps } from "react";

export default function TextEditorBody(props: ComponentProps<"div">) {
  const editor = useContextSelector(TextEditorContext, (ctx) => ctx.editor);
  const setEditorEl = useContextSelector(
    TextEditorContext,
    (ctx) => ctx.setEditorEl
  );
  return (
    <>
      <div
        ref={(el) => {
          if (!el || !!editor) return;
          setEditorEl(el);
        }}
        {...props}
      />
    </>
  );
}
