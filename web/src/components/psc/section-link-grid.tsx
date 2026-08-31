import { $, component$, useContext, useOnWindow, useSignal } from "@builder.io/qwik";

import { useLocalStorage } from "~/hooks/useLocalStorage";
import { ChecklistContext } from '~/store/checklist-context';
import type { Checklist, Section } from '~/types/PSC';
import Icon from '~/components/core/icon';
import { withBase } from '~/utils/base';
import { generatePointId } from '~/utils/checklist';
import styles from './psc.module.css';

export default component$(() => {

  /*
   * Read the sections from context rather than taking them as a prop. The
   * array used to be passed in and then captured by the load handler below,
   * where Qwik resumed it as a signal rather than an array, throwing
   * "sections.map is not a function" on every visit to the homepage.
   */
  const checklists = useContext(ChecklistContext);

  // Create signals to store the number of items done or ignored per section
  const completions =  useSignal<number[]>();
  const done =  useSignal<number[]>();

  // Get the IDs of completed and ignore items from local storage
  const [checked] = useLocalStorage('PSC_PROGRESS', {});
  const [ignored] = useLocalStorage('PSC_IGNORED', {});

  /**
   * Get the percentage of completion for a given section
   * using completion data from local storage, and disregarding ignored items
   */
  const getPercentCompletion = $((section: Section): number => {
    const id = (item: Checklist) => generatePointId(section.slug, item.point);
    const total = section.checklist.filter((item) => !ignored.value[id(item)]).length;
    const done = section.checklist.filter((item) => checked.value[id(item)]).length;
    return total > 0 ? Math.round((done / total) * 100) : 0;
  });

  // On load (in browser only), calculate and set completion data for sections
  useOnWindow('load', $(async () => {
    // Percentage completion, per section
    completions.value = await Promise.all(checklists.value.map((section: Section) =>
      getPercentCompletion(section),
    ));
    // Count of completed items, per section
    done.value = checklists.value.map((section: Section) =>
      section.checklist.filter(
        (item) => checked.value[generatePointId(section.slug, item.point)],
      ).length
    );
  }));

  return (
    <div class={[styles.container, 'grid',
      'mx-auto mt-8 px-4 gap-6', 'xl:px-10 xl:max-w-7xl',
      'max-w-6xl w-full']}>
      {checklists.value.map((section: Section, index: number) => {
        const percent = completions.value?.[index];
        const doneCount = done.value?.[index];
        return (
        <a key={section.slug}
          href={withBase(`/checklist/${section.slug}`)}
          class={[styles.card, `border-${section.color}-400`]}
        >
          {/* Colour wash keyed to the section, so each area reads distinctly */}
          <span class={[styles.cardGlow, `bg-${section.color}-400`]} aria-hidden="true"></span>

          <div class={[styles.iconChip, `bg-${section.color}-400`]}>
            <Icon icon={section.icon || 'star'} color={section.color} width={26} height={26} />
          </div>

          <div class="flex-grow min-w-0">
            <h2 class={styles.cardTitle}>{section.title}</h2>
            <p class={styles.cardDescription}>{section.description}</p>

            <div class="flex items-center gap-2 mt-3">
              <span class={[styles.pill, `border-${section.color}-400`]}>
                {section.checklist.length} checks
              </span>
              {doneCount ? (
                <span class="text-xs opacity-70">{doneCount} done</span>
              ) : (
                <span class="text-xs opacity-40">Not yet started</span>
              )}
            </div>

            {/* Completion bar, only once there is progress to show */}
            {percent ? (
              <div class={styles.track}>
                <span
                  class={[styles.trackFill, `bg-${section.color}-400`]}
                  style={`width: ${percent}%;`}></span>
              </div>
            ) : null}
          </div>

          {percent ? (
            <span class={styles.percent}>{percent}%</span>
          ) : null}
        </a>
        );
      })}
    </div>
  );
});
