import { ReactNode, useRef, useState } from "react";
import { OverlayContext } from "./OverlayContext";
import { OverlayItem } from "./types";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
}

export default function OverlayProvider({
  children,
  containerStyle,
  containerClassName,
}: Props) {
  const [overlays, setOverlays] = useState<OverlayItem<any>[]>([]);
  const overlayIdRef = useRef(0);

  const handleClickOutside = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const isOverlayContent = target.closest("[data-overlay-content]");

    if (!isOverlayContent) {
      const lastOverlay = overlays[overlays.length - 1];
      if (lastOverlay?.options?.closeOnClickOutside) {
        lastOverlay.reject("clickOutside");
      }
    }
  };

  return (
    <OverlayContext.Provider
      value={{
        items: overlays,
        setItems: setOverlays,
        idRef: overlayIdRef,
      }}
    >
      {overlays.length > 0 &&
        createPortal(
          <div
            data-overlay-container
            onClick={handleClickOutside}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "#08090ACC",
              ...containerStyle,
            }}
            className={containerClassName}
          >
            {overlays.map((item) => (
              <div
                key={item.id}
                data-overlay-content
                style={{ width: 0, height: 0 }}
              >
                {item.render({
                  resolve: item.resolve,
                  reject: item.reject,
                })}
              </div>
            ))}
          </div>,
          document.body
        )}
      {children}
    </OverlayContext.Provider>
  );
}
