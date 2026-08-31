# Cyber Hygiene — Personal Security & Privacy Checklist

A comprehensive, interactive checklist to help you secure your digital life — covering authentication, web browsing, email, messaging, networks, devices, AI & privacy, and more.

🔗 **Live site:** https://subashjaganathan.github.io/security-checklist/

Curated and maintained by **Subash Jaganathan**.

Built with [Qwik](https://qwik.dev), rendered as a static site and hosted on GitHub Pages. All the checklist content is driven by [`personal-security-checklist.yml`](./personal-security-checklist.yml).

## Development

The web app lives in the [`web/`](./web) directory.

```bash
cd web
npm install --legacy-peer-deps   # install dependencies
npm start                        # run the dev server
```

## Building the static site

```bash
cd web
npm run build.pages
```

This builds the client assets, generates static HTML for every route (SSG), and
rewrites asset paths for the `/security-checklist/` base path. The output is
written to `web/dist/`, which is what gets deployed to GitHub Pages.

> **Note on the base path:** the site is served from a sub-path
> (`/security-checklist/`), so `web/vite.config.mts` sets `base` accordingly and
> `web/scripts/rebase-paths.mjs` fixes the asset URLs that Qwik 1.4 emits at the
> root. If you fork this to a different repo name, update the base path in both
> `vite.config.mts` and the `build.pages` script.

## Deployment

Pushing to `main` triggers the [`Deploy to GitHub Pages`](./.github/workflows/deploy.yml) workflow, which builds the static site and publishes it. Make sure **Settings → Pages → Source** is set to **GitHub Actions**.

## Credits & License

Curated and maintained by **Subash Jaganathan**.

The checklist content is adapted from the original **Personal Security Checklist** by Alicia Sykes, and is shared under [Creative Commons Attribution 4.0 (CC BY 4.0)](./LICENSE). Modifications, additional content, and the web application are © Subash Jaganathan; the application code is licensed under the MIT License.
