import { useLocation, useNavigate } from "react-router";
import { SetStateAction, useMemo, useRef } from "react";
import { parse, QsValue, stringify } from "@fewings/core/qs";
import { useForceUpdate } from "@fewings/react/hooks";

type Options = {
  navigateMode?: "replace" | "push";
};

export function useQsState<State extends Record<string, QsValue>>(
  initialState: State = {} as State,
  options?: Options,
) {
  const update = useForceUpdate();
  const navigate = useNavigate();
  const location = useLocation();
  const { navigateMode = "push" } = options || {};

  const urlQueryState = useMemo(
    () => parse(location.search),
    [location.search],
  );
  const initialQueryState = useRef(
    typeof initialState === "function"
      ? (initialState as () => State)()
      : initialState,
  );
  const state = useMemo(
    () => ({
      ...initialQueryState.current,
      ...urlQueryState,
    }),
    [urlQueryState],
  );

  const setState = (newState: SetStateAction<State>) => {
    const nextState =
      typeof newState === "function" ? newState(state) : newState;
    const newQueryState = {
      ...urlQueryState,
      ...nextState,
    };
    const newSearchParams = stringify(newQueryState);
    navigate(
      {
        hash: location.hash,
        search: newSearchParams,
      },
      {
        replace: navigateMode === "replace",
        state: location.state,
      },
    );
    update();
  };

  return [state, setState] as const;
}
