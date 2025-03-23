# Overlay

## Example

### Setup

```tsx
import { OverlayProvider } from "@fewings/react/overlay";

function App() {
  return (
    <OverlayProvider>
      <Home />
    </OverlayProvider>
  );
}

export default App;
```

### hook

```tsx
import { useEffect } from "react";
import {
  OverlayBaseProps,
  useOverlay,
  useOverlaySafeArea,
} from "@fewings/react/overlay";

const Home = () => {
  const { open } = useOverlay();

  return (
    <div>
      <button
        onClick={async () => {
          const result = await open<string, typeof Modal>(Modal, {
            name: "kong",
            age: 20,
          });
          console.log(result);
        }}
      >
        Open
      </button>
    </div>
  );
};

export default Home;
```

### Overlay Component

```tsx
function Modal({
  close,
  resolve,
  reject,
  name,
  age,
}: OverlayBaseProps & {
  name: string;
  age: number;
}) {
  const { registerSafeArea, registerClickArea } = useOverlaySafeArea(() =>
    close(),
  );
  return (
    <div
      css={css`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        > div {
          background: #d2d2d2;
        }
      `}
      {...registerClickArea()}
    >
      <div {...registerSafeArea()}>
        <h1>Modal</h1>
        <p>{name}</p>
        <p>{age}</p>
        <button onClick={() => resolve("resolve!")}>RESOLVE</button>
        <button onClick={() => reject("reject")}>REJECT</button>
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
}
```
