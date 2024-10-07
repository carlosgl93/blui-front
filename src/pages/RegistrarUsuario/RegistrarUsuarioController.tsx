import { CreateUserParams, ForWhom } from '@/api/auth';
import useRecibeApoyo from '@/store/recibeApoyo';
import { ChangeEvent, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthNew } from '@/hooks';
import { Comuna } from '@/types';
import { useSetRecoilState } from 'recoil';
import { notificationState } from '@/store/snackbar';

type FormState = {
  error: string;
  nombre: string;
  apellido: string;
  paraQuien: ForWhom;
  nombrePaciente: string;
  rut: string;
  correo: string;
  contrasena: string;
  confirmarContrasena: string;
  acceptedTerms: boolean;
  [key: string]: string | null | boolean | Comuna;
};

type FormActions =
  | {
      type: 'CHANGE';
      payload: {
        name: string;
        value: string;
      };
    }
  | {
      type: 'ACCEPT TERMS';
    }
  | {
      type: 'ERROR';
      payload: {
        error: string;
      };
    };

const reducer = (state: FormState, action: FormActions) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case 'ACCEPT TERMS':
      return {
        ...state,
        acceptedTerms: !state.acceptedTerms,
      };
    case 'ERROR':
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

const RegistrarUsuarioController = () => {
  const { createUser, user, prestador } = useAuthNew();
  const navigate = useNavigate();
  const setNotification = useSetRecoilState(notificationState);

  const [{ forWhom, comuna, servicio }] = useRecibeApoyo();

  const initialState = {
    error: '',
    nombre: '',
    apellido: '',
    paraQuien: forWhom,
    nombrePaciente: '',
    rut: '',
    correo: '',
    contrasena: '',
    confirmarContrasena: '',
    acceptedTerms: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    nombre,
    apellido,
    paraQuien,
    nombrePaciente,
    rut,
    correo,
    contrasena,
    confirmarContrasena,
    acceptedTerms,
  } = state;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: 'CHANGE', payload: { name, value } });
  };

  const handleAcceptTerms = () => {
    dispatch({ type: 'ACCEPT TERMS' });
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = () => {
    if (!emailRegex.test(correo)) {
      dispatch({
        type: 'ERROR',
        payload: {
          error: 'Email inválido',
        },
      });
      setTimeout(() => dispatch({ type: 'ERROR', payload: { error: '' } }), 5000);
    } else if (confirmarContrasena !== contrasena) {
      dispatch({
        type: 'ERROR',
        payload: {
          error: 'Las contraseñas no coinciden',
        },
      });
      setTimeout(() => dispatch({ type: 'ERROR', payload: { error: '' } }), 5000);
    } else if (!comuna) {
      navigate('/recibe-apoyo');
      setNotification({
        open: true,
        message: 'Debes seleccionar una comuna',
        severity: 'error',
      });
    } else if (!servicio) {
      setNotification({
        open: true,
        message: 'Debes seleccionar un servicio y una especialidad',
        severity: 'error',
      });
      navigate('/recibe-apoyo');
    } else {
      const newUser: CreateUserParams = {
        nombre,
        apellido,
        contrasena,
        paraQuien: paraQuien !== nombre ? 'tercero' : 'paciente',
        nombrePaciente,
        rut,
        comuna: comuna as Comuna,
        correo,
        acceptedTerms,
        servicio,
      };

      try {
        createUser(newUser);
      } catch (error) {
        dispatch({
          type: 'ERROR',
          payload: {
            error: 'Error al crear usuario',
          },
        });
      }
    }
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch({ type: 'CHANGE', payload: { name, value } });
  };

  useEffect(() => {
    if (user?.email) {
      navigate('/usuario-dashboard');
      return;
    }
    if (prestador?.email) {
      navigate('/prestador-dashboard');
      return;
    }
  }, [user, prestador]);

  useEffect(() => {
    if (!servicio || !comuna || !forWhom) {
      navigate('/recibe-apoyo');
    }
  }, [servicio, comuna]);

  return {
    state,
    handleChange,
    handleSubmit,
    handleSelect,
    handleAcceptTerms,
  };
};

export default RegistrarUsuarioController;
