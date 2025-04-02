"use client";

import { Slider } from "@fewings/react/components";
import { useState } from "react";

const SliderExample = () => {
  const [horizontalValue, setHorizontalValue] = useState(50);
  const [verticalValue, setVerticalValue] = useState(50);
  const [step, setStep] = useState(1);

  return (
    <div
      style={{
        backgroundColor: "#1f2937",
        color: "white",
        padding: "2rem",
        borderRadius: "0.5rem",
      }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <h3
          style={{
            fontSize: "1.125rem",
            fontWeight: 500,
            marginBottom: "1rem",
            color: "#f3f4f6",
          }}
        >
          Native input range
        </h3>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Step Size: {step}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            style={{ width: "100%" }}
          />
        </div>
      </div>

      <div
        style={{
          border: "1px dashed #4b5563",
          padding: "1.5rem",
          borderRadius: "0.375rem",
          marginBottom: "2rem",
        }}
      >
        <h3 style={{ color: "#f3f4f6", marginBottom: "1rem" }}>
          Horizontal Slider: {horizontalValue}
        </h3>

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
                  transform: "translate(-50%, -6px)",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                }}
              ></div>
            )}
          </Slider.Thumb>
        </Slider.Root>
      </div>

      <div
        style={{
          border: "1px dashed #4b5563",
          padding: "1.5rem",
          borderRadius: "0.375rem",
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <h3 style={{ color: "#f3f4f6" }}>
          Vertical
          <br />
          Slider:
          <br />
          {verticalValue}
        </h3>

        <div style={{ height: "200px" }}>
          <Slider.Root
            value={verticalValue}
            setValue={setVerticalValue}
            min={0}
            max={100}
            step={step}
            dir="vertical"
          >
            <Slider.Track>
              {({ ratio }) => (
                <div
                  style={{
                    height: "200px",
                    width: "8px",
                    background: "#374151",
                    borderRadius: "4px",
                  }}
                >
                  <div
                    style={{
                      height: `${100 - ratio * 100}%`,
                      width: "100%",
                      background: "#8b5cf6",
                      borderRadius: "4px",
                      position: "absolute",
                      bottom: 0,
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
                    background: isDragging ? "#a78bfa" : "#8b5cf6",
                    border: "2px solid #7c3aed",
                    borderRadius: "50%",
                    transform: "translate(-6px, -50%)",
                    cursor: "pointer",
                    transition: "background 0.2s",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  }}
                />
              )}
            </Slider.Thumb>
          </Slider.Root>
        </div>
      </div>
    </div>
  );
};

export default SliderExample;
