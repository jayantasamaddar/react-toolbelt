# Reference for Sidebar (v0.0.1)

- Probably need to use Single Responsibility Principle to isolate the two
  versions: Accordion and non-Accordion.
- To evaluate and make changes in next version (v0.0.2)

## Sidebar JSON

```json
{
  "id": "4",
  "name": "getting-started",
  "title": "Getting Started",
  "items": [
    {
      "id": "4a",
      "name": "installation",
      "title": "Installation",
      "url": "/docs/installation"
    },
    {
      "id": "4b",
      "name": "version-support",
      "title": "Version Support",
      "url": "/docs/version-support"
    }
  ]
}
```

# Navigation Items for Accordion

```ts
const items = [
  {
    id: '1',
    title: 'Hooks',
    active: false,
    content: 'Some hooks'
  },
  {
    id: '2',
    title: 'Functions',
    active: false,
    content: 'Some functions'
  },
  {
    id: '3',
    title: 'Others',
    active: false,
    content: 'Other stuff'
  }
];
```

# Modified Sidebar for Accordion usage

```tsx
const modifiedItems = [
  {
    id: 'getting-started',
    name: 'getting-started',
    title: 'Getting Started',
    content: [
      <ul className="flex flex-col gap-1">
        <li>
          <a href="/docs/installation" title="Installation">
            Installation
          </a>
        </li>
        <li>
          <a href="/docs/version-support" title="Version Support">
            Version Support
          </a>
        </li>
      </ul>
    ]
  },
  {
    id: 'hooks',
    name: 'hooks',
    title: 'Hooks',
    content: [
      <ul className="flex flex-col gap-1">
        <li>
          <a href="/docs/useClick">useClick</a>
        </li>
        <li>
          <a href="/docs/useChange">useChange</a>
        </li>
      </ul>
    ]
  }
];
```
