'use client';

import { Space } from '@fewings/react/components';
import { useState } from 'react';

const SpaceExample = () => {
  const [horizontal, setHorizontal] = useState(40);
  const [vertical, setVertical] = useState(20);

  return (
    <div
      style={{
        backgroundColor: '#1f2937',
        color: 'white',
        padding: '2rem',
        borderRadius: '0.5rem',
      }}
    >
      <div style={{ marginBottom: '1.5rem' }}>
        <h3
          style={{
            fontSize: '1.125rem',
            fontWeight: 500,
            marginBottom: '1rem',
            color: '#f3f4f6',
          }}
        >
          Adjust Spacing
        </h3>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Horizontal space (x): {horizontal}px
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={horizontal}
            onChange={(e) => setHorizontal(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Vertical space (y): {vertical}px
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={vertical}
            onChange={(e) => setVertical(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      <div
        style={{
          border: '1px dashed #4b5563',
          padding: '1.5rem',
          borderRadius: '0.375rem',
        }}
      >
        <h3 style={{ color: '#f3f4f6', marginBottom: '1rem' }}>
          Vertical Spacing Example
        </h3>

        <div
          style={{
            padding: '1rem',
            backgroundColor: '#374151',
            borderRadius: '0.375rem',
          }}
        >
          First element
        </div>

        <Space y={vertical} />

        <div
          style={{
            padding: '1rem',
            backgroundColor: '#374151',
            borderRadius: '0.375rem',
          }}
        >
          Second element
        </div>

        <Space y={vertical} />

        <div
          style={{
            padding: '1rem',
            backgroundColor: '#374151',
            borderRadius: '0.375rem',
          }}
        >
          Third element
        </div>
      </div>

      <Space y={40} />

      <div
        style={{
          border: '1px dashed #4b5563',
          padding: '1.5rem',
          borderRadius: '0.375rem',
        }}
      >
        <h3 style={{ color: '#f3f4f6', marginBottom: '1rem' }}>
          Horizontal Spacing Example
        </h3>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              padding: '1rem',
              backgroundColor: '#374151',
              borderRadius: '0.375rem',
            }}
          >
            First
          </div>

          <Space x={horizontal} />

          <div
            style={{
              padding: '1rem',
              backgroundColor: '#374151',
              borderRadius: '0.375rem',
            }}
          >
            Second
          </div>

          <Space x={horizontal} />

          <div
            style={{
              padding: '1rem',
              backgroundColor: '#374151',
              borderRadius: '0.375rem',
            }}
          >
            Third
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceExample;
