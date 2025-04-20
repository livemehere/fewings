<p align="center">
    <a href="https://github.com/livemehere/fewings">
        <img src="https://github.com/livemehere/fewings/blob/master/img/logo.png?raw=true" alt="logo" width="200" />
    </a>
    <h1 align="center">@fewings/react</h1>      
    <p align="center">
    Collection of useful React components and hooks
    <br/>
    Provides tools for efficient React application development
    </p>
    <p align="center">
        <a href="https://livemehere.github.io/fewings/?path=/docs/react-components-accordion--docs">DEMO</a>
        &middot;
        <a href="https://www.npmjs.com/package/@fewings/react">npm</a>
        &middot;
        <a href="https://github.com/livemehere/fewings/blob/master/packages/react/README.ko.md">한국어</a>
    </p>
</p>

## Introduction

`@fewings/react` is a library that provides useful components and hooks for React application development. It includes tools that simplify complex UI patterns and state management.

Most components are documented in detail in the Storybook, and this document briefly explains the main features and functionalities not covered in the Storybook.

## Installation

```bash
# npm
npm install @fewings/react

# yarn
yarn add @fewings/react

# pnpm
pnpm add @fewings/react
```

## Main Features

### Components

Detailed usage and examples for components can be found in the Storybook. The main components include:

- `Accordion`: A component that implements collapsible content sections
- `Popover`: A component that displays popup content attached to a trigger element
- `Slider`: A component that allows users to select a value within a range
- `ToolTip`: A component that displays additional information when hovering over an element
- `Layout`: Layout-related components such as HStack, VStack, Grid, etc.

### Hooks

This package provides various custom hooks useful for React application development:

#### useCallbackRef

A hook that allows you to maintain a stable function reference while updating internal logic.

```tsx
const callback = useCallbackRef((arg) => {
  // Callback that maintains stable reference even when component re-renders
  console.log(someState, arg);
});
```

#### useControlledState

A state management hook that supports both controlled and uncontrolled components.

```tsx
const [value, setValue] = useControlledState({
  value: controlledValue, // External controlled value (optional)
  defaultValue: defaultValue, // Initial default value
  onChange: onValueChange, // Callback to be called when the value changes
});
```

#### useElementPositionObserver

A hook that observes position changes of DOM elements and detects changes.

```tsx
useElementPositionObserver(
  elementRef, // Ref of the element to observe
  (rect) => {
    // Callback to execute when the element's position changes
    console.log(rect.top, rect.left);
  },
  isActive // Whether observation is active
);
```

#### usePagination

A hook that handles calculations needed for pagination UI implementation.

```tsx
const { pageNumbers, currentGroupIdx, totalGroupLength, isLastGroup } =
  usePagination({
    currentPage: 5,
    totalPages: 20,
    maxVisiblePageButtons: 5,
  });
```

### Context Selector

Provides a performance-optimized context API. Unlike React's default Context API, it allows you to selectively update only the values you need.

```tsx
// Create context
const MyContext = createContext({ count: 0, user: { name: "" } });

// Selectively use only the needed values in components
const count = useContextSelector(MyContext, (state) => state.count);
```

### Overlay System

Provides a system to easily manage overlay UI such as modals, dialogs, and dropdown menus.

## Notes

This document briefly explains only the main features. For more detailed usage and examples, please refer to the source code or check the Storybook documentation.

## Contributing

Contributions are always welcome! If you have suggestions, bug reports, or feature requests, please open an issue or submit a pull request to the [GitHub repository](https://github.com/livemehere/fewings).
