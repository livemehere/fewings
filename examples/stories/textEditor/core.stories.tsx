import { Meta, StoryObj } from "@storybook/react";

import {
  TextEditorBody,
  TextEditorProvider,
  TextEditorView,
} from "@fewings/textEditor";
import TextEditorToolbar from "./bundle/TextEditorToolbar";

import "./bundle/Theme.css";
import "./bundle/Editor.css";

const meta: Meta = {
  title: "textEditor/core",
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj = {
  render: () => {
    return (
      <div>
        <TextEditorProvider>
          <div className="editor_layout">
            <TextEditorToolbar />
            <TextEditorBody style={{ height: 400, overflowY: "scroll" }} />
          </div>
        </TextEditorProvider>
        <hr />
        <TextEditorView html={""} />
      </div>
    );
  },
};
