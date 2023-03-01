# @react-tools/utils

A collection of utility functions for React that improve the developer
experience considerably. Makes performing complex tasks like validation of
children components before generating content, wrapping each children with a
wrapper component, conditional rendering only when rendering on the client side,
and many more utilities for React. Pairs well with the
[`@react-utils/hooks`](https://www.github.com/jayantasamaddar/react-tools/tree/main/src/react-tools-hooks).

---

## Installation

You can install this package using npm:

```s
# Using npm
npm i @react-tools/utils

# Using yarn
yarn add @react-tools/utils
```

---

## The Problem Statement

**Previous implementation 1**

A vanilla implementation without using `@react-tools/utils` would look like
this:

```tsx
const isValidAccordionGroup = (children: ReactNode) => {
  if (Children.count(children) !== 2) return false;
  const childrenHashTable = { header: 0, panel: 0 };
  Children.forEach(children, (child) => {
    if (child instanceof AccordionHeader) childrenHashTable.header += 1;
    else if (child instanceof AccordionPanel) childrenHashTable.panel += 1;
  });

  return childrenHashTable.header === 1 && childrenHashTable.panel === 1;
};
```

But as you can notice, this has its limitations, as you now have to write a
validation checker for every component that requires children validation.

Using `isValidChildren` we can determine if the children props are valid
consistently using the same syntax throughout.

**Previous Implementation 2**

```tsx
const isValid = Children.toArray(children).every((child) => {
  isValidElement(child) && child instanceof AccordionGroup;
});
```

---

## Usage

The package provides a set of utility functions that can be imported and used in
your React project.

```jsx
import { validateChildrenType, isServer } from '@react-tools/utils';

// usage of validateChildrenType
const MyComponent = ({ children }) => {
  validateChildrenType(children, ['div', 'span']); // will throw an error if children is not a div or span
  return <div>{children}</div>;
};

// usage of isServer
if (isServer()) {
  // run server side code
} else {
  // run client side code
}
```

---

## List of utility functions

The package provides the following utility functions:

- `validateChildrenType(children: ReactNode, types: string[]): void`: This
  function takes two arguments, the children to validate and an array of types
  to check against. It throws an error if the children type does not match any
  of the specified types.
- `isServer(): boolean`: This function checks if the code is running on the
  server or the client side. It returns true if the code is running on the
  server, false otherwise.

---

## Contributing

Contributions to this package are welcome. Please open an issue or a pull
request with your suggestion or improvement.

Before making any changes, please read the contributing guidelines.

---

## License

This package is licensed under the MIT license. See the LICENSE file for more
information.
