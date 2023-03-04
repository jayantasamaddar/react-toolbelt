---
'@react-toolbelt/utils': patch
---

- [x] Added `null` and `undefined` to possible arguments for checks for `isWindow`. `isWindow` now checks whether the provided element in the argument strict equals the `window` object or is an instance of the `Window` constructor.
