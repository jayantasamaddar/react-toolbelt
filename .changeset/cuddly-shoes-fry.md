---
'react-toolbelt-website': minor
---

## Features

- [x] Generate headings data from markdown file directly. Uses a new `HeadingTree` class on the server during build time to link nodes and normalize the headings into a javascript object.
- [x] Any non-package documentation just needs a `README.md` in a folder inside `apps/docs`. Headings and MDX static assets are auto-generated at build.
- [x] Added a third column to Docs page containing the Headings of each docs page as Bookmarks.
- [x] Side column positions are set to `fixed` making the docs page scroll impact the central content of the page. The sidebars have their own `overflow-y` set to `auto` and will automatically have scrollbars as and when necessary.
- [x] **`Sidebar`** component has been modified to accomodate features to be turned on or off based on the style aimed for. This allows a single **`Sidebar`** component to facilitate many styles. (We may need one more update to modify how the `accordion` preset works.)
  - New props added: `navigationOptions`. Takes in the following options:
    - `stagger`: Renders the Sidebar as a staggered tree style.
    - `highlight`: Highlights the items.
    - `border`: Adds a left-border to the items.
    - `headings`: The items without an url are rendered as headings.
    - `fontSize`: `sm` | `base` | `m`. The font-size of the items. Headings are ignored.

---

## Fixes

- [x] Fixed an issue with generating HashLink for headings that have inline `code` tag. (Currently not functional due to a Next 13 bug)
- [x] Fixed an issue with `docsgen` utility function, not able to import from anywhere else.
- [x] Changed the ES Modules to CommonJS when running ts-node. Using path aliases with the `tsconfig-paths/register` plugin to make ts-node correctly resolve modules. As long as server-side code is not exported as named components with client-side code, there is no issue. For this reason, `@/utilities/server` will contain the server-side utils which use NodeJS modules like `fs`. These won't be exported anymore from `@/utilities` which only exports client-side code.
- [x] `clean` utility, renamed to `docsclean`. Improved performance. Ability to clean from non-package docs while having a list of files to not delete.

---

## Configurations

- [x] Added the `tsconfig-paths/register` to the `require` configuration in `ts-node` in `tsconfig.json`. This successfully registers the `paths` in `tsconfig.json` with `ts-node` for module resolution using path aliases.
- [x] Now uses `unlink` which works on all OS, instead of `rm` which is POSIX specific to run the `clean:docs` script.