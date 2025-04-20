export const TOOLTIP_DIRS = ['top', 'bottom', 'left', 'right'] as const;

export type TToolTipDirection = (typeof TOOLTIP_DIRS)[number];
export type TToolTipOptions = {
  dir?: TToolTipDirection;
  gap?: number;
  arrowColor?: string;
};

export const TOOLTIP_DEFAULT_OPTIONS: Required<TToolTipOptions> = {
  dir: 'bottom',
  gap: 8,
  arrowColor: '#262626',
};
