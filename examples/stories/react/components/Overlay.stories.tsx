import { OverlayProvider, useOverlay } from "@fewings/react/overlay";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<any> = {
  title: "react/overlay",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "handle component lifecycle like `Promise`.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

const OverlayExample = () => {
  const { open } = useOverlay();
  const handleOpen = async () => {
    const result = await open(
      ({ resolve, reject }) => (
        <div
          style={{
            background: "white",
            width: 500,
            height: 300,
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <h1>Modal</h1>
          <p>Name: John Doe</p>
          <p>Age: 30</p>
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button onClick={() => resolve("Success!")}>Confirm</button>
            <button onClick={() => reject("Cancel")}>Close</button>
          </div>
        </div>
      ),
      { closeOnClickOutside: true }
    );
    console.log("Result:", result);
  };
  return (
    <div style={{ padding: "20px" }}>
      <h2>Overlay Example</h2>
      <button onClick={handleOpen}>Open Modal</button>
    </div>
  );
};

export const Default: StoryObj<any> = {
  render: () => (
    <OverlayProvider>
      <OverlayExample />
    </OverlayProvider>
  ),
};
