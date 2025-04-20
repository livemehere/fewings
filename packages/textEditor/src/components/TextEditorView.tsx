import { ComponentProps } from "react";
import { TextEditor } from "../core/TextEditor";

interface Props {
  html?: string;
}

export default function TextEditorView({
  ...props
}: Props & ComponentProps<"div">) {
  return (
    <div
      {...{ [TextEditor.TARGET_ELEMENT_ATTR_NAME]: "true" }}
      dangerouslySetInnerHTML={{ __html: props.html ?? "" }}
      {...props}
    ></div>
  );
}
