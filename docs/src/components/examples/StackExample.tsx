'use client';

import { VStack, HStack } from '@fewings/react/components';
import { useState } from 'react';

type AlignType = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type JustifyType =
  | 'start'
  | 'center'
  | 'end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

const StackExample = () => {
  const [gap, setGap] = useState(16);
  const [align, setAlign] = useState<AlignType>('center');
  const [justify, setJustify] = useState<JustifyType>('start');

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
          Stack Controls
        </h3>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Gap: {gap}px
          </label>
          <input
            type="range"
            min="0"
            max="40"
            value={gap}
            onChange={(e) => setGap(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Align:
          </label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {(
              ['start', 'center', 'end', 'stretch', 'baseline'] as AlignType[]
            ).map((a) => (
              <button
                key={a}
                onClick={() => setAlign(a)}
                style={{
                  padding: '0.5rem',
                  backgroundColor: align === a ? '#3b82f6' : '#374151',
                  border: '1px solid #4b5563',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  color: 'white',
                }}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Justify:
          </label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {(
              [
                'start',
                'center',
                'end',
                'space-between',
                'space-around',
                'space-evenly',
              ] as JustifyType[]
            ).map((j) => (
              <button
                key={j}
                onClick={() => setJustify(j)}
                style={{
                  padding: '0.5rem',
                  backgroundColor: justify === j ? '#3b82f6' : '#374151',
                  border: '1px solid #4b5563',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  color: 'white',
                }}
              >
                {j}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          border: '1px dashed #4b5563',
          padding: '1.5rem',
          borderRadius: '0.375rem',
          marginBottom: '2rem',
        }}
      >
        <h3 style={{ color: '#f3f4f6', marginBottom: '1rem' }}>
          VStack Example
        </h3>

        <VStack
          gap={gap}
          align={align}
          justify={justify}
          style={{
            border: '1px dashed #6b7280',
            padding: '1rem',
            height: '300px',
          }}
        >
          <div
            style={{
              padding: '1rem',
              backgroundColor: '#374151',
              borderRadius: '0.375rem',
              width: '80px',
            }}
          >
            Item 1
          </div>
          <div
            style={{
              padding: '1rem',
              backgroundColor: '#374151',
              borderRadius: '0.375rem',
              width: '140px',
            }}
          >
            Item 2
          </div>
          <div
            style={{
              padding: '1rem',
              backgroundColor: '#374151',
              borderRadius: '0.375rem',
              width: '100px',
            }}
          >
            Item 3
          </div>
        </VStack>
      </div>

      <div
        style={{
          border: '1px dashed #4b5563',
          padding: '1.5rem',
          borderRadius: '0.375rem',
        }}
      >
        <h3 style={{ color: '#f3f4f6', marginBottom: '1rem' }}>
          HStack Example
        </h3>

        <HStack
          gap={gap}
          align={align}
          justify={justify}
          style={{
            border: '1px dashed #6b7280',
            padding: '1rem',
            minHeight: '180px',
          }}
        >
          <div
            style={{
              padding: '1rem',
              backgroundColor: '#374151',
              borderRadius: '0.375rem',
              height: '60px',
            }}
          >
            Item 1
          </div>
          <div
            style={{
              padding: '1rem',
              backgroundColor: '#374151',
              borderRadius: '0.375rem',
              height: '100px',
            }}
          >
            Item 2
          </div>
          <div
            style={{
              padding: '1rem',
              backgroundColor: '#374151',
              borderRadius: '0.375rem',
              height: '80px',
            }}
          >
            Item 3
          </div>
        </HStack>
      </div>
    </div>
  );
};

export default StackExample;
