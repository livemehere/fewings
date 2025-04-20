import { useState } from 'react';

export const useThrow = () => {
  const [_, update] = useState();
  const handleThrow = (v: Error | any) => {
    update(() => {
      throw v;
    });
  };

  return handleThrow;
};
