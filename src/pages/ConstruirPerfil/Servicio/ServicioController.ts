import { useAuthNew } from '@/hooks';
import { useServicios } from '@/hooks/useServicios';
import { handleServicioState } from '@/store/construirPerfil/servicios';
import { notificationState } from '@/store/snackbar';
import { SelectChangeEvent } from '@mui/material';
import { useRecoilState, useSetRecoilState } from 'recoil';

export const ServicioController = () => {
  const setNotification = useSetRecoilState(notificationState);
  const [servicioState, setServicioState] = useRecoilState(handleServicioState);
  const { description, especialidad, isCreatingServicio, nombreServicio, tarifa, duration } =
    servicioState;
  const {
    allServicios,
    prestadorCreatedServicios,
    prestadorCreatedServiciosLoading,
    prestadorServicio,
    saveServicioLoading,
    deleteServicioLoading,
    saveServicio,
    deleteServicio,
  } = useServicios();
  const { prestador } = useAuthNew();

  const handleNombreServicioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServicioState((prev) => ({ ...prev, nombreServicio: e.target.value }));
  };

  const handleChangeEspecialidad = (e: SelectChangeEvent<string>) => {
    setServicioState((prev) => ({ ...prev, especialidad: e.target.value }));
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServicioState((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleChangeTarifa = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServicioState((prev) => ({ ...prev, tarifa: e.target.value }));
  };

  const handleSelectDuration = (e: SelectChangeEvent<number>) => {
    setServicioState((prev) => ({ ...prev, duration: Number(e.target.value) }));
  };

  const handleIsCreatingServicio = () => {
    setServicioState((prev) => ({ ...prev, isCreatingServicio: !prev.isCreatingServicio }));
  };

  const handleDeleteServicio = (providerId: string, serviceId: string) => {
    deleteServicio({
      prestadorId: providerId,
      serviceId,
    });
  };

  const isTarifaFloat = tarifa.includes('.') || tarifa.includes(',');
  const isTarifaAmountEnough = Number(tarifa) < 100;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isTarifaFloat) {
      setNotification({
        open: true,
        message: 'Ingresa el monto sin puntos ni comas',
        severity: 'error',
      });
      return;
    }

    if (isTarifaAmountEnough) {
      setNotification({
        open: true,
        message: 'El monto minimo es 100',
        severity: 'error',
      });
      return;
    }

    const newServicio = {
      name: nombreServicio,
      description,
      speciality: especialidad,
      price: tarifa,
      duration,
    };
    saveServicio({
      prestadorId: prestador?.id,
      servicio: newServicio,
    });
  };

  return {
    prestadorCreatedServicios,
    prestadorCreatedServiciosLoading,
    prestador,
    especialidad,
    nombreServicio,
    tarifa,
    description,
    allServicios,
    prestadorServicio,
    isCreatingServicio,
    duration,
    saveServicioLoading,
    deleteServicioLoading,
    handleIsCreatingServicio,
    setServicioState,
    handleChangeEspecialidad,
    handleNombreServicioChange,
    handleChangeDescription,
    handleChangeTarifa,
    handleSubmit,
    handleSelectDuration,
    handleDeleteServicio,
  };
};
