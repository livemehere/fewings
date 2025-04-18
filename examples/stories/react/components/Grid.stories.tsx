import { Meta, StoryObj } from "@storybook/react";
import { DummyArea, Grid } from "@fewings/react/components";

const meta: Meta<typeof Grid> = {
  title: "react/components/Grid",
  component: Grid,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Declarative grid layout component implemented with css `flex`.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    gap: 12,
    rowGap: 12,
    colGap: 12,
  },
  argTypes: {
    gap: {
      control: { type: "number" },
    },
    rowGap: {
      control: { type: "number" },
    },
    colGap: {
      control: { type: "number" },
    },
    children: {
      description: "Content inside the grid",
      control: false,
    },
    className: {
      control: false,
    },
    style: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Default: Story = {
  render: (args) => {
    return (
      <Grid {...args} style={{ width: 800 }}>
        <Grid.Row>
          <Grid.Col>
            <DummyArea height={150}>Content 1</DummyArea>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col>
            <DummyArea height={100}>Content 2</DummyArea>
          </Grid.Col>
          <Grid.Col>
            <DummyArea height={100}>Content 3</DummyArea>
          </Grid.Col>
          <Grid.Col>
            <DummyArea height={100}>Content 4</DummyArea>
          </Grid.Col>
        </Grid.Row>
      </Grid>
    );
  },
};
