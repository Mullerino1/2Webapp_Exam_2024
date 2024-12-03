

// src/utils/dateUtils.ts
import { formatDistance as fDistance } from "date-fns";
import { nb } from "date-fns/locale";

/**
 * Formats the distance between a given date and the current date
 * @param publishedAt - The date to format the distance from
 * @returns A formatted string with the distance from the given date to now
 */
export function formatDistance(createdAt: Date): string {
  return fDistance(createdAt, new Date(), {
    addSuffix: true,
    includeSeconds: true,
    locale: nb,
  });
}