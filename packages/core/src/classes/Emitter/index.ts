export type EventMap<T> = {
  [K in keyof T]: (...args: any[]) => void;
};
export type TListener<M, K extends keyof M> = M[K] extends (
  ...args: any[]
) => any
  ? M[K]
  : never;
export type TPayLoad<M, K extends keyof M> = M[K] extends (
  ...args: infer P
) => any
  ? P
  : never;

export abstract class Emitter<T extends EventMap<T>> {
  protected listener: Partial<{ [K in keyof T]?: TListener<T, K>[] }> = {};

  on<E extends keyof T>(event: E, listener: TListener<T, E>) {
    if (!this.listener[event]) {
      this.listener[event] = [];
    }
    this.listener[event].push(listener);
    return () => {
      const listeners = this.listener[event];
      if (!listeners) {
        return;
      }
      this.listener[event] = listeners.filter((l) => l !== listener);
    };
  }

  once<E extends keyof T>(event: E, listener: TListener<T, E>) {
    const _listener: any = (...args: any[]) => {
      off();
      listener.apply(this, args);
    };
    const off = this.on(event, _listener);
    return off;
  }

  dispatch<E extends keyof T>(event: E, ...payload: TPayLoad<T, E>) {
    const listeners = this.listener[event];
    if (!listeners || listeners.length === 0) return;

    for (const l of listeners) {
      l.apply(this, payload);
    }
  }

  removeAllListeners() {
    this.listener = {};
  }
}
