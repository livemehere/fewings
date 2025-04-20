export const FILE_UNITS = [
  'B',
  'KB',
  'MB',
  'GB',
  'TB',
  'PB',
  'EB',
  'ZB',
  'YB',
] as const;
export type TUnit = (typeof FILE_UNITS)[number];
export type TGetUnitFn = (unit: TUnit, fixed?: number) => string;

export type THandleFileOptions = {
  multiple?: boolean;
  accept?: string | string[];
  maxBytes?: number;
  maxFiles?: number;
  customValidator?: (file: File) => boolean | Promise<boolean>;
};

export type TFileWithMeta = {
  origin: File;
  toUnit: TGetUnitFn;
};

export type THandleFileEventHooks = {
  onChange?: (files: TFileWithMeta[]) => void;
  onError?: (error: Error) => void;
};
