import type { Sections, Section } from '~/types/PSC';
import { generatePointId, legacyPointId } from '~/utils/checklist';

const SCHEMA_KEY = 'PSC_SCHEMA_VERSION';
const CURRENT_SCHEMA = 2;
const PROGRESS_KEYS = ['PSC_PROGRESS', 'PSC_IGNORED'];

/**
 * Schema v1 keyed progress on the slugified point title alone, which collided
 * whenever two sections shared a point title. v2 prefixes the section slug.
 *
 * This rewrites any v1 data in place, once, so existing visitors keep their
 * progress instead of arriving to an empty checklist.
 */
export const migrateProgressKeys = (sections: Sections): void => {
  try {
    if (Number(localStorage.getItem(SCHEMA_KEY)) >= CURRENT_SCHEMA) return;

    // Map every legacy id to the new ids it could have meant
    const legacyToNew = new Map<string, string[]>();
    sections.forEach((section: Section) => {
      section.checklist.forEach((item) => {
        const legacy = legacyPointId(item.point);
        const ids = legacyToNew.get(legacy) || [];
        ids.push(generatePointId(section.slug, item.point));
        legacyToNew.set(legacy, ids);
      });
    });

    PROGRESS_KEYS.forEach((storageKey) => {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const oldData = JSON.parse(raw) as Record<string, boolean>;
      const newData: Record<string, boolean> = {};
      Object.entries(oldData).forEach(([key, value]) => {
        if (!value) return;
        // Already migrated keys carry the separator, so pass them through
        if (key.includes('--')) {
          newData[key] = value;
          return;
        }
        // A colliding legacy key can't be attributed to one section, so it
        // is applied to every section that used that point title.
        (legacyToNew.get(key) || []).forEach((id) => {
          newData[id] = value;
        });
      });
      localStorage.setItem(storageKey, JSON.stringify(newData));
    });

    localStorage.setItem(SCHEMA_KEY, String(CURRENT_SCHEMA));
  } catch (error) {
    console.warn('Could not migrate saved progress', error);
  }
};
