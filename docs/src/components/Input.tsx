'use client';

import { ComponentProps } from 'react';

const Input = (props: ComponentProps<'input'>) => {
  return (
    <input
      {...props}
      style={{
        padding: 8,
        background: 'rgba(255,255,255, 0.05)',
        border: '1px solid rgba(255,255,255, 0.1)',
        borderRadius: 4,
        ...props.style,
      }}
    />
  );
};

export default Input;
