import { ComponentProps, ComponentType } from "react";
import { OverlayContext } from "./OverlayContext";
import { OverlayOptions, OverlayBaseProps, OverlayItem } from "./types";
import { useContextSelector } from "@fewings/react/contextSelector";

export const useOverlay = () => {
  const setItems = useContextSelector(OverlayContext, (v) => v.setItems);
  const idRef = useContextSelector(OverlayContext, (v) => v.idRef);
  const errorOnClose = useContextSelector(
    OverlayContext,
    (v) => v.errorOnClose,
  );
  const open = <R, C extends ComponentType<any>>(
    component: C,
    props?: Omit<ComponentProps<C>, keyof OverlayBaseProps>,
    options?: OverlayOptions,
  ) => {
    return new Promise<R>((resolve, reject) => {
      const overlayId = idRef.current++;
      const overlay: OverlayItem = {
        id: overlayId,
        component,
        props,
        options,
        close: () => {
          close(overlayId);
          const individualErrorOnClose = options?.errorOnClose;
          if (individualErrorOnClose === undefined) {
            if (errorOnClose) {
              reject("close");
            }
          } else {
            if (individualErrorOnClose) {
              reject("close");
            }
          }
        },
        resolve: (value) => {
          close(overlayId);
          resolve(value as unknown as R);
        },
        reject: (reason) => {
          close(overlayId);
          reject(reason);
        },
      };
      setItems((prev) => [...prev, overlay]);
    });
  };

  const close = (id: number) => {
    setItems((prev) => prev.filter((overlay) => overlay.id !== id));
  };

  const closeAll = () => {
    setItems([]);
  };

  return {
    open,
    closeAll,
  };
};
