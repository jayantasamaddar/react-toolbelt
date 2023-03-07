# Getting Started

React Toolbelt provides a suite of hooks and helper functions that supercharges
your React Developer experience by providing easy-to-use Hooks and utility
functions and types to eliminate guessword and enhance productivity.

## Installation

```s
# Using yarn
yarn add @react-toolbelt/hooks

# Using npm
npm i add @react-toolbelt/hooks
```

---

## Using Hooks

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

---
