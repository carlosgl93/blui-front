import { useAuthNew } from '@/hooks';
import { useServicios } from '@/hooks/useServicios';
import { handleServicioState } from '@/store/construirPerfil/servicios';
import { SelectChangeEvent } from '@mui/material';
import { useRecoilState } from 'recoil';

export const ServicioController = () => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
