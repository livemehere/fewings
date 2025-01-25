# Contribute to the project

Thank you for your interest in contributing to the project. We welcome all contributions. Please read the following guidelines before contributing.

## Steps to contribute

1. Fork the repository.
2. Clone the repository.
3. Create a new branch.
4. Make your changes.
5. Test your changes.
6. Push your changes to your fork.
7. Create a pull request.
8. Wait for the maintainers to review your changes!

> There are two ways to contribute to the project.

## case 1) Add a new single function to existing group.

```bash
|-- src
|   |-- group
|       |-- ...
|       |-- newFunction.ts # 1. create new function file
|       |-- index.ts # 2. export new function in index.ts
```

## case 2) Add a new group.

```bash
|-- src
|   |-- newGroup
|       |-- newFunction.ts # 1. create new function file
|       |-- index.ts # 2. create and export new function in index.ts
```

---

# Conventions

## Test your code

> if you need to check your code, make your files with the following structure.

```bash
|-- src
|   |-- group
|       |-- newFunction
|           |-- index.test.ts # 1. create test file
|           |-- index.ts # 2. create new function file
|           |-- subFeatures.ts # optional ... if you need but don't export it in index.ts
```

### 1. Don't export default
    
```typescript
// ❌
export default const newFunction = ()=> {
  // ...
}

// ✅
export const newFunction = ()=> {
  // ...
}
```

### 2. import relative path when importing functions in the same group.

```typescript
import { existFunction } from './existFunction';
export const newFunction = () => {
  existFunction();
};
```

### 3. import absolute path when importing functions in different groups.

```typescript
- import { djb2 } from "../hash"; // ❌
+ import { djb2 } from "@fewings/core/hash"; // ✅

export function fancyHash() {
    const hash = djb2("randComma");
    // ...
}
```

## Test tips in PlayGround

> playground can resolve above import conventions. so you can import your code relatively.

```typescript
import { Popover } from "../../packages/react/src/components"; // If you are wrting code
import { Popover } from "@fewings/react/components"; // after build your code, finally testing in playground
```
