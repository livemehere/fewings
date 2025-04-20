import { useCallback, useState } from 'react';

export const useForceUpdate = () => {
  const [, setS] = useState({});
  return useCallback(() => setS({}), []);
};
