import { css } from "@emotion/react";
import { useState } from "react";
import { ratioToPercent } from "@fewings/core/converter";
import { Slider } from "@fewings/react/components";

const Home = () => {
  const [v, setV] = useState(10);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(15);

  return (
    <div>
      <h1>Home</h1>
      <Slider.Root
        value={v}
        setValue={setV}
        min={min}
        max={max}
        step={0.5}
        dir={"horizontal"}
      >
        <Slider.Thumb>
          {({ value, ratio, isDragging }) => (
            <div
              css={css`
                width: 20px;
                height: 40px;
                opacity: 0.5;
                cursor: default;
                user-select: none;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                color: black;
              `}
              style={{
                background: `linear-gradient(
                  to top,
                  rgba(255, 255, 255, 1) ${ratioToPercent(ratio)},
                  rgba(50, 50, 50, 1) ${ratioToPercent(ratio)},

                  rgba(50, 50, 50, 1) 100%
                )`,
                transform: `translate(-50%, -50%) ${isDragging ? "scale(1.1)" : ""}`,
              }}
            >
              {value.toFixed(1)}
            </div>
          )}
        </Slider.Thumb>
        <Slider.Track>
          {({ value, ratio, isDragging }) => (
            <div
              css={css`
                width: 500px;
                height: 10px;
                border-radius: 4px;
              `}
              style={{
                background: `linear-gradient(
                    to right,
                    rgba(255, 255, 255, 1) ${ratioToPercent(ratio)},
                    rgba(50, 50, 50, 1) ${ratioToPercent(ratio)},
                    rgba(50, 50, 50, 1) 100%
                    )`,
                outline: isDragging ? "2px solid red" : "none",
              }}
            ></div>
          )}
        </Slider.Track>
      </Slider.Root>
      <div>value : {v}</div>
      <button
        onClick={() => {
          setMin(5);
        }}
      >
        set
      </button>
    </div>
  );
};

export default Home;
