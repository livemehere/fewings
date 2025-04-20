import { useMemo } from 'react';
import { TOOLTIP_DEFAULT_OPTIONS, TToolTipOptions } from './schema';

const ROTATE_MAP = {
  top: 180,
  bottom: 0,
  left: 90,
  right: 270,
};

export function useTooltip(options: TToolTipOptions = {}) {
  const mergedOptions = useMemo(() => {
    const filteredOptions = Object.fromEntries(
      Object.entries(options).filter(
        ([_, value]) => value !== null && value !== undefined
      )
    );

    return {
      ...TOOLTIP_DEFAULT_OPTIONS,
      ...filteredOptions,
    };
  }, [options]);

  const { dir, gap, arrowColor } = mergedOptions;

  const marginStyleMap = useMemo(() => {
    return {
      top: { marginBottom: `${gap}px` },
      bottom: { marginTop: `${gap}px` },
      left: { marginRight: `${gap}px` },
      right: { marginLeft: `${gap}px` },
    };
  }, [gap]);

  const arrowPositionStyleMap = useMemo(() => {
    return {
      top: {
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
      } as React.CSSProperties,
      bottom: {
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
      } as React.CSSProperties,
      left: {
        position: 'absolute',
        left: '100%',
        top: '50%',
        transform: 'translateY(-50%)',
      } as React.CSSProperties,
      right: {
        position: 'absolute',
        right: '100%',
        top: '50%',
        transform: 'translateY(-50%)',
      } as React.CSSProperties,
    };
  }, []);

  const marginStyle = useMemo(() => {
    return marginStyleMap[dir];
  }, [marginStyleMap, dir]);

  const arrowProps = useMemo(() => {
    const positionStyle = arrowPositionStyleMap[dir];
    const rotateStyle = {
      transform: `${positionStyle.transform} rotate(${ROTATE_MAP[dir]}deg)`,
    };
    const mergedStyle = {
      ...positionStyle,
      ...rotateStyle,
    } as React.CSSProperties;

    return {
      style: mergedStyle,
      fill: arrowColor,
    };
  }, [arrowPositionStyleMap, ROTATE_MAP, dir, arrowColor]);

  return {
    marginStyle,
    arrowProps,
    options: mergedOptions,
    dir,
  };
}
