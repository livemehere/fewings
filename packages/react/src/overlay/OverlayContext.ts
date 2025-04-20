import { OverlayContextProps } from './types';
import { createContext } from '@fewings/react/contextSelector';

export const OverlayContext = createContext<OverlayContextProps>({
  items: [],
  setItems: () => {},
  idRef: { current: 0 },
});
