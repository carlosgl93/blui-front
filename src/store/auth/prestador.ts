import { AvailabilityData } from '@/pages/ConstruirPerfil/Disponibilidad/ListAvailableDays';
import { Comuna, TarifaFront } from '@/types';
import { atom } from 'recoil';

export interface Prestador {
  email: string;
  id: string;
  role: string;
  firstname?: string;
  lastname?: string;
  rut: string;
  comunas: Comuna[];
  tarifas: TarifaFront[];
  servicio: string | undefined;
  especialidad?: string | undefined;
  telefono?: string;
  isLoggedIn?: boolean;
  availability?: AvailabilityData[];
  averageReviews?: number;
  description?: string;
  totalReviews?: number;
  offersFreeMeetAndGreet: boolean;
  imageUrl?: string;
  settings: {
    disponibilidad: boolean;
    comunas: boolean;
    tarifas: boolean;
    experiencia: boolean;
    cuentaBancaria: boolean;
    historialLaboral: boolean;
    educacionFormacion: boolean;
    registroSuperIntendenciaSalud: boolean;
    insignias: boolean;
    inmunizacion: boolean;
    idiomas: boolean;
    antecedentesCulturales: boolean;
    religion: boolean;
    interesesHobbies: boolean;
    sobreMi: boolean;
    misPreferencias: boolean;
  };
}

export const prestadorState = atom<null | Prestador>({
  key: 'prestadorState',
  default: {
    email: '',
    id: '',
    role: '',
    firstname: '',
    lastname: '',
    rut: '',
    comunas: [],
    tarifas: [],
    servicio: '',
    especialidad: '',
    availability: [
      {
        day: 'Lunes',
        times: {
          startTime: '00:00',
          endTime: '00:00',
        },
        isAvailable: true,
      },
      {
        day: 'Martes',
        times: {
          startTime: '00:00',
          endTime: '00:00',
        },
        isAvailable: true,
      },
      {
        day: 'Miércoles',
        times: {
          startTime: '00:00',
          endTime: '00:00',
        },
        isAvailable: true,
      },
      {
        day: 'Jueves',
        times: {
          startTime: '00:00',
          endTime: '00:00',
        },
        isAvailable: true,
      },
      {
        day: 'Viernes',
        times: {
          startTime: '00:00',
          endTime: '00:00',
        },
        isAvailable: true,
      },
      {
        day: 'Sábado',
        times: {
          startTime: '00:00',
          endTime: '00:00',
        },
        isAvailable: true,
      },
      {
        day: 'Domingo',
        times: {
          startTime: '00:00',
          endTime: '00:00',
        },
        isAvailable: true,
      },
    ],
    averageReviews: 0,
    totalReviews: 0,
    description: '',
    offersFreeMeetAndGreet: false,
    settings: {
      disponibilidad: false,
      comunas: false,
      tarifas: false,
      experiencia: false,
      cuentaBancaria: false,
      historialLaboral: false,
      educacionFormacion: false,
      registroSuperIntendenciaSalud: false,
      insignias: false,
      inmunizacion: false,
      idiomas: false,
      antecedentesCulturales: false,
      religion: false,
      interesesHobbies: false,
      sobreMi: false,
      misPreferencias: false,
    },
  },
});
