import { Meta, StoryObj } from "@storybook/react";
import {
  TFileWithMeta,
  useHandleFile,
  THandleFileOptions,
} from "../../../packages/react/src/handleFile";
import { DummyArea, Space } from "@fewings/react/components";
import { useState } from "react";

const meta: Meta<THandleFileOptions> = {
  title: "react/handleFile",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Handle file input and drag-and-drop functionality.",
      },
    },
  },
  args: {
    multiple: true,
    accept: "image/*",
    maxBytes: 10 * 1024 * 1024, // 10MB
    maxFiles: 5,
    customValidator: async (file) => {
      throw new Error("just no"); // way1. throw error can user own error message

      //   return file.name.includes("test"); // way2. return boolean, just validate. use default error message
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<any>;

export const Default: Story = {
  render: (args) => {
    const [files, setFiles] = useState<TFileWithMeta[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { register, isDragOver, select } = useHandleFile({
      onChange: setFiles,
      onError: (error) => {
        console.error("Error:", error);
        setError(error.message);
      },
      ...args,
    });
    return (
      <div>
        <h1>File Input Example</h1>
        <DummyArea
          onClick={async () => {
            const res = await select();
            console.log("Selected files:", res);
          }}
          style={{ cursor: "pointer" }}
          height={80}
        >
          open programmatically
        </DummyArea>
        <Space y={20} />
        <DummyArea
          {...register()}
          style={{
            height: 200,
            border: isDragOver ? "2px dashed blue" : "none",
          }}
        >
          Drop or Click
        </DummyArea>
        <div>
          {error && (
            <div style={{ color: "red", marginTop: 10 }}>
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <strong>{file.origin.name}</strong> - {file.toUnit("MB", 2)}
            </li>
          ))}
          {files.length === 0 && <li>No files uploaded.</li>}
        </ul>
      </div>
    );
  },
};
