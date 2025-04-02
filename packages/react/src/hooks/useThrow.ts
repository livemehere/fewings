import { useState } from "react";

export default function useThrow() {
  const [_, update] = useState();
  const handleThrow = (v: Error | any) => {
    update(() => {
      throw v;
    });
  };

  return handleThrow;
}
