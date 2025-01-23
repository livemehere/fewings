import "./App.css";
import { useEffect, useState } from "react";
import { AnimateNumber } from "@fekit/fancy-react/AnimateNumber";
import { css } from "@emotion/react";
import { shade } from "@fekit/core/color";
import { Space, Flex, Stack } from "@fekit/fancy-react/layout";
import { Emitter } from "@fekit/core/classes";
import { addCommas } from "@fekit/core/math";

class A extends Emitter<{
  any: () => void;
}> {
  constructor() {
    super();
  }
}

const a = new A();

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount((prev) => prev + 888);
      a.dispatch("any");
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    const off = a.on("any", () => {
      console.log("call any");
    });
    return () => {
      off();
    };
  }, []);
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
