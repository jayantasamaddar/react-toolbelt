# useResize

The `useResize` hook is a custom React Hook that returns the `size` of an
element in the DOM and updates it whenever the element is resized. This hook is
implemented using the `@react-toolbelt/hooks` package.

It takes two parameters, an `element` and a `callback` function that can be used
to perform some action on the detected `width` and `height` values.

---

## Parameters

### `element`: (Window & typeof globalThis) | Document | HTMLElement

A reference to the DOM element on which to listen for the `resize` event
(optional, defaults to the `window` object).

> **Note**: Provide only a single element, not the entire ref object.

### `callback`: (width, height) => void

A callback function to execute when the `resize` event is fired (optional)

---

## Syntax

```jsx
import { useResize } from '@react-toolbelt/hooks';

const MyComponent = () => {
  const handleResize = (width, height) => {
    // Optionally, do something
  };
  const { width, height } = useResize(element, handleResize);

  return (
    <div>
      <p>Current Width: {width}</p>
      <p>Current Height: {height}</p>
    </div>
  );
};
```

---

## Return value

The `useResize` hook returns a single object:

```typescript
interface Size {
  width: number;
  height: number;
}
```

---

## Example

Here's an example of how to use the `useResize` hook to conditionally render for
Responsive Design:

```jsx
import { useResize } from '@react-toolbelt/hooks';

const Content = () => {
  const { width } = useResize();

  const below768 = width < 768;

  const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: width < 768 ? 'lightblue' : 'lightgreen',
    color: 'white',
    fontSize: '3rem'
  };

  return (
    <div style={style}>
      {width < 768 ? (
        <p>You are viewing the content on a narrow screen</p>
      ) : (
        <p>You are viewing the content on a wide screen</p>
      )}
      <p>Resize window to change the color of the background</p>
    </div>
  );
};
```

---

# Implementation Details

The `useResize` hook sets up two `useEffect` hooks to handle resizing of the
element.

The first `useEffect` hook sets the default size of the element when the
component mounts. If the size is already set (i.e., `size.width` and
`size.height` are not `0`), this hook does nothing. If the hook is running on
the client side (i.e., `isServer()` returns `false`):

- If the target of the event is `window`, it sets the `width` and `height`
  properties of the `size` state object to the `innerWidth` and `innerHeight`
  properties of the `window` object, respectively.

- If the target of the event is `HTMLElement`, it sets the `width` and `height`
  properties of the `size` state object to the `clientWidth` and `clientHeight`
  properties of the `HTMLElement` object, respectively.

The second `useEffect` hook adds an event listener to the element that listens
for a `resize` event. When the event fires, the size of the element is updated
in the `size` state object. If the target of the event is `window`, the
`innerWidth` and `innerHeight` properties are used to update `size`. If the
target of the event is an `HTMLElement`, the `clientWidth` and `clientHeight`
properties are used to update `size`. This hook also removes the event listener
when the component unmounts.

---
