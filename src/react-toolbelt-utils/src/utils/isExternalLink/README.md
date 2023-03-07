# isExternalLink

The `isExternalLink` function checks whether the given string is an external
link.

It takes in a `string` and returns a `boolean`.

---

## Parameters

### `link`: string

The string to test as an external link.

### `protocols`: string[]

Optional list of additional protocols to treat as external. Always validates
against `http` and `https`.

---

## Returns

Returns `boolean`.

---

## Example

```tsx
import { isExternalLink } from '@react-toolbelt/utils';
import NextLink from 'next/link';

const Link = ({ url, children }: { url: string; children: ReactNode }) => {
  return isExternalLink(url) ? (
    <a href={url}>{children}</a>
  ) : (
    <NextLink url={url}>{children}</NextLink>
  );
};
```

---
