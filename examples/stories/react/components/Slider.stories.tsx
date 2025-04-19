import { Meta, StoryObj } from "@storybook/react";
import { Accordion, DummyArea, Float, Slider } from "@fewings/react/components";
import { useState } from "react";

type ArgsType = React.ComponentProps<typeof Accordion.Root>;

const meta: Meta<ArgsType> = {
  title: "react/components/Slider",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "The Slider component is a customizable range slider that allows users to select a value from a specified range. It can be styled and configured for various use cases.",
      },
    },
  },
  tags: ["autodocs"],
  args: {},
  argTypes: {},
};

export default meta;
type Story = StoryObj<ArgsType>;

export const Basic: Story = {
  render: (args) => {
    const [v, setV] = useState(0);
    return (
      <Slider.Root
        value={v}
        min={0}
        max={100}
        step={1}
        setValue={setV}
        dir="horizontal"
      >
        <Slider.Track>
          {({ value, ratio }) => (
            <DummyArea
              height={20}
              style={{
                width: 500,
                position: "relative",
              }}
            >
              <Float top={0} left={0} style={{ width: "100%", height: "100%" }}>
                <div
                  style={{
                    width: `${ratio * 100}%`,
                    background: "rgba(0, 0, 0, 0.4)",
                    height: "100%",
                  }}
                ></div>
              </Float>
              <Float
                top={"50%"}
                left={"50%"}
                style={{ transform: "translate(-50%, -50%)" }}
              >
                {value}({ratio})
              </Float>
            </DummyArea>
          )}
        </Slider.Track>
        <Slider.Thumb>
          {({ value, ratio }) => (
            <DummyArea
              width={20}
              height={20}
              style={{
                borderRadius: "50%",
                position: "relative",
                cursor: "grab",
                transform: "translateX(-50%)",
              }}
            >
              <Float top={"110%"}>
                {value}({ratio})
              </Float>
            </DummyArea>
          )}
        </Slider.Thumb>
      </Slider.Root>
    );
  },
};
