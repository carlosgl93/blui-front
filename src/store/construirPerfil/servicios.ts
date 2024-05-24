import { atom } from 'recoil';

export const handleServicioState = atom({
  key: 'handleServicioState',
  default: {
    especialidad: '',
    nombreServicio: '',
    tarifa: '',
    description: '',
    isCreatingServicio: false,
    duration: 0,
  },
});
