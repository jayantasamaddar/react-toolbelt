# react-toolbelt-website

## 0.2.1

### Patch Changes

- [`bd86df7`](https://github.com/jayantasamaddar/react-toolbelt/commit/bd86df7c21b7b96b10a2930f7ab859b83d6aced6)
  Thanks [@jayantasamaddar](https://github.com/jayantasamaddar)! - - [x]
  Paragraph line-spacing increased on documentation page.
  - [x] Removed trailing extra line from the code blocks.

## 0.2.0

### Minor Changes

- [`07b35e1`](https://github.com/jayantasamaddar/react-toolbelt/commit/07b35e1a217e8aa996064798dc9d13e89d9b4f49)
  Thanks [@jayantasamaddar](https://github.com/jayantasamaddar)! - - [x] Logo
  spins on hover.
  - [x] Fixed an issue with the menu when scrolling due to the visible height of
        the header changing.
  - [x] Fixed a spacing issue in the Docs pages. Standardized and improved
        spacing.
  - [x] Added hash links to Headings that show up on Docs. `HashLink`
        sub-component of the `Heading` component handles it. Updated the
        `Heading` component to have `prefix` and `suffix` props optionally as
        well the `hashlink` boolean prop to turn it on. The `Heading` component
        will be gradually adopted in the website.
  - [x] Added `AppProvider` to handle global state and run global event
        listeners only on the Provider. Header and Main both use the `useApp`
        hook to get `resize` and `scroll` information for the effects seen on
        the page.
  - [x] Header component is functioning smoothly now on all devices after all
        the above changes.

### Patch Changes

- Updated dependencies
  [[`07b35e1`](https://github.com/jayantasamaddar/react-toolbelt/commit/07b35e1a217e8aa996064798dc9d13e89d9b4f49)]:
  - @react-toolbelt/hooks@0.1.1

## 0.1.0

### Minor Changes

- [`e682a71`](https://github.com/jayantasamaddar/react-toolbelt/commit/e682a71b5fc78294b5756a4bc607cad5cb5ceaf6)
  Thanks [@jayantasamaddar](https://github.com/jayantasamaddar)! - # First
  Release

  ## Packages

  1. `@react-toolbelt/hooks` - Collection of custom React hooks that makes the
     React developer experience smoother.
  2. `@react-toolbelt/utils` - Helper functions and utilities for React to
     perform everyday tasks faster.

  ## Apps

  1. `react-toolbelt-website`: The initial version of the website is ready.

### Patch Changes

- Updated dependencies
  [[`e682a71`](https://github.com/jayantasamaddar/react-toolbelt/commit/e682a71b5fc78294b5756a4bc607cad5cb5ceaf6)]:
  - @react-toolbelt/hooks@0.1.0
