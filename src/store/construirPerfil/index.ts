import {
  DisponibilidadFromFront,
  getDisponibilidadByPrestadorId,
} from '@/api/disponibilidad/getDisponibilidadByPrestadorId';
import { Comuna, Prestador, TarifaFront } from '@/types';
import { atom, useRecoilState } from 'recoil';
import { Actions } from './types';
import { useEffect } from 'react';
import useAuth from '../auth';
import { getPrestadorById } from '@/api/prestadores/getPrestadorById';
import { getPrestadorComunas } from '@/api/comunas/getPrestadorComunas';
import { getPrestadorTarifas } from '@/api/tarifas/getTarifas';
import { postDisponibilidad } from '@/api/disponibilidad/postDisponibilidad';
import { notificationState } from '../snackbar';
import api from '@/api/api';
import useRecibeApoyo from '../recibeApoyo';
import { useNavigate } from 'react-router-dom';
import { postTarifas } from '@/api/tarifas';

type ConstruirPerfilState = {
  prestador: Prestador;
  loading: boolean;
  error: string | null;
  disponibilidad: DisponibilidadFromFront[];
  comunas: Comuna[];
  tarifas: TarifaFront[];
  searchedComuna: string;
  searchedComunasState: Comuna[];
  editDisponibilidad: boolean;
  [key: string]:
    | DisponibilidadFromFront[]
    | Prestador
    | boolean
    | string
    | Comuna[]
    | TarifaFront[]
    | null;
};

const construirPerfilState = atom<ConstruirPerfilState>({
  key: 'construirPerfilState',
  default: {
    prestador: {
      id: 0,
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      rut: '',
      description: '',
      imageUrl: '',
      comunas: [],
    },
    loading: false,
    error: null,
    disponibilidad: [],
    comunas: [],
    tarifas: [],
    searchedComuna: '',
    searchedComunasState: [],
    editDisponibilidad: false,
  },
});

