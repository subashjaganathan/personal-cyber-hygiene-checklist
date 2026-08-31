<div align="center">
  <img src="web/public/logo.svg" width="72" alt="">
  <h1>Cyber Hygiene</h1>
  <p><strong>Practical digital security, one step at a time.</strong></p>
  <p>By <a href="https://subashjaganathan.github.io">Subash Jaganathan</a> · DFIR Expert</p>
</div>

🔗 https://subashjaganathan.github.io/security-checklist/

Most security advice is either too vague to act on ("use strong passwords") or written for people who already work in the field. This is an attempt at something in between: 278 specific, plain-English things you can actually do, sorted into 15 areas, with each one marked Essential, Optional or Advanced so you can tell what's worth your time.

You tick items off as you go. Your progress is saved in your browser and nowhere else — there's no account, no backend, and no analytics. If you clear your browser data it's gone, which is why there's an export button in the settings.

## Start here

Nobody should do all 278. The [Getting Started](https://subashjaganathan.github.io/security-checklist/checklist/getting-started/) section is six questions that help you work out which of the rest actually apply to you — what you're protecting, and who from. Ten minutes there will save you a lot of wasted effort later.

If you only ever do four things: use a password manager with a unique password everywhere, put phishing-resistant 2FA on your email, turn on automatic updates, and tighten your account recovery options. Those four block the overwhelming majority of real-world compromises.

## What's covered

Getting Started · Authentication · Web Browsing · Email · Messaging · Social Media · Networks · Mobile Devices · Personal Computers · Backup & Recovery · Smart Home · Personal Finance · Human Aspect · Physical Security · AI & Privacy

## A note on the advice

Security guidance ages badly, and a lot of what circulates online is years out of date. Things like hiding your Wi-Fi SSID, filtering by MAC address, or rotating your passwords every 90 days are still repeated constantly, and all three are either useless or actively counterproductive — NIST has recommended against scheduled password rotation since 2017.

So the content here gets pruned as well as extended. Advice that no longer holds up is removed rather than left in place, and where the honest answer is "this is more complicated than it looks" — cryptocurrency privacy, fingerprint spoofing — it says so instead of pretending otherwise.

If you spot something that's wrong or stale, please open an issue. That's genuinely the most useful contribution.

## Running it locally

The checklist content lives in [`personal-security-checklist.yml`](./personal-security-checklist.yml) at the repo root. The web app reads it at build time, so adding or editing advice needs no code changes.

```bash
cd web
npm install --legacy-peer-deps
npm start
```

To build the static site as it's deployed:

```bash
cd web
npm run build.pages
```

That builds the client assets, pre-renders every route, and writes a branded `404.html`. Output lands in `web/dist/security-checklist/`.

> **On the base path:** the site is served from a sub-path (`/security-checklist/`), so `web/vite.config.mts` sets Vite's `base`, and internal links go through the `withBase()` helper in `web/src/utils/base.ts`. Forking this under a different repo name means updating the base path in `vite.config.mts`, `web/public/manifest.json`, `web/scripts/write-404.mjs`, and the artifact path in the deploy workflow.

## Contributing

[CONTRIBUTING.md](./CONTRIBUTING.md) covers how the YAML is structured, the rules the app relies on (valid priority values, unique slugs, which colours and icons exist), and what to run before opening a pull request.

## Built with

[Qwik](https://qwik.dev) and Tailwind, rendered as a fully static site and hosted on GitHub Pages. Fonts are self-hosted rather than pulled from Google — it seemed hypocritical to leak every visitor's IP to a third party from a privacy checklist. Pushing to `main` triggers the [deploy workflow](./.github/workflows/deploy.yml); Settings → Pages → Source needs to be set to **GitHub Actions**.

## Credits & licence

Written and maintained by **Subash Jaganathan** — DFIR Expert, working in digital forensics, incident response and threat hunting.

Parts of the checklist content are adapted from the original **Personal Security Checklist** by Alicia Sykes, used under [Creative Commons Attribution 4.0 (CC BY 4.0)](./LICENSE). All revisions, new sections, and the web application are © Subash Jaganathan; the application code is licensed under the MIT License.
