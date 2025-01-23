import "./App.css";
import { useState } from "react";
import { AnimateNumber } from "@fewings/fancy-react/AnimateNumber";
import { css } from "@emotion/react";
import { shade } from "@fewings/core/color";
import { Space, Flex, Stack } from "@fewings/fancy-react/layout";
import { addCommas } from "@fewings/core/math";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Space y={100} />
      <Flex
        align={"center"}
        gap={10}
        css={css`
          background: #d2d2d2;
          &:hover {
            background: ${shade("#fff", -20)};
          }
        `}
      >
        <h1>hello</h1>
        <div>bye</div>
        <Stack gap={"33vh"}>
          <h2>hello</h2>
          <h2>hello</h2>
        </Stack>
      </Flex>
      <AnimateNumber value={count} format={(v) => addCommas(v)} />
    </div>
  );
}

export default App;
