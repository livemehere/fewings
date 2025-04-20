import {
  useClickOutside,
  useControlledState,
  useElementPositionObserver,
} from "@fewings/react/hooks";
import React, {
  useContext,
  useRef,
  cloneElement,
  Children,
  useCallback,
  useMemo,
  useLayoutEffect,
} from "react";
import { createPortal } from "react-dom";
import { TPopoverAnchor, TPopoverTrigger } from "./types";
import { PopoverContext } from "./PopoverContext";

const Root = ({
  children,
  closeOnClickOutSide = true,
  type = "click",
  initialOpen,
  open: openProp,
  onChangeOpen,
  disabled,
}: {
  children: React.ReactNode;
  closeOnClickOutSide?: boolean;
  type?: TPopoverTrigger;
  open?: boolean;
  onChangeOpen?: (v: boolean) => void;
  initialOpen?: boolean;
  disabled?: boolean;
}) => {
  const triggerRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const [open = false, setOpen] = useControlledState({
    value: openProp,
    defaultValue: initialOpen,
    onChange: onChangeOpen,
  });
  const controlled = openProp !== undefined;

  return (
    <PopoverContext.Provider
      value={{
        open,
        setOpen: disabled ? () => {} : setOpen,
        triggerRef,
        panelRef,
        closeOnClickOutSide,
        type,
        controlled,
      }}
    >
      {children}
    </PopoverContext.Provider>
  );
};
Root.displayName = "PopoverRoot";

const Trigger = ({ children }: { children: React.ReactElement<any> }) => {
  const { open, setOpen, triggerRef, panelRef, closeOnClickOutSide, type } =
    useContext(PopoverContext);
  const ref = useClickOutside(() => {
    if (closeOnClickOutSide) {
      setOpen(false);
    }
  }, panelRef);

  return Children.map(children, (child) =>
    cloneElement(child, {
      onClick: (e: React.MouseEvent) => {
        child.props.onClick?.(e);
        if (type === "click") {
          setOpen(!open);
        }
      },
      onPointerEnter: (e: React.PointerEvent) => {
        child.props.onPointerEnter?.(e);
        if (type === "hover") {
          setOpen(true);
        }
      },
      onPointerLeave: (e: React.PointerEvent) => {
        child.props.onPointerLeave?.(e);

        const pointerEl = document.elementFromPoint(e.clientX, e.clientY);
        const isPanel = panelRef.current?.contains(pointerEl as Node);
        if (type === "hover" && !isPanel) {
          setOpen(false);
        }
      },
      ref: (el: HTMLElement) => {
        if (typeof child.props.ref === "function") {
          child.props.ref(el);
        } else if (child.props.ref) {
          child.props.ref.current = el;
        }

        triggerRef.current = el;
        ref.current = el;
      },
    }),
  );
};
Trigger.displayName = "PopoverTrigger";

const Panel = ({
  children,
  anchor = "bottom-left",
  wrapper,
  zIndex = 99,
  portal = true,
  fitOnTriggerWidth = false,
}: {
  children: React.ReactNode;
  anchor?: TPopoverAnchor;
  zIndex?: number;
  portal?: boolean;
  wrapper?: React.ComponentType;
  fitOnTriggerWidth?: boolean;
}) => {
  const Wrapper = useMemo(() => wrapper || React.Fragment, [wrapper]);
  const { open, triggerRef, panelRef, type, setOpen } =
    useContext(PopoverContext);

  const setPanelPosition = useCallback(
    (triggerRect: DOMRect) => {
      if (panelRef.current && fitOnTriggerWidth) {
        panelRef.current.style.width = `${triggerRect.width}px`;
      }

      const pBounds = panelRef.current?.getBoundingClientRect();
      if (!triggerRect || !panelRef.current) return;

      const style = panelRef.current.style;

      switch (anchor) {
        case "bottom-right":
          style.top = `${triggerRect.bottom}px`;
          style.right = `${window.innerWidth - triggerRect.right}px`;
          break;
        case "bottom-left":
          style.top = `${triggerRect.bottom}px`;
          style.left = `${triggerRect.left}px`;
          break;
        case "bottom-center":
          style.top = `${triggerRect.bottom}px`;
          style.left = `${triggerRect.left + triggerRect.width / 2 - (pBounds?.width || 0) / 2}px`;
          break;
        case "top-right":
          style.bottom = `${window.innerHeight - triggerRect.top}px`;
          style.right = `${window.innerWidth - triggerRect.right}px`;
          break;
        case "top-left":
          style.bottom = `${window.innerHeight - triggerRect.top}px`;
          style.left = `${triggerRect.left}px`;
          break;
        case "top-center":
          style.bottom = `${window.innerHeight - triggerRect.top}px`;
          style.left = `${triggerRect.left + triggerRect.width / 2 - (pBounds?.width || 0) / 2}px`;
          break;
        case "left-top":
          style.top = `${triggerRect.top}px`;
          style.right = `${window.innerWidth - triggerRect.left}px`;
          break;
        case "left-center":
          style.top = `${triggerRect.top + triggerRect.height / 2 - (pBounds?.height || 0) / 2}px`;
          style.right = `${window.innerWidth - triggerRect.left}px`;
          break;
        case "left-bottom":
          style.bottom = `${window.innerHeight - triggerRect.bottom}px`;
          style.right = `${window.innerWidth - triggerRect.left}px`;
          break;
        case "right-top":
          style.top = `${triggerRect.top}px`;
          style.left = `${triggerRect.right}px`;
          break;
        case "right-center":
          style.top = `${triggerRect.top + triggerRect.height / 2 - (pBounds?.height || 0) / 2}px`;
          style.left = `${triggerRect.right}px`;
          break;
        case "right-bottom":
          style.bottom = `${window.innerHeight - triggerRect.bottom}px`;
          style.left = `${triggerRect.right}px`;
          break;
        default:
          throw new Error("Invalid anchor");
      }
    },
    [anchor, fitOnTriggerWidth],
  );

  useElementPositionObserver(triggerRef, setPanelPosition, open);
  useElementPositionObserver(
    panelRef,
    () => {
      const triggerRect = triggerRef.current?.getBoundingClientRect();
      if (triggerRect) {
        setPanelPosition(triggerRect);
      }
    },
    open,
  );

  useLayoutEffect(() => {
    if (open) {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (rect) {
        setPanelPosition(rect);
      }
    }
  }, [open, setPanelPosition]);

  const Content = useCallback(
    ({ children }: { children: React.ReactNode }) => (
      <div
        ref={(el) => {
          panelRef.current = el;
        }}
        style={{
          position: "fixed",
          zIndex,
          width: "fit-content",
          height: "fit-content",
        }}
        // eslint-disable-next-line react/no-unknown-property
        onPointerLeave={() => {
          if (type === "hover") {
            setOpen(false);
          }
        }}
      >
        {children}
      </div>
    ),
    [open, zIndex, type],
  );

  if (portal) {
    return createPortal(
      <Wrapper>{open && <Content>{children}</Content>}</Wrapper>,
      document.body,
    );
  }
  return <Wrapper>{open && <Content>{children}</Content>}</Wrapper>;
};
Panel.displayName = "PopoverPanel";

export const Popover = {
  Root,
  Trigger,
  Panel,
  Consumer: PopoverContext.Consumer,
};
