# Contributing

Thanks for taking an interest in the project.

## Adding or editing checklist content

All checklist content lives in [`personal-security-checklist.yml`](./personal-security-checklist.yml) — the web app reads it at build time, so no code changes are needed to add advice.

Each section looks like this:

```yaml
- title: Authentication
  slug: authentication
  description: Securing your online account login credentials
  icon: password
  color: yellow
  intro: >-
    Markdown-formatted introduction for the section.
  checklist:
  - point: Use a Strong Password
    priority: Essential
    details: >-
      Markdown-formatted explanation of why this matters and how to do it.
```

A few rules the app relies on:

- **`priority` must be one of `Essential`, `Optional`, or `Advanced`.** Any other value is not covered by the level filters or the progress charts.
- **`slug` must be unique** — it becomes the page URL and part of each item's saved-progress key.
- **`color`** must be one of the Tailwind colours listed in the `safelist` in [`web/tailwind.config.js`](./web/tailwind.config.js), otherwise the section's accent colour won't be generated.
- **`icon`** must match a case in [`web/src/components/core/icon.tsx`](./web/src/components/core/icon.tsx); add a new case if you need one.
- Renaming an existing `point` or `slug` resets that item for everyone who has already ticked it, since progress is keyed on `<slug>--<point>`.

## Working on the web app

```bash
cd web
npm install --legacy-peer-deps
npm start
```

Before opening a pull request:

```bash
npm run lint
npm run build.types
npm run build.pages
```

## Reporting issues

Open an issue with the page, the browser, and what you expected to happen. Security-relevant reports about the site itself are welcome via the repository's issue tracker.
