import { createContext } from "react";

type TAccordionContext = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

export const AccordionContext = createContext<TAccordionContext>({
  open: false,
  setOpen: (() => {}) as (v: boolean) => void,
});
