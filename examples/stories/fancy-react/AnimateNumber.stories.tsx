import { Meta, StoryObj } from "@storybook/react";
import { withCommas } from "@fewings/core/converter";
import { AnimateNumber } from "@fewings/fancy-react";

const meta: Meta<typeof AnimateNumber> = {
  title: "fancy-react/AnimateNumber",
  component: AnimateNumber,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "AnimateNumber is a component that animates a number from a start value to an end value over a specified duration.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    value: 1234567,
    countDur: 0.3,
    sizeDur: 0.3,
  },
  argTypes: {
    value: {
      control: {
        type: "number",
      },
    },
    countDur: {
      control: {
        type: "number",
      },
    },
    sizeDur: {
      control: {
        type: "number",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AnimateNumber>;

// Basic example
export const Default: Story = {
  render: (args) => {
    return (
      <div>
        <AnimateNumber
          {...args}
          format={(v) => withCommas(v)}
          style={{ fontSize: 32, fontWeight: "bold" }}
        />
      </div>
    );
  },
};
