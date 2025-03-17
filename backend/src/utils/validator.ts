/**
 *
 * @param hex: string
 * @returns boolean
 *
 * This function takes a hex code as a string and returns a boolean indicating whether the hex code is valid.
 */

export const isValidHexCode = (hex: string): boolean => {
  const hexRegex = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/;
  return hexRegex.test(hex);
};
