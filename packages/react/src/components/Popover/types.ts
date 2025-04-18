import { RefObject } from "react";

export type TPopoverTrigger = "click" | "hover";
export type TPopoverContext = {
  open: boolean;
  setOpen: (v: boolean) => void;
  triggerRef: RefObject<HTMLElement | null>;
  panelRef: RefObject<HTMLElement | null>;
  closeOnClickOutSide: boolean;
  type: TPopoverTrigger;
  controlled?: boolean;
};

export type TPopoverAnchor =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center"
  | "left-center"
  | "left-top"
  | "left-bottom"
  | "right-center"
  | "right-top"
  | "right-bottom";
