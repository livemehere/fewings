import React, {
  createContext,
  useState,
  useContext,
  RefObject,
  useRef,
  cloneElement,
  Children,
  useEffect,
} from "react";

import {
  useClickOutside,
  useForceUpdate,
  useIsomorphicLayoutEffect,
} from "@fewings/react/hooks";
import { Wrappable } from "@fewings/react/types";
import { createPortal } from "react-dom";
import { RemoveScroll } from "react-remove-scroll";

type TriggerType = "click" | "hover";
type TPopoverContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
  triggerRef: RefObject<HTMLElement | null>;
  panelRef: RefObject<HTMLElement | null>;
  closeOnClickOutSide: boolean;
  type: TriggerType;
  scrollLock?: boolean;
};

type Anchor =
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

const PopoverContext = createContext<TPopoverContextValue>({
  open: false,
  setOpen: (() => {}) as (v: boolean) => void,
  triggerRef: { current: null },
  panelRef: { current: null },
  closeOnClickOutSide: true,
  type: "click",
  scrollLock: true,
});

const Root = ({
  children,
  initialOpen = false,
  closeOnClickOutSide = true,
  type = "click",
  scrollLock = true,
}: {
  children: React.ReactNode;
  initialOpen?: boolean;
  closeOnClickOutSide?: boolean;
  type?: TriggerType;
  scrollLock?: boolean;
}) => {
  const triggerRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(initialOpen);
  return (
    <PopoverContext.Provider
      value={{
        open,
        setOpen,
        triggerRef,
        panelRef,
        closeOnClickOutSide,
        type,
        scrollLock,
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
}: {
  children: React.ReactNode;
  anchor?: Anchor;
  zIndex?: number;
} & Wrappable) => {
  const { scrollLock } = useContext(PopoverContext);
  const [_, setPanel] = useState<HTMLElement | null>(null);
  const update = useForceUpdate();

  const Wrapper = wrapper || React.Fragment;
  const ScrollLockWrapper = scrollLock ? RemoveScroll : React.Fragment;
  const { open, triggerRef, panelRef, type, setOpen } =
    useContext(PopoverContext);

  const pos = useRef({});
  const setPos = () => {
    const tBounds = triggerRef.current?.getBoundingClientRect();
    const pBounds = panelRef.current?.getBoundingClientRect();
    pos.current = (() => {
      if (!tBounds) return {};
      switch (anchor) {
        case "bottom-right":
          return {
            top: tBounds.bottom,
            right: window.innerWidth - tBounds.right,
          };
        case "bottom-left":
          return {
            top: tBounds.bottom,
            left: tBounds.left,
          };
        case "bottom-center":
          return {
            top: tBounds.bottom,
            left: tBounds.left + tBounds.width / 2 - (pBounds?.width || 0) / 2,
          };
        case "top-right":
          return {
            bottom: window.innerHeight - tBounds.top,
            right: window.innerWidth - tBounds.right,
          };
        case "top-left":
          return {
            bottom: window.innerHeight - tBounds.top,
            left: tBounds.left,
          };
        case "top-center":
          return {
            bottom: window.innerHeight - tBounds.top,
            left: tBounds.left + tBounds.width / 2 - (pBounds?.width || 0) / 2,
          };
        case "left-top":
          return {
            top: tBounds.top,
            right: window.innerWidth - tBounds.left,
          };
        case "left-center":
          return {
            top: tBounds.top + tBounds.height / 2 - (pBounds?.height || 0) / 2,
            right: window.innerWidth - tBounds.left,
          };
        case "left-bottom":
          return {
            bottom: window.innerHeight - tBounds.bottom,
            right: window.innerWidth - tBounds.left,
          };
        case "right-top":
          return {
            top: tBounds.top,
            left: tBounds.right,
          };
        case "right-center":
          return {
            top: tBounds.top + tBounds.height / 2 - (pBounds?.height || 0) / 2,
            left: tBounds.right,
          };
        case "right-bottom":
          return {
            bottom: window.innerHeight - tBounds.bottom,
            left: tBounds.right,
          };
        default:
          throw new Error("Invalid anchor");
      }
    })();
  };
  useIsomorphicLayoutEffect(() => {
    if (open) {
      setPos();
    }
  });

  useEffect(() => {
    const handler = () => {
      if (open) {
        setPos();
        update();
      }
    };
    window.addEventListener("resize", handler);
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("resize", handler);
      window.removeEventListener("scroll", handler);
    };
  }, [open]);

  return createPortal(
    <Wrapper>
      {open && (
        <ScrollLockWrapper>
          <div
            ref={(el) => {
              panelRef.current = el;
              setPanel(el);
            }}
            style={{
              position: "fixed",
              zIndex,
              width: "fit-content",
              height: "fit-content",
              ...pos.current,
            }}
            onPointerLeave={() => {
              if (type === "hover") {
                setOpen(false);
              }
            }}
          >
            {children}
          </div>
        </ScrollLockWrapper>
      )}
    </Wrapper>,
    document.body,
  );
};
Panel.displayName = "PopoverPanel";

export const Popover = {
  Root,
  Trigger,
  Panel,
  Consumer: PopoverContext.Consumer,
};
