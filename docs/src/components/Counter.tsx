'use client';

import { useState } from 'react';
import { AnimateNumber } from '@fewings/fancy-react/AnimateNumber';

const Counter = () => {
  const [cnt, setCnt] = useState(0);
  return (
    <div>
      <button onClick={() => setCnt(cnt + 1)}>Increment</button>
      <AnimateNumber value={cnt} />
    </div>
  );
};

export default Counter;
