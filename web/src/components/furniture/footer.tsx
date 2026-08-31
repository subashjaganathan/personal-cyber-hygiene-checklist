import { component$ } from "@builder.io/qwik";

export default component$(() => {

  const ghLink = 'https://github.com/subashjaganathan/security-checklist';
  const authorLink = 'https://subashjaganathan.github.io';
  const originalLink = 'https://github.com/lissy93/personal-security-checklist';
  const ccLink = 'https://creativecommons.org/licenses/by/4.0/';

  return (
  <footer class="footer footer-center px-4 py-3 mt-4 text-base-content bg-base-200 bg-opacity-25">
    <aside>
      <p>
        Curated &amp; maintained by <a href={authorLink} class="link link-primary font-semibold">Subash Jaganathan</a> —
        View source on <a href={ghLink} class="link link-primary">GitHub</a>
      </p>
      <p class="text-xs opacity-70">
        Checklist content adapted from the <a href={originalLink} class="link">Personal Security Checklist</a> by
        Alicia Sykes, licensed under <a href={ccLink} class="link">CC BY 4.0</a>.
      </p>
    </aside>
  </footer>
  );
});
