import { useQuery } from 'react-query';
import { interactedPrestadorState } from '../store/resultados/interactedPrestador';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { getProviderAppointments } from '@/api/appointments';
import { useAuthNew } from './useAuthNew';
import { getUserAppointments } from '@/api/appointments/getUserAppointments';
import { userAppointmentsState } from '@/store/appointments/userAppointmentsState';
import { notificationState } from '@/store/snackbar';
import { providerAppointmentsState } from '@/store/appointments/providerAppointmentsState';
import { getAllAppointments } from '@/api/appointments/getAllAppointments';

export const useAppointments = () => {
  const interactedPrestador = useRecoilValue(interactedPrestadorState);
  const setUserAppointments = useSetRecoilState(userAppointmentsState);
  const setPrestadorAppointments = useSetRecoilState(providerAppointmentsState);

  const setNotification = useSetRecoilState(notificationState);
  const { user, prestador } = useAuthNew();
  const providerId = interactedPrestador?.id ?? prestador?.id;
  const userId = user?.id;

  const {
    data: providersAppointments,
    isLoading: providersAppointmentsLoading,
    error: providersAppointmentsError,
  } = useQuery(
    ['providerAppointments', providerId],
    () => getProviderAppointments(providerId ?? ''),
    {
      enabled: !!providerId,
      onSuccess: (data) => {
        setPrestadorAppointments(data);
      },
      onError: () => {
        console.log('ERROR');
        setNotification({
          open: true,
          message: 'Hubo un error cargando tus sesiones, intentalo nuevamente',
          severity: 'error',
        });
      },
    },
  );

  const {
    data: userAppointments,
    isLoading: userAppointmentsLoading,
    error: userAppointmentsError,
  } = useQuery(['userAppointments', userId], () => getUserAppointments(userId ?? ''), {
    enabled: !!userId,
    onSuccess: (data) => {
      setUserAppointments(data);
    },
    onError: () => {
      setNotification({
        open: true,
        message: 'Hubo un error cargando tus sesiones, intentalo nuevamente',
        severity: 'error',
      });
    },
  });

  const {
    data: allAppointments,
    isLoading: allAppointmentsLoading,
    error: allAppointmentsError,
  } = useQuery(['allAppointments'], () => getAllAppointments(), {
    onError: () => {
      setNotification({
        open: true,
        message: 'Hubo un error cargando todas las sesiones',
        severity: 'error',
      });
    },
  });

  return {
    allAppointments,
    allAppointmentsLoading,
    allAppointmentsError,
    providersAppointments,
    providersAppointmentsLoading,
    providersAppointmentsError,
    userAppointments,
    userAppointmentsLoading,
    userAppointmentsError,
  };
};
