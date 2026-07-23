# Personal Security Checklist

A comprehensive, interactive checklist to help you secure your digital life — covering authentication, web browsing, email, messaging, networks, devices, and more.

🔗 **Live site:** https://subashjaganathan.github.io

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
npx vite build                                        # build client assets
npx vite build -c adapters/static/vite.config.mts     # generate static HTML (SSG)
```

The output is written to `web/dist/`, which is what gets deployed to GitHub Pages.

## Deployment

Pushing to `main` triggers the [`Deploy to GitHub Pages`](./.github/workflows/deploy.yml) workflow, which builds the static site and publishes it. Make sure **Settings → Pages → Source** is set to **GitHub Actions**.

## Credits & License

This project is based on [**Personal Security Checklist**](https://github.com/lissy93/personal-security-checklist) by [Alicia Sykes](https://aliciasykes.com).

- The **checklist content** is licensed under [Creative Commons Attribution 4.0 (CC BY 4.0)](./LICENSE) — © Alicia Sykes.
- The **web application code** is licensed under the MIT License.

If you find this useful, please consider starring the [original repository](https://github.com/lissy93/personal-security-checklist) to support the author's work.
