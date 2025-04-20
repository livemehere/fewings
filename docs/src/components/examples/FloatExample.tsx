'use client';

import { Float } from '@fewings/react/components';
import { useState } from 'react';

type PositionType = 'absolute' | 'fixed' | 'relative' | 'sticky';

const FloatExample = () => {
  const [position, setPosition] = useState<PositionType>('absolute');

  return (
    <div
      style={{
        backgroundColor: '#1f2937',
        color: 'white',
        padding: '2rem',
        borderRadius: '0.5rem',
        position: 'relative',
        minHeight: '400px',
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
          Position Type
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['absolute', 'fixed', 'relative', 'sticky'].map((pos) => (
            <button
              key={pos}
              onClick={() => setPosition(pos as PositionType)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: position === pos ? '#3b82f6' : '#374151',
                border: '1px solid #4b5563',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                color: 'white',
              }}
            >
              {pos}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          border: '1px dashed #4b5563',
          padding: '1rem',
          height: '300px',
          overflow: position === 'sticky' ? 'auto' : 'visible',
        }}
      >
        <div
          style={{
            height: position === 'sticky' ? '600px' : '100%',
            position: 'relative',
          }}
        >
          <div
            style={{
              padding: '1rem',
              backgroundColor: '#374151',
              borderRadius: '0.375rem',
              width: '200px',
              marginBottom: '1rem',
            }}
          >
            Container Element
          </div>

          <Float position={position} top={20} right={20} zIndex={100}>
            <div
              style={{
                padding: '1rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                borderRadius: '0.375rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              {position} positioned
              <br />
              top: 20px, right: 20px
            </div>
          </Float>

          <Float position={position} bottom={20} left={20}>
            <div
              style={{
                padding: '1rem',
                backgroundColor: '#8b5cf6',
                color: 'white',
                borderRadius: '0.375rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              {position} positioned
              <br />
              bottom: 20px, left: 20px
            </div>
          </Float>

          {position === 'sticky' && (
            <div style={{ marginTop: '300px', color: '#d1d5db' }}>
              Scroll down to see sticky behavior
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FloatExample;
