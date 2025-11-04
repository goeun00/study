import { atomWithStorage } from "jotai/utils";

export const reviewAtom = atomWithStorage("bookmarkMovie", []);
export const bookmarkAtom = atomWithStorage("bookmark", []);
