<p align="center">
    <a href="https://github.com/livemehere/fewings">
        <img src="https://github.com/livemehere/fewings/blob/master/img/logo.png?raw=true" alt="logo" width="200" />
    </a>
    <h1 align="center">@fewings/react-qs</h1>      
    <p align="center">
    React hook for using URL query parameters as state
    <br/>
    Easily manage state through URL parameters when used with React Router
    </p>
    <p align="center">
        <a href="https://www.npmjs.com/package/@fewings/react-qs">npm</a>
        &middot;
        <a href="https://github.com/livemehere/fewings/blob/master/packages/react-qs/README.ko.md">한국어</a>
    </p>
</p>

## Motivation

In web applications, URL query parameters are an important way to represent page state. However, with conventional methods, synchronizing URL queries with React state is cumbersome and requires a lot of boilerplate code.

@fewings/react-qs is designed to solve these problems by:

- Providing an API to use URL query parameters as React state
- Offering an interface similar to React's `useState` for ease of use
- Maintaining state even after page refresh
- Enabling state sharing between users via URL

## Installation

```bash
# npm
npm install @fewings/react-qs react-router

# yarn
yarn add @fewings/react-qs react-router

# pnpm
pnpm add @fewings/react-qs react-router
```

> ⚠️ This package depends on `react-router`.

## Getting Started

### Basic Usage

The `useQsState` hook works similarly to React's `useState`, but the state is stored in URL query parameters:

```tsx
import { useQsState } from "@fewings/react-qs";

function SearchPage() {
  // Use URL query parameters as state
  const [search, setSearch] = useQsState({
    query: "",
    page: "1",
    category: "all",
  });

  return (
    <div>
      <input
        type="text"
        value={search.query}
        onChange={(e) => setSearch({ ...search, query: e.target.value })}
        placeholder="Enter search term"
      />

      <select
        value={search.category}
        onChange={(e) => setSearch({ ...search, category: e.target.value })}
      >
        <option value="all">All</option>
        <option value="books">Books</option>
        <option value="electronics">Electronics</option>
      </select>

      <div>
        Current Page: {search.page}
        <button
          onClick={() =>
            setSearch({
              ...search,
              page: (parseInt(search.page) + 1).toString(),
            })
          }
        >
          Next Page
        </button>
      </div>

      <div>
        <h3>Search Results</h3>
        <pre>{JSON.stringify(search, null, 2)}</pre>
      </div>
    </div>
  );
}
```

### Navigation Mode Setting

By default, when state changes, a new history entry is created. Using `replace` mode allows you to replace the current history entry:

```tsx
const [filter, setFilter] = useQsState(
  { sort: "newest", view: "grid" },
  { navigateMode: "replace" },
);
```

### Functional Updates

Like `useState`, functional updates are supported:

```tsx
const [pagination, setPagination] = useQsState({ page: "1", perPage: "10" });

// Update based on previous state using functional update
setPagination((prev) => ({
  ...prev,
  page: (parseInt(prev.page) + 1).toString(),
}));
```

### Type Safety

When used with TypeScript, you get the benefits of type safety:

```tsx
interface SearchParams {
  query: string;
  page: string;
  category: string;
}

const [search, setSearch] = useQsState<SearchParams>({
  query: "",
  page: "1",
  category: "all",
});
```

### Specifying Initial State

When the component is first mounted, if there are no query parameters in the URL, the initial state is used: (⚠️ This doesn't change the URL query at this point)

```tsx
const [filter, setFilter] = useQsState({
  sort: "newest", // Uses "newest" as default if ?sort= parameter doesn't exist in URL
  view: "grid", // Uses "grid" as default if ?view= parameter doesn't exist in URL
});
```

## Use Cases

`useQsState` is particularly useful in the following scenarios:

- Search pages: Keep search terms, filters, and sort options in the URL
- Pagination: Store current page and page size in the URL
- Filtering UIs: Store multiple filter options in the URL for bookmarking or sharing
- Tab UIs: Store the currently selected tab in the URL to maintain state after refresh

## Contributing

Contributions are always welcome! If you have suggestions, bug reports, or feature requests, please open an issue or submit a pull request on the [GitHub repository](https://github.com/livemehere/fewings).
