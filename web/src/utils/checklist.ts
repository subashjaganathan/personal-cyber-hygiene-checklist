import { marked } from 'marked';

/** Lower-cases and hyphenates a string, for use in ids and keys. */
export const slugify = (text: string): string => text.toLowerCase().replace(/ /g, '-');

/**
 * Builds the local-storage / DOM id for a single checklist item.
 *
 * The section slug is included because several checklist points share a title
 * across sections (e.g. "Avoid SMS" appears in both Authentication and
 * Messaging). Keying on the point alone made those entries collide, so ticking
 * one silently ticked the other.
 */
export const generatePointId = (sectionSlug: string, point: string): string =>
  `${sectionSlug}--${slugify(point)}`;

/** The pre-migration id format: the point title alone. */
export const legacyPointId = (point: string): string => slugify(point);

/** Renders a checklist item's markdown details to HTML. */
export const parseMarkdown = (text: string | undefined): string =>
  (marked.parse(text || '', { async: false }) as string) || '';
