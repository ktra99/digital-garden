import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const commandAtom = atom(false);
export const tagAtom = atom<string[]>([]);
export const consentAtom = atomWithStorage<boolean | null>("consent", null);