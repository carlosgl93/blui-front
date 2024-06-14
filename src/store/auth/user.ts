import { Comuna } from '@/types';
import { atom } from 'recoil';

export interface User {
  comuna?: Comuna;
  email: string;
  id: string;
  role: 'admin' | 'user' | 'prestador' | '';
  firstname: string;
  lastname: string;
  forWhom: string;
  patientName: string;
  rut: string;
  isLoggedIn: boolean;
  gender: 'Masculino' | 'Femenino' | 'Otro' | '';
  dob: string;
  phone: string;
  address: string;
}

export const userState = atom<null | User>({
  key: 'userState', // unique ID (with respect to other atoms/selectors)
  default: {
    email: '',
    id: '',
    role: '',
    firstname: '',
    lastname: '',
    forWhom: '',
    patientName: '',
    rut: '',
    isLoggedIn: false,
    gender: '',
    dob: '',
    phone: '',
    address: '',
  },
});
