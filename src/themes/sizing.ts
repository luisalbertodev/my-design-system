const BASE_FONT_SIZE = 10;

/**
 * Format scale based on font size base currently define in 10px
 *
 * This helper is to make easy future changes
 *
 * @param {number} scale - scale value for format
 * @returns {string} px unity string
 */
export const size = (scale: number): `${number}px` => {
  return `${scale * BASE_FONT_SIZE}px`;
};
