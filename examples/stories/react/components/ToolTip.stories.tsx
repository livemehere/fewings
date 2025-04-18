import { Meta, StoryObj } from "@storybook/react";
import { DummyArea, ToolTip } from "@fewings/react/components";

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
      <DummyArea width={100} height={80}>
        Hover me
      </DummyArea>
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
      description: "ReactNode",
      control: false,
    },
    content: {
      description: "ReactNode",
      control: false,
    },
    dir: {
      description: "Direction of the tooltip content",
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
    arrowColor: {
      control: "color",
      description: "Color of the arrow. Match with the content background",
    },
    open: {
      description: "Controlled open state",
      control: "boolean",
    },
    gap: {
      description:
        "Gap between the content and the trigger (use this or use `padding`, `margin` on your content)",
      control: "number",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToolTip>;

export const Default: Story = {};
