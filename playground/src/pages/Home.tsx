import { css } from "@emotion/react";
import { useControlledState } from "../../../packages/react/src/hooks/useControlledState";
import { atom, useAtom } from "jotai";

const vAtom = atom("");

const Home = () => {
  const [g, setG] = useAtom(vAtom);
  const [v, setV] = useControlledState({
    defaultValue: "hello",
    value: g,
    onChange: (v) => {
      setG(v);
    },
  });

  return (
    <div css={css``}>
      <h1>hello world</h1>
      <input type="text" value={v} onChange={(e) => setV(e.target.value)} />
    </div>
  );
};

export default Home;
