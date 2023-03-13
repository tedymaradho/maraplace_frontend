import { atom } from 'recoil';

export const currentUserAtom = atom({
  key: 'currentUserAtom',
  default: {
    curUserId: 'U01',
    curUserName: 'Tedy Maradho Pasa',
  },
});

export const cartItemsAtom = atom({
  key: 'cartItemsAtom',
  default: [],
});

export const sumQtyAtom = atom({
  key: 'sumQtyAtom',
  default: 0,
});

export const sumSubTotalAtom = atom({
  key: 'sumSubTotalAtom',
  default: 0,
});
