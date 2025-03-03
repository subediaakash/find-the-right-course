import { atom } from "jotai";

export interface User {
  name?: string;
  email: string;
  id?: string;
}

export const userAtom = atom<User | null>(null);
export const isAuthenticatedAtom = atom<boolean>(false);
export const isLoadingAtom = atom<boolean>(true);
export const errorAtom = atom<string | null>(null);
