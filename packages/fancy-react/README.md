<p align="center">
    <a href="https://github.com/livemehere/fewings">
        <img src="https://github.com/livemehere/fewings/blob/master/img/logo.png?raw=true" alt="logo" width="200" />
    </a>
    <h1 align="center">@fewings/fancy-react</h1>      
    <p align="center">
    Collection of React components with fancy styles and effects
    <br/>
    Provides interactive components utilizing animations and visual effects
    </p>
    <p align="center">
    <a href="https://livemehere.github.io/fewings/?path=/docs/fancy-react-animatenumber--docs">DEMO</a>
        &middot;
        <a href="https://www.npmjs.com/package/@fewings/fancy-react">npm</a>
        &middot;
        <a href="https://github.com/livemehere/fewings/blob/master/packages/fancy-react/README.ko.md">한국어</a>
    </p>
</p>

## Introduction

`@fewings/fancy-react` is a React component library with enhanced animations and interactions. Based on the Motion library, it provides smooth and visually interesting UI elements.

Currently available components:

- `AnimateNumber`: Applies animations when numbers change for smooth transitions.

## Installation

```bash
# npm
npm install @fewings/fancy-react motion

# yarn
yarn add @fewings/fancy-react motion

# pnpm
pnpm add @fewings/fancy-react motion
```

> ⚠️ This package depends on the `motion` library.

## Using AnimateNumber

The AnimateNumber component applies a smooth animation effect when numeric values change. It enhances user experience when numbers increase or decrease.

### Basic Usage

```tsx
import { AnimateNumber } from "@fewings/fancy-react/AnimateNumber";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <AnimateNumber value={count} />
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setCount(count - 1)}>Decrease</button>
    </div>
  );
}
```

### Adjusting Animation Speed

```tsx
<AnimateNumber
  value={count}
  countDur={0.8} // Number counting animation duration (seconds)
  sizeDur={0.5} // Width change animation duration (seconds)
/>
```

### Number Formatting

You can display numbers in your desired format:

```tsx
<AnimateNumber value={price} format={(value) => `$${value.toLocaleString()}`} />
```

### Applying Styles

You can style it like a regular div element:

```tsx
<AnimateNumber
  value={score}
  style={{
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#2563eb",
  }}
/>
```

## AnimateNumber Props

| Property   | Type                        | Default           | Description                              |
| ---------- | --------------------------- | ----------------- | ---------------------------------------- |
| `value`    | `number`                    | Required          | Numeric value to display                 |
| `countDur` | `number`                    | `0.5`             | Number counting animation duration (sec) |
| `sizeDur`  | `number`                    | `0.3`             | Width change animation duration (sec)    |
| `format`   | `(value: number) => string` | `(v) => \`${v}\`` | Function to format the number            |

Additionally, the component supports all standard properties of a `div` element.

## How It Works

The AnimateNumber component works internally as follows:

1. Detects transitions when a number changes from a previous value to a new one.
2. Animates each digit of the number individually.
3. Applies appropriate animation effects based on the direction when numbers increase or decrease.
4. Applies smooth sizing animations when width changes are needed.

## Contributing

Contributions are always welcome! If you have suggestions, bug reports, or feature requests, please open an issue or submit a pull request to the [GitHub repository](https://github.com/livemehere/fewings).
