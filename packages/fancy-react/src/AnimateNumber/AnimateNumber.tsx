import { AnimatePresence, motion } from "motion/react";
import { ComponentProps, useEffect, useMemo, useRef } from "react";

import { Chars } from "./Chars";
import { isNumberString } from "./utils";

type Props = {
  value: number;
  countDur?: number;
  sizeDur?: number;
  format?: (value: number) => string;
};

export function AnimateNumber({
  value,
  countDur = 0.5,
  sizeDur = 0.3,
  format = (v) => `${v}`,
  style,
  ...props
}: Props & ComponentProps<"div">) {
  const formatRef = useRef(format);
  const chars = useMemo(() => formatRef.current(value).split(""), [value]);

  useEffect(() => {
    formatRef.current = format;
  });

  return (
    <div
      style={{
        width: "fit-content",
        height: "fit-content",
        display: "flex",
        alignItems: "center",
        ...style,
      }}
      {...props}
    >
      <AnimatePresence>
        {chars.map((char, i) =>
          isNumberString(char) ? (
            <Chars key={i} to={+char} countDur={countDur} widthDur={sizeDur} />
          ) : (
            <motion.div
              key={`${char}${i !== 0 && i !== chars.length - 1 ? i : ""}`}
              initial={{
                opacity: 0,
                width: 0,
              }}
              animate={{
                opacity: 1,
                width: "auto",
              }}
              exit={{
                width: 0,
                opacity: 0,
              }}
              transition={{
                duration: sizeDur,
                transformOrigin: "left",
              }}
            >
              {char}
            </motion.div>
          ),
        )}
      </AnimatePresence>
    </div>
  );
}
