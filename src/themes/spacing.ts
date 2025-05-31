const BASE = 8;

type SpacingValue = number | 'auto';

/**
 * Returns a spacing string based on a base value of 8px.
 *
 * Designed for consistent spacing across components.
 * Accepts up to 4 values (like CSS shorthand), each value can be a number or `'auto'`.
 *
 * @example
 * spacing(1)           // '8px'
 * spacing(1, 2)        // '8px 16px'
 * spacing(1, 'auto')   // '8px auto'
 * spacing(1, 2, 3, 4)  // '8px 16px 24px 32px'
 *
 * This is especially useful in styled-components and design systems to align spacing decisions to a defined scale.
 */

export function spacing(...values: SpacingValue[]): string {
  return values
    .slice(0, 4)
    .map((value: SpacingValue) => (value === 'auto' ? value : `${value * BASE}px`))
    .join(' ');
}
