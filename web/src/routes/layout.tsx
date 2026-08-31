import { $, component$, useContextProvider, useOnWindow, Slot } from "@builder.io/qwik";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import jsyaml from "js-yaml";

import Navbar from "~/components/furniture/nav";
import Footer from "~/components/furniture/footer";
import { ChecklistContext } from "~/store/checklist-context";
import { migrateProgressKeys } from "~/utils/migrate-progress";
import type { Sections } from "~/types/PSC";

export const useChecklists = routeLoader$(async () => {
  // Read the checklist data from the local YAML file at build time, so the
  // site is fully self-contained and doesn't depend on any remote source.
  //
  // Deliberately unguarded: if this file can't be read the site has no content
  // at all, and a build that fails loudly is far better than one that quietly
  // deploys an empty checklist.
  const { readFileSync } = await import('node:fs');
  const { join } = await import('node:path');
  const filePath = join(process.cwd(), '..', 'personal-security-checklist.yml');
  const sections = jsyaml.load(readFileSync(filePath, 'utf-8')) as Sections;
  if (!Array.isArray(sections) || !sections.length) {
    throw new Error(`No checklist sections were parsed from ${filePath}`);
  }
  return sections;
});

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export default component$(() => {
  const checklists = useChecklists();
  useContextProvider(ChecklistContext, checklists);

  // Upgrade any progress saved under the old, collision-prone storage keys.
  // Registered on the outermost component so it runs before the checklist
  // components read from local storage.
  useOnWindow('load', $(() => migrateProgressKeys(checklists.value)));

  return (
    <>
      <Navbar />
      <main class="bg-base-100 min-h-full">
        <Slot />
      </main>
      <Footer />
    </>
  );
});
