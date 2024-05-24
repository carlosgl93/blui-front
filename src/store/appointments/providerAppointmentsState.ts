import { ScheduleServiceParams } from '@/api/appointments';
import { atom } from 'recoil';

export const providerAppointmentsState = atom<ScheduleServiceParams[]>({
  key: 'providerAppointmentsState',
  default: [],
});
