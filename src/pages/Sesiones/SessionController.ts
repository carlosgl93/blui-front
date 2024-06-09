import { useAppointments } from '@/hooks/useAppointments';

export const SessionController = () => {
  // const userSessions = useRecoilValue(userAppointmentsState)
  const { userAppointments, userAppointmentsLoading } = useAppointments();

  return {
    userAppointments,
    userAppointmentsLoading,
  };
};
