# useScroll

The `useScroll` is a custom React Hook used to detect the scrolling direction of
a given element and returns an object with two properties: `scrollDirection` and
`scrollValues`. This hook is implemented using the `@react-tools/hooks` package.

It takes two parameters, an `element` and a `callback` function that can be used
to perform some action on the detected scrolling `direction` and scroll
`values`.

---

## Parameters

### `element`: (Window & typeof globalThis) | Document | HTMLElement

A ref to the component you want to listen to the click event on. This is an
optional parameter, but if you don't provide a ref, the click event will be
added to the entire document.

> **Note**: Provide only a single element, not the entire ref object.

### `callback`: (ScrollDirection, typeof scrollValues) => void

A callback function that will be called when the component is changed. This
function takes one parameter, `target`, which is the DOM element that was
changed.

---

## Syntax

```jsx
import { useScroll } from '@react-tools/hooks';

const MyComponent = () => {
  const handleScroll = (direction, values) => {
    // Do something
  };
  const { scrollDirection, scrollValues } = useScroll(element, handleScroll);

  return (
    <div>
      <p>Scroll Direction: {JSON.stringify(scrollDirection)}</p>
      <p>Scroll Values: {JSON.stringify(scrollValues)}</p>
    </div>
  );
};
```

---

## Return value

The `useScroll` hook returns two objects: `{ scrollDirection, scrollValues }`

Where,

- **`scrollDirection`**: `{ x: 'left' | 'right', y: 'up' | 'down' }`
- **`scrollValues`**: `{ x: number; y: number }`

---

## Examples

### Hide a Header Component when scrolling down

Here's an example of how to use the `useScroll` hook to hide a header component
when the scroll direction is down:

```jsx
import { useScroll } from '@react-tools/hooks';

const Header = () => {
  const { scrollDirection } = useScroll();

  const style = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '50px',
    backgroundColor: 'lightblue',
    transition: 'transform 0.3s ease-in-out',
    transform:
      scrollDirection.y === 'down' ? 'translateY(-50px)' : 'translateY(0)'
  };

  return <header style={style}>Header</header>;
};
```

**Usage**

```jsx
const App = () => {
  return (
    <div>
      <Header />
      <div style={{ height: '200vh' }}>Scroll down to hide header</div>
    </div>
  );
};
```

In the above example, we use the `useScroll` hook to get the scroll direction,
and then we conditionally apply a `transform` to the header's style when the
scroll direction is `'down'`. When the user scrolls down, the header is hidden
by applying a `-50px` transform on the `y` axis. When the user scrolls up, the
header is shown again.

---

### Parallax Effect

```jsx
import { useScroll } from './useScroll';

const Parallax = () => {
  const { scrollValues } = useScroll();

  const style = {
    position: 'relative',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: `50% ${scrollValues.y * -0.5}px`,
    backgroundImage: 'url(https://source.unsplash.com/random/1600x900)'
  };

  return (
    <div style={style}>
      <h1
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        Parallax Effect
      </h1>
    </div>
  );
};
```

**Usage**

```jsx
const App = () => {
  return (
    <div>
      <div style={{ height: '200vh' }}>
        Scroll down to see the parallax effect
      </div>
      <Parallax />
      <div style={{ height: '200vh' }}>
        Scroll up to see the parallax effect again
      </div>
    </div>
  );
};
```

In the above example, we use the `useScroll` hook to get the scroll position,
and then we set the backgroundPosition of the Parallax component based on the
`y` value of the scroll position. We use a negative multiplier of `0.5` to
create a parallax effect where the background image moves slower than the
foreground content.

To test this out, we create a container with a height of `200vh` and fill it
with some placeholder content. We then add the **`Parallax`** component and fill
the container with another `200vh` of placeholder content. When the user scrolls
down, the parallax effect is triggered and the background image moves upwards at
a slower rate than the foreground content, creating a sense of depth. When the
user scrolls up again, the parallax effect is reversed and the background image
moves downwards at a slower rate than the foreground content.

---
