import { useAppointments } from '@/hooks/useAppointments';

export const SesionesController = () => {
  // const userSessions = useRecoilValue(userAppointmentsState)
  const { userAppointments, userAppointmentsLoading } = useAppointments();

  return {
    userAppointments,
    userAppointmentsLoading,
  };
};
