import { createContext } from 'react';
import { TPopoverContext } from './types';

export const PopoverContext = createContext<TPopoverContext>({
  open: false,
  setOpen: (() => {}) as (v: boolean) => void,
  triggerRef: { current: null },
  panelRef: { current: null },
  closeOnClickOutSide: true,
  type: 'click',
  controlled: false,
});
