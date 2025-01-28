import { MouseEventHandler } from "react";

export const useOverlaySafeArea = (cb: () => void) => {
  const registerClickArea = (): {
    onClick: MouseEventHandler<any>;
  } => {
    return {
      onClick: (e) => {
        let target = e.target as HTMLElement;
        let isSafeArea = false;
        while (
          target !== e.currentTarget &&
          !target.getAttribute("data-overlay-safe-area")
        ) {
          target = target.parentElement!;
          isSafeArea = target.getAttribute("data-overlay-safe-area") === "true";
        }
        if (isSafeArea) return;
        cb();
      },
    };
  };
  const registerSafeArea = () => {
    return {
      "data-overlay-safe-area": "true",
    };
  };

  return {
    registerClickArea,
    registerSafeArea,
  };
};
