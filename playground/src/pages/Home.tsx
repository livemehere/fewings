import { AnimatePresence, motion } from "motion/react";
// import { Popover, Accordion } from "../../../packages/react/src/components";
import { css } from "@emotion/react";
import { useState } from "react";
import { Accordion } from "@fewings/react/components";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  return (
    <div
      css={css`
        height: 200vh;
      `}
    >
      <h1>Playground</h1>
      <Accordion.Root disabled={disabled} initialOpen={true}>
        <Accordion.Trigger>
          <button>Trigger</button>
        </Accordion.Trigger>
        <Accordion.Panel wrapper={AnimatePresence}>
          <motion.ul
            animate={{
              scale: [0, 1],
            }}
            exit={{
              scale: [2, 0],
            }}
            css={css`
              margin: 0;
              background: #6a737d;
            `}
          >
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </motion.ul>
        </Accordion.Panel>
      </Accordion.Root>
      <div>
        <p>open : {open ? "true" : "false"}</p>
      </div>
      <div>
        <button
          onClick={() => {
            setOpen(!open);
          }}
        >
          TOGGLE
        </button>
        <button
          onClick={() => {
            setDisabled(!disabled);
          }}
        >
          DISABLE
        </button>
      </div>
    </div>
  );
};

export default Home;