const useConstruirPerfil = (): [ConstruirPerfilState, Actions] => {
  const [construirPerfil, setConstruirPerfil] = useRecoilState(construirPerfilState);
  const [{ allComunas }] = useRecibeApoyo();
  const [{ user }] = useAuth();
  const [, setNotification] = useRecoilState(notificationState);
  const router = useNavigate();

  async function getPrestador(id: number) {
    try {
      setConstruirPerfil((prev) => ({ ...prev, loading: true }));
      const prestadorResponse = await getPrestadorById(id);
      const prestador = prestadorResponse;
      setConstruirPerfil((prev) => ({ ...prev, prestador, loading: false }));
    } catch (error) {
      if (error instanceof Error) {
        setConstruirPerfil((prev) => ({ ...prev, loading: false, error: error.message }));
      } else {
        setConstruirPerfil((prev) => ({
          ...prev,
          loading: false,
          error: 'Hubo un error obteniendo el prestador.',
        }));
      }
    }
  }

  async function getDisponibilidad(id: number) {
    try {
      setConstruirPerfil((prev) => ({ ...prev, loading: true }));
      const disponibilidadResponse = await getDisponibilidadByPrestadorId(id);
      const disponibilidad = disponibilidadResponse;
      setConstruirPerfil((prev) => ({ ...prev, disponibilidad, loading: false }));
    } catch (error) {
      setConstruirPerfil((prev) => ({
        ...prev,
        loading: false,
        error: 'Hubo un error obteniendo la disponibilidad.',
      }));
    }
  }

  async function getComunas(id: number) {
    try {
      setConstruirPerfil((prev) => ({ ...prev, loading: true }));
      const comunas = await getPrestadorComunas(id);
      setConstruirPerfil((prev) => ({ ...prev, comunas, loading: false }));
    } catch (error) {
      setConstruirPerfil((prev) => ({
        ...prev,
        loading: false,
        error: 'Hubo un error obteniendo las comunas.',
      }));
    }
  }

  async function getTarifas(id: number) {
    try {
      setConstruirPerfil((prev) => ({ ...prev, loading: true }));
      const tarifasResponse = await getPrestadorTarifas(id);
      const tarifas = tarifasResponse;
      setConstruirPerfil((prev) => ({ ...prev, tarifas, loading: false }));
    } catch (error) {
      setConstruirPerfil((prev) => ({
        ...prev,
        loading: false,
        error: 'Hubo un error obteniendo las tarifas.',
      }));
    }
  }

  const handleEditDisponibilidad = () => {
    setConstruirPerfil((prev) => ({ ...prev, editDisponibilidad: !prev.editDisponibilidad }));
  };

  const handleToggleDisponibilidadDay = (id: number) => {
    setConstruirPerfil((prev) => ({
      ...prev,
      disponibilidad: prev.disponibilidad.map((disponibilidad) => {
        if (disponibilidad.id === id) {
          return {
            ...disponibilidad,
            isAvailable: !disponibilidad.isAvailable,
          };
        }
        return disponibilidad;
      }),
    }));
  };

  const handleTimeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    startOrEnd: 'startTime' | 'endTime',
  ) => {
    const { value: newTime } = e.target;
    setConstruirPerfil((prev) => {
      const newDisponibilidad = prev.disponibilidad.map((day) => {
        if (`${startOrEnd}${day.dayName}` !== e.target.name) {
          return day;
        }

        const updatedDay = {
          ...day,
          [startOrEnd]: newTime,
        };

        if (updatedDay.startTime >= updatedDay.endTime) {
          // Add your error handling code here. For example:
          console.error('Start time must be before end time');
          return day; // Return the original day to prevent the invalid change
        }

        return updatedDay;
      });

      return {
        ...prev,
        disponibilidad: newDisponibilidad,
      };
    });
  };

  const handleSaveDisponibilidad = async () => {
    setConstruirPerfil((prev) => ({ ...prev, loading: true }));
    try {
      await postDisponibilidad(construirPerfil.disponibilidad);
      setNotification({
        open: true,
        message: 'Disponibilidad guardada exitosamente',
        severity: 'success',
      });
      setConstruirPerfil((prev) => ({ ...prev, loading: false }));
    } catch (error) {
      console.log({ error });
      setNotification({
        open: true,
        message: 'Hubo un error guardando la disponibilidad',
        severity: 'error',
      });
      setConstruirPerfil((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleSearchComunaOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setConstruirPerfil((prev) => ({ ...prev, searchedComuna: e.target.value }));
    const match = allComunas?.filter((comuna) => {
      if (comuna.name.toLowerCase().includes(e.target.value.toLowerCase())) {
        return comuna;
      }
    });
    if (match) {
      setConstruirPerfil((prev) => ({ ...prev, searchedComunasState: match }));
    }
  };

  const handleRemoveComuna = (comuna: Comuna) => {
    setConstruirPerfil((prev) => {
      return {
        ...prev,
        comunas: prev.comunas.filter((comunaState) => comunaState.id !== comuna.id),
      };
    });
  };

  const handleAddComuna = (comuna: Comuna) => {
    return setConstruirPerfil((prev) => {
      return {
        ...prev,
        comunas: [...prev.comunas, comuna],
        searchedComuna: '',
        searchedComunasState: allComunas,
      };
    });
  };

  const handleSelectComuna = (comuna: Comuna) => {
    if (construirPerfil.comunas?.some((comunaState) => comunaState.id === comuna.id)) {
      setNotification({
        message: 'Ya seleccionaste esta comuna',
        severity: 'warning',
        open: true,
      });

      return;
    } else {
      handleAddComuna(comuna);
    }
  };

  const handleUpdatePrestadorComunas = async () => {
    setConstruirPerfil((prev) => ({ ...prev, loading: true }));

    try {
      await api.post('/prestadores/comunas', {
        prestadorId: user?.id as number,
        comunas: construirPerfil.comunas,
      });
      setNotification({
        message: 'Comunas actualizadas',
        severity: 'success',
        open: true,
      });
      setConstruirPerfil((prev) => ({ ...prev, loading: false }));
    } catch (error) {
      setNotification({
        message: 'Hubo un error al actualizar las comunas',
        severity: 'error',
        open: true,
      });
      setConstruirPerfil((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleVerPerfil = () =>
    router(`/preview-perfil-prestador/${user?.id}`, {
      state: {
        prestador: construirPerfil.prestador,
        comunas: construirPerfil.comunas,
        tarifas: construirPerfil.tarifas,
        disponibilidad: construirPerfil.disponibilidad,
      },
    });

  const handleChangeTarifa = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    tarifa: TarifaFront,
  ) => {
    const { value } = e.target;
    setConstruirPerfil((prev) => ({
      ...prev,
      tarifas: prev.tarifas.map((tarifaState) => {
        if (tarifaState.id === tarifa.id) {
          return {
            ...tarifaState,
            price: value,
          };
        }
        return tarifaState;
      }),
    }));
  };

  const handleSaveTarifas = async () => {
    setConstruirPerfil((prev) => ({ ...prev, loading: true }));
    try {
      await postTarifas(user?.id as number, construirPerfil.tarifas);
      setNotification({
        message: 'Tarifas guardadas exitosamente',
        severity: 'success',
        open: true,
      });
      setConstruirPerfil((prev) => ({ ...prev, loading: false }));
    } catch (error) {
      console.log({ error });
      setNotification({
        message: 'Hubo un error guardando las tarifas',
        severity: 'error',
        open: true,
      });
      setConstruirPerfil((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    if (user) {
      //   setConstruirPerfil((prev) => ({ ...prev, prestador: user as Prestador }));
      !construirPerfil.prestador && getPrestador(user.id as number);
      !construirPerfil.disponibilidad?.length && getDisponibilidad(user.id as number);
      !construirPerfil.comunas?.length && getComunas(user.id as number);
      !construirPerfil.tarifas?.length && getTarifas(user.id as number);
      !construirPerfil.searchedComunasState?.length &&
        setConstruirPerfil((prev) => ({
          ...prev,
          searchedComunasState: allComunas || [],
        }));
    }
  }, []);

  return [
    construirPerfil,
    {
      getPrestador,
      getDisponibilidad,
      getComunas,
      getTarifas,
      handleEditDisponibilidad,
      handleToggleDisponibilidadDay,
      handleTimeChange,
      handleSaveDisponibilidad,
      handleSelectComuna,
      handleRemoveComuna,
      handleUpdatePrestadorComunas,
      handleSearchComunaOnChange,
      handleVerPerfil,
      handleChangeTarifa,
      handleSaveTarifas,
    },
  ];
};

export default useConstruirPerfil;
