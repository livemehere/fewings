import { Meta, StoryObj } from "@storybook/react";
import { ToolTip } from "@fewings/react/components";

const meta: Meta<typeof ToolTip> = {
  title: "react/components/ToolTip",
  component: ToolTip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "`ToolTip` is an Additional implementation with `Popover` component.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    children: (
      <button
        style={{
          border: "none",
          background: "#2387d8",
          color: "#fff",
          padding: 10,
          borderRadius: 4,
        }}
      >
        KONG
      </button>
    ),
    content: (
      <div
        style={{
          backgroundColor: "#262626",
          color: "#fff",
          padding: 8,
          borderRadius: 4,
          boxSizing: "border-box",
          width: 500,
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
        voluptatum eaque reiciendis cupiditate quidem, nulla recusandae
        adipisci, vitae delectus facilis sit. Culpa voluptatibus quia illum at
        architecto neque et laboriosam
      </div>
    ),
  },
  argTypes: {
    children: {
      description: "Trigger element",
      control: false,
    },
    content: {
      description: "Content to display in the tooltip",
      control: false,
    },
    dir: {
      description: "Direction of the tooltip",
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
    arrowColor: {
      description: "Tooltip arrow color",
      control: "color",
    },
    open: {
      description: "Controlled open state",
      control: "boolean",
    },
    gap: {
      description: "Gap between the content and the trigger",
      control: "number",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToolTip>;

export const Default: Story = {};
