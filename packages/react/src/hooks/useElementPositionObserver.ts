import { useEffect, useRef } from 'react';

/**
 * A hook that observes element position changes using requestAnimationFrame
 *
 * @warning ⚠️ This hook continuously calls requestAnimationFrame while active,
 * which can be performance intensive. Use with caution and only when necessary.
 * Consider using ResizeObserver or IntersectionObserver for simpler cases.
 *
 * @param ref - Reference to the element to observe
 * @param onChange - Callback function called when position changes
 * @param active - Whether the observer should be active
 */
export function useElementPositionObserver(
  ref: React.RefObject<HTMLElement | null>,
  onChange: (rect: DOMRect) => void,
  active: boolean
) {
  const prevRectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    let rafId: number;

    const check = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();

        const prev = prevRectRef.current;
        const hasChanged =
          !prev ||
          prev.top !== rect.top ||
          prev.left !== rect.left ||
          prev.width !== rect.width ||
          prev.height !== rect.height;

        if (hasChanged) {
          prevRectRef.current = rect;
          onChange(rect);
        }
      }
      if (active) {
        rafId = requestAnimationFrame(check);
      }
    };

    if (active) {
      rafId = requestAnimationFrame(check);
    }

    return () => cancelAnimationFrame(rafId);
  }, [ref, onChange, active]);
}
