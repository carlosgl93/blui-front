import { getCuentaPrestador } from '@/api/cuentaBancaria/getCuentaPrestador';
import { postCuentaPrestador } from '@/api/cuentaBancaria/postCuentaPrestador';
import { CuentaBancariaInputs } from '@/pages/ConstruirPerfil/CuentaBancaria/CuentaBancaria';
import useAuth from '@/store/auth';
import { construirPerfilState } from '@/store/construirPerfil';
import { notificationState } from '@/store/snackbar';
import { CuentaBancaria } from '@/types/CuentaBancaria';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useAuthNew } from './useAuthNew';

export const useCuentaBancaria = () => {
  const [notification, setNotification] = useRecoilState(notificationState);
  const [, setConstruirPerfil] = useRecoilState(construirPerfilState);

  const [{ user }] = useAuth();
  const { isLoggedIn } = useAuthNew();

  const router = useNavigate();
  const client = useQueryClient();

  const {
    data: prestadorCuentaBancaria,
    isLoading: getCuentaPrestadorLoading,
    error: getCuentaPrestadorError,
  } = useQuery<CuentaBancaria, AxiosError>(
    'prestadorCuentaBancaria',
    () => getCuentaPrestador(user?.id ?? ''),
    {
      onError: (error: AxiosError) => {
        setNotification({
          ...notification,
          open: true,
          message: `Hubo un error obteniendo tu cuenta: ${error.message}`,
          severity: 'error',
        });
      },
      onSuccess: (data) => {
        setConstruirPerfil((prev) => {
          return {
            ...prev,
            cuentaBancaria: data,
          };
        });
      },
    },
  );

  const {
    mutate,
    isLoading: postCuentaPrestadorLoading,
    error: postCuentaPrestadorError,
  } = useMutation(
    (data: CuentaBancariaInputs) => {
      setNotification(() => {
        return {
          ...notification,
          open: true,
          message: 'Guardando tu cuenta bancaria',
          severity: 'info',
        };
      });
      return postCuentaPrestador({ prestadorId: user?.id ?? '', ...data });
    },
    {
      onSuccess: () => {
        client.invalidateQueries('prestadorCuentaBancaria');
        setNotification({
          ...notification,
          open: true,
          message: 'Cuenta bancaria guardada',
          severity: 'success',
        });
      },
      onError: (error: { message: string }) => {
        setNotification({
          ...notification,
          open: true,
          message: `Hubo un error guardando tu cuenta: ${error.message}`,
          severity: 'error',
        });
      },
    },
  );

  useEffect(() => {
    if (!isLoggedIn) {
      router('/ingresar');
    }
  }, [user]);

  return {
    // cuentaBancaria,
    prestadorCuentaBancaria,
    getCuentaPrestadorLoading,
    getCuentaPrestadorError,
    postCuentaPrestador: mutate,
    postCuentaPrestadorLoading,
    postCuentaPrestadorError,
  };
};
