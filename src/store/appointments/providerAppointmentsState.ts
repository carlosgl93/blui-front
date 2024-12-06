import { ScheduleAppointmentParams } from '@/api/appointments';
import { atom } from 'recoil';

export const providerAppointmentsState = atom<ScheduleAppointmentParams[]>({
  key: 'providerAppointmentsState',
  default: [],
});
