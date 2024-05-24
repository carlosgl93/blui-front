import { UserCreatedServicio } from '@/pages/ConstruirPerfil/Servicio/types';
import dayjs from 'dayjs';
import { atom } from 'recoil';

export type TScheduleState = {
  selectedService?: UserCreatedServicio;
  selectedTime: dayjs.Dayjs | null;
  selectedDate: dayjs.Dayjs | null;
};

export const scheduleModalState = atom<boolean>({
  key: 'scheduleModalState',
  default: false,
});

export const ScheduleState = atom<TScheduleState>({
  key: 'scheduleState',
  default: {
    selectedTime: null,
    selectedDate: null,
  },
});
