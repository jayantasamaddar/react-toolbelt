---
'react-toolbelt-website': minor
---

- [x] Logo spins on hover.
- [x] Fixed an issue with the menu when scrolling due to the visible height of the header changing.
- [x] Fixed a spacing issue in the Docs pages. Standardized and improved spacing.
- [x] Added hash links to Headings that show up on Docs. `HashLink` sub-component of the `Heading` component handles it. Updated the `Heading` component to have `prefix` and `suffix` props optionally as well the `hashlink` boolean prop to turn it on. The `Heading` component will be gradually adopted in the website.
- [x] Added `AppProvider` to handle global state and run global event listeners only on the Provider. Header and Main both use the `useApp` hook to get `resize` and `scroll` information for the effects seen on the page.
- [x] Header component is functioning smoothly now on all devices after all the above changes.