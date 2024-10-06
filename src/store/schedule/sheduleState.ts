import { UserCreatedServicio } from '@/pages/ConstruirPerfil/Servicio/types';
import dayjs from 'dayjs';
import { atom, useRecoilState } from 'recoil';

export type TScheduleState = {
  selectedService?: UserCreatedServicio;
  selectedTime: dayjs.Dayjs | null;
  selectedDate: dayjs.Dayjs | null;
};

export const defaultScheduleState: TScheduleState = {
  selectedService: undefined,
  selectedTime: null,
  selectedDate: null,
};

export const scheduleModalState = atom<boolean>({
  key: 'scheduleModalState',
  default: false,
});

export const scheduleState = atom<TScheduleState>({
  key: 'scheduleState',
  default: {
    selectedService: undefined,
    selectedTime: null,
    selectedDate: null,
  },
});

export const useSchedule = () => {
  const [schedule, setSchedule] = useRecoilState(scheduleState);

  const handleSetService = (service: UserCreatedServicio) => {
    setSchedule((prev) => ({
      ...prev,
      selectedService: service,
    }));
  };

  return { schedule, handleSetService };
};
