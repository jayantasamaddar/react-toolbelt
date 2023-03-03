# useHover

The `useHover` hook is a custom React hook that allows you to get the hover
state of your component. Behind the hood, this handles both the `mouseenter` and
`mouseleave` events. This hook is implemented using the `@react-toolbelt/hooks`
package.

It takes two parameters, an `element` and a `callback` function.

---

## Parameters

### `element`: Document | HTMLElement

A reference to the DOM element on which to listen for hover (`mouseenter` and
`mouseleave`) events (optional, defaults to the document object). The usual use
would be to set an element to a ref and provide the `ref.current` to the hook.

> **Note**: Provide only a single element, not the entire ref object.

### `callback`: (hoverState?: boolean) => void

A callback function to execute when the element is hovered (optional). This
function takes one parameter, the `hoverState` itself. Usually this is
unnecessary unless you want to make external API calls or some specialized use
case. For most use cases, the return value is sufficient to handle hover
effects.

---

## Return value

Returns `boolean`, either for `true` when hovered, or `false` when not hovered.

---

## Example

Here's an example of how you can use `useHover` in your React component:

```jsx
import { useRef } from 'react';
import { useHover } from '@react-toolbelt/hooks';

const Button = () => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const hover = useHover(buttonRef.current as HTMLButtonElement)

    return (
        <button ref={buttonRef}>{hover ? "Hovered Button" : "Button"}</button>
        {hover && <div>
            This content is not visible until the button is hovered.
        </div>}
    )
}
```
