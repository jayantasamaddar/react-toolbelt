# Function: isValidChildren

The `isValidChildren` function checks whether the given children props in a
React component are valid.

It takes two parameters, a `children`, `options` (in two forms) containing React
Functional Components to validate against and an optional custom `validator`.

- `children`: a `ReactNode` type of children props from a React component.

- `options`: an object that includes the following properties:

  - `count` (optional): a number that indicates the expected number of children
    elements in the children props. If the count property is set and the number
    of children elements does not match the expected value, the function returns
    false.
  - `instanceEnums` (optional): Either an array of React functional components
    or an array of InstanceEnumObject objects. The InstanceEnumObject objects
    have the following properties:

    - `component`: a required React functional component.
    - `min` (optional): a number that indicates the minimum number of times that
      the component should appear as a child element. If the number of component
      elements is less than min, the function returns false.
    - `max` (optional): a number that indicates the maximum number of times that
      the component should appear as a child element. If the number of component
      elements is greater than max, the function returns false.

  - `validator` (optional): A function that takes no arguments and returns a
    `boolean`. If the validator function is provided, it is invoked at the end
    of the validation process. If the validator function returns false, the
    isValidChildren function returns false.

---

## Parameters

### `children: ReactNode`

The children props of a React component.

### `options: ChildrenOptions`

- `options`: An object that includes the following properties:

  - `count` (optional): a number that indicates the expected number of children
    elements in the children props. If the count property is set and the number
    of children elements does not match the expected value, the function returns
    false.
  - `instanceEnums` (optional): Either an array of React Functional Components
    or an array of `InstanceEnumObject` objects. The `InstanceEnumObject`
    objects have the following properties:

    - `component` (required): A `React Functional Component`.
    - `min` (optional): A `number` that indicates the minimum number of times
      that the component should appear as a child element. If the number of
      component elements is less than min, the function returns false.
    - `max` (optional): A `number` that indicates the maximum number of times
      that the component should appear as a child element. If the number of
      component elements is greater than max, the function returns false.

> **Best Practice**: Use the FC[] when the granularity (number of occurences of
> a component) doesn't matter. When granularity is required, use the object.

### `validator: () => boolean`

An optional function that provides custom validation for the children props. If
the `validator` function is provided, it is invoked at the end of the validation
process. If the `validator` function returns `false`, the `isValidChildren`
function returns `false`.

---

## Returns

Returns `boolean`.

---

## Examples

### Use `FC[]` enums for quick validation

Following is a `IconButton` component whose children that can either be an
`Icon` or `Spinner` component. We could loosely use the `React.ReactElement`
type, but that would mean all React components. For such an use case
`isValidChildren` comes in handy.

> **Note**: We can still specify count as the total number of permissible
> children. For more granularity, use the array of
> [`InstanceEnumObject`](#use-instanceenumobject-for-granular-validation-for-children)
> as `instanceEnums`.

```tsx
import { Spinner, Icon } from '../../components';
import { isValidChildren } from '@react-toolbelt/utils';
import type { IconButtonProps } from '../../types';

export const IconButton = ({ id, children }: IconButtonProps) => {
  const isValid = isValidChildren(children, {
    count: 2,
    instanceEnums: [Spinner, Icon]
  });

  if (!isValid) console.trace();

  return isValid ? <article id={id}>{children}</article> : null;
};
```

---

### Use `InstanceEnumObject[]` for granular validation for Children

Following is a `AccordionGroup` component. Each `AccordionGroup` component can
only take two components as children - one each of: `AccordionHeader` and
`AccordionPanel` and no more.

Using `isValidChildren` we can determine if the children props are valid.

```tsx
import { AccordionHeader, AccordionPanel } from '../../components';
import { isValidChildren } from '@react-toolbelt/utils';
import type { AccordionGroup } from '../../types';

export const AccordionGroup = ({ id, children }: AccordionGroup) => {
  const isValid = isValidChildren(children, {
    count: 2,
    instanceEnums: [
      { component: AccordionHeader, min: 1, max: 1 },
      { component: AccordionPanel, min: 1, max: 1 }
    ]
  });

  if (!isValid) console.trace();

  return isValid ? <article id={id}>{children}</article> : null;
};
```

---
