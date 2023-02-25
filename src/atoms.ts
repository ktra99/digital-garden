import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const xAtom = atom(0);
export const widthAtom = atom(0);
export const commandAtom = atom(false);
export const tagAtom = atom<string[]>([]);
export const denyAtom = atomWithStorage("deny", false);
export const consentAtom = atomWithStorage("consent", false);