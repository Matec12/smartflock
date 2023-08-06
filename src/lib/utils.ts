import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 *
 * @param classNames
 * @returns string
 */
export const clsxm = (...classNames: ClassValue[]): string => {
  return twMerge(clsx(classNames));
};

/**
 *check if window is a browser
 * @returns boolean
 */
export const isBrowser = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

/**
 *
 * @param password
 * @returns boolean
 */
export const passwordValidator = (password: string): boolean => {
  return (
    password.length >= 8 &&
    /[0-9]/.test(password) &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password)
  );
};
