import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useAnimate } from 'motion/react';
import { usePrevState } from '@fewings/react/hooks';

type TCharSize = {
  w: number;
  h: number;
};

export function Chars({
  to,
  countDur,
  widthDur,
  direction = 'random',
  onSizeChange,
}: {
  to: number;
  countDur: number;
  widthDur: number;
  direction?: 'up' | 'down' | 'random';
  onSizeChange?: (size: TCharSize) => void;
}) {
  const prev = usePrevState(to) ?? 0;
  const isUp = useMemo(() => direction === 'up' || prev < to, [direction, to]);
  const [size, setSize] = useState<TCharSize>({ w: 0, h: 0 });

  const doneTimerRef = useRef<number | null>(null);
  const clearDoneTimer = () => {
    if (doneTimerRef.current) {
      clearTimeout(doneTimerRef.current);
    }
  };
  const nRef = useRef<HTMLDivElement>(null);
  const setDone = (v: boolean) => {
    const nEl = nRef.current;

    if (nEl) {
      nEl.style.visibility = v ? 'visible' : 'hidden';
      scope.current.style.display = v ? 'none' : 'block';
    }
  };

  const [scope, animate] = useAnimate();
  const prevTo = useRef(0);
  const from = useMemo(() => {
    const prev = prevTo.current;
    prevTo.current = to;
    return prev;
  }, [to]);

  const countDir = to > from ? 1 : -1;

  const nums = useMemo(() => {
    const arr = Array.from(
      { length: Math.abs(to - from) + 1 },
      (_, i) => from + i * countDir
    );
    return isUp ? arr : arr.reverse();
  }, [to, from, isUp]);

  useEffect(() => {
    clearDoneTimer();
    setDone(false);
    const y = [0, `calc(-100% + ${size.h}px)`];
    animate(
      scope.current,
      {
        y: isUp ? y : y.reverse(),
      },
      {
        duration: countDur,
        onPlay: () => {
          setDone(false);
        },
        onComplete: () => {
          doneTimerRef.current = window.setTimeout(
            () => {
              setDone(true);
            },
            (countDur + 1) * 1000
          );
        },
      }
    );
    return () => {
      clearDoneTimer();
    };
  }, [size.h, to, countDur, from, isUp]);

  return (
    <motion.div
      style={{
        position: 'relative',
        display: 'inline-block',
        overflow: 'hidden',
      }}
      initial={{
        width: 0,
        transformOrigin: 'left',
      }}
      animate={{
        width: 'auto',
        transformOrigin: 'left',
      }}
      exit={{
        width: 0,
        transformOrigin: 'right',
      }}
      transition={{
        duration: widthDur,
      }}
    >
      <div
        ref={scope}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          willChange: 'transform',
        }}
      >
        {nums.map((num) => (
          <div key={num}>{num}</div>
        ))}
      </div>
      <div
        ref={(el) => {
          if (!el) return;
          nRef.current = el;
          if (size.w === el.offsetWidth && size.h === el.offsetHeight) return;
          const _size: TCharSize = {
            w: el.offsetWidth,
            h: el.offsetHeight,
          };
          setSize(_size);
          onSizeChange?.(_size);
        }}
      >
        {to}
      </div>
    </motion.div>
  );
}
