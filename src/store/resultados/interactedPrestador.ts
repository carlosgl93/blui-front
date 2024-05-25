import { Prestador } from '@/types';
import { atom } from 'recoil';

export const interactedPrestadorState = atom<Prestador | null>({
  key: 'interactedPrestadorState',
  default: null,
});
