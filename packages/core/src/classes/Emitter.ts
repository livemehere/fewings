export type EventMap = Record<string, (...args: any[]) => void>;
export type TListener<M extends EventMap, K extends keyof M> = M[K];
export type TPayLoad<M extends EventMap, K extends keyof M> = Parameters<
  TListener<M, K>
>;

export abstract class Emitter<T extends EventMap> {
  listener: Partial<Record<keyof T, TListener<T, keyof T>[]>> = {};
  on<E extends keyof T>(event: E, listener: TListener<T, E>) {
    if (!this.listener[event]) {
      this.listener[event] = [];
    }
    const l = listener.bind(this) as TListener<T, E>;
    this.listener[event].push(l);
    return () => {
      const listeners = this.listener[event];
      if (!listeners) {
        return;
      }
      this.listener[event] = listeners.filter((listener) => listener !== l);
    };
  }

  once<E extends keyof T>(event: E, listener: TListener<T, E>) {
    const _listener: any = (...args: any[]) => {
      off();
      listener(...args);
    };
    const off = this.on(event, _listener);
    return off;
  }

  dispatch<E extends keyof T>(event: E, ...payload: TPayLoad<T, E>) {
    const listeners = this.listener[event];
    if (!listeners) {
      return;
    }
    listeners.forEach((listener) => listener(...payload));
  }

  removeAllListeners() {
    this.listener = {};
  }
}
