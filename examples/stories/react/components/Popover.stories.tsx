import { Meta, StoryObj } from '@storybook/react';
import { Popover, DummyArea } from '@fewings/react/components';

type ArgsType = React.ComponentProps<typeof Popover.Root> &
  React.ComponentProps<typeof Popover.Panel>;

const meta: Meta<ArgsType> = {
  title: 'react/components/Popover',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The Popover component is a wrapper for the Popover.Trigger and Popover.Panel components. It manages the open state and provides context to its children.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    closeOnClickOutSide: true,
    type: 'click',
    initialOpen: false,
    disabled: false,
    anchor: 'bottom-center',
    portal: true,
    fitOnTriggerWidth: false,
  },
  argTypes: {
    closeOnClickOutSide: { control: 'boolean' },
    type: { control: 'select', options: ['click', 'hover'] },
    anchor: {
      control: 'select',
      options: [
        'top-left',
        'top-right',
        'top-center',
        'bottom-left',
        'bottom-right',
        'bottom-center',
        'left-center',
        'left-top',
        'left-bottom',
        'right-center',
        'right-top',
        'right-bottom',
      ],
    },
    initialOpen: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<ArgsType>;

export const Basic: Story = {
  render: ({
    closeOnClickOutSide,
    type,
    initialOpen,
    disabled,
    anchor,
    portal,
    fitOnTriggerWidth,
  }) => (
    <Popover.Root
      closeOnClickOutSide={closeOnClickOutSide}
      type={type}
      initialOpen={initialOpen}
      disabled={disabled}
    >
      <Popover.Trigger>
        <DummyArea width={150} height={80} style={{ cursor: 'pointer' }}>
          Popover.Trigger
        </DummyArea>
      </Popover.Trigger>
      <Popover.Panel
        anchor={anchor}
        fitOnTriggerWidth={fitOnTriggerWidth}
        portal={portal}
      >
        <DummyArea width={200} height={200}>
          Popover.Panel
        </DummyArea>
      </Popover.Panel>
    </Popover.Root>
  ),
};
