# react-toolbelt-website

## 0.3.0

### Minor Changes

- [`007e420`](https://github.com/jayantasamaddar/react-toolbelt/commit/007e42006c4251051c66c263da8eb1f5d3560fe1)
  Thanks [@jayantasamaddar](https://github.com/jayantasamaddar)! - ## Features

  - [x] Generate headings data from markdown file directly. Uses a new
        `HeadingTree` class on the server during build time to link nodes and
        normalize the headings into a javascript object.
  - [x] Any non-package documentation just needs a `README.md` in a folder
        inside `apps/docs`. Headings and MDX static assets are auto-generated at
        build.
  - [x] Added a third column to Docs page containing the Headings of each docs
        page as Bookmarks.
  - [x] Side column positions are set to `fixed` making the docs page scroll
        impact the central content of the page. The sidebars have their own
        `overflow-y` set to `auto` and will automatically have scrollbars as and
        when necessary.
  - [x] **`Sidebar`** component has been modified to accomodate features to be
        turned on or off based on the style aimed for. This allows a single
        **`Sidebar`** component to facilitate many styles. (We may need one more
        update to modify how the `accordion` preset works.)
    - New props added: `navigationOptions`. Takes in the following options:
      - `stagger`: Renders the Sidebar as a staggered tree style.
      - `highlight`: Highlights the items.
      - `border`: Adds a left-border to the items.
      - `headings`: The items without an url are rendered as headings.
      - `fontSize`: `sm` | `base` | `m`. The font-size of the items. Headings
        are ignored.

  ***

  ## Fixes

  - [x] Fixed an issue with generating HashLink for headings that have inline
        `code` tag. (Currently not functional due to a Next 13 bug)
  - [x] Fixed an issue with `docsgen` utility function, not able to import from
        anywhere else.
  - [x] Changed the ES Modules to CommonJS when running ts-node. Using path
        aliases with the `tsconfig-paths/register` plugin to make ts-node
        correctly resolve modules. As long as server-side code is not exported
        as named components with client-side code, there is no issue. For this
        reason, `@/utilities/server` will contain the server-side utils which
        use NodeJS modules like `fs`. These won't be exported anymore from
        `@/utilities` which only exports client-side code.
  - [x] `clean` utility, renamed to `docsclean`. Improved performance. Ability
        to clean from non-package docs while having a list of files to not
        delete.

  ***

  ## Configurations

  - [x] Added the `tsconfig-paths/register` to the `require` configuration in
        `ts-node` in `tsconfig.json`. This successfully registers the `paths` in
        `tsconfig.json` with `ts-node` for module resolution using path aliases.
  - [x] Now uses `unlink` which works on all OS, instead of `rm` which is POSIX
        specific to run the `clean:docs` script.

### Patch Changes

- Updated dependencies
  [[`007e420`](https://github.com/jayantasamaddar/react-toolbelt/commit/007e42006c4251051c66c263da8eb1f5d3560fe1)]:
  - @react-toolbelt/hooks@0.2.0

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
