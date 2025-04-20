import { Meta, StoryObj } from '@storybook/react';
import { DummyArea } from '@fewings/react/components';

const meta: Meta<typeof DummyArea> = {
  component: DummyArea,
  title: 'react/components/DummyArea',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A dummy area component that serves as a placeholder for other components. It can be styled with different themes and dimensions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: {
        type: 'number',
      },
    },
    height: {
      control: {
        type: 'number',
      },
    },
    theme: {
      options: ['light', 'dark'],
      control: {
        type: 'select',
      },
    },
    children: {
      control: {
        type: 'text',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DummyArea>;

export const Default: Story = {
  args: {
    width: 500,
    height: 500,
    children: '500x500',
    theme: 'light',
  },
};
