import {
  Context,
  createContext as createContextOrg,
  useContext as useContextOrg,
  ReactNode,
  useEffect,
  useRef,
  useSyncExternalStore,
  Provider,
} from "react";

interface Store<T> {
  value: T;
  subscribe: (l: () => void) => () => void;
  notify: () => void;
}

export const createContext = <T extends unknown>(initialValue: T) => {
  const context = createContextOrg<Store<T>>(undefined as any);
  const ProviderOrg = context.Provider;
  context.Provider = (({
    value,
    children,
  }: {
    value?: T;
    children: ReactNode;
  }) => {
    const storeRef = useRef<Store<T>>(undefined);
    let store = storeRef.current;
    if (!store) {
      const listeners = new Set<() => void>();
      store = {
        value: (value ?? initialValue) as T,
        subscribe: (l: () => void) => {
          listeners.add(l);
          return () => {
            listeners.delete(l);
          };
        },
        notify() {
          listeners.forEach((l) => l());
        },
      };
      storeRef.current = store;
    }

    useEffect(() => {
      if (!store) return;
      if (!Object.is(store.value, value)) {
        store.value = value as T;
        store.notify();
      }
    });

    return <ProviderOrg value={store}>{children}</ProviderOrg>;
  }) as Provider<Store<T>>;

  return context as unknown as Context<T>;
};

export const useContextSelector = <T, R>(
  context: Context<T>,
  selector: (value: T) => R,
) => {
  const store = useContextOrg(context) as Store<T>;
  return useSyncExternalStore(store.subscribe, () => selector(store.value));
};
