import { Servicio } from '@/types/Servicio';

export const services: Servicio[] = [
  {
    id: 0,
    serviceName: 'Soporte Terapéutico',
    especialidades: [
      {
        id: 0,
        especialidadName: 'Kinesiologia',
      },
      {
        id: 1,
        especialidadName: 'Quiropractica',
      },
      {
        id: 2,
        especialidadName: 'Fonoaudiologia',
      },
      {
        id: 3,
        especialidadName: 'Podologia',
      },
      {
        id: 4,
        especialidadName: 'Estilista',
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
      { id: 6, especialidadName: 'Tecnico enfermeria' },
      {
        id: 7,
        especialidadName: 'Enfermeria general',
      },
    ],
  },
  {
    id: 2,
    serviceName: 'Cuidadora',
  },
  {
    id: 3,
    serviceName: 'Sana compañía',
  },
];
