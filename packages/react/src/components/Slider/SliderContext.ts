import { createContext } from '@fewings/react/contextSelector';
import { RefObject } from 'react';

export interface TSliderContext {
  value: number;
  setValue: (value: number) => void;
  min: number;
  max: number;
  step: number;
  disabled?: boolean;
  dir: 'horizontal' | 'vertical';
  //
  thumbRef: RefObject<HTMLElement | null>;
  trackRef: RefObject<HTMLElement | null>;
  ratio: number;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
}

export const SliderContext = createContext<TSliderContext>(
  null as unknown as TSliderContext
);
