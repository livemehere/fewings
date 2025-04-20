import { Meta, StoryObj } from "@storybook/react";

import { TextEditorConfig } from "../../../packages/textEditor/src";

import "./sample/Theme.css";
import "./sample/Editor.css";
import SampleTextEditor from "./sample/SampleEditor";

const meta: Meta<TextEditorConfig> = {
  title: "textEditor/sample",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "`@fewings/textEditor` provides core functionality for text editing. Fully customizable and extensible, it allows you to create your own text editor with ease. This example demonstrates a simple text editor with a toolbar and body area.",
      },
    },
  },
  args: {
    mode: "edit",
    spellcheck: true,
  },
  argTypes: {
    mode: {
      options: ["view", "edit"],
      control: { type: "select" },
    },
    spellcheck: {
      options: [true, false],
      control: { type: "boolean" },
    },
  },
};

export default meta;

export const Default: StoryObj<TextEditorConfig> = {
  render: ({ mode, spellcheck }) => (
    <SampleTextEditor mode={mode} spellcheck={spellcheck} showPreview />
  ),
};

export const MultipleEditor: StoryObj<TextEditorConfig> = {
  render: ({ mode, spellcheck }) => (
    <div>
      <SampleTextEditor mode={mode} spellcheck={spellcheck} />
      <hr />
      <SampleTextEditor mode={mode} spellcheck={spellcheck} />
    </div>
  ),
};
