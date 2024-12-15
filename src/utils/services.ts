import { Servicio } from '@/types/Servicio';

export const services: Servicio[] = [
  {
    id: 0,
    serviceName: 'Soporte Terapéutico',
    especialidades: [
      {
        id: 0,
        especialidadName: 'Kinesiología',
      },
      {
        id: 1,
        especialidadName: 'Quiropráctica',
      },
      {
        id: 2,
        especialidadName: 'Fonoaudiología',
      },
      {
        id: 5,
        especialidadName: 'Terapeuta Ocupacional',
      },
    ],
  },
  {
    id: 1,
    serviceName: 'Servicios de enfermería',
    especialidades: [
      { id: 6, especialidadName: 'Técnico en enfermería' },
      {
        id: 7,
        especialidadName: 'Enfermería general',
      },
    ],
  },
  {
    id: 2,
    serviceName: 'Cuidadora',
  },
  {
    id: 3,
    serviceName: 'Sana Compañía',
  },
];
