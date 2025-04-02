import { Slider } from "../../../packages/react/src/components/Slider";
import { useState } from "react";
const Page2 = () => {
  const [horizontalValue, setHorizontalValue] = useState(0);
  const [step] = useState(1);
  return (
    <div style={{ padding: "2rem" }}>
      <Slider.Root
        value={horizontalValue}
        setValue={setHorizontalValue}
        min={0}
        max={100}
        step={step}
        dir="horizontal"
      >
        <Slider.Track>
          {({ ratio }) => (
            <div
              style={{
                width: "300px",
                height: "8px",
                background: "#374151",
                borderRadius: "4px",
              }}
            >
              <div
                style={{
                  width: `${ratio * 100}%`,
                  height: "100%",
                  background: "#3b82f6",
                  borderRadius: "4px",
                }}
              />
            </div>
          )}
        </Slider.Track>
        <Slider.Thumb>
          {({ isDragging }) => (
            <div
              style={{
                width: "20px",
                height: "20px",
                background: isDragging ? "red" : "#3b82f6",
                border: "2px solid #2563eb",
                borderRadius: "50%",
                transform: "translate(-50%, -8px)",
                cursor: "pointer",
                transition: "background 0.2s",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            ></div>
          )}
        </Slider.Thumb>
      </Slider.Root>
    </div>
  );
};

export default Page2;
