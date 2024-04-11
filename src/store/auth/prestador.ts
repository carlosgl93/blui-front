import { Comuna, TarifaFront } from '@/types';
import { atom } from 'recoil';

type Availability = {
  monday: [];
  tuesday: [];
  wednesday: [];
  thursday: [];
  friday: [];
  saturday: [];
  sunday: [];
};

export interface Prestador {
  email: string;
  id: string;
  role: string;
  firstname?: string;
  lastname?: string;
  rut: string;
  comunas: Comuna[];
  tarifas?: TarifaFront[];
  servicio: string | undefined;
  especialidad?: string | undefined;
  telefono?: string;
  isLoggedIn?: boolean;
  availability?: Availability;
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
    availability: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    },
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
