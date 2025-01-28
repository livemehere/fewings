import { ComponentType, Dispatch, SetStateAction } from "react";

export interface OverlayBaseProps {
  close: () => void;
  resolve: <Result = any>(v: Result) => void;
  reject: <Reason = any>(reason: Reason) => void;
}

export interface OverlayOptions {
  onClickOutsideClose?: boolean;
  disableScroll?: boolean;
  enableInsideScroll?: boolean;
  errorOnClose?: boolean;
}

export interface OverlayItem<P = any> extends OverlayBaseProps {
  id: number;
  component: ComponentType<P>;
  props: P;
  options?: OverlayOptions;
}

export interface OverlayContextProps {
  items: OverlayItem[];
  setItems: Dispatch<SetStateAction<OverlayItem[]>>;
  idRef: { current: number };
  errorOnClose: boolean;
}
