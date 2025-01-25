import "./App.css";
import { css } from "@emotion/react";
import { Popover } from "@fewings/react/components";
import { motion } from "motion/react";

function App() {
  return (
    <div>
      <Popover.Root type={"hover"}>
        <Popover.Trigger>
          <h1
            css={css`
              cursor: pointer;
              margin: 0;
              padding: 24px;
              background: #f0f0f0;
            `}
          >
            hello
          </h1>
        </Popover.Trigger>
        <Popover.Panel anchor={"right-center"}>
          <motion.div
            animate={{
              x: [-10, 0],
              opacity: [0, 1],
            }}
            css={css`
              width: 200px;
              height: 200px;
              background: #424242;
              //margin-top: 15px;
            `}
          >
            world
          </motion.div>
        </Popover.Panel>
      </Popover.Root>
    </div>
  );
}

export default App;
