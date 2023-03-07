# useClick

The `useClick` hook is a custom React hook that allows you to add click event
listeners to your components. This hook is implemented using the
`@react-toolbelt/hooks` package.

It takes two parameters, an `element` and a `callback` function.

---

## Parameters

### `element`: Document | HTMLElement

The HTML Element on which to listen for click events (optional, defaults to the
document object).

> **Note**: Provide only a single element, not the entire ref object.

### `callback`: (target: HTMLElement | EventTarget) => void

A callback function to execute when the `click` event is fired (optional). This
function takes one parameter, target, which is the DOM element that was clicked.

---

## Return value

Returns `undefined`. Use the `cb` function to handle the `EventTarget` object.

---

## Example

Here's an example of how you can use `useClick` in your React component:

```jsx
import { useClick } from '@react-toolbelt/hooks';

useClick(undefined, (target) => {
  if (
    (target.closest('nav#RHD-HeaderMenu') === menuRef.current &&
      target.tagName !== 'A') ||
    target.closest('button#RHD-BurgerMenu') === burgerRef.current
  )
    return;
  else setShowMenu(false);
});
```
