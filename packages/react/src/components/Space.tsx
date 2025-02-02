export const Space = ({
  x,
  y,
}: {
  x?: string | number;
  y?: string | number;
}) => {
  return (
    <div
      style={{
        width: x,
        height: y,
        minWidth: x,
        minHeight: y,
        maxWidth: x,
        maxHeight: y,
      }}
    />
  );
};
