import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Icon from "~/components/core/icon";
import { socials, intro, contributing, maintainer, attribution } from './about-content';
import { marked } from "marked";

export default component$(() => {

  const parseMarkdown = (text: string | undefined): string => {
    return marked.parse(text || '', { async: false }) as string || '';
  };

  return (
    <div class="m-4 md:mx-16">
      <article class="bg-back p-8 mx-auto max-w-[1200px] m-8 rounded-lg shadow-md">
        <h2 class="text-3xl mb-2">About Cyber Hygiene</h2>
        {intro.map((paragraph, index) => (
          <p class="mb-2" key={index}>{paragraph}</p>
        ))}
      </article>
      <div class="divider"></div>

      <article class="bg-back p-8 mx-auto max-w-[1200px] m-8 rounded-lg shadow-md">
        <h2 class="text-3xl mb-2">Contributing</h2>
        {contributing.map((paragraph, index) => (
          <p class="mb-2" key={index} dangerouslySetInnerHTML={parseMarkdown(paragraph)}></p>
        ))}
      </article>
      <div class="divider"></div>

      <article class="bg-back p-8 mx-auto max-w-[1200px] my-8 rounded-lg shadow-md">
        <h2 class="text-3xl mb-2" id="author">Credits</h2>
        <p class="mb-2">
          Cyber Hygiene is curated and maintained by{' '}
          <a href={maintainer.portfolio} class="link link-primary font-semibold">{maintainer.name}</a>.
        </p>
        <p class="text-sm opacity-80 mb-4">{maintainer.role}</p>
        <p class="mb-4">{maintainer.blurb}</p>
        <div class="flex gap-3 my-2">
          {socials.map((social, index) => (
            <a
              key={index}
              href={social.link}
              class="btn btn-sm btn-outline gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon icon={social.icon} width={18} height={18} />
              {social.title}
            </a>
          ))}
        </div>
      </article>

      <div class="divider"></div>

      <article class="bg-back p-8 mx-auto max-w-[1200px] m-8 rounded-lg shadow-md">
        <h2 class="text-3xl mb-2">Licence & Attribution</h2>
        <p class="mb-2">
          The checklist content is adapted from{' '}
          <a href={attribution.originalRepo} class="link link-primary">
            {attribution.originalTitle}
          </a>{' '}
          by {attribution.originalAuthor}, and is shared under the{' '}
          <a href={attribution.licenseLink} class="link link-primary">
            <b>{attribution.licenseName}</b>
          </a>{' '}
          licence. Modifications and additional content © {maintainer.name}.
        </p>
        <p class="text-sm opacity-80">
          Under CC BY 4.0 you are free to share and adapt this material for any purpose,
          provided you give appropriate credit to the original author.
        </p>
      </article>

    </div>
  );
});

export const head: DocumentHead = {
  title: "About | Cyber Hygiene",
  meta: [
    {
      name: "description",
      content: "About Cyber Hygiene — a practical checklist to improve your digital security and protect your privacy online.",
    },
  ],
};
