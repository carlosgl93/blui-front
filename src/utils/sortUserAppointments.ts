import { ScheduleAppointmentParams } from '@/api/appointments';
import dayjs from 'dayjs';

export const sortUserAppointments = (userAppointments: ScheduleAppointmentParams[]) => {
  return userAppointments.sort((a, b) => {
    const dayjsA = dayjs(`${a.scheduledDate}T${a.scheduledTime}`);
    const dayjsB = dayjs(`${b.scheduledDate}T${b.scheduledTime}`);

    return dayjsA.isBefore(dayjsB) ? -1 : 1;
  });
};
