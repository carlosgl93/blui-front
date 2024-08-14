import { getAppointmentByIdQuery } from '@/api/appointments';
import { useQuery } from 'react-query';

export const useAppointment = (appointmentId: string | null) => {
  if (!appointmentId) {
    throw new Error('missing appointment ID');
  }

  const {
    data: appointment,
    isLoading: isLoadingAppointment,
    error: appointmentError,
  } = useQuery(['appointment', appointmentId], () => getAppointmentByIdQuery(appointmentId));

  return {
    appointment,
    isLoadingAppointment,
    appointmentError,
  };
};
