# useKey

The `useKey` hook is a custom React Hook that allows you to listen for key
events on a specific DOM element. It returns a reference to the most recently
used key. This hook is implemented using the `@react-tools/hooks` package.

It takes three parameters, an `element`, the key `event` and a `callback`
function.

---

## Parameters

### `element`: Document | HTMLElement

A reference to the DOM element on which to listen for key events (optional,
defaults to the document object).

> **Note**: Provide only a single element, not the entire ref object.

### `event`: 'up' | 'down' | 'press' = 'down'

A string indicating which keyboard event to listen for: 'up', 'down', or 'press'
(optional, defaults to 'down').

### `cb`: (args?: KeyboardEventArgs) => void

A callback function to execute when the key event is fired (optional). The
callback function takes the following arguments:

```tsx
interface KeyboardEventArgs {
  code?: string;
  key?: string;
  keyCode?: number;
  locale?: string;
  location?: number;
  metaKey?: boolean;
  repeat?: boolean;
  shiftKey?: boolean;
  ctrlKey?: boolean;
  altKey?: boolean;
}
```

---

## Return value

Returns `undefined`. Use the `cb` function to handle the `KeyboardEventArgs`
object.

---

## Syntax

```jsx
import { useKey } from '@react-tools/hooks';

const targetKey = useKey(element, event, (args) => {
  console.log(args.key);
});
```

---

## Examples

### Listening for the `Escape` key to close a Menu

In this example, the `useKey` hook listens for key events on the
`burgerRef.current` DOM element, and executes a callback function that closes an
expanded mobile menu when the `Escape` key is pressed.

```javascript
/** Listening for the Escape Key */
import { useRef, useState } from 'react';
import { useKey } from '@react-tools/hooks';

const [showMenu, setShowMenu] = useState(false);
const burgerRef = useRef < HTMLButtonElement > null;

useKey(burgerRef?.current ?? burgerRef.current, 'up', ({ key }) => {
  switch (key) {
    // Close expanded mobile menu
    case 'Escape':
      if (showMenu) setShowMenu(false);
      break;
    default:
      break;
  }
});
```

---

### Listening for multiple keys

In this example, the `useKey` hook is used to listen for multiple keys using a
`switch` statement:

```javascript
useKey(undefined, 'down', ({ key }) => {
  switch (key) {
    case 'ArrowUp':
      console.log('Up arrow pressed');
      break;
    case 'ArrowDown':
      console.log('Down arrow pressed');
      break;
    case 'ArrowLeft':
      console.log('Left arrow pressed');
      break;
    case 'ArrowRight':
      console.log('Right arrow pressed');
      break;
    default:
      break;
  }
});
```

In this example, the `useKey` hook listens for key events on the `document`
object, and executes a callback function that logs a message to the console
depending on which arrow key was pressed.

---

# Notes

- This hook can only be used in a React function component or another React
  hook. ([Rule of Hooks](https://reactjs.org/docs/hooks-rules.html))
- This hook should not be used to capture sensitive information, such as
  passwords or credit card numbers.
- This hook only works on elements that can receive keyboard focus.
