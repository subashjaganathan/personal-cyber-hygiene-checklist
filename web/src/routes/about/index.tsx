import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Icon from "~/components/core/icon";
import { parseMarkdown } from "~/utils/checklist";
import styles from "./about.module.css";
import { socials, intro, contributing, maintainer } from './about-content';

export default component$(() => {

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
        <h2 class="text-3xl mb-4" id="author">Credits</h2>

        <div class="flex items-center gap-4 mb-5">
          <div class={styles.avatar} aria-hidden="true">
            {maintainer.name.split(' ').map((part) => part[0]).join('')}
          </div>
          <div>
            <a href={maintainer.portfolio} class="text-xl font-bold link link-primary">
              {maintainer.name}
            </a>
            <p class={styles.designation}>{maintainer.designation}</p>
            <p class="text-sm opacity-70">{maintainer.role}</p>
          </div>
        </div>

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

        <p class="text-xs opacity-60 mt-8 pt-4 border-t border-base-content/10">
          Cyber Hygiene is written and maintained by {maintainer.name}. All revisions, new sections and the
          web application are © {maintainer.name}.
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
