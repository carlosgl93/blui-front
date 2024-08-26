export type Servicio = {
  id: number;
  especialidades?: Especialidad[] | undefined;
  serviceName: string;
};

export type Especialidad = {
  id: number;
  especialidadName: string;
};
