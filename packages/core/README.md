<p align="center">
    <a href="https://github.com/livemehere/fewings">
        <img src="https://github.com/livemehere/fewings/blob/master/img/logo.png?raw=true" alt="logo" width="200" />
    </a>
    <h1 align="center">@fewings/core</h1>      
    <p align="center">
    Collection of pure functions and classes for frontend development
    <br/>
    Provides concise and reusable utility functions for each module
    <br/>
    Serves as the fundamental dependency for other derived packages
    </p>
    <p align="center">
        <a href="https://www.npmjs.com/package/@fewings/core">npm</a>
        &middot;
        <a href="https://github.com/livemehere/fewings/blob/master/packages/core/README.ko.md">한국어</a>
    </p>
</>

## Introduction

`@fewings/core` is a library that provides various utility functions commonly used in frontend development. Each function is designed to be lightweight and efficient by focusing on minimal functionality.

This library consists of the following modules:

- `classes`: Classes for object-oriented programming (e.g., Emitter)
- `color`: Color-related utilities
- `converter`: Data conversion utilities
- `dom`: DOM manipulation utilities
- `fp`: Functional programming utilities (e.g., debounce)
- `hash`: Hashing algorithms (e.g., djb2)
- `math`: Math utilities (e.g., rand, map, clamp, snap)
- `path`: Path-related utilities
- `qs`: URL query string handling utilities

> 🔍 Each module's functions have simple and clear purposes, so directly referring to the source code is the best way to understand their usage. Most functions have self-explanatory naming, concise implementation, and test code.

## Installation

```bash
# npm
npm install @fewings/core

# yarn
yarn add @fewings/core

# pnpm
pnpm add @fewings/core
```

## Usage

Each module can be imported independently, allowing only the necessary functionality to be included in your bundle.

```javascript
// Import specific function from math module
import { clamp } from "@fewings/core/math";

// Limit a value to a specific range
const limitedValue = clamp(150, 0, 100); // Returns 100

// Import specific function from fp module
import { debounce } from "@fewings/core/fp";

// Create a debounced function
const debouncedFunction = debounce(() => {
  console.log("Window resize completed");
}, 300);

// Apply to event listener
window.addEventListener("resize", debouncedFunction);

// Use hash module
import { djb2 } from "@fewings/core/hash";

const hash = djb2("hello world"); // Generate hash from string
```

## Contributing

Contributions are always welcome! If you have suggestions, bug reports, or feature requests, please open an issue or submit a pull request on the [GitHub repository](https://github.com/livemehere/fewings).
