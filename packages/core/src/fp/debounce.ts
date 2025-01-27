export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait: number,
): T {
  let timeout: any;
  return function (this: any, ...args: any[]) {
    const later = () => {
      timeout = undefined;
      fn.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  } as T;
}
