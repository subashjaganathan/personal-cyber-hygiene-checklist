import { component$, useContextProvider, Slot } from "@builder.io/qwik";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import jsyaml from "js-yaml";

import Navbar from "~/components/furniture/nav";
import Footer from "~/components/furniture/footer";
import { ChecklistContext } from "~/store/checklist-context";
import type { Sections } from "~/types/PSC";

export const useChecklists = routeLoader$(async () => {
  // Read the checklist data from the local YAML file at build time,
  // so the site is fully self-contained and doesn't depend on any remote source.
  try {
    const { readFileSync } = await import('node:fs');
    const { join } = await import('node:path');
    const filePath = join(process.cwd(), '..', 'personal-security-checklist.yml');
    return jsyaml.load(readFileSync(filePath, 'utf-8')) as Sections;
  } catch {
    return [] as unknown as Sections;
  }
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
