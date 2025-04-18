export const TOOLTIP_DIRS = ["top", "bottom", "left", "right"] as const;

export type ToolTipDirection = (typeof TOOLTIP_DIRS)[number];
export type ToolTipOptions = {
  dir?: ToolTipDirection;
  gap?: number;
  arrowColor?: string;
};

export const TOOLTIP_DEFAULT_OPTIONS: Required<ToolTipOptions> = {
  dir: "bottom",
  gap: 8,
  arrowColor: "#262626",
};
