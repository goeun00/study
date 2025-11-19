import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

export const reviewAtom = atomWithStorage("review", []);
export const bookmarkAtom = atomWithStorage("bookmark", []);
export const bookmarkMotionAtom = atom(false);
export const reviewDisplayAtom = atom((get) => {
  const arr = get(reviewAtom);
  const len = Array.isArray(arr) ? arr.length : 0;
  return len > 99 ? "99+" : String(len);
});

export const bookmarkDisplayAtom = atom((get) => {
  const arr = get(bookmarkAtom);
  const len = Array.isArray(arr) ? arr.length : 0;
  return len > 99 ? "99+" : String(len);
});