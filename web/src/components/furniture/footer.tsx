import { component$ } from "@builder.io/qwik";

export default component$(() => {

  const ghLink = 'https://github.com/subashjaganathan/security-checklist';
  const authorLink = 'https://subashjaganathan.github.io';

  return (
  <footer class="footer footer-center px-4 py-3 mt-4 text-base-content bg-base-200 bg-opacity-25">
    <aside>
      <p>
        Built &amp; maintained by{' '}
        <a href={authorLink} class="link link-primary font-semibold">Subash Jaganathan</a>
        <span class="opacity-70"> · DFIR Expert</span> —
        View source on <a href={ghLink} class="link link-primary">GitHub</a>
      </p>
      <p class="text-xs opacity-50">
        Checklist content adapted in part from{' '}
        <a href="https://github.com/lissy93/personal-security-checklist" class="link">Personal Security Checklist</a>{' '}
        by Alicia Sykes, under{' '}
        <a href="https://creativecommons.org/licenses/by/4.0/" class="link">CC BY 4.0</a>.
      </p>
    </aside>
  </footer>
  );
});
