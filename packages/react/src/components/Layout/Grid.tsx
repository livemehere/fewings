import { createContext, useContext } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const GridContext = createContext<{
  rowGap?: number;
  colGap?: number;
}>({ rowGap: 0, colGap: 0 });

export function Grid({
  children,
  className,
  style,
  rowGap,
  colGap,
  gap,
}: Props & {
  rowGap?: number;
  colGap?: number;
  gap?: number;
}) {
  return (
    <GridContext.Provider
      value={{ rowGap: rowGap ?? gap, colGap: colGap ?? gap }}
    >
      <div
        className={className}
        style={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: rowGap ?? gap,
          ...style,
        }}
      >
        {children}
      </div>
    </GridContext.Provider>
  );
}
function Row({
  children,
  className,
  style,
  gap,
}: Props & {
  gap?: number;
}) {
  const { colGap } = useContext(GridContext);
  const _gap = gap ?? colGap;
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flex: 1,
        ...style,
        columnGap: _gap,
      }}
    >
      {children}
    </div>
  );
}

function Col({ children, className, style }: Props) {
  return (
    <div
      className={className}
      style={{
        flex: 1,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

Grid.Row = Row;
Grid.Col = Col;
Grid.displayName = 'Grid';
