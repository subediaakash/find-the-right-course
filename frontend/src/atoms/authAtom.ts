import { atom } from "jotai";
interface User {
  email: string;
  name: string;
  token: string;
}

export const userAtom = atom<User | null>(null);
export const authLoadingAtom = atom<boolean>(false);
export const authErrorAtom = atom<string | null>(null);
