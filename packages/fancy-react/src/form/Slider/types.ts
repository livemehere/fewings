export type Data = {
  ratio: number;
  value: number;
  reverseValue: number;
  reverseRatio: number;
};

export type TPointerState = {
  isDown: boolean;
  startX: number;
  startTx: number;
};

export type TOnUpdateData = (
  v: number,
  ratio?: boolean,
  isExternal?: boolean,
  isReverse?: boolean,
) => void;
