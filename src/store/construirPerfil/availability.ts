import { AvailabilityData } from '@/pages/ConstruirPerfil/Disponibilidad/ListAvailableDays';
import { atom } from 'recoil';

export const availabilityState = atom<AvailabilityData[]>({
  key: 'availabilityState',
  default: [],
});
