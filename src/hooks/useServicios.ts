import { Servicio } from '@/types/Servicio';
import { services } from '../utils/services';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getPrestadorCreatedServices } from '@/api/servicios/getPrestadorCreatedServices';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { notificationState } from '@/store/snackbar';
import {
  savePrestadorCreatedService,
  SavePrestadorCreatedServiceParams,
} from '../api/servicios/savePrestadorCreatedService';
import { handleServicioState } from '@/store/construirPerfil/servicios';
import { interactedPrestadorState } from '@/store/resultados/interactedPrestador';
import { defaultPrestador, prestadorState } from '@/store/auth/prestador';
import { Prestador } from '@/types';
import { UserCreatedServicio } from '@/pages/ConstruirPerfil/Servicio/types';

export const useServicios = () => {
  const setNotification = useSetRecoilState(notificationState);
  const setServicioState = useSetRecoilState(handleServicioState);
  const [prestador, setPrestadorState] = useRecoilState(prestadorState);
  const allServicios: Servicio[] = services;
  const interactedPrestador = useRecoilValue(interactedPrestadorState);
  const prestadorServicio = allServicios.find((s) => s.serviceName === prestador?.servicio);

  const queryClient = useQueryClient();

  const { data: prestadorCreatedServicios, isLoading: prestadorCreatedServiciosLoading } = useQuery<
    UserCreatedServicio[]
  >(
    'prestadorCreatedServices',
    () => getPrestadorCreatedServices(prestador?.id ? prestador.id : interactedPrestador?.id ?? ''),
    {
      enabled: !!prestador?.id || !!interactedPrestador?.id,
      onError: () => {
        setNotification({
          open: true,
          message:
            'Error al cargar servicios, comprueba tu conexión a internet y recarga la página.',
          severity: 'error',
        });
      },
    },
  );

  const { mutate: saveServicio, isLoading: saveServicioLoading } = useMutation(
    (data: SavePrestadorCreatedServiceParams) => savePrestadorCreatedService(data),
    {
      onSuccess: () => {
        setNotification({
          open: true,
          message: 'Servicio guardado exitosamente',
          severity: 'success',
        });
        queryClient.refetchQueries(['prestadorCreatedServices']);
        setPrestadorState((prev) => {
          if (prev === null) return defaultPrestador as Prestador;
          return {
            ...prev,
            settings: {
              ...prev?.settings,
              servicios: true,
            },
          };
        });
        setServicioState((prev) => ({
          ...prev,
          isCreatingServicio: false,
          description: '',
          especialidad: '',
          nombreServicio: '',
          tarifa: '',
          duration: 0,
        }));
      },
      onError: () => {
        setNotification({
          open: true,
          message: 'Hubo un error guardando el servicio, intentalo nuevamente',
          severity: 'error',
        });
      },
    },
  );

  // add a react query mutation to delete a servicio

  return {
    prestadorCreatedServiciosLoading,
    allServicios,
    prestadorServicio,
    prestadorCreatedServicios,
    saveServicio,
    saveServicioLoading,
  };
};
