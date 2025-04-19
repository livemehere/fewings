import { Meta, StoryObj } from "@storybook/react";
import { Accordion, DummyArea } from "@fewings/react/components";

type ArgsType = React.ComponentProps<typeof Accordion.Root>;

const meta: Meta<ArgsType> = {
  title: "react/components/Accordion",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "The Accordion component is a container that allows users to expand and collapse sections of content.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    initialOpen: false,
    open: undefined,
  },
  argTypes: {
    onChangeOpen: {
      control: false,
    },
    open: {
      type: "boolean",
    },
    initialOpen: {
      type: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<ArgsType>;

export const Basic: Story = {
  render: (args) => (
    <div style={{ minWidth: 400, height: 800 }}>
      <Accordion.Root {...args}>
        <Accordion.Trigger>
          <DummyArea height={80} style={{ cursor: "pointer" }}>
            Accordion.Trigger
          </DummyArea>
        </Accordion.Trigger>
        <Accordion.Panel>
          <DummyArea height={200}>Accordion.Panel</DummyArea>
        </Accordion.Panel>
      </Accordion.Root>
    </div>
  ),
};
