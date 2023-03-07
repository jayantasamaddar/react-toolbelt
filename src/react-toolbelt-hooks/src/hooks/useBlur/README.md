# useBlur

The `useBlur` hook is a custom React hook that allows you to add blur event
listeners to your components. This hook is implemented using the
`@react-toolbelt/hooks` package.

It takes two parameters, an `element` and a `callback` function.

---

## Parameters

### `element`: Document | HTMLElement

A reference to the DOM element on which to listen for blur events (optional,
defaults to the document object).

> **Note**: Provide only a single element, not the entire ref object.

### `callback`: (target: HTMLElement | EventTarget) => void

A callback function to execute when the `focusout` event is fired (optional).
This function takes one parameter, target, which is the DOM element that was
blured.

---

## Return value

Returns `undefined`. Use the `cb` function to handle the `EventTarget` object.

---

## Example

Here's an example of how you can use `useBlur` in your React component:

```jsx
import { useBlur } from '@react-toolbelt/hooks';

useBlur(undefined, (target) => {
  if (
    (target.closest('nav#RT-HeaderMenu') === menuRef.current &&
      target.tagName !== 'A') ||
    target.closest('button#RT-BurgerMenu') === burgerRef.current
  )
    return;
  else setShowMenu(false);
});
```
