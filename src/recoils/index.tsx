import { atom } from 'recoil';

export const currentUserAtom = atom({
  key: 'currentUserAtom',
  default: {
    curUsername: 'U01',
    curFullname: 'Tedy Maradho Pasa',
    curAddress:
      'Bungurasih dalama 24 RT.002 RW.003 Bungurasih, Waru, Sidoarjo, 61256.',
    curPhone: '085234782302',
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
