<p align="center">
    <a href="https://github.com/livemehere/fewings">
        <img src="https://github.com/livemehere/fewings/blob/master/img/logo.png?raw=true" alt="logo" width="200" />
    </a>
    <h1 align="center">@fewings/text-editor</h1>      
    <p align="center">
    A WYSIWYG editor for the web.
    <br/>
    It natively supports `React` and can be used in various environments without framework limitations by directly utilizing `core` functionality.
    </p>
    <p align="center">
        <a href="https://livemehere.github.io/fewings/?path=/story/text-editor-sample--default">Demo</a>
         &middot;
        <a href="https://www.npmjs.com/package/@fewings/text-editor">npm</a>
    </p>
</>

![alt text](docs/example1.png)

## Motivation

There are already many excellent text editor libraries available.
However, most of them are close to being complete solutions, making it cumbersome to add or remove features and modify designs as it requires deep understanding of their internal structure.

@fewings/text-editor addresses this inconvenience by providing only core functionality in API form.
Users can choose the features they need and compose UI in a completely flexible way.

It doesn't even include basic styles, requiring you to design based on the defined DOM structure, data-attributes, and class properties.
Additionally, it provides Selection and Range related APIs designed to support this approach.

> 🙏 This documentation doesn't cover all features. It introduces core functionality with a low level of abstraction and complexity that should be easy to understand. Please refer to `src/__test__`, `src/core`, and [sample code](https://github.com/livemehere/fewings/tree/master/examples/stories/textEditor/sample).

## Installation

```bash
pnpm add @fewings/text-editor
```

## Getting Started

### 1. Creating a TextEditor instance

The text editor works on a DOM basis. First, prepare the HTML element where the editor will be rendered.

```html
<div id="editor-container"></div>
```

```javascript
import { TextEditor } from "@fewings/text-editor";

// Get the editor container element
const editorElement = document.getElementById("editor-container");

// Create TextEditor instance
const editor = new TextEditor({
  element: editorElement,
  initialHtml:
    "<div data-block-id='w1u2oultf'>Hello, this is a text editor.</div>", // Initial HTML content ⚠️ Must follow the DOM structure mentioned earlier (direct child elements must be HTMLDivElement with data-block-id)
  mode: "edit", // Specify 'edit' or 'view' mode
  spellcheck: true, // Enable or disable spell checking
});
```

### 2. Listening to events

TextEditor provides several core events (more coming soon).

```javascript
// Cursor position change event
editor.on("cursorChanged", (cursorStatus) => {
  console.log("Current cursor status:", cursorStatus);

  // cursorStatus object contains style information about the currently selected text:
  // isH1, isBold, isItalic, color, bgColor, etc.

  // You can use this information to update toolbar active states
});

// HTML content change event
editor.on("onChange", (html) => {
  console.log("Editor content changed:", html);

  // You can save or process the changed HTML
});

// Block add event (triggered whenever a new line is added)
editor.on("blockAdded", (blockElement) => {
  console.log("New block added:", blockElement);
});
```

### 3. Applying styling actions

You can apply various text styling and formatting actions.

```javascript
// Apply bold
document.getElementById("bold-button").addEventListener("click", () => {
  editor.action("bold");
});

// Apply italic
document.getElementById("italic-button").addEventListener("click", () => {
  editor.action("italic");
});

// Apply heading style
document.getElementById("h1-button").addEventListener("click", () => {
  editor.action("heading", "h1");
});

// Change text color
document.getElementById("color-picker").addEventListener("change", (e) => {
  editor.action("color", e.target.value);
});

// Insert link
document.getElementById("link-button").addEventListener("click", () => {
  const url = prompt("Enter URL");
  if (url) {
    editor.action("link", url);
  }
});
```

### 4. Easy usage in React

In React applications, you can use the provided components and hooks to use the editor more easily.

```tsx
import { useState } from "react";
import {
  TextEditorBody,
  TextEditorProvider,
  TextEditorView,
} from "@fewings/text-editor";

const initialHtml =
  "<div data-block-id='w1u2oultf'>Hello, this is a text editor.</div>";

interface Props {
  mode?: "edit" | "view";
  spellcheck?: boolean;
  showPreview?: boolean;
}

export default function SampleTextEditor({
  mode,
  spellcheck,
  showPreview,
}: Props) {
  const [preview, setPreview] = useState(initialHtml);
  return (
    <div>
      <TextEditorProvider
        onChange={setPreview}
        initialHtml={initialHtml}
        mode={mode}
        spellcheck={spellcheck}
      >
        <div className="editor_layout">
          <TextEditorBody style={{ height: 400, overflowY: "scroll" }} />
        </div>
      </TextEditorProvider>
      {showPreview && <TextEditorView html={preview} className="preview" />}
    </div>
  );
}
```

### 5. Getting and setting editor HTML content

```javascript
// Get current editor content as HTML string
const html = editor.toHtml();

// Set editor content
editor.setHtml("<p>This is new content.</p>");

// Change editor mode (edit/read-only)
editor.setMode("view"); // Change to read-only
editor.setMode("edit"); // Change to editable
```

### 6. Cleaning up the editor

After usage, clean up event listeners and resources.

> When using `<TextEditorProvider>`, cleanup is handled internally.

```javascript
// Clean up editor instance
editor.destroy();
```

## Contributing

Welcome to contributions! If you have suggestions, bug reports, or feature requests, please open an issue or submit a pull request.
