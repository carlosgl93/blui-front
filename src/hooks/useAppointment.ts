import { getAppointmentByIdQuery } from '@/api/appointments';
import { useQuery } from 'react-query';

export const useAppointment = (appointmentId: string | null) => {
  const { data: appointment, isLoading: isLoadingAppointment } = useQuery(
    ['appointment', appointmentId],
    () => getAppointmentByIdQuery(appointmentId),
  );

  return {
    appointment,
    isLoadingAppointment,
  };
};
