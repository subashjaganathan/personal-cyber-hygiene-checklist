import { useDocumentHead, useLocation } from "@builder.io/qwik-city";

import { component$ } from "@builder.io/qwik";
import { withBase } from "~/utils/base";

export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  return (
    <>
      {/* Basics */}
      <title>{head.title || 'Aegis · Personal Security & Privacy Checklist'}</title>
      <meta name="description" content="Aegis — a practical, interactive checklist to secure your digital life and protect your privacy." />

      {/* Site config */}
      <link rel="canonical" href={loc.url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/png" href={withBase("/favicon.png")} />
      <link rel="apple-touch-icon" href={withBase("/favicon.png")} />
      <meta name="theme-color" content="#8b5cf6" />
      <link rel="manifest" href={withBase("/manifest.json")} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={loc.url.href} />
      <meta property="og:title" content="Aegis · Personal Security & Privacy Checklist" />
      <meta property="og:description" content="A practical, interactive checklist to secure your digital life and protect your privacy." />
      <meta property="og:image" content={withBase("/banner.png")} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={loc.url.href} />
      <meta property="twitter:title" content="Aegis · Personal Security & Privacy Checklist" />
      <meta name="twitter:description" content="A practical, interactive checklist to secure your digital life and protect your privacy." />
      <meta name="twitter:image" content={withBase("/banner.png")} />

      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {head.styles.map((s) => (
        <style key={s.key} {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}

      {head.scripts.map((s) => (
        <script key={s.key} {...s.props} dangerouslySetInnerHTML={s.script} />
      ))}
    </>
  );
});
