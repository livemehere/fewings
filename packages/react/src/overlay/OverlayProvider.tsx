import {
  ComponentType,
  createElement,
  Fragment,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { OverlayContext } from "./OverlayContext";
import { OverlayBaseProps, OverlayItem } from "./types";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
  closeOnRouteChange?: boolean;
  disableBodyScrollWhenOpen?: boolean;
  errorOnClose?: boolean;
  wrapper?: ComponentType;
}

export const OverlayProvider = ({
  children,
  closeOnRouteChange = true,
  disableBodyScrollWhenOpen = true,
  errorOnClose = false,
  wrapper,
}: Props) => {
  const Wrapper = wrapper ?? Fragment;
  const [overlays, setOverlays] = useState<OverlayItem[]>([]);
  const overlayIdRef = useRef(0);

  /* Clear All overlay when popstate change */
  useEffect(() => {
    if (!closeOnRouteChange) return;
    const handler = () => {
      setOverlays([]);
    };

    window.addEventListener("popstate", handler);
    return () => {
      window.removeEventListener("popstate", handler);
    };
  }, [closeOnRouteChange]);

  /* Disable Scroll */
  useEffect(() => {
    function disableScroll(preventEvent = true, preventStyle = true) {
      if (preventEvent) {
        window.addEventListener("wheel", handler, {
          passive: false,
        });
        window.addEventListener("touchmove", handler, {
          passive: false,
        });
      }

      if (preventStyle) {
        document.documentElement.style.overflow = "hidden";
      }
    }

    function enableScroll() {
      window.removeEventListener("wheel", handler);
      window.removeEventListener("touchmove", handler);

      document.documentElement.style.overflow = "visible";
    }

    function handler(e: Event) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (overlays.length > 0) {
      const finallyDisableScroll =
        overlays[overlays.length - 1].options?.disableScroll !== undefined
          ? overlays[overlays.length - 1].options?.disableScroll
          : disableBodyScrollWhenOpen;

      const preventEvent =
        overlays[overlays.length - 1].options?.enableInsideScroll !== true;

      if (finallyDisableScroll) {
        disableScroll(preventEvent, true);
      } else {
        enableScroll();
      }
    } else {
      enableScroll();
    }

    return () => {
      enableScroll();
    };
  }, [overlays, disableBodyScrollWhenOpen]);

  return (
    <OverlayContext.Provider
      value={{
        items: overlays,
        setItems: setOverlays,
        idRef: overlayIdRef,
        errorOnClose,
      }}
    >
      {createPortal(
        <Wrapper>
          {overlays.map((overlay) => {
            return createElement<OverlayBaseProps>(overlay.component, {
              ...overlay.props,
              close: overlay.close,
              resolve: overlay.resolve,
              reject: overlay.reject,
              key: `overlay-${overlay.id}`,
            });
          })}
        </Wrapper>,
        document.body,
      )}
      {children}
    </OverlayContext.Provider>
  );
};
