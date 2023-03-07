# useFocus

The `useFocus` hook is a custom React hook that allows you to add focus event
listeners to your components. This hook is implemented using the
`@react-toolbelt/hooks` package.

It takes three parameters, an `element`, `options` and a `callback` function.

---

## Parameters

### `element`: Document | HTMLElement

A reference to the DOM element on which to listen for focus events (optional,
defaults to the document object).

> **Note**: Provide only a single element, not the entire ref object.

### `options`: `FocusOptions`

Whether the focus event should bubble or not.

```ts
interface FocusOptions {
  bubbles: boolean;
}
```

### `callback`: (target: HTMLElement | EventTarget) => void

A callback function to execute when the `focus` event is fired (optional). This
function takes one parameter, target, which is the DOM element that was focused.

---

## Return value

Returns `undefined`. Use the `cb` function to handle the `EventTarget` object.

---

## Example

Here's an example of how you can use `useFocus` in your React component:

```jsx
import { useFocus } from '@react-toolbelt/hooks';

useFocus(undefined, (target) => {
  if (
    (target.closest('nav#RT-HeaderMenu') === menuRef.current &&
      target.tagName !== 'A') ||
    target.closest('button#RT-BurgerMenu') === burgerRef.current
  )
    return;
  else setShowMenu(false);
});
```
