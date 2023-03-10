import { atom } from 'recoil';

export const cartCountAtom = atom({
  key: 'cartCountAtom',
  default: 0,
});

export const currentUserAtom = atom({
  key: 'currentUserAtom',
  default: 'U01',
});
