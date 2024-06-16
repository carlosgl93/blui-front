import dayjs from 'dayjs';
import { DocumentData } from 'firebase/firestore';
import { atom } from 'recoil';
import { User } from '../auth/user';
import { ScheduleServiceParams } from '@/api/appointments';

export type UserAppointment = {
  scheduledTimeAndDate: dayjs.Dayjs;
  provider: DocumentData | undefined;
  service: DocumentData;
  isPaid: boolean | undefined;
  customer: User;
};

export const userAppointmentsState = atom<ScheduleServiceParams[]>({
  key: 'userAppointmentsState',
  default: [],
});

export const searchedAppointmentState = atom<string>({
  key: 'searchedAppointmentState',
  default: '',
});
