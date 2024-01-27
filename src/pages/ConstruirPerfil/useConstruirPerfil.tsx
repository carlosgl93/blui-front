import {
  DisponibilidadFromFront,
  getDisponibilidadByPrestadorId,
} from '@/api/disponibilidad/getDisponibilidadByPrestadorId';
import { useEffect, useState } from 'react';
import useAuth from '@/store/auth';
import { useNavigate } from 'react-router-dom';
import { Comuna } from '@/types/Comuna';

type Perfil = {
  prestadorId: number;
  disponibilidad: DisponibilidadFromFront[] | undefined | null;
  comunas: string[] | 0 | Comuna[] | string;
  // tarifas: any[];
  // experiencia: any[];
  // detallesAdicionales: any[];
  // cuentaBancaria: any[];
  // historialLaboral: any[];
  // educacionFormacion: any[];
  // registroSuperIntendenciaSalud: any[];
  // insignias: any[];
  // inmunizacion: any[];
  // idiomas: any[];
  // antecedentesCulturales: any[];
  // religion: any[];
  // interesesHobbies: any[];
  // sobreMi: any[];
  // misPreferencias: any[];
  [key: string]:
    | string
    | number
    | DisponibilidadFromFront[]
    | undefined
    | null
    | string[]
    | Comuna[];
};

export const useConstruirPerfil = () => {
  const [disponibilidad, setDisponibilidad] = useState<DisponibilidadFromFront[]>([]);
  const [{ user }] = useAuth();
  const router = useNavigate();
  // const [prestador, setPrestador] = useState<Prestador>();

  const handleGetDisponibilidad = async (id: number) => {
    const disponibilidad = await getDisponibilidadByPrestadorId(id);
    return disponibilidad;
  };

  // const handleGetPrestador = async (id: number) => {
  //   const prestador = await getPrestadorById(id);
  //   return prestador;
  // };

  const handleVerPerfil = () => router(`/preview-perfil-prestador/${user?.id}`);

  useEffect(() => {
    const loadDisponibilidad = async () => {
      const disponibilidad = await handleGetDisponibilidad(user?.id ?? 0);
      setDisponibilidad(disponibilidad ?? []);
    };

    loadDisponibilidad();
  }, []);

  // useEffect(() => {
  //   handleGetPrestador(user?.id ?? 0).then((res) => {
  //     setPrestador(res);
  //   });
  // }, []);

  const perfil: Perfil = {
    prestadorId: user?.id || 0,
    disponibilidad: disponibilidad,
    comunas: user?.comunas ?? 0,
    // tarifas,
    // experiencia,
    // detallesAdicionales,
    // cuentaBancaria,
    // historialLaboral,
    // educacionFormacion,
    // registroSuperIntendenciaSalud,
    // insignias,
    // inmunizacion,
    // idiomas,
    // antecedentesCulturales,
    // religion,
    // interesesHobbies,
    // sobreMi,
    // misPreferencias,
  };

  return {
    perfil,
    disponibilidad,
    setDisponibilidad,
    handleGetDisponibilidad,
    handleVerPerfil,
  };
};
