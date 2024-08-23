import { AppointmentParams } from '@/api/appointments';
import { atom } from 'recoil';

export const providerAppointmentsState = atom<AppointmentParams[]>({
  key: 'providerAppointmentsState',
  default: [],
});
